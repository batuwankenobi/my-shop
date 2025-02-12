// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

// Ürün kartı bileşeni - Her bir ürün için başlık, alt başlık, fiyat ve resim içeren bir kart oluşturur.
const ProductCard = ({ title, subtitle, price, image }) => {
  return (
    <section>
      <div className='flex flex-col flex-wrap'>
        {/* Ürün resmi */}
        <img src={image} alt="ProductCard" />
        
        {/* Ürün bilgileri */}
        <div className="p-4 text-center">
          <h5 className="text-h5 font-bold">{title}</h5>
          <h6 className="text-h6 text-secondText">{subtitle}</h6>
          <p className="text-h6">{price}</p>
        </div>
      </div>
    </section>
  );
};

// Ürün kartlarını listeleyen bileşen
const ProductCardList = () => {
  // Kullanılacak ürün resimlerinin dizisi
  const images = [
    './images/ProductCard1.png',
    './images/ProductCard2.png',
    './images/ProductCard3.png',
    './images/ProductCard4.png',
    './images/ProductCard5.png',
  ];

  // Tüm ürün kartlarını içeren dizi (örnek verilerle oluşturuldu)
  const allCards = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1, // Her karta benzersiz bir ID atanıyor
    title: `Graphic Design`, // Ürün başlığı
    subtitle: `English Department`, // Ürün alt başlığı
    price: `$16.48 $6.48`, // Ürün fiyatı
    image: images[index % images.length], // Ürün resmi (resim dizisindeki sıraya göre belirleniyor)
  }));

  // Görünen ürün kartlarının sayısını tutan state (başlangıçta 5 ürün gösterilir)
  const [visibleCards, setVisibleCards] = useState(5);

  // "LOAD MORE PRODUCTS" butonuna basıldığında yeni ürünler yükleyen fonksiyon
  const loadMore = () => {
    setVisibleCards(visibleCards + 6); // Her tıklamada 6 yeni ürün gösterilecek
  };

  return (
    <div>
      {/* Ürün kartlarını ızgara düzeninde göstermek için kullanılan div */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-fit">
        {/* Görünen kartları ekrana basma işlemi */}
        {allCards.slice(0, visibleCards).map((card) => (
          <ProductCard
            key={card.id} // React'in her elemanı benzersiz şekilde takip etmesi için gerekli
            title={card.title}
            subtitle={card.subtitle}
            price={card.price}
            image={card.image}
          />
        ))}
      </div>

      {/* Eğer gösterilen kart sayısı, toplam kart sayısından azsa "LOAD MORE PRODUCTS" butonu gösterilir */}
      {visibleCards < allCards.length && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore} // Butona tıklanınca loadMore fonksiyonu çağrılır
            className="py-5 px-12 bg-transparent rounded border-blueText border-2 text-blueText transition duration-300 font-bold text-sm"
          >
            LOAD MORE PRODUCTS
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCardList;
