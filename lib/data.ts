export type Badge = "Fresh" | "Organic" | "Best Seller" | "Sale";

export interface Category {
  slug: string;
  name: string;
  tagline: string;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string; // category slug
  price: number;
  oldPrice?: number;
  unit: string;
  rating: number;
  reviews: number;
  image: string;
  badge?: Badge;
  description: string;
  stock: number;
  deal?: boolean;
}

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;

export const BRAND = {
  name: "TazaMart",
  tagline: "Fresh Food, Happy Life",
  phone: "+92 21 3456 7890",
  email: "support@tazamart.pk",
  address: "Karachi, Pakistan",
  city: "Karachi, Pakistan",
  freeDeliveryThreshold: 2000,
  deliveryFee: 150,
};

export const categories: Category[] = [
  {
    slug: "fruits-vegetables",
    name: "Fruits & Vegetables",
    tagline: "Farm-fresh produce, picked daily",
    image: u("1610832958506-aa56368176cf"),
  },
  {
    slug: "dairy-eggs",
    name: "Dairy & Eggs",
    tagline: "Chilled dairy & farm eggs every morning",
    image: u("1550583724-b2692b85b150"),
  },
  {
    slug: "bakery-bread",
    name: "Bakery & Bread",
    tagline: "Baked fresh daily by our artisans",
    image: u("1509440159596-0249088772ff"),
  },
  {
    slug: "meat-seafood",
    name: "Meat & Seafood",
    tagline: "Premium cuts, hygienically packed",
    image: u("1558030006-450675393462"),
  },
  {
    slug: "pantry-staples",
    name: "Pantry Staples",
    tagline: "Everyday essentials for your kitchen",
    image: u("1586201375761-83865001e31c"),
  },
  {
    slug: "snacks-beverages",
    name: "Snacks & Beverages",
    tagline: "Munchies, sips & sweet treats",
    image: u("1554866585-cd94860890b7"),
  },
  {
    slug: "household",
    name: "Household",
    tagline: "Everything for a sparkling home",
    image: u("1563453392212-326f5e854473"),
  },
  {
    slug: "personal-care",
    name: "Personal Care",
    tagline: "Gentle care for you & your family",
    image: u("1556228720-195a672e8a03"),
  },
];

export const products: Product[] = [
  // ─── Fruits & Vegetables ───
  {
    id: "p01",
    slug: "fresh-bananas",
    name: "Fresh Bananas",
    category: "fruits-vegetables",
    price: 180,
    oldPrice: 220,
    unit: "1 dozen",
    rating: 4.8,
    reviews: 124,
    image: u("1571771894821-ce9b6c11b08e"),
    badge: "Fresh",
    description:
      "Sweet, ripe bananas delivered fresh every morning from local Sindh farms. Perfect for breakfast, smoothies and kids' lunchboxes.",
    stock: 120,
  },
  {
    id: "p02",
    slug: "red-apples",
    name: "Red Apples",
    category: "fruits-vegetables",
    price: 350,
    oldPrice: 420,
    unit: "1 kg",
    rating: 4.9,
    reviews: 210,
    image: u("1560806887-1e4cd0b6cbd6"),
    badge: "Best Seller",
    description:
      "Crisp, juicy red apples hand-picked at peak ripeness. A crunchy, naturally sweet snack the whole family will love.",
    stock: 85,
  },
  {
    id: "p03",
    slug: "fresh-tomatoes",
    name: "Fresh Tomatoes",
    category: "fruits-vegetables",
    price: 160,
    oldPrice: 200,
    unit: "1 kg",
    rating: 4.7,
    reviews: 98,
    image: u("1592924357228-91a4daadcfea"),
    badge: "Sale",
    description:
      "Vine-ripened tomatoes with rich colour and real desi flavour. Ideal for curries, salads and chutneys.",
    stock: 200,
    deal: true,
  },
  {
    id: "p04",
    slug: "avocado",
    name: "Avocado",
    category: "fruits-vegetables",
    price: 850,
    oldPrice: 1050,
    unit: "4 pcs",
    rating: 4.6,
    reviews: 76,
    image: u("1523049673857-eb18f1d7b578"),
    badge: "Sale",
    description:
      "Creamy, buttery avocados selected at just the right ripeness. Great for toast, salads and healthy fats.",
    stock: 40,
    deal: true,
  },
  {
    id: "p05",
    slug: "organic-spinach",
    name: "Organic Spinach",
    category: "fruits-vegetables",
    price: 120,
    oldPrice: 150,
    unit: "500 g",
    rating: 4.8,
    reviews: 64,
    image: u("1576045057995-568f588f82fb"),
    badge: "Organic",
    description:
      "Tender organic spinach leaves grown without pesticides. Packed with iron — perfect for palak paneer and saag.",
    stock: 90,
  },
  {
    id: "p06",
    slug: "pineapple",
    name: "Pineapple",
    category: "fruits-vegetables",
    price: 450,
    unit: "1 pc",
    rating: 4.7,
    reviews: 52,
    image: u("1550258987-190a2d41a8ba"),
    badge: "Fresh",
    description:
      "Golden, honey-sweet pineapple with juicy flesh. Cut fresh on order so it arrives chilled and ready to enjoy.",
    stock: 35,
  },
  {
    id: "p07",
    slug: "strawberries",
    name: "Strawberries",
    category: "fruits-vegetables",
    price: 550,
    oldPrice: 650,
    unit: "250 g",
    rating: 4.9,
    reviews: 88,
    image: u("1464965911861-746a04b4bca6"),
    badge: "Fresh",
    description:
      "Plump, fragrant strawberries picked at dawn from Swat valley farms. Sweet enough to eat straight from the box.",
    stock: 60,
  },
  {
    id: "p08",
    slug: "green-grapes",
    name: "Green Grapes",
    category: "fruits-vegetables",
    price: 480,
    oldPrice: 560,
    unit: "1 kg",
    rating: 4.8,
    reviews: 71,
    image: u("1537640538966-79f369143f8f"),
    badge: "Organic",
    description:
      "Seedless green grapes — crisp, refreshing and naturally sweet. A lunchbox favourite and great for fruit chaat.",
    stock: 70,
  },
  {
    id: "p09",
    slug: "kinnow-oranges",
    name: "Kinnow Oranges",
    category: "fruits-vegetables",
    price: 220,
    oldPrice: 260,
    unit: "1 kg",
    rating: 4.7,
    reviews: 143,
    image: u("1547514701-42782101795e"),
    badge: "Fresh",
    description:
      "Pakistan's beloved kinnow — juicy, tangy and loaded with vitamin C. Winter's favourite citrus, sourced from Sargodha.",
    stock: 150,
  },
  {
    id: "p10",
    slug: "ripe-mangoes",
    name: "Ripe Mangoes",
    category: "fruits-vegetables",
    price: 380,
    oldPrice: 450,
    unit: "1 kg",
    rating: 4.9,
    reviews: 187,
    image: u("1553279768-865429fa0078"),
    badge: "Best Seller",
    description:
      "The king of fruits — fragrant, fibreless and meltingly sweet. Our most loved seasonal pick, while stocks last.",
    stock: 100,
  },
  // ─── Dairy & Eggs ───
  {
    id: "p11",
    slug: "fresh-milk",
    name: "Fresh Milk",
    category: "dairy-eggs",
    price: 220,
    oldPrice: 250,
    unit: "1 litre",
    rating: 4.8,
    reviews: 230,
    image: u("1550583724-b2692b85b150"),
    badge: "Fresh",
    description:
      "Farm-fresh pasteurised milk, chilled within hours of milking. Rich, creamy and perfect for chai and doodh pati.",
    stock: 300,
  },
  {
    id: "p12",
    slug: "greek-yogurt",
    name: "Greek Yogurt",
    category: "dairy-eggs",
    price: 350,
    oldPrice: 400,
    unit: "500 g",
    rating: 4.7,
    reviews: 96,
    image: u("1488477181946-6428a0291777"),
    badge: "Fresh",
    description:
      "Thick, creamy Greek-style yogurt with double the protein. Ideal for breakfast bowls, raita and smoothies.",
    stock: 110,
  },
  {
    id: "p13",
    slug: "organic-eggs",
    name: "Organic Eggs",
    category: "dairy-eggs",
    price: 420,
    oldPrice: 480,
    unit: "12 pcs",
    rating: 4.8,
    reviews: 154,
    image: u("1582722872445-44dc5f7e3c8f"),
    badge: "Organic",
    description:
      "Free-range organic eggs from happy hens. Deep golden yolks and firm whites — taste the difference.",
    stock: 140,
  },
  {
    id: "p14",
    slug: "cheese-slices",
    name: "Cheese Slices",
    category: "dairy-eggs",
    price: 550,
    oldPrice: 650,
    unit: "200 g",
    rating: 4.6,
    reviews: 83,
    image: u("1486297678162-eb2a19b0a32d"),
    badge: "Sale",
    description:
      "Smooth, melty cheese slices for sandwiches, burgers and parathas. A fridge essential for quick meals.",
    stock: 95,
    deal: true,
  },
  {
    id: "p15",
    slug: "chocolate-milk",
    name: "Chocolate Milk",
    category: "dairy-eggs",
    price: 260,
    unit: "1 litre",
    rating: 4.5,
    reviews: 47,
    image: u("1563636619-e9143da7973b"),
    badge: "Fresh",
    description:
      "Rich chocolate milk made with real cocoa. A treat kids ask for by name — chilled and ready to pour.",
    stock: 80,
  },
  // ─── Bakery & Bread ───
  {
    id: "p16",
    slug: "brown-bread",
    name: "Brown Bread",
    category: "bakery-bread",
    price: 180,
    oldPrice: 220,
    unit: "400 g",
    rating: 4.7,
    reviews: 112,
    image: u("1509440159596-0249088772ff"),
    badge: "Fresh",
    description:
      "Soft whole-wheat brown bread baked fresh daily. Wholesome slices for toast, sandwiches and breakfast.",
    stock: 130,
  },
  {
    id: "p17",
    slug: "chocolate-fudge-cake",
    name: "Chocolate Fudge Cake",
    category: "bakery-bread",
    price: 950,
    oldPrice: 1100,
    unit: "500 g",
    rating: 4.9,
    reviews: 201,
    image: u("1578985545062-69928b1d9587"),
    badge: "Best Seller",
    description:
      "Decadent chocolate fudge cake with a rich, gooey centre. Baked fresh — for birthdays, dawats, or just because.",
    stock: 25,
  },
  {
    id: "p18",
    slug: "butter-croissants",
    name: "Butter Croissants",
    category: "bakery-bread",
    price: 420,
    oldPrice: 480,
    unit: "4 pcs",
    rating: 4.8,
    reviews: 77,
    image: u("1530610476181-d83430b64dcd"),
    badge: "Fresh",
    description:
      "Flaky, golden croissants made with real butter. Warm them up for a café-style breakfast at home.",
    stock: 45,
  },
  {
    id: "p19",
    slug: "artisan-sourdough",
    name: "Artisan Sourdough",
    category: "bakery-bread",
    price: 520,
    unit: "600 g",
    rating: 4.7,
    reviews: 59,
    image: u("1608198093002-ad4e005484ec"),
    badge: "Fresh",
    description:
      "Slow-fermented sourdough with a crisp crust and tangy crumb. Baked in small batches by our artisan bakers.",
    stock: 30,
  },
  // ─── Meat & Seafood ───
  {
    id: "p20",
    slug: "chicken-breast",
    name: "Chicken Breast",
    category: "meat-seafood",
    price: 650,
    oldPrice: 720,
    unit: "1 kg",
    rating: 4.8,
    reviews: 176,
    image: u("1587593810167-a84920ea0781"),
    badge: "Fresh",
    description:
      "Lean, tender chicken breast — cleaned, trimmed and packed hygienically. The protein staple every kitchen needs.",
    stock: 75,
  },
  {
    id: "p21",
    slug: "premium-beef-steak",
    name: "Premium Beef Steak",
    category: "meat-seafood",
    price: 1850,
    oldPrice: 2100,
    unit: "1 kg",
    rating: 4.9,
    reviews: 94,
    image: u("1558030006-450675393462"),
    badge: "Best Seller",
    description:
      "Premium grain-fed beef cuts, aged for tenderness. Restaurant-quality steaks, delivered to your door.",
    stock: 20,
  },
  {
    id: "p22",
    slug: "fresh-salmon",
    name: "Fresh Salmon",
    category: "meat-seafood",
    price: 1450,
    oldPrice: 1650,
    unit: "500 g",
    rating: 4.7,
    reviews: 68,
    image: u("1467003909585-2f8a72700288"),
    badge: "Sale",
    description:
      "Fresh salmon fillets, rich in omega-3. Chilled and packed on ice for peak freshness, from boat to doorstep.",
    stock: 18,
    deal: true,
  },
  // ─── Pantry Staples ───
  {
    id: "p23",
    slug: "basmati-rice",
    name: "Basmati Rice",
    category: "pantry-staples",
    price: 1650,
    oldPrice: 1850,
    unit: "5 kg",
    rating: 4.9,
    reviews: 312,
    image: u("1586201375761-83865001e31c"),
    badge: "Best Seller",
    description:
      "Extra-long grain basmati with that unmistakable aroma. Aged for two years — biryani deserves nothing less.",
    stock: 160,
  },
  {
    id: "p24",
    slug: "olive-oil",
    name: "Extra Virgin Olive Oil",
    category: "pantry-staples",
    price: 1250,
    oldPrice: 1400,
    unit: "500 ml",
    rating: 4.8,
    reviews: 121,
    image: u("1474979266404-7eaacbcd87c5"),
    badge: "Organic",
    description:
      "Cold-pressed extra virgin olive oil with a peppery finish. For salads, drizzling and healthy cooking.",
    stock: 55,
  },
  {
    id: "p25",
    slug: "pure-honey",
    name: "Pure Honey",
    category: "pantry-staples",
    price: 950,
    oldPrice: 1100,
    unit: "500 g",
    rating: 4.9,
    reviews: 143,
    image: u("1587049352846-4a222e784d38"),
    badge: "Organic",
    description:
      "Raw, unfiltered honey from northern apiaries. Thick, floral and naturally sweet — no additives, ever.",
    stock: 70,
  },
  // ─── Snacks & Beverages ───
  {
    id: "p26",
    slug: "dark-chocolate",
    name: "Dark Chocolate",
    category: "snacks-beverages",
    price: 450,
    oldPrice: 520,
    unit: "100 g",
    rating: 4.8,
    reviews: 167,
    image: u("1511381939415-e44015466834"),
    badge: "Best Seller",
    description:
      "Intense 70% dark chocolate with deep cocoa notes. A little square of happiness — and antioxidants.",
    stock: 120,
  },
  {
    id: "p27",
    slug: "potato-chips",
    name: "Potato Chips",
    category: "snacks-beverages",
    price: 180,
    oldPrice: 220,
    unit: "150 g",
    rating: 4.5,
    reviews: 89,
    image: u("1566478989037-eec170784d0b"),
    badge: "Sale",
    description:
      "Crispy, golden potato chips with the perfect salt hit. Movie nights and chai time just got better.",
    stock: 200,
  },
  {
    id: "p28",
    slug: "butter-cookies",
    name: "Butter Cookies",
    category: "snacks-beverages",
    price: 320,
    oldPrice: 380,
    unit: "300 g",
    rating: 4.6,
    reviews: 73,
    image: u("1599490659213-e2b9527bd087"),
    badge: "Fresh",
    description:
      "Buttery, melt-in-mouth cookies baked fresh. The classic dunking partner for your evening chai.",
    stock: 90,
  },
  {
    id: "p29",
    slug: "green-tea",
    name: "Green Tea",
    category: "snacks-beverages",
    price: 650,
    oldPrice: 750,
    unit: "100 g",
    rating: 4.7,
    reviews: 92,
    image: u("1544787219-7f47ccb76574"),
    badge: "Organic",
    description:
      "Premium organic green tea leaves with a clean, grassy flavour. Your daily ritual for calm and focus.",
    stock: 85,
  },
  {
    id: "p30",
    slug: "orange-juice",
    name: "Fresh Orange Juice",
    category: "snacks-beverages",
    price: 380,
    oldPrice: 450,
    unit: "1 litre",
    rating: 4.8,
    reviews: 118,
    image: u("1554866585-cd94860890b7"),
    badge: "Fresh",
    description:
      "Squeezed fresh every morning from ripe kinnows. No added sugar, no preservatives — just pure juice.",
    stock: 60,
  },
  {
    id: "p31",
    slug: "trail-mix",
    name: "Trail Mix Nuts",
    category: "snacks-beverages",
    price: 550,
    oldPrice: 650,
    unit: "200 g",
    rating: 4.7,
    reviews: 66,
    image: u("1621939514649-280e2ee25f60"),
    badge: "Organic",
    description:
      "A crunchy mix of almonds, cashews, raisins and seeds. The smart snack for work desks and gym bags.",
    stock: 75,
  },
  {
    id: "p32",
    slug: "chocolate-mousse",
    name: "Chocolate Mousse",
    category: "snacks-beverages",
    price: 480,
    unit: "2 pcs",
    rating: 4.6,
    reviews: 54,
    image: u("1558961363-fa8fdf82db35"),
    badge: "Fresh",
    description:
      "Silky, airy chocolate mousse cups made fresh daily. A little luxury to end the day with.",
    stock: 40,
  },
  // ─── Household ───
  {
    id: "p33",
    slug: "cleaning-kit",
    name: "Home Cleaning Kit",
    category: "household",
    price: 850,
    oldPrice: 1000,
    unit: "pack of 5",
    rating: 4.6,
    reviews: 81,
    image: u("1563453392212-326f5e854473"),
    badge: "Sale",
    description:
      "A complete 5-piece cleaning kit for a sparkling home — multi-surface spray, floor cleaner and more.",
    stock: 65,
  },
  {
    id: "p34",
    slug: "detergent-pods",
    name: "Laundry Detergent Pods",
    category: "household",
    price: 1150,
    oldPrice: 1300,
    unit: "30 pcs",
    rating: 4.7,
    reviews: 69,
    image: u("1610557892470-55d9e80c0bce"),
    badge: "Fresh",
    description:
      "Pre-measured detergent pods that dissolve completely. Tough on stains, gentle on fabrics — one pod per load.",
    stock: 80,
  },
  // ─── Personal Care ───
  {
    id: "p35",
    slug: "herbal-soap",
    name: "Herbal Soap Bar",
    category: "personal-care",
    price: 240,
    oldPrice: 300,
    unit: "125 g",
    rating: 4.7,
    reviews: 58,
    image: u("1600857544200-b2f666a9a2ec"),
    badge: "Organic",
    description:
      "Handmade herbal soap with neem and aloe vera. Gentle cleansing with a fresh, natural fragrance.",
    stock: 110,
  },
  {
    id: "p36",
    slug: "argan-shampoo",
    name: "Argan Shampoo",
    category: "personal-care",
    price: 780,
    oldPrice: 900,
    unit: "400 ml",
    rating: 4.6,
    reviews: 74,
    image: u("1535585209827-a15fcdbc4c2d"),
    badge: "Fresh",
    description:
      "Nourishing argan oil shampoo for soft, shiny hair. Sulphate-free formula, safe for daily use.",
    stock: 70,
  },
];

// ─── Helpers ───

export function formatRs(n: number): string {
  return `Rs ${Math.round(n).toLocaleString("en-PK")}`;
}

export function discountPercent(p: Product): number | null {
  if (!p.oldPrice || p.oldPrice <= p.price) return null;
  return Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug);
}

export const deals: Product[] = products.filter((p) => p.deal);

export function searchProducts(q: string): Product[] {
  const query = q.trim().toLowerCase();
  if (!query) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      getCategory(p.category)?.name.toLowerCase().includes(query)
  );
}
