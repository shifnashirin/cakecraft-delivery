
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
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&h=600",
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
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&h=600",
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
    image: "https://images.unsplash.com/photo-1586788680434-30d324626f4c?auto=format&fit=crop&w=800&h=600",
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
    image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=800&h=600",
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
    image: "https://images.unsplash.com/photo-1566121933407-3c7ccdd26763?auto=format&fit=crop&w=800&h=600",
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
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&h=600",
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
    image: "https://images.unsplash.com/photo-1566121933407-3c7ccdd26763?auto=format&fit=crop&w=800&h=600",
    cakes: cakes.filter(cake => cake.specialOccasion === "birthday"),
  },
  {
    id: "wedding",
    name: "Wedding Cakes",
    description: "Elegant cakes for your special day",
    image: "https://images.unsplash.com/photo-1622866306940-25d477e77c8a?auto=format&fit=crop&w=800&h=600",
    cakes: cakes.filter(cake => cake.category === "wedding"),
  },
];
