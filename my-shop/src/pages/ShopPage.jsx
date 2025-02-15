import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams, useLocation, useHistory } from "react-router-dom"; // Yönlendirme işlemleri
import { useSelector, useDispatch } from "react-redux"; // Redux işlemleri
import ProductCard from "../components/ProductCard"; // Ürün kartı bileşeni
import { Card, CardContent } from "@/components/ui/card"; // UI kart bileşeni
import { Button } from "@/components/ui/button"; // UI buton bileşeni
import { Input } from "@/components/ui/input"; // UI giriş bileşeni
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // UI seçim kutusu bileşeni
import { LayoutGrid, List, ChevronRight, Filter } from "lucide-react"; // İkonlar
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb"; // UI breadcrumb bileşeni
import {
  updateFilter,
  updateSort,
  updateCategory,
  setFilter,
  initializeShopPage,
  setCurrentPage,
} from "../store/actions/productActions"; // Ürün aksiyonları
import BrandLogos from "../components/BrandLogos"; // Marka logoları bileşeni
import { Loader2 } from "lucide-react"; // Yüklenme animasyonu
import { ShopPagination } from "../components/ShopPagination"; // Sayfalama bileşeni
import { selectProductsWithCategories } from "../store/selectors/selectProductsWithCategories"; // Ürün seçici
import createSlug from "../utils/createSlug"; // URL slug oluşturucu
import ProductGrid from "../components/ProductGrid"; // Ürün listesi bileşeni
import DynamicBreadcrumb from "../components/DynamicBreadcrumb"; // Dinamik breadcrumb bileşeni

// 🛍 `ShopPage`: Mağaza sayfası bileşeni
const ShopPage = () => {
  const dispatch = useDispatch();
  const { gender, categoryName, categoryId } = useParams(); // URL'den parametreler alınıyor
  const location = useLocation();
  const history = useHistory();

  const [showMobileFilters, setShowMobileFilters] = useState(false); // Mobil filtreleri gösterme state

  // Redux store'dan alınan state'ler
  const {
    productList,
    total,
    fetchState,
    categories,
    limit,
    offset,
    filter,
    sort,
    currentPage,
    category,
  } = useSelector((state) => state.product);

  const productsWithCategories = selectProductsWithCategories(productList, categories);

  // 📌 Mağaza sayfası sıfırlandığında kategoriyi sıfırla
  useEffect(() => {
    if (location.pathname === "/shop") {
      dispatch(initializeShopPage());
    }
  }, [location, dispatch]);

  // 🌟 En yüksek puanlı ilk 5 kategoriyi seç
  const topCategories = [...categories]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  // 🏷 Kategori seçildiğinde yönlendirme yap
  const handleCategoryChange = async (categoryId, gender, categoryTitle) => {
    const slug = createSlug(categoryTitle);
    history.push(`/shop/${gender === "k" ? "kadin" : "erkek"}/${slug}/${categoryId}`);
    dispatch(updateCategory(categoryId));
  };

  // 🛠 Arama filtresi için gecikmeli güncelleme (debounce)
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedUpdateFilter = useCallback(
    debounce((newFilter) => {
      dispatch(updateFilter(newFilter));
    }, 1000),
    []
  );

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    dispatch(setFilter(newFilter));
    debouncedUpdateFilter(newFilter);
  };

  // 📌 Sıralama değiştiğinde Redux'a gönder
  const handleSortChange = (value) => {
    dispatch(updateSort(value));
  };

  // ⏳ Yüklenme veya hata durumu
  if (fetchState === "FETCHING" && productList.length === 0) {
    return <div>Loading...</div>;
  }
  if (fetchState === "FAILED" && productList.length === 0) {
    return <div>Error loading data. Please try again.</div>;
  }

  return (
    <>
      <div className="container max-w-[85vw] md:max-w-75vw mx-auto px-8 py-8 md:py-12">
        
        {/* 🧭 Breadcrumb ve Sayfa Başlığı */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-0">Shop</h3>
          <DynamicBreadcrumb gender={gender} categoryId={categoryId} />
        </div>

        {/* 🔥 En İyi Kategoriler */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-8 md:mb-12">
          {topCategories.map((category) => (
            <Card
              key={category.id}
              onClick={() => handleCategoryChange(category.id, category.gender, category.title)}
              className="relative overflow-hidden group cursor-pointer transition-all hover:scale-105"
            >
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  <img src={category.img} alt={category.title} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h3 className="font-bold text-lg md:text-xl text-center mb-1 drop-shadow-lg uppercase">
                      {category.gender === "k" ? "KADIN" : "ERKEK"}
                    </h3>
                    <h3 className="font-bold text-lg md:text-xl text-center mb-1 drop-shadow-lg uppercase">
                      {category.title}
                    </h3>
                    <p className="text-xs md:text-sm drop-shadow-lg">
                      Rating: {category.rating}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 📌 Ürün Listesi */}
        <ProductGrid fetchState={fetchState} productsWithCategories={productsWithCategories} />

        {/* 📌 Sayfalama */}
        <div className="flex justify-center mb-2">
          <ShopPagination />
        </div>
      </div>
      <BrandLogos />
    </>
  );
};

export default ShopPage;
