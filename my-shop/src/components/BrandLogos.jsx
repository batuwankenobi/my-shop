// BrandLogos bileşeni: Marka logolarını yatay bir liste halinde gösterir.
const BrandLogos = () => {
  // Kullanılacak logo dosyalarının isimlerini içeren dizi
  const logos = [
    "fa-brands-1.svg",
    "fa-brands-2.svg",
    "fa-brands-3.svg",
    "fa-brands-4.svg",
    "fa-brands-5.svg",
    "fa-brands-6.svg",
  ];

  return (
    <div
      className="flex flex-col items-center 
                 md:flex-row md:flex-wrap md:justify-center md:space-y-0 
                 xl:flex-nowrap gap-16 py-12 bg-gray"
    >
      {/* Logo listesini dönerek her birini bir <img> etiketi ile ekrana bas */}
      {logos.map((logo, index) => (
        <img
          key={index} // Her logo için benzersiz bir anahtar (index kullanımı burada güvenli)
          src={`/${logo}`} // Logo dosyasının yolu (public klasöründen okunur)
          alt={`Brand logo ${index + 1}`} // Erişilebilirlik için alternatif metin
          className="h-16 w-1/2 md:w-1/4 xl:w-auto" // Responsive olarak boyutlandırma
          loading="lazy" // Performansı artırmak için tembel yükleme (lazy loading)
        />
      ))}
    </div>
  );
};

export default BrandLogos; // Bileşeni dışa aktar
