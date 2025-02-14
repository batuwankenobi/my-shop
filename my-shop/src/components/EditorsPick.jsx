import React from "react";
import { useHistory } from "react-router-dom";

const editorsPickCategories = [
  { category: "Men", image: "men-image.jpg" },
  { category: "Women", image: "women-image.jpg" },
  { category: "Accessories", image: "accessories-image.jpg" },
  { category: "Kids", image: "kids-image.jpg" },
];

const EditorsPick = () => {
  const history = useHistory();

  const handleCategoryClick = () => {
    history.push(`/shop`);
  };

  return (
    <section className="py-8 md:py-12 px-4 max-w-[85vw] md:max-w-75vw mx-auto">
      <h2 className="text-xl md:text-2xl font-bold text-center mb-4">
        EDITOR'S PICK
      </h2>
      <p className="text-center text-gray-500 mb-6 px-4">
        Problems trying to resolve the conflict between
      </p>

      {}
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-6 gap-4">
        <div
          className="relative aspect-square md:aspect-auto md:col-span-2 md:row-span-6 h-full transition-all hover:scale-105 cursor-pointer"
          onClick={handleCategoryClick}
        >
          <img
            src={editorsPickCategories[0].image}
            alt="Men"
            className="w-full h-full object-cover"
          />
          <h3 className="absolute bottom-4 left-4 text-dark-gray text-base md:text-lg font-bold px-4 py-2 bg-white">
            MEN
          </h3>
        </div>
        <div
          className="relative aspect-square md:aspect-auto md:row-span-6 h-full transition-all hover:scale-105 cursor-pointer"
          onClick={handleCategoryClick}
        >
          <img
            src={editorsPickCategories[1].image}
            alt="Women"
            className="w-full h-full object-cover object-top"
          />
          <h3 className="absolute bottom-4 left-4 text-dark-gray text-base md:text-lg font-bold px-4 py-2 bg-white">
            WOMEN
          </h3>
        </div>
        <div
          className="relative aspect-square md:row-span-3 transition-all hover:scale-105 cursor-pointer"
          onClick={handleCategoryClick}
        >
          <img
            src={editorsPickCategories[2].image}
            alt="Accessories"
            className="w-full h-full object-cover"
          />
          <h3 className="absolute bottom-4 left-4 text-dark-gray text-base md:text-lg font-bold px-4 py-2 bg-white">
            ACCESSORIES
          </h3>
        </div>
        <div
          className="relative aspect-square md:row-span-3 transition-all hover:scale-105 cursor-pointer"
          onClick={handleCategoryClick}
        >
          <img
            src={editorsPickCategories[3].image}
            alt="Kids"
            className="w-full h-full object-cover"
          />
          <h3 className="absolute bottom-4 left-4 text-dark-gray text-base md:text-lg font-bold px-4 py-2 bg-white">
            KIDS
          </h3>
        </div>
      </div>
    </section>
  );
};

export default EditorsPick;
