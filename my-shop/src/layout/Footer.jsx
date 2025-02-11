import Button from '../components/Button' // Button bileşenini içe aktarıyoruz.

// Footer bileşeni tanımlanıyor.
function Footer() {
    // Butona tıklanınca çalışacak fonksiyon.
    const handleClick = () => {
        alert("Button clicked!"); // Butona tıklandığında bir uyarı penceresi gösterilir.
    };

    return (
        // Footer ana bileşeni, sol hizalamalı ve dikey olarak merkezlenmiş bir flex-container.
        <main className='text-left flex flex-col justify-center'>  
            <div>
                {/* Footer başlığı */}
                <h3 className='text-h3'>Bendage</h3>
                {/* Sosyal medya ikonlarını içeren bir görsel */}
                <img src="/images/social-image.png" alt="social icons" />
            </div>

            {/* Şirket bilgileri ve diğer bağlantılar */}
            <article>
                <div>
                    {/* Şirket bilgileri başlığı */}
                    <h5 className='text-h5'>Company Info</h5>
                    {/* Şirketle ilgili alt başlıklar */}
                    <div className='text-h6 text-secondText'>
                        <p>About Us</p>
                        <p>Carrier</p>
                        <p>We are hiring</p>
                        <p>Blog</p>
                    </div>
                </div>
                
                <div>
                    {/* Yasal bilgiler başlığı */}
                    <h5 className='text-h5'>Legal</h5>
                    <div className='text-h6 text-secondText'>
                        <p>About Us</p>
                        <p>Carrier</p>
                        <p>We are hiring</p>
                        <p>Blog</p>
                    </div>
                </div>

                <div>
                    {/* Özellikler başlığı */}
                    <h5 className='text-h5'>Features</h5>
                    <div className='text-h6 text-secondText'>
                        <p>Business Marketing</p>
                        <p>User Analytic</p>
                        <p>Live Chat</p>
                        <p>Unlimited Support</p>
                    </div>
                </div>

                <div>
                    {/* Kaynaklar başlığı */}
                    <h5 className='text-h5'>Resources</h5>
                    <div className='text-h6 text-secondText'>
                        <p>IOS & Android</p>
                        <p>Watch a Demo</p>
                        <p>Customers</p>
                        <p>API</p>
                    </div>
                </div>
            </article>

            {/* Kullanıcıyla iletişim bölümü */}
            <section>
                <h5 className='text-h5'>Get In Touch</h5>
                <div>
                    {/* Kullanıcının e-posta gireceği giriş alanı */}
                    <input type="email" className='bg-[#E6E6E6] text-h6 '></input>
                    {/* Buton bileşeni, tıklandığında handleClick fonksiyonunu çalıştırır */}
                    <Button text="Subscribe" onClick={handleClick} />
                </div>
                {/* Kısa açıklama metni */}
                <p className='text-xs'>Lore imp sum dolor Amit</p>
            </section>

            {/* Telif hakkı bilgisi */}
            <div>
                <p className='text-h6 text-secondText'>Made With Love By 
                Finland All Right Reserved </p>
            </div>
        </main>
    )
}

// Footer bileşeni dışa aktarılıyor.
export default Footer;
