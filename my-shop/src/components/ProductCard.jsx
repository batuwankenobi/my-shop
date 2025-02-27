import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useHistory } from "react-router-dom"; // Sayfa yönlendirme için React Router kullanılıyor
import createSlug from "../utils/createSlug"; // URL dostu slug oluşturmak için yardımcı fonksiyon
import { ShoppingCart, Eye } from "lucide-react"; // İkonlar için Lucide kütüphanesi kullanılıyor
import { Button } from "@/components/ui/button";
import { addToCart } from "../store/actions/shoppingCartActions"; // Redux aksiyonları
import { useDispatch, useSelector } from "react-redux"; // Redux'tan aksiyon dispatch etmek için hooklar
import { toast } from "react-toastify"; // Bildirim göstermek için react-toastify kullanılıyor

// Ürün kartı bileşeni
const ProductCard = ({ product, category }) => {
  const history = useHistory(); // Sayfa yönlendirme için useHistory hook'u
  const dispatch = useDispatch(); // Redux aksiyonlarını göndermek için kullanılır

  // Ürün kartına tıklanınca çalışacak fonksiyon
  const handleClick = (e) => {
    e.preventDefault(); // Varsayılan bağlantı davranışını engeller
    console.log("Clicked product:", product.id);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Sayfanın en üstüne yumuşak kaydırma yapar

    // Kullanıcıyı ilgili ürün sayfasına yönlendirir
    history.push(
      `/shop/${category.gender === "k" ? "kadin" : "erkek"}/${createSlug(
        category.title
      )}/${category.id}/${createSlug(product.name)}/${product.id}`
    );
  };

  // Ürünü sepete ekleyen fonksiyon
  const handleAddToCart = (e) => {
    e.preventDefault(); // Varsayılan davranışı engeller
    e.stopPropagation(); // Kartın kendisine tıklanmasını tetiklememesi için olay yayılımını durdurur
    if (product) {
      dispatch(addToCart(product)); // Redux store'a ürünü ekler
      // Kullanıcıya bildirim gösterir
      toast.success(`${product.name} added to your cart`, {
        position: "bottom-right",
      });
    }
  };

  return (
    <Card
      className="border-slate-200 shadow-none overflow-hidden transition-all hover:scale-105 cursor-pointer"
      onClick={handleClick} // Kartın herhangi bir yerine tıklandığında ürüne yönlendirme yapar
    >
      <CardContent className="p-0">
        {/* Ürün görsel alanı */}
        <div className="aspect-[3/4] mb-4">
          <img
            src={product.images[0].url} // Ürünün ilk görseli gösteriliyor
            alt={product.name} // Erişilebilirlik için alternatif metin
            className="w-full h-full object-cover" // Görüntüyü kapsayacak şekilde ölçeklendirme
          />
        </div>
        {/* Ürün bilgileri */}
        <div className="px-2">
          <div className="mb-3">
            <h3 className="font-bold text-base mb-2">{product.name}</h3> {/* Ürün ismi */}
            <span className="text-secondary-color font-bold">
              ${product.price.toFixed(2)} {/* Ürün fiyatı, iki ondalık basamaklı formatta gösterilir */}
            </span>
          </div>
          {/* Butonlar: Sepete ekleme ve ürün detayına gitme */}
          <div className="flex justify-center items-center gap-2 mt-2 mb-4">
            <Button
              variant="outline"
              size="icon"
              className="p-4"
              label="Add to cart"
              onClick={handleAddToCart} // Sepete ekleme işlemi
            >
              <ShoppingCart className="h-5 w-5" /> {/* Sepet ikonu */}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="p-4"
              label="View product"
              onClick={handleClick} // Ürün detayına gitme işlemi
            >
              <Eye className="h-5 w-5" /> {/* Göz ikonu - Ürün detaylarını görmek için */}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
