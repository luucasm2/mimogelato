// PERSONALIZE A MARCA AQUI.
export const BRAND = {
  name: 'mimo.', // Nome demonstrativo: substitua pelo nome da sorveteria.
  subtitle: 'gelato & bons momentos',
  instagram: '', // Ex.: 'https://instagram.com/sua_sorveteria'
};

// Fotografias reais do Unsplash. O carregamento exige internet.
// Os sabores e descrições são exemplos para demonstração; atualize conforme o cardápio real.
export const PRODUCTS = [
  {
    id: 'morango',
    number: '01',
    name: 'Morango dos sonhos',
    short: 'O clássico que sempre conquista.',
    detail: 'Um sorvete inspirado na delicadeza do morango, com textura cremosa e aquele gostinho de quero mais.',
    tag: 'Clássico',
    tint: '#F9E0EC',
    color: '#BE2B6F',
    photo: 'photo-1555529211-3237f6e13d33',
    author: 'Heather Barnes',
    source: 'https://unsplash.com/photos/XlBkpiB2nRw',
    alt: 'Fotografia real de sorvete de morango em casquinha',
  },
  {
    id: 'chocolate',
    number: '02',
    name: 'Chocolate intenso',
    short: 'Para quem ama chocolate de verdade.',
    detail: 'Sabor marcante e uma experiência extra cremosa para deixar qualquer pausa ainda mais especial.',
    tag: 'Favorito',
    tint: '#EFE3DC',
    color: '#754633',
    photo: 'photo-1469428946640-844b286ebf50',
    author: 'Markus Spiske',
    source: 'https://unsplash.com/photos/wxmrTxUAMJE',
    alt: 'Fotografia real de sorvete de chocolate em casquinha',
  },
  {
    id: 'pistache',
    number: '03',
    name: 'Pistache cremoso',
    short: 'Um sabor que surpreende.',
    detail: 'A combinação do sabor delicado do pistache com uma textura aveludada e irresistível.',
    tag: 'Especial',
    tint: '#E6EEDB',
    color: '#627A4E',
    photo: 'photo-1600699900070-4432dc458cb1',
    author: 'Alex Teixeira',
    source: 'https://unsplash.com/photos/DsjK9rgsuxE',
    alt: 'Fotografia real de sorvete de pistache em casquinha',
  },
  {
    id: 'manga',
    number: '04',
    name: 'Manga tropical',
    short: 'Frescor para qualquer estação.',
    detail: 'O toque frutado e tropical perfeito para quem gosta de sabores leves e refrescantes.',
    tag: 'Refrescante',
    tint: '#FCEACC',
    color: '#C47D2E',
    photo: 'photo-1529790912688-db5fec227b5a',
    author: 'Cera',
    source: 'https://unsplash.com/photos/oNZfbStfE9o',
    alt: 'Fotografia real de sorvete frutado em casquinha',
  },
  {
    id: 'frutas-vermelhas',
    number: '05',
    name: 'Frutas vermelhas',
    short: 'Uma explosão de cor e sabor.',
    detail: 'Um encontro delicioso entre doçura e frescor, para quem adora combinações com frutas.',
    tag: 'Frutado',
    tint: '#F2DCEB',
    color: '#A54879',
    photo: 'photo-1501443762994-82bd5dace89a',
    author: 'Brooke Lark',
    source: 'https://unsplash.com/photos/8beTH4VkhLI',
    alt: 'Fotografia real de sorvete em casquinha com frutas e flores',
  },
  {
    id: 'baunilha',
    number: '06',
    name: 'Baunilha & carinho',
    short: 'Simples, delicado e inesquecível.',
    detail: 'A suavidade que combina com tudo, da primeira colherada à última gotinha.',
    tag: 'Atemporal',
    tint: '#DDE9F6',
    color: '#315AA7',
    photo: 'photo-1559703248-dcaaec9fab78',
    author: 'Mae Mu',
    source: 'https://unsplash.com/photos/Rz5o0osnN6Q',
    alt: 'Fotografia real de sorvete em casquinha fotografado em fundo colorido',
  },
];

export const REVIEWS = [
  {
    quote: 'Cremoso, bonito e com aquele sabor que dá vontade de voltar no dia seguinte.',
    person: 'Cliente exemplo 01',
    flavor: 'Morango dos sonhos',
  },
  {
    quote: 'Uma experiência deliciosa do começo ao fim. Perfeito para uma pausa doce.',
    person: 'Cliente exemplo 02',
    flavor: 'Chocolate intenso',
  },
  {
    quote: 'Os sabores são uma surpresa boa. Já estou pensando em qual experimentar depois!',
    person: 'Cliente exemplo 03',
    flavor: 'Pistache cremoso',
  },
];
