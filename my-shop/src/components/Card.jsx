import React from 'react';

// Tekil kart bileşeni - Her kart için görsel, başlık ve buton içeriyor
const Card = ({ imageSrc, title, buttonText }) => {
    return (
        <div className="relative overflow-hidden">
            {/* Kartın arka planındaki görsel */}
            <img src={imageSrc} alt={title} />

            {/* Kartın içeriği - Saydam arka plan, başlık ve buton içeriyor */}
            <div className="bg-[#2D8BC0BF] bg-opacity-70 flex flex-col items-start justify-center text-white p-4 absolute bottom-0 left-0 h-2/5">
                {/* Kart Başlığı */}
                <h3 className="text-h3 font-bold mb-2 text-left">{title}</h3>

                {/* Kart Butonu */}
                <div>
                    <button className="px-4 py-2 bg-transparent rounded border border-white border-1 hover:text-white transition duration-300">
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Kart listesini oluşturan bileşen
const CardList = () => {
    // Kart verilerini içeren dizi
    const cards = [
        {
            imageSrc: './images/card1.png', // Kart arka plan görseli
            title: 'Top Product Of the Week', // Kart başlığı
            buttonText: 'Explore Items', // Buton metni
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
        // Kartları içeren grid yapı
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center sm:grid-cols-2 sm:grid-rows-2">
            {/* Kartları döngüyle oluşturma */}
            {cards.map((card, index) => (
                <Card
                    key={index} // React için benzersiz anahtar
                    imageSrc={card.imageSrc}
                    title={card.title}
                    buttonText={card.buttonText}
                />
            ))}
        </section>
    );
};

export default CardList;
