import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/components/ui/button";

// Swiper stilleri import edilir
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Scrollbar, Autoplay } from "swiper/modules";

// Hero2 bileşeni (Ana sayfa büyük slider bölümü)
const Hero2 = () => {
  return (
    <section className="bg-gray-100 w-full overflow-hidden">
      {/* Swiper bileşeni (Slider) */}
      <Swiper
        spaceBetween={0} // Slaytlar arası boşluk yok
        navigation={true} // Navigasyon okları etkin
        scrollbar={{ draggable: true }} // Sürüklenebilir kaydırma çubuğu
        autoplay={{
          delay: 5000, // 5 saniyede bir otomatik geçiş
        }}
        modules={[Navigation, Scrollbar, Autoplay]} // Kullanılacak modüller
        className="max-w-full"
      >
        {/* İlk Slayt */}
        <SwiperSlide>
          {/* Ekran boyutuna göre minimum yükseklik ayarlandı */}
          <div className="relative flex items-center justify-center w-full overflow-hidden min-h-[400px] md:min-h-[700px]">
            {/* Resmin tam ekran görünüm sağlaması için konumu güncellendi */}
            <img
              src="shop-hero-2-product-slide-2.jpg" // Slayt arka plan görseli
              alt="New Arrivals"
              className="w-full h-full object-cover absolute inset-0" // Görselin tam ekran kaplamasını sağlar
            />
            {/* İçerik kutusu, mobil ve masaüstü için optimize edildi */}
            <div className="absolute inset-0 flex items-center justify-center md:max-w-75vw mx-auto md:justify-start md:px-4">
              {/* Metinlerin konumu ve gölgelendirmesi iyileştirildi */}
              <div className="text-white text-center md:text-left drop-shadow px-4 md:px-0">
                {/* Başlık ve alt başlıklar için mobil uyumlu alanlar ayarlandı */}
                <p className="font-bold my-4 md:my-8 text-base md:text-xl">
                  SUMMER 2024
                </p>
                <h1 className="text-2xl md:text-6xl font-bold max-w-md">
                  Vita Classic Product
                </h1>
                {/* Açıklama metni mobil için optimize edildi */}
                <p className="my-4 md:my-8 text-sm md:text-base max-w-md">
                  We know how large objects will act, <br />
                  but things on a small scale.
                </p>
                {/* Buton boyutu ve padding ayarlandı */}
                <Button variant="secondary" size="lg">
                  ADD TO CART
                </Button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* İkinci Slayt (İçerik aynı, farklı görseller eklenebilir) */}
        <SwiperSlide>
          {/* Minimum yükseklik, tüm cihazlarda tutarlı görünüm sağlamak için eklendi */}
          <div className="relative flex items-center justify-center w-full overflow-hidden min-h-[400px] md:min-h-[700px]">
            {/* Resim tam ekran kaplaması için optimize edildi */}
            <img
              src="shop-hero-2-product-slide-2.jpg"
              alt="New Arrivals"
              className="w-full h-full object-cover absolute inset-0"
            />
            {/* Metinlerin ve içeriğin konumu güncellendi */}
            <div className="absolute inset-0 flex items-center justify-center md:max-w-75vw mx-auto md:justify-start md:px-4">
              {/* Metin kutusu gölgelendirildi ve hizalama düzenlendi */}
              <div className="text-white text-center md:text-left drop-shadow px-4 md:px-0">
                {/* Metin aralıkları ve yazı tipi boyutları ayarlandı */}
                <p className="font-bold my-4 md:my-8 text-base md:text-xl">
                  SUMMER 2024
                </p>
                <h1 className="text-2xl md:text-6xl font-bold max-w-md">
                  Vita Classic Product
                </h1>
                {/* Açıklama metni mobil uyumluluk için optimize edildi */}
                <p className="my-4 md:my-8 text-sm md:text-base max-w-md">
                  We know how large objects will act, <br />
                  but things on a small scale.
                </p>
                {/* Buton boyutu ve padding mobil uyumlu hale getirildi */}
                <Button variant="secondary" size="lg">
                  ADD TO CART
                </Button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Hero2; // Bileşeni dışa aktar
