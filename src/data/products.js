export const products = [
  {
    id: 1,
    name: "Void Oversized Tee",
    price: 89,
    category: "T-Shirts",
    collection: "SS25",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description:
      "Premium heavyweight cotton oversized tee. 320gsm ring-spun cotton with dropped shoulders and raw hem finish. Garment dyed for a lived-in look that only improves with wear.",
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    ],
    isNew: true,
    isFeatured: true,
    tags: ["oversized", "heavyweight", "essential"],
  },
  {
    id: 2,
    name: "Fragment Cargo Pants",
    price: 195,
    category: "Bottoms",
    collection: "SS25",
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Technical ripstop cargo pants with 8 functional pockets. Adjustable waistband, articulated knees, zip-off legs. Water-resistant finish built for the urban environment.",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4d37?w=800&q=80",
    ],
    isNew: true,
    isFeatured: true,
    tags: ["cargo", "technical", "utility"],
  },
  {
    id: 3,
    name: "Shadow Hoodie",
    price: 145,
    category: "Hoodies",
    collection: "SS25",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "500gsm French terry heavyweight hoodie. Double-lined hood, kangaroo pocket with hidden zip. Brushed interior for warmth without the weight.",
    images: [
      "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&q=80",
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=800&q=80",
    ],
    isNew: false,
    isFeatured: true,
    tags: ["hoodie", "heavyweight", "winter"],
  },
  {
    id: 4,
    name: "Distortion Coach Jacket",
    price: 225,
    category: "Outerwear",
    collection: "FW24",
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Nylon coach jacket with embroidered back graphic. Snap button closure, mesh lining, ribbed cuffs and hem. Water-resistant shell for unpredictable weather.",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
    ],
    isNew: false,
    isFeatured: true,
    tags: ["jacket", "nylon", "outerwear"],
  },
  {
    id: 5,
    name: "Static Crewneck",
    price: 120,
    category: "Sweatshirts",
    collection: "SS25",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description:
      "450gsm fleece crewneck with embroidered chest logo. Ribbed collar, cuffs and hem. Oversized fit with dropped shoulders for a relaxed silhouette.",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80",
      "https://images.unsplash.com/photo-1572495532056-8583af1cbae8?w=800&q=80",
    ],
    isNew: true,
    isFeatured: false,
    tags: ["crewneck", "fleece", "logo"],
  },
  {
    id: 6,
    name: "Noise Shorts",
    price: 95,
    category: "Bottoms",
    collection: "SS25",
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Lightweight nylon shorts with elastic drawstring waist. Side zip pockets, back snap pocket. 5 inch inseam. Quick-dry fabric for all-day wear.",
    images: [
      "https://images.unsplash.com/photo-1566206091558-7f218b696731?w=800&q=80",
      "https://images.unsplash.com/photo-1617114501592-31ea20f75b80?w=800&q=80",
    ],
    isNew: false,
    isFeatured: false,
    tags: ["shorts", "nylon", "summer"],
  },
  {
    id: 7,
    name: "Glitch Long Sleeve",
    price: 99,
    category: "T-Shirts",
    collection: "FW24",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description:
      "280gsm long sleeve tee with all-over print. Relaxed fit, ribbed cuffs. Screen printed with water-based inks for a soft hand feel.",
    images: [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80",
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&q=80",
    ],
    isNew: false,
    isFeatured: false,
    tags: ["longsleeve", "printed", "graphic"],
  },
  {
    id: 8,
    name: "Pixel Bucket Hat",
    price: 65,
    category: "Accessories",
    collection: "SS25",
    sizes: ["S/M", "L/XL"],
    description:
      "6-panel bucket hat in washed canvas. Embroidered logo patch, interior sweatband. Packable and crushable — goes everywhere you do.",
    images: [
      "https://images.unsplash.com/photo-1620327467532-6ebaca239590?w=800&q=80",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
    ],
    isNew: true,
    isFeatured: false,
    tags: ["hat", "accessories", "summer"],
  },
];

export const categories = [
  {
    id: 1,
    name: "T-Shirts",
    count: 12,
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80",
  },
  {
    id: 2,
    name: "Hoodies",
    count: 8,
    image:
      "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=600&q=80",
  },
  {
    id: 3,
    name: "Bottoms",
    count: 10,
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
  },
  {
    id: 4,
    name: "Outerwear",
    count: 6,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
  },
];
