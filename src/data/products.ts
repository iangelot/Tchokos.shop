export type ProductCategory =
  | 'Chaussures'
  | 'Robes'
  | 'Vêtements'
  | 'Sacs'
  | 'Accessoires';

export type ProductGender = 'Femme' | 'Homme' | 'Enfant' | 'Unisexe';

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  subCategory: string;
  gender: ProductGender;
  price: number; // in FCFA
  originalPrice?: number; // in FCFA
  rating: number;
  reviewsCount: number;
  badge?: 'NOUVEAU' | 'POPULAIRE' | 'PROMO' | 'ÉDITION LIMITÉE';
  discountPercent?: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  image: string;
  secondaryImage?: string;
  colors: ColorSwatch[];
  sizes: string[];
  material: string;
  description: string;
  inStock: boolean;
}

export const formatCFA = (amount: number): string => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';
};

export const COLOR_FILTERS: ColorSwatch[] = [
  { name: 'Noir Onyx', hex: '#141414' },
  { name: 'Blanc Craie', hex: '#F7F6F2' },
  { name: 'Beige Sable', hex: '#D6C6B2' },
  { name: 'Marron Cognac', hex: '#7A4B2A' },
  { name: 'Vert Olive', hex: '#5D6652' },
  { name: 'Gris Anthracite', hex: '#595A5C' },
  { name: 'Bleu Nuit', hex: '#1E2D44' },
  { name: 'Rouge Carmin', hex: '#9E2A2B' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'tch-01',
    name: 'Sneakers Urbaines « Cobra Low »',
    subtitle: 'Cuir souple & semelle compensée confort',
    category: 'Chaussures',
    subCategory: 'Sneakers & Baskets',
    gender: 'Unisexe',
    price: 18500,
    originalPrice: 24000,
    rating: 4.9,
    reviewsCount: 142,
    badge: 'POPULAIRE',
    discountPercent: 23,
    isBestSeller: true,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1625860191460-10a66c7384fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    secondaryImage:
      'https://images.unsplash.com/photo-1645784127380-77aeb81be500?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    colors: [
      { name: 'Blanc Craie', hex: '#F7F6F2' },
      { name: 'Noir Onyx', hex: '#141414' },
      { name: 'Beige Sable', hex: '#D6C6B2' },
    ],
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    material: 'Cuir pleine fleur & doublure textile respirante',
    description:
      'La sneaker signature TCHOKOS. Conçue pour allier allure minimale et maintien irréprochable du matin au soir dans les rues de Douala et Yaoundé.',
    inStock: true,
  },
  {
    id: 'tch-02',
    name: 'Robe Satinée « Éclat de Bastos »',
    subtitle: 'Coupe fluide à fente latérale élégante',
    category: 'Robes',
    subCategory: 'Robes de Soirée & Midi',
    gender: 'Femme',
    price: 15000,
    originalPrice: 20000,
    rating: 4.9,
    reviewsCount: 98,
    badge: 'NOUVEAU',
    discountPercent: 25,
    isBestSeller: true,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1542892770-3e6a09c7a7da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    secondaryImage:
      'https://images.unsplash.com/photo-1562894369-193bedce28e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    colors: [
      { name: 'Rouge Carmin', hex: '#9E2A2B' },
      { name: 'Noir Onyx', hex: '#141414' },
      { name: 'Beige Sable', hex: '#D6C6B2' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    material: 'Satin de soie mélangé haut de gamme',
    description:
      'Une robe au tombé soyeux qui sublime la silhouette. Idéale pour les soirées de gala, cérémonies et dîners chics.',
    inStock: true,
  },
  {
    id: 'tch-03',
    name: 'Sac à Main Structuré « Bonapriso »',
    subtitle: 'Maroquinerie fine avec bandoulière amovible',
    category: 'Sacs',
    subCategory: 'Sacs à Main & Cabas',
    gender: 'Femme',
    price: 12500,
    originalPrice: 16500,
    rating: 4.8,
    reviewsCount: 116,
    badge: 'POPULAIRE',
    discountPercent: 24,
    isBestSeller: true,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1691480150204-66dd1eb77391?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    secondaryImage:
      'https://images.unsplash.com/photo-1682745230951-8a5aa9a474a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    colors: [
      { name: 'Marron Cognac', hex: '#7A4B2A' },
      { name: 'Blanc Craie', hex: '#F7F6F2' },
      { name: 'Noir Onyx', hex: '#141414' },
    ],
    sizes: ['Taille Unique'],
    material: 'Cuir grainé véritable & finitions dorées',
    description:
      'Un sac iconique aux lignes architecturales. Compartiments intérieurs doublés en suédine pour accueillir vos essentiels avec distinction.',
    inStock: true,
  },
  {
    id: 'tch-04',
    name: 'Surchemise Textile « Savane Oversize »',
    subtitle: 'Coupe décontractée en coton lourd',
    category: 'Vêtements',
    subCategory: 'Vestes & Surchemises',
    gender: 'Unisexe',
    price: 9500,
    rating: 4.7,
    reviewsCount: 84,
    badge: 'NOUVEAU',
    isBestSeller: false,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1602956280248-66d6efd0ba7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    secondaryImage:
      'https://images.unsplash.com/photo-1584983806622-8f73015b7ed7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    colors: [
      { name: 'Marron Cognac', hex: '#7A4B2A' },
      { name: 'Vert Olive', hex: '#5D6652' },
      { name: 'Beige Sable', hex: '#D6C6B2' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    material: '100% Coton sergé peigné',
    description:
      'Inspirée du vestiaire minimaliste contemporain, cette surchemise structurée se porte ouverte sur un t-shirt blanc ou boutonnée pour un look soigné.',
    inStock: true,
  },
  {
    id: 'tch-05',
    name: 'Sandales à Talons « Reine d’Akwa »',
    subtitle: 'Brides fines en cuir & talon stable 8 cm',
    category: 'Chaussures',
    subCategory: 'Talons & Escarpins',
    gender: 'Femme',
    price: 14000,
    originalPrice: 18000,
    rating: 4.9,
    reviewsCount: 73,
    badge: 'PROMO',
    discountPercent: 22,
    isBestSeller: true,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1630386474440-8f2e6d752a98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    secondaryImage:
      'https://images.unsplash.com/photo-1553545985-1e0d8781d5db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    colors: [
      { name: 'Marron Cognac', hex: '#7A4B2A' },
      { name: 'Noir Onyx', hex: '#141414' },
      { name: 'Blanc Craie', hex: '#F7F6F2' },
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    material: 'Cuir souple & semelle intérieure matelassée',
    description:
      'Féminité absolue et confort étudié. Ces sandales à talons subliment aussi bien une robe de soirée qu’un tailleur pantalon.',
    inStock: true,
  },
  {
    id: 'tch-06',
    name: 'Ensemble Tailleur Lin & Coton « Kribienne »',
    subtitle: 'Blazer fluide & pantalon palazzo assorti',
    category: 'Vêtements',
    subCategory: 'Ensembles & Tailleurs',
    gender: 'Femme',
    price: 25000,
    originalPrice: 32000,
    rating: 5.0,
    reviewsCount: 64,
    badge: 'ÉDITION LIMITÉE',
    discountPercent: 22,
    isBestSeller: true,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1779406166699-662a041a12a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    secondaryImage:
      'https://images.unsplash.com/photo-1779406165962-7df12de281b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    colors: [
      { name: 'Beige Sable', hex: '#D6C6B2' },
      { name: 'Blanc Craie', hex: '#F7F6F2' },
      { name: 'Noir Onyx', hex: '#141414' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    material: 'Mélange noble lin frais & coton',
    description:
      'Un ensemble deux pièces d’une élégance rare, pensé pour le climat camerounais tout en conservant une coupe couture structurée.',
    inStock: true,
  },
  {
    id: 'tch-07',
    name: 'Baskets Running « Tchokos Pulse Noir »',
    subtitle: 'Semelle contrastée blanche & maille technique',
    category: 'Chaussures',
    subCategory: 'Sneakers & Baskets',
    gender: 'Homme',
    price: 13500,
    rating: 4.8,
    reviewsCount: 109,
    badge: 'POPULAIRE',
    isBestSeller: true,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1786379582231-f4a593cacf2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    secondaryImage:
      'https://images.unsplash.com/photo-1710553455491-482fa1751dc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    colors: [
      { name: 'Noir Onyx', hex: '#141414' },
      { name: 'Rouge Carmin', hex: '#9E2A2B' },
      { name: 'Gris Anthracite', hex: '#595A5C' },
    ],
    sizes: ['39', '40', '41', '42', '43', '44', '45'],
    material: 'Mesh technique haute densité & gomme légère',
    description:
      'Légèreté, dynamisme et style affirmé. Parfaites pour un look streetwear premium ou vos déplacements quotidiens.',
    inStock: true,
  },
  {
    id: 'tch-08',
    name: 'Robe Noire Couture « Nuit d’Ébène »',
    subtitle: 'Coupe sculptante minimaliste à col carré',
    category: 'Robes',
    subCategory: 'Robes de Soirée & Midi',
    gender: 'Femme',
    price: 11000,
    rating: 4.9,
    reviewsCount: 91,
    badge: 'NOUVEAU',
    isBestSeller: false,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1562894369-193bedce28e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    secondaryImage:
      'https://images.unsplash.com/photo-1663220274232-740f07723310?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    colors: [
      { name: 'Noir Onyx', hex: '#141414' },
      { name: 'Blanc Craie', hex: '#F7F6F2' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    material: 'Crêpe couture extensible & doublure douce',
    description:
      'La petite robe noire revisitée par TCHOKOS. Une coupe nette qui met en valeur la silhouette avec une sobriété luxueuse.',
    inStock: true,
  },
  {
    id: 'tch-09',
    name: 'Hoodie Streetwear « Tchokos Prestige »',
    subtitle: 'Molleton 450g ultra-doux & coupe boxy',
    category: 'Vêtements',
    subCategory: 'Hoodies & Sweats',
    gender: 'Unisexe',
    price: 8500,
    originalPrice: 12000,
    rating: 4.8,
    reviewsCount: 128,
    badge: 'PROMO',
    discountPercent: 29,
    isBestSeller: true,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1685354217981-26c14a211bf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    secondaryImage:
      'https://images.unsplash.com/photo-1764069414641-01244b3222eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    colors: [
      { name: 'Vert Olive', hex: '#5D6652' },
      { name: 'Noir Onyx', hex: '#141414' },
      { name: 'Gris Anthracite', hex: '#595A5C' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    material: '100% Coton bio brossé 450g/m²',
    description:
      'Un hoodie à la tenue irréprochable, pensé pour les soirées fraîches de Bafoussam, Dschang ou Yaoundé et les amoureux du streetwear.',
    inStock: true,
  },
  {
    id: 'tch-10',
    name: 'Sac Bandoulière « Ivoire Studio »',
    subtitle: 'Format compact chic avec fermoir métallique',
    category: 'Sacs',
    subCategory: 'Sacs Bandoulière & Pochettes',
    gender: 'Femme',
    price: 6500,
    rating: 4.7,
    reviewsCount: 57,
    badge: 'NOUVEAU',
    isBestSeller: false,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1682745230951-8a5aa9a474a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    secondaryImage:
      'https://images.unsplash.com/photo-1559563458-527698bf5295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    colors: [
      { name: 'Blanc Craie', hex: '#F7F6F2' },
      { name: 'Gris Anthracite', hex: '#595A5C' },
      { name: 'Noir Onyx', hex: '#141414' },
    ],
    sizes: ['Taille Unique'],
    material: 'Cuir lisse végan & chaîne ajustable',
    description:
      'Le compagnon idéal de vos sorties. Son coloris blanc craie illumine instantanément toutes vos tenues.',
    inStock: true,
  },
  {
    id: 'tch-11',
    name: 'Mocassins & Derbies Cuir « Gentleman »',
    subtitle: 'Finition artisanale cousue & cuir glacé',
    category: 'Chaussures',
    subCategory: 'Mocassins & Chaussures de Ville',
    gender: 'Homme',
    price: 22000,
    originalPrice: 28000,
    rating: 4.9,
    reviewsCount: 88,
    badge: 'POPULAIRE',
    discountPercent: 21,
    isBestSeller: true,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1586897374102-2379d5f875b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    colors: [
      { name: 'Noir Onyx', hex: '#141414' },
      { name: 'Marron Cognac', hex: '#7A4B2A' },
    ],
    sizes: ['39', '40', '41', '42', '43', '44', '45'],
    material: 'Cuir de veau véritable & semelle cuir/gomme',
    description:
      'L’excellence du soulier masculin. Pour le bureau, les mariages ou les grandes occasions avec un costume ou un pantalon habillé.',
    inStock: true,
  },
  {
    id: 'tch-12',
    name: 'Robe Blanche Fluide « Lumière du Sud »',
    subtitle: 'Manches longues vaporeuses & coupe midi',
    category: 'Robes',
    subCategory: 'Robes de Jour & Cocktail',
    gender: 'Femme',
    price: 10000,
    rating: 4.8,
    reviewsCount: 62,
    badge: 'NOUVEAU',
    isBestSeller: false,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1625503336205-fba8025fa0f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    secondaryImage:
      'https://images.unsplash.com/photo-1659522761084-79196b64abe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    colors: [
      { name: 'Blanc Craie', hex: '#F7F6F2' },
      { name: 'Beige Sable', hex: '#D6C6B2' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    material: 'Voile de coton brodé & doublure légère',
    description:
      'Une fraîcheur incomparable et un mouvement gracieux à chaque pas. Parfaite pour les brunchs, cérémonies civiles et journées ensoleillées.',
    inStock: true,
  },
  {
    id: 'tch-13',
    name: 'Sac Cabas Cuir « Héritage Bleu & Noir »',
    subtitle: 'Grand volume élégant pour le quotidien',
    category: 'Sacs',
    subCategory: 'Sacs à Main & Cabas',
    gender: 'Femme',
    price: 16000,
    originalPrice: 21000,
    rating: 4.9,
    reviewsCount: 79,
    badge: 'PROMO',
    discountPercent: 24,
    isBestSeller: true,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    colors: [
      { name: 'Bleu Nuit', hex: '#1E2D44' },
      { name: 'Noir Onyx', hex: '#141414' },
      { name: 'Marron Cognac', hex: '#7A4B2A' },
    ],
    sizes: ['Taille Unique'],
    material: 'Cuir pleine fleur texturé',
    description:
      'Un cabas bicolore sophistiqué qui accueille documents, tablette et effets personnels avec une allure couture.',
    inStock: true,
  },
  {
    id: 'tch-14',
    name: 'Bonnet & Chaussettes Coton « Studio Noir »',
    subtitle: 'Accessoires textiles doux & respirants',
    category: 'Accessoires',
    subCategory: 'Bonnets, Écharpes & Textile',
    gender: 'Unisexe',
    price: 1500,
    rating: 4.7,
    reviewsCount: 51,
    badge: 'NOUVEAU',
    isBestSeller: false,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1584983806622-8f73015b7ed7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    colors: [
      { name: 'Noir Onyx', hex: '#141414' },
      { name: 'Beige Sable', hex: '#D6C6B2' },
      { name: 'Gris Anthracite', hex: '#595A5C' },
    ],
    sizes: ['Taille Unique'],
    material: 'Maille côtelée 100% coton peigné',
    description:
      'La touche finale accessible à tous les budgets. Accessoire textile doux, respirant et intemporel.',
    inStock: true,
  },
  {
    id: 'tch-15',
    name: 'Escarpins Bijoux « Gala Impérial »',
    subtitle: 'Finitions cristaux & bride cheville satinée',
    category: 'Chaussures',
    subCategory: 'Talons & Escarpins',
    gender: 'Femme',
    price: 19500,
    originalPrice: 25000,
    rating: 5.0,
    reviewsCount: 67,
    badge: 'ÉDITION LIMITÉE',
    discountPercent: 22,
    isBestSeller: true,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1780337092899-cdc365082127?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    colors: [
      { name: 'Noir Onyx', hex: '#141414' },
      { name: 'Blanc Craie', hex: '#F7F6F2' },
    ],
    sizes: ['36', '37', '38', '39', '40', '41'],
    material: 'Satin duchesse & ornements cristaux',
    description:
      'Créés pour briller lors des mariages et grandes réceptions. Une cambrure étudiée pour danser toute la nuit.',
    inStock: true,
  },
  {
    id: 'tch-16',
    name: 'T-Shirt & Top Coton « Essentiel Tchokos »',
    subtitle: 'Coton frais coupe moderne pour tous les jours',
    category: 'Vêtements',
    subCategory: 'T-Shirts & Hauts',
    gender: 'Unisexe',
    price: 2500,
    originalPrice: 3500,
    rating: 4.8,
    reviewsCount: 74,
    badge: 'POPULAIRE',
    discountPercent: 28,
    isBestSeller: true,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1586447853141-5d62abeb77af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    colors: [
      { name: 'Noir Onyx', hex: '#141414' },
      { name: 'Blanc Craie', hex: '#F7F6F2' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    material: '100% Coton léger haute tenue',
    description:
      'Un basique incontournable à petit prix. Agréable à porter seul ou sous une veste.',
    inStock: true,
  },
  {
    id: 'tch-17',
    name: 'Robe & Tenue Enfant « Petite Princesse »',
    subtitle: 'Coton doux & coupe cérémonie confort pour enfant',
    category: 'Robes',
    subCategory: 'Mode Enfant',
    gender: 'Enfant',
    price: 5000,
    originalPrice: 6500,
    rating: 4.9,
    reviewsCount: 83,
    badge: 'NOUVEAU',
    discountPercent: 23,
    isBestSeller: true,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1724365309223-89899d9e9845?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    colors: [
      { name: 'Blanc Craie', hex: '#F7F6F2' },
      { name: 'Beige Sable', hex: '#D6C6B2' },
      { name: 'Rouge Carmin', hex: '#9E2A2B' },
    ],
    sizes: ['4 ans', '6 ans', '8 ans', '10 ans', '12 ans'],
    material: 'Coton doux hypoallergénique',
    description:
      'Une tenue élégante et confortable pour les enfants, idéale pour les fêtes de famille, sorties et anniversaires.',
    inStock: true,
  },
  {
    id: 'tch-18',
    name: 'Baskets Enfant « Junior Sprint »',
    subtitle: 'Semelle souple antidérapante & fermeture facile',
    category: 'Chaussures',
    subCategory: 'Chaussures Enfant',
    gender: 'Enfant',
    price: 4500,
    originalPrice: 6000,
    rating: 4.8,
    reviewsCount: 92,
    badge: 'POPULAIRE',
    discountPercent: 25,
    isBestSeller: true,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1728724794795-681832a6afd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    colors: [
      { name: 'Bleu Nuit', hex: '#1E2D44' },
      { name: 'Blanc Craie', hex: '#F7F6F2' },
      { name: 'Noir Onyx', hex: '#141414' },
    ],
    sizes: ['28', '30', '32', '34', '36'],
    material: 'Textile respirant & gomme souple',
    description:
      'Des chaussures solides, légères et stylées pour accompagner les enfants à l’école comme en week-end.',
    inStock: true,
  },
  {
    id: 'tch-19',
    name: 'Ensemble Enfant « Duo Tchokos Kids »',
    subtitle: 'T-shirt coton & pantalon souple assorti',
    category: 'Vêtements',
    subCategory: 'Mode Enfant',
    gender: 'Enfant',
    price: 3500,
    rating: 4.9,
    reviewsCount: 68,
    badge: 'PROMO',
    isBestSeller: false,
    isNew: true,
    image:
      'https://images.unsplash.com/photo-1611428813653-aa606c998586?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    colors: [
      { name: 'Blanc Craie', hex: '#F7F6F2' },
      { name: 'Noir Onyx', hex: '#141414' },
      { name: 'Vert Olive', hex: '#5D6652' },
    ],
    sizes: ['4 ans', '6 ans', '8 ans', '10 ans', '12 ans'],
    material: '100% Coton doux lavable en machine',
    description:
      'Ensemble textile complet pour enfant, pensé pour résister aux jeux tout en offrant un style impeccable.',
    inStock: true,
  },
  {
    id: 'tch-20',
    name: 'Foulard & Bandeau Textile « Mini Prix »',
    subtitle: 'Accessoire de coiffure et cou en tissu soyeux',
    category: 'Accessoires',
    subCategory: 'Foulards & Petits Prix',
    gender: 'Unisexe',
    price: 1000,
    originalPrice: 1500,
    rating: 4.8,
    reviewsCount: 154,
    badge: 'PROMO',
    discountPercent: 33,
    isBestSeller: true,
    isNew: false,
    image:
      'https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    colors: [
      { name: 'Rouge Carmin', hex: '#9E2A2B' },
      { name: 'Beige Sable', hex: '#D6C6B2' },
      { name: 'Noir Onyx', hex: '#141414' },
    ],
    sizes: ['Taille Unique'],
    material: 'Satin textile léger',
    description:
      'Accessible dès 1 000 FCFA ! Parfait pour sublimer une coiffure, un sac à main ou offrir un cadeau chic à petit prix.',
    inStock: true,
  },
];

export const CAMEROON_CITIES = [
  {
    city: 'Douala',
    zones: ['Akwa', 'Bonapriso', 'Bonanjo', 'Bonamoussadi', 'Makepe', 'Logpom', 'Bepanda', 'Yassa'],
    deliveryFee: 1000,
    eta: 'Livraison Express 2h à 24h',
  },
  {
    city: 'Yaoundé',
    zones: ['Bastos', 'Centre-Ville / Kennedy', 'Omnisports', 'Essos', 'Biyem-Assi', 'Odza', 'Mvan', 'Nkolbisson'],
    deliveryFee: 1000,
    eta: 'Livraison Express 4h à 24h',
  },
  {
    city: 'Bafoussam',
    zones: ['Centre Commercial', 'Tamdja', 'Djeleng', 'Kamkop'],
    deliveryFee: 2000,
    eta: 'Expédition 24h à 48h',
  },
  {
    city: 'Kribi',
    zones: ['Centre-Ville', 'Mpangou', 'Dombe'],
    deliveryFee: 2000,
    eta: 'Expédition 24h à 48h',
  },
  {
    city: 'Garoua & Nord',
    zones: ['Plateau', 'Marouaré', 'Expédition Agence VIP'],
    deliveryFee: 3000,
    eta: 'Expédition 48h à 72h',
  },
];
