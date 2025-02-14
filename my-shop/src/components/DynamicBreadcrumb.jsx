import React from "react";
import { useSelector } from "react-redux"; // Redux'tan kategori verisini almak için
import { useHistory } from "react-router-dom"; // Sayfa yönlendirme işlemi için
import {
  Breadcrumb, // Ekmek kırıntısı bileşeni (navigasyon yolu)
  BreadcrumbItem, // Her bir ekmek kırıntısı öğesi
  BreadcrumbLink, // Navigasyon bağlantısı
} from "@/components/ui/breadcrumb"; // UI bileşenleri (kendi projenize göre yolu güncelleyin)
import { ChevronRight } from "lucide-react"; // Sağ yönlü ok ikonu
import createSlug from "../utils/createSlug"; // SEO dostu URL slug oluşturma fonksiyonu

// Dinamik ekmek kırıntısı (breadcrumb) bileşeni
function DynamicBreadcrumb({ gender, categoryId }) {
  const history = useHistory(); // Sayfa yönlendirme fonksiyonu

  // Redux store'dan kategori başlığını çekme
  const categoryTitle = useSelector((state) => {
    // `categoryId`'ye karşılık gelen kategori bulunuyor
    const category = state.product.categories.find(
      (cat) => cat.id === parseInt(categoryId)
    );
    return category ? category.title : ""; // Eğer kategori varsa başlığını döndür, yoksa boş string
  });

  // Breadcrumb öğelerini dinamik olarak oluşturma
  const getBreadcrumbItems = () => {
    const items = [
      { label: "Home", path: "/" }, // Ana sayfa bağlantısı
      { label: "Shop", path: "/shop" }, // Genel mağaza sayfası
    ];

    // Eğer gender (cinsiyet) ve kategori başlığı mevcutsa, ekmek kırıntısına ekle
    if (gender && categoryTitle) {
      items.push({
        label: gender === "kadin" ? "Kadın" : "Erkek",
        path: `/shop/${gender}`,
      });
      items.push({
        label: categoryTitle,
        path: `/shop/${gender}/${createSlug(categoryTitle)}/${categoryId}`,
      });
    }

    return items; // Oluşturulan breadcrumb listesini döndür
  };

  const breadcrumbItems = getBreadcrumbItems(); // Breadcrumb öğelerini al

  return (
    <Breadcrumb className="flex flex-row items-center space-x-2 text-gray-600">
      {/* Breadcrumb öğelerini dinamik olarak oluştur */}
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={item.path}>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => history.push(item.path)} // Tıklanınca sayfa yönlendirmesi yapar
              className={`cursor-pointer ${
                index === breadcrumbItems.length - 1 ? "font-bold" : ""
              }`}
            >
              {item.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
          {/* Eğer son öğe değilse, yön işaretini göster */}
          {index < breadcrumbItems.length - 1 && (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
        </React.Fragment>
      ))}
    </Breadcrumb>
  );
}

export default DynamicBreadcrumb; // Bileşeni dışa aktar
