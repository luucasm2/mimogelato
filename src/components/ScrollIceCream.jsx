import { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 180;
const PATH = (n) => `/frames/frame_${String(n).padStart(4, '0')}.webp`;
const clamp = (value, low, high) => Math.min(high, Math.max(low, value));

/**
 * Mostra a sequência original de 180 quadros em um canvas.
 * A rolagem controla os quadros para frente ou para trás.
 * Carrega sob demanda apenas os quadros próximos para não ocupar ~1,5 GB de RAM.
 */
export default function ScrollIceCream({ sectionRef }) {
  const canvasRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let destroyed = false;
    let requestId = 0;
    let desiredFrame = 1;
    const cached = new Map();
    const loading = new Map();
    // Imagens 1080p decodificadas consomem memória; em celulares usamos cache menor.
    const smallScreen = window.matchMedia('(max-width: 900px)').matches;
    const MAX_CACHED = smallScreen ? 17 : 38;
    const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const draw = () => {
      requestId = 0;
      if (destroyed) return;
      let closest = cached.get(desiredFrame);
      if (!closest) {
        let bestDistance = Infinity;
        for (const [n, image] of cached) {
          const distance = Math.abs(n - desiredFrame);
          if (distance < bestDistance) { bestDistance = distance; closest = image; }
        }
      }
      if (!closest) return;
      const w = canvas.width;
      const h = canvas.height;
      const iw = closest.naturalWidth;
      const ih = closest.naturalHeight;
      if (!w || !h || !iw || !ih) return;

      // Object-fit: cover com ponto focal real no sorvete (x=68% da imagem).
      // A versão mobile reduz a área do canvas e conserva a casquinha no centro.
      const targetAspect = w / h;
      const sourceAspect = iw / ih;
      let sx = 0, sy = 0, sw = iw, sh = ih;
      if (targetAspect < sourceAspect) {
        sw = ih * targetAspect;
        sx = clamp(iw * 0.68 - sw / 2, 0, iw - sw);
      } else {
        sh = iw / targetAspect;
        sy = (ih - sh) / 2;
      }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(closest, sx, sy, sw, sh, 0, 0, w, h);
    };

    const scheduleDraw = () => {
      if (!requestId) requestId = requestAnimationFrame(draw);
    };

    const keepCacheSmall = () => {
      if (cached.size <= MAX_CACHED) return;
      const evict = [...cached.keys()]
        .filter((n) => n !== 1 && n !== desiredFrame)
        .sort((a, b) => Math.abs(b - desiredFrame) - Math.abs(a - desiredFrame));
      while (cached.size > MAX_CACHED && evict.length) cached.delete(evict.shift());
    };

    const load = (frame) => {
      const index = clamp(Math.round(frame), 1, TOTAL_FRAMES);
      if (cached.has(index) || loading.has(index)) return;
      const img = new Image();
      loading.set(index, img);
      img.decoding = 'async';
      img.onload = () => {
        loading.delete(index);
        if (destroyed) return;
        cached.set(index, img);
        keepCacheSmall();
        if (index === 1) setHasStarted(true);
        scheduleDraw();
      };
      img.onerror = () => loading.delete(index);
      img.src = PATH(index);
    };

    const buffer = (center) => {
      load(center);
      // Prioridade para o sentido da rolagem: pequenos intervalos garantem fluidez.
      for (let d = 1; d <= (smallScreen ? 5 : 10); d++) {
        if (center + d <= TOTAL_FRAMES) load(center + d);
        if (center - d >= 1) load(center - d);
      }
    };

    const resize = () => {
      const size = canvas.getBoundingClientRect();
      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(size.width * scale));
      canvas.height = Math.max(1, Math.round(size.height * scale));
      scheduleDraw();
    };

    const scroll = () => {
      const rect = section.getBoundingClientRect();
      const available = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = clamp(-rect.top / available, 0, 1);
      section.style.setProperty('--scroll-progress', progress.toFixed(4));
      desiredFrame = motionReduced ? 1 : 1 + Math.round(progress * (TOTAL_FRAMES - 1));
      buffer(desiredFrame);
      scheduleDraw();
    };

    // Apenas o primeiro quadro é necessário para pintar a tela inicial.
    load(1);
    resize();
    scroll();
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', resize, { passive: true });
    // Em mobile o viewport muda ao esconder/mostrar a barra do navegador.
    // Observar o canvas evita distorções quando a barra muda de altura.
    const observer = new ResizeObserver(() => { resize(); scroll(); });
    observer.observe(canvas);

    // Alguns frames adjacentes são pré-carregados quando a conexão está ociosa.
    const idle = (callback) => window.requestIdleCallback
      ? window.requestIdleCallback(callback, { timeout: 800 })
      : window.setTimeout(callback, 100);
    const idleId = idle(() => { if (!destroyed) buffer(desiredFrame); });

    return () => {
      destroyed = true;
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('resize', resize);
      observer.disconnect();
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId);
      else clearTimeout(idleId);
      if (requestId) cancelAnimationFrame(requestId);
      cached.clear();
      loading.clear();
    };
  }, [sectionRef]);

  return (
    <div className="hero-visual" aria-hidden="true">
      <canvas ref={canvasRef} className={`hero-canvas ${hasStarted ? 'is-loaded' : ''}`} />
      <div className="hero-visual-overlay" />
    </div>
  );
}
