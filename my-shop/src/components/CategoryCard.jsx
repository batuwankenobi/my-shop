import React from 'react';

// Tekil Kategori Kartı Bileşeni
function CategoryCard({ title, subtitle, image }) {
    return (
        <section>
            {/* Sayfa Başlığı ve Breadcrumb (Yol Haritası) */}
            <div className="flex flex-col items-center justify-center py-12">
                <h3 className="text-h3 font-bold text-center">Shop</h3>
                <div className="flex gap-2 pt-10">
                    <h6 className="text-h6">Home</h6>
                    <img src="/icons/chevron-right.svg" alt="Breadcrumb Separator" />
                    <h6 className="text-h6">Shop</h6>
                </div>
            </div>

            {/* Kategori Kartı İçeriği */}
            <div>
                {/* Arka plan resmi olarak kategori görselini kullan */}
                <div
                    className="bg-cover bg-center p-8 text-white flex flex-col items-start justify-center"
                    style={{ backgroundImage: `url(${image})`, height: "200px" }} // Yükseklik tanımlandı
                >
                    <div>
                        <h5 className="text-h5 font-bold">{title}</h5>
                        <h6 className="text-h6">{subtitle}</h6>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Kategori Listesi Bileşeni
const CategoryList = () => {
    // Kullanılacak kategori görsellerinin dizisi
    const categories = [
        { image: './images/Category1.png', title: 'Electronics', subtitle: 'Latest Gadgets' },
        { image: './images/Category2.png', title: 'Fashion', subtitle: 'New Trends' },
        { image: './images/Category3.png', title: 'Home Decor', subtitle: 'Best Designs' },
        { image: './images/Category4.png', title: 'Sports', subtitle: 'Top Equipment' },
        { image: './images/Category5.png', title: 'Beauty', subtitle: 'Skincare Essentials' },
    ];

    return (
        <>
        {/* Kartların gruplandırıldığı ana bölüm */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center sm:grid-cols-2 sm:grid-rows-2 ">
            {categories.map((category, index) => (
                <CategoryCard
                    key={index} // React için benzersiz anahtar
                    image={category.image}
                    title={category.title}
                    subtitle={category.subtitle}
                />
            ))}
        </section>
        </>
    );
};

export { CategoryCard, CategoryList }; // İki bileşeni de dışa aktardık
