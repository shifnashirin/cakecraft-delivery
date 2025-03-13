
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
    image: "/lovable-uploads/6b400d74-42a5-4200-9522-aba08cf06d20.png",
    category: "chocolate",
    rating: 4.9,
    reviews: 142,
    featured: true,
  },
  {
    id: "classic-chocolate",
    name: "Classic Chocolate",
    description: "A timeless chocolate cake with rich frosting",
    price: 39.99,
    image: "/lovable-uploads/78f0f71d-f06a-4cdf-a3cd-cf86d33ae8f6.png",
    category: "chocolate",
    rating: 4.8,
    reviews: 128,
    featured: true,
  },
  {
    id: "red-velvet-dream",
    name: "Red Velvet Dream",
    description: "Velvety smooth cake with cream cheese frosting",
    price: 44.99,
    image: "/lovable-uploads/d2afef30-4b1a-4039-b6fe-820af5eb1d5e.png",
    category: "special",
    rating: 4.9,
    reviews: 156,
    featured: true,
  },
  {
    id: "strawberry-delight",
    name: "Strawberry Delight",
    description: "Light vanilla cake with fresh strawberry filling",
    price: 42.99,
    image: "/lovable-uploads/00e97d10-e9bd-41d6-ac8a-6344e75bb642.png",
    category: "fruit",
    rating: 4.7,
    reviews: 98,
    featured: true,
  },
  {
    id: "rainbow-surprise",
    name: "Rainbow Surprise",
    description: "Colorful layered cake with sprinkles",
    price: 49.99,
    image: "/lovable-uploads/00e97d10-e9bd-41d6-ac8a-6344e75bb642.png",
    category: "special",
    rating: 4.6,
    reviews: 87,
    specialOccasion: "birthday",
  },
  {
    id: "chocolate-fantasy",
    name: "Chocolate Fantasy",
    description: "Triple chocolate layers with ganache",
    price: 54.99,
    image: "/lovable-uploads/78f0f71d-f06a-4cdf-a3cd-cf86d33ae8f6.png",
    category: "chocolate",
    rating: 4.9,
    reviews: 112,
    specialOccasion: "birthday",
  },
];

export const specialOccasions: SpecialOccasion[] = [
  {
    id: "birthday",
    name: "Birthday Celebrations",
    description: "Make their day extra special with our custom birthday cakes",
    image: "/lovable-uploads/00e97d10-e9bd-41d6-ac8a-6344e75bb642.png",
    cakes: cakes.filter(cake => cake.specialOccasion === "birthday"),
  },
  {
    id: "wedding",
    name: "Wedding Cakes",
    description: "Elegant cakes for your special day",
    image: "/lovable-uploads/6b400d74-42a5-4200-9522-aba08cf06d20.png",
    cakes: cakes.filter(cake => cake.category === "wedding"),
  },
];
