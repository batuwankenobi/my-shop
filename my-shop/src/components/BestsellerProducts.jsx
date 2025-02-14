import ProductCard from "./ProductCard"; // Ürün kartı bileşeni
import { useSelector, useDispatch } from "react-redux"; // Redux'tan state almak ve aksiyonları dispatch etmek için hook'lar
import { selectProductsWithCategories } from "../store/selectors/selectProductsWithCategories"; // Ürünleri kategorileriyle eşleştiren selector
import { useEffect } from "react"; // useEffect hook'u (component yüklendiğinde işlemler yapmak için)
import { fetchProducts } from "../store/actions/productActions"; // Ürünleri API'den almak için Redux aksiyonu

// BestsellerProducts bileşeni
const BestsellerProducts = () => {
  const dispatch = useDispatch(); // Redux aksiyonlarını tetiklemek için dispatch fonksiyonu

  // Component yüklendiğinde ürünleri API'den çek
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Redux store'dan ürün listesi ve kategorileri al
  const productList = useSelector((state) => state.product.productList || []); // Eğer ürün listesi yoksa boş dizi kullan
  const categories = useSelector((state) => state.product.categories || []); // Eğer kategori listesi yoksa boş dizi kullan

  // Ürünleri kategorileriyle eşleştir (selector fonksiyonu kullanarak)
  const productsWithCategories = selectProductsWithCategories(
    productList,
    categories
  );

  // En çok satan ürünleri sıralama
  const bestsellerList = productsWithCategories
    .sort((a, b) => b.rating - a.rating) // Ürünleri rating (puan) değerine göre büyükten küçüğe sırala
    .slice(0, 8); // İlk 8 ürünü al (en yüksek puanlılar)

  return (
    <section className="pb-8 md:pb-12 px-4 max-w-[85vw] md:max-w-75vw mx-auto bg-gray-100 object-contain">
      {/* Başlık */}
      <h2 className="text-xl md:text-2xl font-bold text-dark-gray text-center mb-4">
        BESTSELLER PRODUCTS
      </h2>

      {/* Ürün kartlarını listeleme */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
        {bestsellerList.map((product) => (
          <ProductCard
            key={product.id} // React için her ürünün benzersiz anahtarı (id)
            product={product} // Ürün verisi
            category={product.category} // Ürünün kategorisi
          />
        ))}
      </div>
    </section>
  );
};

export default BestsellerProducts; // Bileşeni dışa aktar
