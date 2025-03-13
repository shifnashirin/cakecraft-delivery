
export interface Cake {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  featured?: boolean;
  specialOccasion?: string;
  availableSizes?: string[];
  customizable?: boolean;
  deliveryTime?: string;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface SpecialOccasion {
  id: string;
  name: string;
  description: string;
  image: string;
  icon?: string;
  cakes: Cake[];
}

export const categories: Category[] = [
  {
    id: "chocolate",
    name: "Chocolate",
    icon: "cake",
  },
  {
    id: "fruit",
    name: "Fruit",
    icon: "cookie",
  },
  {
    id: "wedding",
    name: "Wedding",
    icon: "heart",
  },
  {
    id: "vegan",
    name: "Vegan",
    icon: "leaf",
  },
  {
    id: "special",
    name: "Special",
    icon: "star",
  },
];

export const cakes: Cake[] = [
  {
    id: "chocolate-paradise",
    name: "Chocolate Paradise",
    description: "Rich, decadent chocolate cake with premium cocoa",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&h=600",
    category: "chocolate",
    rating: 4.9,
    reviews: 142,
    featured: true,
    availableSizes: ['1kg', '2kg', '3kg'],
    customizable: true,
    deliveryTime: "24 hours",
    tags: ['bestseller', 'customizable'],
  },
  {
    id: "classic-chocolate",
    name: "Classic Chocolate",
    description: "A timeless chocolate cake with rich frosting",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1615837136711-f0cb4761b84b?auto=format&fit=crop&w=800&h=600",
    category: "chocolate",
    rating: 4.8,
    reviews: 128,
    featured: true,
    availableSizes: ['1kg', '2kg'],
    customizable: true,
    deliveryTime: "24 hours",
    tags: ['trending'],
  },
  {
    id: "red-velvet-dream",
    name: "Red Velvet Dream",
    description: "Velvety smooth cake with cream cheese frosting",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=800&h=600",
    category: "special",
    rating: 4.9,
    reviews: 156,
    featured: true,
    availableSizes: ['1kg', '1.5kg', '2kg'],
    customizable: true,
    deliveryTime: "48 hours",
    tags: ['premium'],
  },
  {
    id: "strawberry-delight",
    name: "Strawberry Delight",
    description: "Light vanilla cake with fresh strawberry filling",
    price: 42.99,
    image: "https://images.unsplash.com/photo-1635341814070-af8a1d5e0ce0?auto=format&fit=crop&w=800&h=600",
    category: "fruit",
    rating: 4.7,
    reviews: 98,
    featured: true,
    availableSizes: ['1kg', '2kg'],
    customizable: true,
    deliveryTime: "24 hours",
    tags: ['fruit-lover'],
  },
  {
    id: "rainbow-surprise",
    name: "Rainbow Surprise",
    description: "Colorful layered cake with sprinkles",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=800&h=600",
    category: "special",
    rating: 4.6,
    reviews: 87,
    specialOccasion: "birthday",
    availableSizes: ['1kg', '2kg', '3kg'],
    customizable: true,
    deliveryTime: "24 hours",
    tags: ['bestseller', 'customizable'],
  },
  {
    id: "chocolate-fantasy",
    name: "Chocolate Fantasy",
    description: "Triple chocolate layers with ganache",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1605807646983-377bc5a76493?auto=format&fit=crop&w=800&h=600",
    category: "chocolate",
    rating: 4.9,
    reviews: 112,
    specialOccasion: "birthday",
    availableSizes: ['1kg', '2kg'],
    customizable: true,
    deliveryTime: "24 hours",
    tags: ['trending'],
  },
  {
    id: "unicorn-dream",
    name: "Unicorn Dream",
    price: 64.99,
    description: "Magical rainbow-colored cake with whimsical unicorn decorations",
    image: "https://images.unsplash.com/photo-1557979619-445218f326b9?auto=format&fit=crop&w=800&h=600",
    category: "special",
    rating: 4.7,
    reviews: 56,
    specialOccasion: "birthday",
    availableSizes: ['1kg', '2kg'],
    customizable: true,
    deliveryTime: "48 hours",
    tags: ['kids-favorite'],
  },
  {
    id: "classic-white-elegance",
    name: "Classic White Elegance",
    price: 299.99,
    description: "Traditional multi-tiered white wedding cake with delicate sugar flowers",
    image: "https://images.unsplash.com/photo-1546199037-c74e1b08207a?auto=format&fit=crop&w=800&h=600",
    category: "wedding",
    rating: 5.0,
    reviews: 42,
    specialOccasion: "wedding",
    availableSizes: ['3 tier', '4 tier', '5 tier'],
    customizable: true,
    deliveryTime: "72 hours",
    tags: ['premium', 'consultation-required'],
  },
  {
    id: "rose-gold-dream",
    name: "Rose Gold Dream",
    price: 349.99,
    description: "Modern wedding cake with rose gold accents and elegant design",
    image: "https://images.unsplash.com/photo-1562777717-dc6984f65a63?auto=format&fit=crop&w=800&h=600",
    category: "wedding",
    rating: 4.9,
    reviews: 38,
    specialOccasion: "wedding",
    availableSizes: ['3 tier', '4 tier'],
    customizable: true,
    deliveryTime: "72 hours",
    tags: ['trending', 'premium'],
  },
  {
    id: "modern-minimalist",
    name: "Modern Minimalist",
    price: 279.99,
    description: "Clean, contemporary wedding cake with simple geometric designs",
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=800&h=600",
    category: "wedding",
    rating: 4.8,
    reviews: 29,
    specialOccasion: "wedding",
    availableSizes: ['2 tier', '3 tier'],
    customizable: true,
    deliveryTime: "72 hours",
    tags: ['modern'],
  },
  {
    id: "golden-memories",
    name: "Golden Memories",
    price: 79.99,
    description: "Luxurious anniversary cake with gold accents and personalized topper",
    image: "https://images.unsplash.com/photo-1594054528735-d3782132b380?auto=format&fit=crop&w=800&h=600",
    category: "special",
    rating: 4.9,
    reviews: 67,
    specialOccasion: "anniversary",
    availableSizes: ['1kg', '2kg'],
    customizable: true,
    deliveryTime: "48 hours",
    tags: ['premium', 'photo-cake-available'],
  },
  {
    id: "silver-jubilee",
    name: "Silver Jubilee",
    price: 89.99,
    description: "Elegant cake for celebrating 25 years of love with silver decorations",
    image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=800&h=600",
    category: "special",
    rating: 4.8,
    reviews: 45,
    specialOccasion: "anniversary",
    availableSizes: ['1kg', '1.5kg', '2kg'],
    customizable: true,
    deliveryTime: "48 hours",
    tags: ['bestseller'],
  },
  {
    id: "love-story-book",
    name: "Love Story Book",
    price: 94.99,
    description: "Unique book-shaped cake that tells your love story through edible images",
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d5339?auto=format&fit=crop&w=800&h=600",
    category: "special",
    rating: 4.7,
    reviews: 34,
    specialOccasion: "anniversary",
    availableSizes: ['2kg'],
    customizable: true,
    deliveryTime: "72 hours",
    tags: ['unique-design'],
  },
];

export const specialOccasions: SpecialOccasion[] = [
  {
    id: "birthday",
    name: "Birthday Celebrations",
    description: "From whimsical children's cakes to sophisticated adult designs, our birthday collection offers the perfect centerpiece for your celebration. Each cake can be customized with your choice of flavors, colors, and personal messages.",
    image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=800&h=600",
    icon: "party-popper",
    cakes: cakes.filter(cake => cake.specialOccasion === "birthday"),
  },
  {
    id: "wedding",
    name: "Wedding Cakes",
    description: "Make your special day unforgettable with our exquisite wedding cake collection. From classic tiered designs to modern masterpieces, each cake is crafted with meticulous attention to detail. Includes free consultation and tasting session.",
    image: "https://images.unsplash.com/photo-1522767131594-6b7e96848fba?auto=format&fit=crop&w=800&h=600",
    icon: "heart",
    cakes: cakes.filter(cake => cake.specialOccasion === "wedding"),
  },
  {
    id: "anniversary",
    name: "Anniversary Delights",
    description: "Celebrate your love story with our specially crafted anniversary cakes. Whether it's your first year or your golden jubilee, we have the perfect design to mark your milestone. Available with premium decorations and personalized toppers.",
    image: "https://images.unsplash.com/photo-1530648672449-81f6c723e2f1?auto=format&fit=crop&w=800&h=600",
    icon: "gift",
    cakes: cakes.filter(cake => cake.specialOccasion === "anniversary"),
  },
];
