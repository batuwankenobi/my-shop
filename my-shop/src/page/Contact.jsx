import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // FontAwesome ikonları
import ContactCard from '../components/ContactCard'; // İletişim kartı bileşeni
import { contactCardData } from '../mock/contactCardData'; // İletişim kartları için mock verisi

export default function Contact() {
    return (
        <>
            {/* İletişim Sayfası Hero Bölümü */}
            <section className="w-screen">
                <div className="max-w-page-content mx-auto flex lg:flex-col lg:text-center lg:gap-[180px] lg:pt-[140px] justify-between xl:justify-center items-center">
                    
                    {/* Sol Taraf - İletişim Bilgileri */}
                    <div className="flex flex-col gap-[35px] max-w-[400px]">
                        <h4 className="font-bold leading-6 text-main">CONTACT US</h4>
                        <h1 className="font-bold text-6xl leading-20 text-main">
                            Get in touch today!
                        </h1>
                        <p className="text-gray text-xl leading-7.5 max-w-[376px]">
                            We know how large objects will act, but things on a small scale.
                        </p>
                        <div className="text-main font-bold text-2xl leading-8 flex flex-col gap-5">
                            <p>Phone: +451 215 215</p>
                            <p>Fax: +451 215 215</p>
                        </div>
                        {/* Sosyal Medya İkonları */}
                        <div className='flex gap-[34px] text-[30px] text-main lg:justify-center'>
                            <FontAwesomeIcon icon="fa-brands fa-twitter" />
                            <FontAwesomeIcon icon="fa-brands fa-facebook" />
                            <FontAwesomeIcon icon="fa-brands fa-instagram" />
                            <FontAwesomeIcon icon="fa-brands fa-linkedin" />
                        </div>
                    </div>

                    {/* Sağ Taraf - İletişim Hero Görseli */}
                    <div className="lg:w-full lg:overflow-hidden">
                        <img src="./img/contact-hero.svg" className="max-w-[632px] max-h-[612px] lg:w-full mr-[-128px] lg:mx-auto" />
                    </div>
                </div>
            </section>

            {/* Ofisler Bölümü */}
            <section className='w-screen'>
                <div className='max-w-page-content mx-auto flex flex-col items-center py-[112px] gap-20'>

                    {/* Başlık Bölümü */}
                    <div className='text-main text-center flex flex-col gap-2.5 '>
                        <h3 className='text-sm leading-5'>VISIT OUR OFFICE</h3>
                        <h2 className='font-bold text-4.5xl leading-12.5 max-w-[555px]'>
                            We help small businesses with big ideas
                        </h2>
                    </div>

                    {/* Ofis Kartları */}
                    <div className='flex flex-wrap justify-center'>
                        {contactCardData.map((item, index) => {
                            return <ContactCard key={index} data={item} index={index} />;
                        })}
                    </div>
                </div>
            </section>

            {/* Bize Ulaşın - Çağrı Bölümü */}
            <section className='w-screen'>
                <div className='max-w-page-content mx-auto flex flex-col items-center font-bold text-main py-20 relative gap-4'>

                    {/* Dekoratif Ok İşareti */}
                    <img className='absolute left-[45%] top-[-15px]' src="./img/contact-arrow.svg" />

                    {/* Metin İçeriği */}
                    <h3 className='leading-6'>WE Can&apos;t WAIT TO MEET YOU</h3>
                    <h2 className='text-6xl leading-20'>Let’s Talk</h2>

                    {/* Çağrı Butonu */}
                    <div>
                        <button className='text-white text-sm leading-5.5 bg-primary-blue rounded px-10 py-4'>
                            Try it free now
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
