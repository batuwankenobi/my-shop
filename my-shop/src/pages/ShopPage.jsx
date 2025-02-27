import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useParams, useLocation, useHistory } from "react-router-dom"; // URL parametrelerini almak ve yönlendirme yapmak için hooklar
import { useSelector, useDispatch } from "react-redux"; // Redux state'ini almak ve aksiyon dispatch etmek için
import ProductCard from "../components/ProductCard"; // Ürün kartı bileşeni
import { Card, CardContent } from "@/components/ui/card"; // UI bileşenleri
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Seçim kutusu bileşeni
import { LayoutGrid, List, ChevronRight, Filter } from "lucide-react"; // İkonlar için Lucide kütüphanesi
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb"; // Breadcrumb bileşeni

// Redux aksiyonları
import {
  updateFilter,
  updateSort,
  updateCategory,
  setFilter,
  initializeShopPage,
  setCurrentPage,
} from "../store/actions/productActions";

import BrandLogos from "../components/BrandLogos"; // Marka logolarını içeren bileşen
import { Loader2 } from "lucide-react"; // Yükleme animasyonu ikonu
import { ShopPagination } from "../components/ShopPagination"; // Sayfalama bileşeni
import { selectProductsWithCategories } from "../store/selectors/selectProductsWithCategories"; // Ürünleri kategorilerle eşleştiren selector
import createSlug from "../utils/createSlug"; // URL dostu slug oluşturmak için yardımcı fonksiyon
import ProductGrid from "../components/ProductGrid"; // Ürünleri listelemek için grid bileşeni
import DynamicBreadcrumb from "../components/DynamicBreadcrumb"; // Dinamik breadcrumb bileşeni

const ShopPage = () => {
  const dispatch = useDispatch();
  const { gender, categoryName, categoryId } = useParams(); // URL'den parametreleri al
  const location = useLocation(); // Mevcut sayfanın konumunu al
  const history = useHistory(); // Sayfa yönlendirme için kullanılır

  const [showMobileFilters, setShowMobileFilters] = useState(false); // Mobil filtrelerin görünürlüğünü kontrol eden state

  // Redux store'dan ürün ve kategori verilerini çek
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

  // Ürünleri kategorilerle eşleştir
  const productsWithCategories = selectProductsWithCategories(
    productList,
    categories
  );

  // Sayfa /shop ise, kategori seçimini sıfırla
  useEffect(() => {
    if (location.pathname === "/shop") {
      dispatch(initializeShopPage());
    }
  }, [location, dispatch]);

  // En yüksek puanlı ilk 5 kategoriyi al
  const topCategories = [...categories]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  // Kategori seçildiğinde çalışacak fonksiyon
  const handleCategoryChange = async (categoryId, gender, categoryTitle) => {
    const slug = createSlug(categoryTitle); // Kategori başlığını slug formatına dönüştür
    history.push(`/shop/${gender === "k" ? "kadin" : "erkek"}/${slug}/${categoryId}`);
    dispatch(updateCategory(categoryId)); // Redux store'daki kategori bilgisini güncelle
  };

  // Filtreleme işlemlerini gecikmeli olarak yapmak için debounce fonksiyonu
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Filtre güncellenirken gecikmeli işlem yapan fonksiyon
  const debouncedUpdateFilter = useCallback(
    debounce((newFilter) => {
      dispatch(updateFilter(newFilter));
    }, 1000),
    []
  );

  // Filtreleme input alanı değiştirildiğinde çalışacak fonksiyon
  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    dispatch(setFilter(newFilter)); // Filtre değerini Redux store'a kaydet
    debouncedUpdateFilter(newFilter);
  };

  // Sıralama işlemi değiştirildiğinde çalışacak fonksiyon
  const handleSortChange = (value) => {
    dispatch(updateSort(value));
    console.log("new sorting criterion: ", value);
  };

  // Eğer veri çekiliyorsa ve ürün listesi boşsa, yükleme ekranı göster
  if (fetchState === "FETCHING" && productList.length === 0) {
    return <div>Loading...</div>;
  }

  // Eğer veri çekme işlemi başarısız olursa, hata mesajı göster
  if (fetchState === "FAILED" && productList.length === 0) {
    return <div>Error loading data. Please try again.</div>;
  }

  return (
    <>
      <div className="container max-w-[85vw] md:max-w-75vw mx-auto px-8 py-8 md:py-12">
        {/* Sayfa başlığı ve breadcrumb */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-0">Shop</h3>
          <DynamicBreadcrumb gender={gender} categoryId={categoryId} />
        </div>

        {/* En popüler kategoriler */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-8 md:mb-12">
          {topCategories.map((category) => (
            <Card
              key={category.id}
              onClick={() => handleCategoryChange(category.id, category.gender, category.title)}
              className="relative overflow-hidden group cursor-pointer transition-all hover:scale-105"
            >
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  <img
                    src={category.img}
                    alt={category.title}
                    className="w-full h-full object-cover object-top transition-opacity"
                  />
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

        {/* Ürün listeleme bileşeni */}
        <ProductGrid fetchState={fetchState} productsWithCategories={productsWithCategories} />

        {/* Sayfalama bileşeni */}
        <div className="flex justify-center mb-2">
          <ShopPagination />
        </div>
      </div>

      {/* Marka logoları */}
      <BrandLogos />
    </>
  );
};

export default ShopPage;
