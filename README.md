# Mimo Gelato — Site React (versão responsiva)

Demonstração de sorveteria feita em **React + Vite**, com sequência de **180 frames reais** sincronizada ao scroll, seis produtos, favoritos e avaliações demonstrativas.

## Como abrir no VS Code

1. Extraia o ZIP.
2. Abra a pasta `mimo-gelato-react` no VS Code.
3. No terminal:

```bash
npm install
npm run dev
```

4. Abra o endereço exibido pelo Vite (normalmente `http://localhost:5173`).

## Publicar no GitHub / Vercel

- O `.gitignore` já impede que `node_modules` e `dist` sejam enviados ao GitHub.
- Na Vercel, escolha **Vite**.
- Build Command: `npm run build`
- Output Directory: `dist`
- Root Directory: `./` (se este projeto estiver na raiz do repositório).
- Os arquivos WebP ficam em `public/frames/` e serão publicados no build sem alterações.

## Como alterar os conteúdos

Edite `src/data/content.js`:
- `BRAND.name`: nome da sorveteria, atualmente **mimo.** (nome de exemplo).
- `PRODUCTS`: seis sabores demonstrativos, descrições, imagens e etiquetas.
- `REVIEWS`: exemplos para apresentação visual, não são depoimentos reais.

Para mudar os textos principais, edite `src/App.jsx`. A paleta de cores pode ser ajustada no início de `src/styles.css`.

## Animação no scroll

- Frames em: `public/frames/frame_0001.webp` até `frame_0180.webp`.
- Componente: `src/components/ScrollIceCream.jsx`.
- A seção inicial ocupa cerca de 2,3–2,6 alturas de tela. Enquanto a imagem está fixa, o scroll controla a evolução dos 180 frames. O controle é **bidirecional**: subir a página reverte a cobertura, descer avança.
- Usa **canvas 2D**, `requestAnimationFrame`, cache limitado e carregamento de frames ao redor do ponto atual.
- Para quem prefere movimento reduzido, a animação fica no primeiro frame.
- 180 imagens WebP representam aproximadamente 18 MB em disco. Não converta para JPEG/PNG em massa. O carregamento é sob demanda, e as imagens originais estão incluídas no ZIP.

## Fotografias reais

As seis fotografias são carregadas pela internet através de `images.unsplash.com`, em alta resolução adaptável. A sequência de quadros da animação **está incluída localmente**. Se você quiser fotos locais, substitua os endereços das imagens pelos caminhos em `public/`.

As fotografias são do **Unsplash**, utilizadas como fotografias demonstrativas. Crédito aos fotógrafos e suas páginas originais:

1. Morango — Heather Barnes — https://unsplash.com/photos/XlBkpiB2nRw
2. Chocolate — Markus Spiske — https://unsplash.com/photos/wxmrTxUAMJE
3. Pistache — Alex Teixeira — https://unsplash.com/photos/DsjK9rgsuxE
4. Manga — Cera — https://unsplash.com/photos/oNZfbStfE9o
5. Frutas vermelhas — Brooke Lark — https://unsplash.com/photos/8beTH4VkhLI
6. Baunilha — Mae Mu — https://unsplash.com/photos/Rz5o0osnN6Q

Licença: https://unsplash.com/license — permite uso comercial da maioria das fotos, respeitadas as restrições previstas na licença e eventuais direitos de terceiros.

**Antes de publicar comercialmente:** substitua marca, sabores, preços (não inventados no protótipo) e depoimentos de demonstração por informações reais. Não mostramos métricas, avaliações ou preços falsos como se fossem dados do negócio.

## Responsividade (atualização)

- Layout adaptado para larguras de **320 px até monitores grandes**.
- Menu de navegação mobile com fechamento ao selecionar o link ou pressionar Esc.
- Sorvete centralizado no enquadramento da sequência no celular e exibido na parte inferior da hero.
- Catálogo de sabores com **uma coluna em celulares até 480 px**, duas em tablets e três em desktop.
- Modal de detalhes rolável em telas pequenas, botões adequados para toque e tipografia/espaçamento fluídos.
- Canvas observa mudanças no seu tamanho, inclusive variações das barras do navegador móvel.
- Em celulares, o cache de quadros da animação é menor para reduzir uso de memória.

Depois de extrair, execute novamente `npm install` e `npm run dev`.
