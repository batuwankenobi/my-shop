import React from "react";
import { Card, CardContent } from "@/components/ui/card"; // UI kart bileşeni
import { Skeleton } from "@/components/ui/skeleton"; // Yükleme sırasında gösterilecek iskelet bileşeni
import ProductCard from "./ProductCard"; // Ürün kartı bileşeni
import { AlertCircle } from "lucide-react"; // Uyarı simgesi
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Uyarı mesajı bileşenleri

// Ürünleri ızgara şeklinde listeleyen bileşen
export default function ProductGrid({ fetchState, productsWithCategories }) {
  
  // Ürünleri dinamik olarak render eden fonksiyon
  const renderProductGrid = () => {
    
    // API'den veri çekiliyorsa (FETCHING durumunda)
    if (fetchState === "FETCHING") {
      return (
        <>
          {[...Array(8)].map((_, index) => ( // 8 tane boş ürün kartı oluştur
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                {/* Ürün görseli için iskelet loader */}
                <Skeleton className="h-48 w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-2/3" /> {/* Ürün adı */}
                  <Skeleton className="h-4 w-1/2" /> {/* Fiyat */}
                  <Skeleton className="h-4 w-1/4" /> {/* Ekstra bilgi */}
                </div>
              </CardContent>
            </Card>
          ))}
        </>
      );
    }

    // Eğer API'den ürünler geldiyse ancak liste boşsa (hiç ürün yoksa)
    if (productsWithCategories.length === 0) {
      return (
        <div className="col-span-full mt-8">
          <Alert variant="default">
            <AlertCircle className="h-4 w-4" /> {/* Uyarı ikonu */}
            <AlertTitle>No products found</AlertTitle> {/* Başlık */}
            <AlertDescription>
              There are no products matching your criteria at the moment. Please
              check back later.
            </AlertDescription> {/* Açıklama */}
          </Alert>
        </div>
      );
    }

    // API'den gelen ürünleri listeleyerek ProductCard bileşenini render et
    return productsWithCategories.map((product) => (
      <ProductCard
        key={product.id} // Ürün ID'si ile benzersiz anahtar oluştur
        product={product} // Ürün bilgilerini ProductCard bileşenine gönder
        category={product.category} // Ürünün kategorisini de gönder
      />
    ));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-12">
      {renderProductGrid()} {/* Ürünleri gösteren fonksiyonu çağır */}
    </div>
  );
}
