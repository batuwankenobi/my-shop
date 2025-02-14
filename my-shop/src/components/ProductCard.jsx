import React from "react";
import { Card, CardContent } from "@/components/ui/card"; // Kart bileşeni (Ürün görseli ve bilgileri için)
import { useHistory } from "react-router-dom"; // Sayfa yönlendirme için React Router
import createSlug from "../utils/createSlug"; // URL dostu slug oluşturmak için yardımcı fonksiyon
import { ShoppingCart, Eye } from "lucide-react"; // Sepet ve ürün görüntüleme ikonları
import { Button } from "@/components/ui/button";
import { addToCart } from "../store/actions/shoppingCartActions"; // Redux'tan alışveriş sepeti aksiyonu
import { useDispatch } from "react-redux";
import { toast } from "react-toastify"; // Kullanıcıya bildirim göstermek için

// Ürün kartı bileşeni
const ProductCard = ({ product, category }) => {
  const history = useHistory(); // Sayfa yönlendirme için hook
  const dispatch = useDispatch(); // Redux aksiyonlarını tetiklemek için kullanılır

  // Ürüne tıklanınca yönlendirme yapar
  const handleClick = (e) => {
    e.preventDefault();
    console.log("Clicked product:", product.id); // Hangi ürünün tıklandığını loglar
    window.scrollTo({ top: 0, behavior: "smooth" }); // Sayfa yukarı kaydırılır
    history.push(
      `/shop/${category.gender === "k" ? "kadin" : "erkek"}/${createSlug(
        category.title
      )}/${categorSlugy.id}/${create(product.name)}/${product.id}`
    ); // Kullanıcı ilgili ürün detay sayfasına yönlendirilir
  };

  // Ürünü sepete ekleme fonksiyonu
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Kartın genel tıklama olayını engeller
    if (product) {
      dispatch(addToCart(product)); // Redux'a ürünü ekleme aksiyonu
      toast.success(`${product.name} added to your cart`, {
        position: "bottom-right", // Bildirimin konumunu belirler
      });
    }
  };

  return (
    <Card
      className="border-slate-200 shadow-none overflow-hidden transition-all hover:scale-105 cursor-pointer"
      onClick={handleClick} // Kart tıklanınca ürün sayfasına yönlendirir
    >
      <CardContent className="p-0">
        {/* Ürün görseli */}
        <div className="aspect-[3/4] mb-4">
          <img
            src={product.images[0].url} // Ürünün ilk görselini alır
            alt={product.name} // Alternatif metin olarak ürün adı
            className="w-full h-full object-cover"
          />
        </div>

        {/* Ürün adı ve fiyatı */}
        <div className="px-2">
          <div className="mb-3">
            <h3 className="font-bold text-base mb-2">{product.name}</h3>
            <span className="text-secondary-color font-bold">
              ${product.price.toFixed(2)} {/* Ürün fiyatı gösterilir */}
            </span>
          </div>

          {/* Sepete ekleme ve ürün görüntüleme butonları */}
          <div className="flex justify-center items-center gap-2 mt-2 mb-4">
            {/* Sepete ekleme butonu */}
            <Button
              variant="outline"
              size="icon"
              className="p-4"
              label="Add to cart"
              onClick={handleAddToCart} // Sepete ekleme işlemi
            >
              <ShoppingCart className="h-5 w-5" /> {/* Sepet ikonu */}
            </Button>

            {/* Ürün detay sayfasına gitme butonu */}
            <Button
              variant="outline"
              size="icon"
              className="p-4"
              label="View product"
              onClick={handleClick} // Ürün sayfasına yönlendirme
            >
              <Eye className="h-5 w-5" /> {/* Göz ikonu (Ürünü gör) */}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard; // Bileşeni dışa aktar
