import Footer from '../layout/Footer' // Footer bileşenini içe aktarıyoruz

// Ana sayfa bileşeni
function HomePage() {
    return (
        <div>
            {/* Öne çıkan ürünler bölümü */}
            <section>
                <div>
                    {/* Başlıklar */}
                    <h5 className='text-h5 text-bold'>Featured Products</h5>
                    <h2 className='text-h2'>We love what we do</h2>
                    
                    {/* Açıklama metni */}
                    <p className='text-h6 text-secondText'>
                        Problems trying to resolve the conflict between the two major realms of Classical physics:
                        Newtonian mechanics

                        Problems trying to resolve the conflict between the two major realms of Classical physics:
                        Newtonian mechanics 
                    </p>
                </div>

                {/* Öne çıkan ürün görselleri */}
                <div className='flex'>
                    <img src='/images/featured1.png' alt="Featured Product 1"/> {/* İlk ürün görseli */}
                    <img src='/images/featured2.png' alt="Featured Product 2"/> {/* İkinci ürün görseli */}
                </div>
            </section>

            {/* Footer bileşenini ekliyoruz */}
            <Footer />
        </div>
    );
}

// HomePage bileşenini dışa aktarıyoruz
export default HomePage;