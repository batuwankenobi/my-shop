import React from 'react';

// Kart bileşeni - Her bir kartın nasıl görüneceğini belirler
const Card = ({ imageSrc, title, buttonText }) => {
    return (
        <div className="relative overflow-hidden ">
            {/* Kartın arka planı olarak kullanılan resim */}
            <img src={imageSrc} alt={title} />
            
            {/* Kartın alt kısmında bulunan, şeffaf mavi arka planlı bilgi alanı */}
            <div className="bg-[#2D8BC0BF] bg-opacity-70 flex flex-col items-start justify-center text-white  p-4 absolute bottom-0 left-0  h-2/5 ">
                {/* Kart başlığı */}
                <h3 className="text-h3 font-bold mb-2 text-left">{title}</h3>
                <div>
                    {/* Buton */}
                    <button className="px-4 py-2 bg-transparent rounded border border-white border-1 hover:text-white transition duration-300">
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Kart Listesi bileşeni - Birden fazla kartı liste halinde gösterir
const CardList = () => {
    // Kart bileşenlerine gönderilecek verilerin tanımlanması
    const cards = [
        {
            imageSrc: './images/card1.png',
            title: 'Top Product Of the Week',
            buttonText: 'Explore Items',
        },
        {
            imageSrc: './images/card2.png',
            title: 'Top Product Of the Week',
            buttonText: 'Explore Items',
        },
        {
            imageSrc: './images/card3.png',
            title: 'Top Product Of the Week',
            buttonText: 'Explore Items',
        },
    ];

    return (
        // Kartları grid düzeninde göstermek için kullanılan container
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center sm:grid-cols-2 sm:grid-rows-2 ">
            {/* Kartları oluşturmak için map fonksiyonu kullanılıyor */}
            {cards.map((card, index) => (
                <Card
                    key={index} // Her bir kartın benzersiz anahtarı
                    imageSrc={card.imageSrc} // Resim kaynağı
                    title={card.title} // Kart başlığı
                    buttonText={card.buttonText} // Buton metni
                />
            ))}
        </section>
    );
}

export default CardList;
