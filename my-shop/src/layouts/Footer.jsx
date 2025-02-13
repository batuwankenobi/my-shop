import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {
    return (
        <div className="w-screen text-main"> {/* Footer'ı tam genişlikte yapmak için w-screen kullanıyoruz */}
            <div className="max-w-page-content flex md:flex-col md:gap-10 flex-wrap justify-between mx-auto my-0 pt-20 pb-20 pl-5">
                
                {/* İletişim Bilgileri Bölümü */}
                <div className="w-[250px]">
                    <h3 className='footer-titles'>Get In Touch</h3>
                    <p className='text-gray'>The quick fox jumps over the lazy dog</p> {/* Kısa açıklama metni */}
                    
                    {/* Sosyal Medya İkonları */}
                    <div className='flex gap-5 pt-5 text-[24px] text-primary-blue '>
                        <FontAwesomeIcon icon="fa-brands fa-facebook" /> {/* Facebook İkonu */}
                        <FontAwesomeIcon icon="fa-brands fa-instagram" /> {/* Instagram İkonu */}
                        <FontAwesomeIcon icon="fa-brands fa-twitter" /> {/* Twitter İkonu */}
                    </div>
                </div>

                {/* Şirket Bilgileri ve Özellikler Bölümü */}
                <div className='flex md:flex-col md:gap-10 flex-wrap'>
                    
                    {/* Şirket Bilgileri */}
                    <div className="w-[250px]">
                        <h3 className='footer-titles'>Company info</h3>
                        <ul className='flex flex-col gap-2 text-gray'>
                            <li>About Us</li> {/* Hakkımızda */}
                            <li>Carrier</li> {/* Kariyer */}
                            <li>We are hiring</li> {/* İşe alım sayfası */}
                            <li>Blog</li> {/* Blog sayfası */}
                        </ul>
                    </div>

                    {/* Özellikler Bölümü */}
                    <div className="w-[250px]">
                        <h3 className='footer-titles'>Features</h3>
                        <ul className='flex flex-col gap-2 text-gray'>
                            <li>Bussiness Marketing</li> {/* İş pazarlama */}
                            <li>User Analytic</li> {/* Kullanıcı analitikleri */}
                            <li>Live Chat</li> {/* Canlı sohbet */}
                            <li>Unlimited Support</li> {/* Sınırsız destek */}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Telif Hakkı ve Kapanış Bölümü */}
            <div className='w-full flex justify-center items-center text-center py-3 text-sm text-gray leading-6 font-bold bg-light-gray-1'>
                Made With Love By Figmaland All Right Reserved {/* Telif hakkı metni */}
            </div>
        </div>
    );
}
