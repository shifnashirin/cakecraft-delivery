
import React from "react";
import { Link } from "react-router-dom";
import { Cake, Cookie, Heart, Leaf, Star } from "lucide-react";
import { categories } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  cake: <Cake className="w-8 h-8" />,
  cookie: <Cookie className="w-8 h-8" />,
  heart: <Heart className="w-8 h-8" />,
  leaf: <Leaf className="w-8 h-8" />,
  star: <Star className="w-8 h-8" />,
};

const CategoryList = () => {
  return (
    <section className="py-12 bg-cake-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-cake-text mb-10">
          Cake Categories
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-cake-background rounded-full mb-4 text-cake-primary">
                {iconMap[category.icon]}
              </div>
              <h3 className="text-lg font-medium text-cake-text">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
