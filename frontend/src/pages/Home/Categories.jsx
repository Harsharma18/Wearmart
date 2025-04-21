import React from "react";
import { Link } from "react-router-dom";
import category1 from "../../assets/accessory.jpeg";
import category2 from "../../assets/clothing.jpg";
import category3 from "../../assets/sports.jpg";
import category4 from "../../assets/groming.jpg";
import category5 from "../../assets/festivefit.jpg";
import category6 from "../../assets/footwear.jpg";

function Categories() {
  const categories = [
    { name: "Accessories", path: "accessories", image: category1 },
    { name: "Clothing", path: "clothing", image: category2 },
    { name: "Sports", path: "sports", image: category3 },
    { name: "Grooming ", path: "grooming", image: category4 },
    { name: "Festive Fit", path: "festivfit", image: category5 },
    { name: "Footwear", path: "footwear", image: category6 },
  ];

  return (
    <div className="container mx-auto px-3 py-2">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Shop by Categories
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map((item, index) => (
          <Link
            key={index}
            to={`/categories/${item.path}`}
            className="group flex flex-col items-center"
          >
            <div className="w-24 h-24 md:w-24 md:h-24 bg-gray-100 rounded-full overflow-hidden shadow-md transition-all duration-300 transform group-hover:scale-105">
              <img
                className="w-full h-full object-cover"
                src={item.image}
                alt={item.name}
              />
            </div>
            <h4 className="mt-3 text-lg font-semibold text-gray-700 group-hover:text-gray-900 transition-all">
              {item.name}
            </h4>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;
