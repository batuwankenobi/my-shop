import { Swiper, SwiperSlide } from "swiper/react";

// Swiper kütüphanesi stilleri import edilir
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Scrollbar, Autoplay } from "swiper/modules"; // Swiper modülleri
import { Button } from "@/components/ui/button"; // UI bileşeni olan buton import edilir

// Hero bileşeni (Ana sayfa büyük slider bölümü)
const Hero = () => {
  return (
    <section className="bg-gray-100 w-full overflow-hidden">
      {/* Swiper bileşeni (Slider) */}
      <Swiper
        spaceBetween={0} // Slaytlar arası boşluk sıfır
        navigation={true} // Navigasyon oklarını aktif eder
        scrollbar={{ draggable: true }} // Sürüklenebilir kaydırma çubuğu ekler
        autoplay={{
          delay: 5000, // 5 saniyede bir otomatik geçiş
        }}
        modules={[Navigation, Scrollbar, Autoplay]} // Kullanılacak modüller
        className="max-w-full"
      >
        {/* İlk Slayt */}
        <SwiperSlide>
          <div className="relative flex items-center justify-center w-full overflow-hidden min-h-[400px] md:min-h-[700px]">
            <img
              src="shop-hero-1-product-slide-1.jpg" // Slayt arka plan görseli
              alt="New Arrivals"
              className="w-full h-full object-cover absolute inset-0" // Görselin tam ekran kaplamasını sağlar
            />
            {/* Slayt içeriği (Metin ve Buton) */}
            <div className="absolute inset-0 flex items-center justify-center md:max-w-75vw mx-auto md:justify-start md:px-4">
              <div className="text-white text-center md:text-left max-w-[85vw] md:max-w-75vw px-4 md:px-0">
                <p className="font-bold my-4 md:my-8 text-base md:text-xl">
                  SUMMER 2024
                </p>
                <h1 className="text-2xl md:text-6xl font-bold max-w-md">
                  NEW COLLECTION
                </h1>
                <p className="my-4 md:my-8 text-sm md:text-base max-w-md">
                  We know how large objects will act, <br />
                  but things on a small scale.
                </p>
                {/* Alışverişe yönlendiren buton */}
                <Button variant="secondary" size="lg">
                  SHOP NOW
                </Button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* İkinci Slayt (Aynı yapı, sadece farklı içerikle çoğaltılabilir) */}
        <SwiperSlide>
          <div className="relative flex items-center justify-center w-full overflow-hidden min-h-[400px] md:min-h-[700px]">
            <img
              src="shop-hero-1-product-slide-1.jpg" // Aynı görsel, farklı içerik eklenebilir
              alt="New Arrivals"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 flex items-center justify-center md:max-w-75vw mx-auto md:justify-start md:px-4">
              <div className="text-white text-center md:text-left px-4 md:px-0">
                <p className="font-bold my-4 md:my-8 text-base md:text-xl">
                  SUMMER 2024
                </p>
                <h1 className="text-2xl md:text-6xl font-bold max-w-md">
                  NEW COLLECTION
                </h1>
                <p className="my-4 md:my-8 text-sm md:text-base max-w-md">
                  We know how large objects will act, <br />
                  but things on a small scale.
                </p>
                <Button variant="secondary" size="lg">
                  SHOP NOW
                </Button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Hero; // Bileşeni dışa aktar
