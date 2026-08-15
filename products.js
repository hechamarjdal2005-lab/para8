/* ============================================
   PRODUCTS DATA — Para Errahali
   Easy to update: just edit this array
   ============================================ */

const PRODUCTS = [
  // ── Skincare ──
  {
    id: 1,
    name: "Crème Hydratante Visage",
    price: 189,
    category: "skincare",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop",
    badge: "Bestseller"
  },
  {
    id: 2,
    name: "Sérum Vitamine C Éclat",
    price: 249,
    category: "skincare",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
    badge: "New"
  },
  {
    id: 3,
    name: "Nettoyant Doux Micellaire",
    price: 99,
    category: "skincare",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
    badge: ""
  },
  {
    id: 4,
    name: "Crème Solaire SPF50+",
    price: 159,
    category: "skincare",
    image: "https://images.unsplash.com/photo-1532947974-2e5301be1c53?w=400&h=400&fit=crop",
    badge: ""
  },

  // ── Natural Cosmetics ──
  {
    id: 5,
    name: "Huile d'Argan Pure BIO",
    price: 179,
    category: "natural",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
    badge: "Popular"
  },
  {
    id: 6,
    name: "Masque Argile Verte",
    price: 129,
    category: "natural",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop",
    badge: ""
  },
  {
    id: 7,
    name: "Savon Noir Beldi Authentique",
    price: 69,
    category: "natural",
    image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400&h=400&fit=crop",
    badge: ""
  },
  {
    id: 8,
    name: "Eau de Rose Distillée",
    price: 89,
    category: "natural",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=400&fit=crop",
    badge: ""
  },

  // ── Medical & Paramedical ──
  {
    id: 9,
    name: "Bandeau Tensiomètre Digital",
    price: 299,
    category: "medical",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=400&fit=crop",
    badge: "Essential"
  },
  {
    id: 10,
    name: "Thermomètre Infrarouge",
    price: 199,
    category: "medical",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop",
    badge: ""
  },
  {
    id: 11,
 name: "Pansements Stériles Assortis",
    price: 49,
    category: "medical",
    image: "https://images.unsplash.com/photo-1583946099379-f9c29442045b?w=400&h=400&fit=crop",
    badge: ""
  },
  {
    id: 12,
    name: "Vitamines D3 + K2",
    price: 149,
    category: "medical",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    badge: ""
  },

  // ── Baby Care ──
  {
    id: 13,
    name: "Lait Hydroalcoolique Bébé",
    price: 79,
    category: "baby",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
    badge: ""
  },
  {
    id: 14,
    name: "Crème Changement Couche",
    price: 109,
    category: "baby",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop",
    badge: ""
  },
  {
    id: 15,
    name: "Shampooing Doux Bébé BIO",
    price: 89,
    category: "baby",
    image: "https://images.unsplash.com/photo-1556228842-a3d487f2860e?w=400&h=400&fit=crop",
    badge: ""
  },

  // ── Wellness ──
  {
    id: 16,
    name: "Huile Essentielle Lavande",
    price: 119,
    category: "wellness",
    image: "https://images.unsplash.com/photo-1547793548-9e6d2f57b8b5?w=400&h=400&fit=crop",
    badge: "Popular"
  },
  {
    id: 17,
    name: "Complément Magnésium B6",
    price: 139,
    category: "wellness",
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&h=400&fit=crop",
    badge: ""
  },
  {
    id: 18,
    name: "Tisane Bien-Être Bio",
    price: 59,
    category: "wellness",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop",
    badge: ""
  },
  {
    id: 19,
    name: "Miel de Thym Pur",
    price: 149,
    category: "wellness",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop",
    badge: ""
  },
  {
    id: 20,
    name: "Gel Douche Aromathérapie",
    price: 99,
    category: "wellness",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4ee4037?w=400&h=400&fit=crop",
    badge: ""
  }
];

const CATEGORIES = [
  { id: "all", label: "All Products", icon: "🌿" },
  { id: "skincare", label: "Skincare", icon: "✨" },
  { id: "natural", label: "Natural Cosmetics", icon: "🍃" },
  { id: "medical", label: "Medical & Paramedical", icon: "🏥" },
  { id: "baby", label: "Baby Care", icon: "👶" },
  { id: "wellness", label: "Wellness", icon: "💪" }
];
