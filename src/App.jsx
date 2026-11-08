import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Heart, IceCream2,
  Menu, Sparkles, Star, X,
} from 'lucide-react';
import ScrollIceCream from './components/ScrollIceCream.jsx';
import { BRAND, PRODUCTS, REVIEWS } from './data/content.js';

const photoSrc = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=84`;
const navLinks = [
  { href: '#inicio', label: 'Início' },
  { href: '#sabores', label: 'Nossos sabores' },
  { href: '#avaliacoes', label: 'Avaliações' },
];

function BrandMark({ light = false }) {
  return (
    <a href="#inicio" className={`brand ${light ? 'brand--light' : ''}`} aria-label={`${BRAND.name}, voltar ao início`}>
      <span className="brand-icon"><IceCream2 size={20} strokeWidth={2.2} /></span>
      <span className="brand-text">{BRAND.name}<small>{BRAND.subtitle}</small></span>
    </a>
  );
}

function Header({ favoriteCount, showFavorites, onToggleFavorites }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 1.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onEscape = (event) => { if (event.key === 'Escape') setMenuOpen(false); };
    const onResize = () => { if (window.innerWidth > 900) setMenuOpen(false); };
    window.addEventListener('keydown', onEscape);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onEscape);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`header ${pastHero ? 'header--scrolled' : ''}`}>
      <div className="header-inner page-shell">
        <BrandMark />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navLinks.map(({ href, label }, index) => (
            <a key={href} href={href} className={index === 0 && !pastHero ? 'active' : ''}>{label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className={`round-action favorite-action ${showFavorites ? 'is-active' : ''}`}
            aria-label={showFavorites ? 'Ver todos os sabores' : `Ver favoritos: ${favoriteCount}`}
            title={showFavorites ? 'Mostrar todos os sabores' : 'Meus sabores favoritos'}
            onClick={onToggleFavorites}
          >
            <Heart size={19} strokeWidth={2} fill={showFavorites ? 'currentColor' : 'none'} />
            {favoriteCount > 0 && <span className="favorite-count">{favoriteCount}</span>}
          </button>
          <a className="header-cta" href="#sabores">Ver sabores <ArrowUpRight size={16} /></a>
          <button className="mobile-toggle" type="button" aria-label="Abrir menu" aria-controls="menu-mobile" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </div>
      {menuOpen && <div id="menu-mobile" className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu de navegação">
        <div className="mobile-menu-top"><BrandMark /><button onClick={closeMenu} aria-label="Fechar menu"><X size={25}/></button></div>
        <nav>{navLinks.map(({ href, label }) => <a key={href} href={href} onClick={closeMenu}>{label}<ArrowUpRight size={20}/></a>)}</nav>
        <p>Seu próximo momento doce começa aqui.</p>
      </div>}
    </header>
  );
}

function Hero({ heroRef }) {
  return (
    <section ref={heroRef} id="inicio" className="hero-scroll">
      <div className="hero-sticky">
        <ScrollIceCream sectionRef={heroRef} />
        <div className="hero-inner page-shell">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow"><span className="eyebrow-sparkle">✳</span> UMA DOSE DIÁRIA DE FELICIDADE</span>
            <h1>Seu dia fica <span>mais doce.</span></h1>
            <p>Tem sabor que abraça, refresca e faz sorrir. Descubra nossos sorvetes e escolha seu próximo favorito.</p>
            <a href="#sabores" className="button button-primary">Explorar sabores <ArrowUpRight size={20} /></a>
          </div>
          <div className="hero-floating-note"><Sparkles size={20}/><span>Feito para os<br/><strong>momentos felizes.</strong></span></div>
          <div className="hero-bottom">
            <div className="hero-scroll-hint"><span className="scroll-mouse"><span/></span> ROLE PARA VER A MÁGICA <ArrowDown size={15}/></div>
            <div className="hero-frame-count"><span>01</span><div className="hero-progress-track"><div className="hero-progress-fill" /></div><span>180</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlavorCard({ product, isFavorite, onFavorite, onOpen }) {
  return (
    <article className="flavor-card">
      <div className="flavor-media" style={{ '--flavor-tint': product.tint }}>
        <img loading="lazy" src={photoSrc(product.photo, 860)} srcSet={`${photoSrc(product.photo, 440)} 440w, ${photoSrc(product.photo, 860)} 860w, ${photoSrc(product.photo, 1200)} 1200w`} sizes="(max-width: 660px) 100vw, (max-width: 1020px) 48vw, 32vw" alt={product.alt} />
        <span className="flavor-tag">{product.tag}</span>
        <button type="button" className={`flavor-heart ${isFavorite ? 'is-favorite' : ''}`} onClick={() => onFavorite(product.id)} aria-label={isFavorite ? `Remover ${product.name} dos favoritos` : `Favoritar ${product.name}`} title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}>
          <Heart size={20} strokeWidth={1.9} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="flavor-info">
        <span className="flavor-number">SABOR {product.number}</span>
        <h3>{product.name}</h3>
        <div className="flavor-card-bottom"><p>{product.short}</p><button className="flavor-open" aria-label={`Conhecer ${product.name}`} title="Conhecer o sabor" onClick={() => onOpen(product)}><ArrowUpRight size={20}/></button></div>
      </div>
    </article>
  );
}

function Products({ favorites, showFavorites, onToggleFavorite, onClearFilter, onOpen }) {
  const shownProducts = showFavorites ? PRODUCTS.filter((p) => favorites.includes(p.id)) : PRODUCTS;
  return (
    <section id="sabores" className="products-section section-padding">
      <div className="page-shell">
        <div className="section-heading products-heading">
          <div>
            <span className="eyebrow eyebrow--pink"><span className="eyebrow-sparkle">✳</span> NOSSA SELEÇÃO</span>
            <h2>Seis motivos para<br/><em>se apaixonar.</em></h2>
          </div>
          <div className="heading-aside">
            <p>Do clássico ao surpreendente, existe um sabor para cada momento. Qual vai ser o seu?</p>
            <span className="products-meta">{showFavorites ? 'SEUS SABORES FAVORITOS' : '06 SABORES PARA DESCOBRIR'} <span className="tiny-line" /></span>
          </div>
        </div>
        {showFavorites && <div className="filter-row"><span><Heart size={16} fill="currentColor"/> Mostrando favoritos ({shownProducts.length})</span><button onClick={onClearFilter}>Ver todos <X size={16}/></button></div>}
        {shownProducts.length ? <div className="flavor-grid">{shownProducts.map((product) => <FlavorCard key={product.id} product={product} isFavorite={favorites.includes(product.id)} onFavorite={onToggleFavorite} onOpen={onOpen} />)}</div> : <div className="empty-favorites"><Heart size={36}/><h3>Seus favoritos vão aparecer aqui.</h3><p>Toque no coração dos sabores que chamarem sua atenção.</p><button className="button button-navy" onClick={onClearFilter}>Ver todos os sabores <ArrowRight size={18}/></button></div>}
      </div>
    </section>
  );
}

function Ticker() {
  return <div className="ticker" aria-hidden="true"><div className="ticker-track">{Array.from({ length: 8 }, (_, i) => <span key={i}>SABOR QUE ABRAÇA <span className="ticker-star">✳</span> UM POUCO DE DOÇURA <span className="ticker-star">✳</span></span>)}</div></div>;
}

function Testimonials() {
  return (
    <section id="avaliacoes" className="reviews-section section-padding">
      <div className="page-shell">
        <div className="reviews-head">
          <div><span className="eyebrow reviews-eyebrow"><span className="eyebrow-sparkle">✳</span> MOMENTOS QUE MARCAM</span><h2>É impossível não<br/><em>abrir um sorriso.</em></h2></div>
          <p>Uma experiência especial fica ainda melhor quando vira uma boa história para contar.</p>
        </div>
        <div className="review-grid">
          {REVIEWS.map((review, index) => <article className="review-card" key={review.person}>
            <div className="review-top"><span className="review-index">0{index + 1} / 03</span><span className="review-stars" aria-label="Cinco estrelas ilustrativas">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={16} fill="currentColor" strokeWidth={0}/>)}</span></div>
            <blockquote>“{review.quote}”</blockquote>
            <div className="review-bottom"><span className="review-avatar">{index === 0 ? 'M' : index === 1 ? 'C' : 'A'}</span><span><strong>{review.person}</strong><small>Provou: {review.flavor}</small></span><ArrowUpRight size={18} /></div>
          </article>)}
        </div>
        <p className="review-disclaimer">Depoimentos ilustrativos para demonstração do site. Substitua por avaliações reais antes de publicar comercialmente.</p>
      </div>
    </section>
  );
}

function FlavorModal({ product, isFavorite, onFavorite, onClose }) {
  useEffect(() => {
    if (!product) return;
    const escape = (e) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', escape);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', escape); };
  }, [product, onClose]);
  if (!product) return null;
  return <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="flavor-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button className="modal-close" onClick={onClose} aria-label="Fechar detalhes"><X size={22}/></button>
      <div className="modal-image" style={{ backgroundColor: product.tint }}><img src={photoSrc(product.photo, 1200)} alt={product.alt}/></div>
      <div className="modal-copy"><span className="eyebrow eyebrow--pink">SABOR {product.number} · {product.tag}</span><h2 id="modal-title">{product.name}</h2><p>{product.detail}</p><button className="button button-navy" onClick={() => onFavorite(product.id)}><Heart size={19} fill={isFavorite ? 'currentColor' : 'none'}/>{isFavorite ? 'Salvo nos favoritos' : 'Adicionar aos favoritos'}</button><span className="modal-footnote">* Cardápio demonstrativo. Consulte disponibilidade na loja.</span></div>
    </div>
  </div>;
}

function Footer() {
  return <footer className="footer"><div className="page-shell">
    <div className="footer-upper"><div><span className="eyebrow footer-eyebrow">A VIDA ACONTECE NOS PEQUENOS MOMENTOS</span><h2>Mais sorvete.<br/><em>Mais alegria.</em></h2></div><a className="footer-circle" href="#sabores" aria-label="Voltar aos sabores"><ArrowUpRight size={38}/></a></div>
    <div className="footer-bottom"><BrandMark light /><div className="footer-links"><a href="#inicio">Início</a><a href="#sabores">Sabores</a><a href="#avaliacoes">Avaliações</a></div><span>© {new Date().getFullYear()} {BRAND.name} · Feito com carinho.</span></div>
  </div></footer>;
}

function App() {
  const heroRef = useRef(null);
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem('mimo-gelato:favorites') || '[]');
      return Array.isArray(saved) ? saved.filter((id) => PRODUCTS.some((p) => p.id === id)) : [];
    } catch { return []; }
  });

  useEffect(() => {
    window.localStorage.setItem('mimo-gelato:favorites', JSON.stringify(favorites));
  }, [favorites]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleFavorite = (id) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const toggleFilter = () => {
    setShowFavorites((current) => !current);
    document.getElementById('sabores')?.scrollIntoView({ behavior: 'smooth' });
  };

  return <>
    <Header favoriteCount={favorites.length} showFavorites={showFavorites} onToggleFavorites={toggleFilter}/>
    <main>
      <Hero heroRef={heroRef}/>
      <Ticker />
      <Products favorites={favorites} showFavorites={showFavorites} onToggleFavorite={toggleFavorite} onClearFilter={() => setShowFavorites(false)} onOpen={setSelectedProduct}/>
      <Testimonials />
    </main>
    <Footer />
    <FlavorModal product={selectedProduct} isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false} onFavorite={toggleFavorite} onClose={() => setSelectedProduct(null)}/>
  </>;
}

export default App;
