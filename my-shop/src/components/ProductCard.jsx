import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useHistory } from "react-router-dom";
import createSlug from "../utils/createSlug";
import { Search, ShoppingCart } from "lucide-react"; // Yeni ikonları içe aktardık
import { Button } from "@/components/ui/button";
import { addToCart } from "../store/actions/shoppingCartActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ProductCard = ({ product, category }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Clicked product:", product.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.push(
      `/shop/${category.gender === "k" ? "kadin" : "erkek"}/${createSlug(
        category.title
      )}/${category.id}/${createSlug(product.name)}/${product.id}`
    );
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product) {
      dispatch(addToCart(product));
      toast.success(`${product.name} added to cart`, {
        position: "bottom-right",
      });
    }
  };

  return (
    <Card
      className="border-slate-200 shadow-none overflow-hidden transition-all hover:scale-105 cursor-pointer"
      onClick={handleClick}
    >
      <CardContent className="p-0">
        <div className="aspect-[3/4] mb-4">
          <img
            src={product.images[0].url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="px-2">
          <div className="mb-3">
            <h3 className="font-bold text-base mb-2">{product.name}</h3>
            <span className="text-secondary-color font-bold">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-center items-center gap-3 mt-2 mb-4">
            {/* Sepete ekleme butonu - Daha büyük ve belirgin */}
            <Button
              variant="outline"
              size="lg"
              className="p-4 border border-black-500 text-black-600 hover:bg-blue-500 hover:text-white transition-all"
              label="Add to cart"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-6 w-6" />
            </Button>
            {/* Ürün detayına gitme butonu - Daha şık büyüteç ikonu */}
            <Button
              variant="outline"
              size="lg"
              className="p-4 border border-black-500 text-black-600 hover:bg-blue-500 hover:text-white transition-all"
              label="View product"
              onClick={handleClick}
            >
              <Search className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
