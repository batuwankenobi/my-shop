import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Redux hook'ları
import { fetchProduct } from "../store/actions/productActions"; // Ürün verisini çekme işlemi
import { useParams, useHistory } from "react-router-dom"; // URL parametreleri ve yönlendirme işlemleri
import { Button } from "@/components/ui/button"; // UI buton bileşeni
import { Minus, Plus, ShoppingCart, Heart, Loader2 } from "lucide-react"; // İkonlar
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // UI sekme bileşenleri
import { ChevronRight } from "lucide-react"; // Geri düğmesi için ikon
import BestsellerProducts from "../components/BestsellerProducts"; // Çok satan ürünler bileşeni
import BrandLogos from "../components/BrandLogos"; // Marka logoları bileşeni
import StarRating from "../components/StarRating"; // Yıldız değerlendirme bileşeni
import { addToCart } from "../store/actions/shoppingCartActions"; // Sepete ürün ekleme aksiyonu
import { toast } from "react-toastify"; // Bildirimler
import DynamicBreadcrumb from "../components/DynamicBreadcrumb"; // Dinamik breadcrumb bileşeni

// 🛍 `ProductDetail`: Ürün detay sayfası bileşeni
const ProductDetail = () => {
  const { productId, gender, categoryId } = useParams(); // URL'den `productId`, `gender`, `categoryId` alınıyor
  const history = useHistory();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product); // Redux store'dan ürünü al

  const [quantity, setQuantity] = useState(1); // Kullanıcının seçtiği ürün adedi

  // 📦 Ürünü çekmek için API çağrısı
  useEffect(() => {
    if (productId) {
      dispatch(fetchProduct(productId)); // Ürünü Redux store'a getir
    }
  }, [dispatch, productId]);

  // ⏪ Geri butonuna basıldığında sayfayı geri götürme işlemi
  const handleBack = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      history.goBack();
    }, 300);
  };

  // ⏳ Yüklenme durumu
  if (!product) {
    return (
      <p>
        <Loader2 className="w-4 h-4 inline animate-spin" />
        Loading...
      </p>
    );
  }

  // 🛒 Sepete ürün ekleme işlemi
  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart(product));
      }
      toast.success(`${quantity} x ${product.name} added to your cart`, {
        position: "bottom-right",
      });
    }
  };

  // ➕➖ Ürün adedi değiştirme işlemi
  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  return (
    <>
      <div className="max-w-[85vw] md:max-w-75vw mx-auto px-4 py-8">
        {/* 🔗 Breadcrumb ve Geri Butonu */}
        <div className="flex flex-wrap justify-around md:justify-between items-center mb-8">
          <DynamicBreadcrumb gender={gender} categoryId={categoryId} />
          <Button
            variant="ghost"
            onClick={handleBack}
            className="inline-flex items-center gap-1 text-md text-primary-color font-semibold"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back
          </Button>
        </div>

        {/* 🖼 Ürün Resmi ve Bilgileri */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ürün Resmi */}
          <div className="overflow-hidden rounded-lg max-h-[400px]">
            <img
              src={product.images[0]?.url}
              alt={product.name}
              className=" object-cover object-center"
            />
          </div>

          {/* Ürün Bilgileri */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            {/* 🌟 Ürün Değerlendirme */}
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} />
              <span className="text-lg text-gray-400">{product.rating}</span>
            </div>

            {/* 💰 Fiyat */}
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-secondary-color">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* 📦 Stok Durumu */}
            <div className="flex items-center gap-2 text-sm">
              <h3 className="text-md font-medium">Availability:</h3>
              <h3 className={`text-primary-color font-semibold`}>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </h3>
            </div>

            {/* 📄 Açıklama */}
            <p className="text-gray-600 text-left">{product.description}</p>

            {/* 🔢 Miktar Seçimi */}
            <div className="mb-6">
              <h3 className="text-md font-medium text-left mb-4">Quantity</h3>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => handleQuantityChange(-1)}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-medium">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* 🛍 Sepete Ekle ve Favorilere Ekle Butonları */}
            <div className="flex gap-4">
              <Button onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon" className="p-4">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* 📌 Ürün Bilgileri ve Yorumlar Sekmeleri */}
        <Tabs defaultValue="description" className="flex flex-col justify-center items-center mt-8">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="additional">Additional Information</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <div className="px-4 py-24 h-60 items-center justify-center">
            <TabsContent value="description">
              <p>{product.description}</p>
            </TabsContent>
            <TabsContent value="additional">
              <p>Additional information goes here...</p>
            </TabsContent>
            <TabsContent value="reviews">
              <p>Customer reviews go here...</p>
            </TabsContent>
          </div>
        </Tabs>

        {/* 📌 Çok Satan Ürünler */}
        <BestsellerProducts />
      </div>

      {/* 🏷 Marka Logoları */}
      <BrandLogos />
    </>
  );
};

export default ProductDetail;
