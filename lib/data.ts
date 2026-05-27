import type { Product, Testimonial } from "./types";
import { images } from "./images";

export const products: Product[] = [
  {
    id: "eclat-noir",
    name: "Éclat Noir",
    slug: "eclat-noir",
    description:
      "A nocturnal accord of black plum, smoked oud and warm amber — drawn for evenings that linger.",
    price: 185,
    image: images.eclatNoir,
    gallery: [images.eclatNoir, images.santalDoux, images.storyStill],
    category: "Les Intenses",
    featured: false,
    notes: {
      top: ["Black Plum", "Pink Pepper"],
      heart: ["Bulgarian Rose", "Saffron"],
      base: ["Smoked Oud", "Amber"],
    },
  },
  {
    id: "velvet-bloom",
    name: "Velvet Bloom",
    slug: "velvet-bloom",
    description:
      "Powdered iris and white peony folded through cashmeran — a soft, second-skin floral.",
    price: 165,
    image: images.velvetBloom,
    gallery: [images.velvetBloom, images.storyModel, images.signature],
    category: "Fresh & Floral",
    featured: false,
    notes: {
      top: ["White Peony", "Bergamot"],
      heart: ["Iris", "Magnolia"],
      base: ["Cashmeran", "Soft Musk"],
    },
  },
  {
    id: "santal-doux",
    name: "Santal Doux",
    slug: "santal-doux",
    description:
      "A creamy, sun-warmed sandalwood softened by milky fig and a whisper of vanilla orchid.",
    price: 195,
    image: images.santalDoux,
    gallery: [images.santalDoux, images.eclatNoir, images.hero],
    category: "Woody & Warm",
    featured: true,
    notes: {
      top: ["Bergamot", "Fig Leaf"],
      heart: ["Vanilla Orchid", "Tonka"],
      base: ["Mysore Sandalwood", "White Musk"],
    },
  },
  {
    id: "lumiere-blanche",
    name: "Lumière Blanche",
    slug: "lumiere-blanche",
    description:
      "Sun-bleached linen, neroli and clean ambrette — a luminous everyday signature.",
    price: 175,
    image: images.lumiereBlanche,
    gallery: [images.lumiereBlanche, images.velvetBloom, images.signature],
    category: "Signature",
    featured: false,
    notes: {
      top: ["Neroli", "Italian Lemon"],
      heart: ["Orange Blossom", "Linen Accord"],
      base: ["Ambrette", "Cedarwood"],
    },
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Amelia R., Paris",
    quote: "The scent feels expensive before you even open the bottle.",
  },
  {
    id: "t2",
    name: "Noor H., Milan",
    quote: "Lavara wears like a quiet confidence — it stays with you all day.",
  },
  {
    id: "t3",
    name: "Iris L., Copenhagen",
    quote: "An editorial bottle and a scent that feels truly rare.",
  },
];

export const featuredProduct = products.find((p) => p.featured) ?? products[2];
