import React from "react";
import { useSelector, useDispatch } from "react-redux"; // Redux'tan state almak ve aksiyon dispatch etmek için
import { changePage } from "../store/actions/productActions"; // Sayfa değiştirme aksiyonu
import {
  Pagination, // Ana pagination bileşeni
  PaginationContent, // İçerik kısmını düzenlemek için
  PaginationEllipsis, // "..." ile boşluk bırakmak için
  PaginationItem, // Sayfa numarası ve butonları saran bileşen
  PaginationLink, // Sayfa numarası bağlantıları
  PaginationNext, // Sonraki sayfa butonu
  PaginationPrevious, // Önceki sayfa butonu
} from "@/components/ui/pagination"; // Sayfalama bileşenleri

// Mağaza için sayfalama bileşeni
export function ShopPagination() {
  const dispatch = useDispatch(); // Redux aksiyonlarını çağırmak için
  const { total, limit, currentPage } = useSelector((state) => state.product); // Ürün listesinden toplam ürün sayısını, sayfa başına limiti ve mevcut sayfa numarasını alır

  const totalPages = Math.ceil(total / limit); // Toplam sayfa sayısını hesaplar

  // Sayfa değiştirildiğinde çağrılacak fonksiyon
  const handlePageChange = (page) => {
    dispatch(changePage(page)); // Redux'a yeni sayfa numarasını gönder
  };

  return (
    <div className="w-full max-w-75vw mx-auto">
      <Pagination>
        <PaginationContent className="flex flex-wrap justify-center">
          {/* Önceki sayfa butonu */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) handlePageChange(currentPage - 1);
              }}
            />
          </PaginationItem>

          {/* Sayfa numaralarını oluştur */}
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;

            // Eğer sayfa 1, son sayfa veya mevcut sayfaya yakınsa göster
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page);
                    }}
                    isActive={page === currentPage} // Aktif sayfa mı kontrol eder
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            } 
            // Sayfa mevcut sayfaya iki adım uzaksa "..." ekle
            else if (page === currentPage - 2 || page === currentPage + 2) {
              return <PaginationEllipsis key={page} />;
            }
            return null; // Gereksiz sayfa numaralarını render etme
          })}

          {/* Sonraki sayfa butonu */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) handlePageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
