import { useRef, useState } from "react";
import AboutUsHero from "../components/AboutUsHero"; // Hero bileşeni (başlangıç bölümü)
import Clients from "../components/Clients"; // Müşteri / iş ortakları bileşeni
import TeamMemberCard from "../components/TeamMemberCard"; // Takım üyesi kart bileşeni
import { memberDataSmall } from "../mock/memberData"; // Takım üyesi verisi

export default function AboutUs() {
    const videoRef = useRef(); // Video bileşenine erişmek için useRef kullanıyoruz
    const [playButtonShown, setPlayButtonShown] = useState(true); // Video oynat/durdur butonunun durumunu kontrol ediyoruz

    // Video oynatma / durdurma fonksiyonu
    const handleVideo = () => {
        playButtonShown ? videoRef.current.play() : videoRef.current.pause();
        setPlayButtonShown(!playButtonShown);
    };

    return (
        <>
            {/* Sayfa üst banner bölümü */}
            <AboutUsHero />

            {/* Hakkımızda - Tanıtım Bölümü */}
            <section className="w-screen">
                <div className="max-w-page-content px-2 flex md:flex-col md:text-center justify-between items-center mx-auto my-0 gap-[60px] py-6 md:py-20">
                    <div className="flex flex-col gap-6 max-w-[400px] py-6 md:items-center">
                        <h4 className="text-[#E74040] text-sm leading-5">Problems trying</h4>
                        <p className="text-main font-bold text-2xl leading-8">
                            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
                        </p>
                    </div>
                    <div className="md:max-w-[50%]">
                        <p className="text-gray text-sm leading-5">
                            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics.
                        </p>
                    </div>
                </div>
            </section>

            {/* İstatistik Bölümü */}
            <section className="w-screen">
                <div className="max-w-page-content flex md:flex-col justify-around mx-auto my-0 gap-[30px] md:gap-[100px] py-[80px]">
                    <div className="font-bold flex flex-col items-center">
                        <p className="text-main text-6xl leading-20">15K</p>
                        <p className="text-gray leading-6">Happy Customers</p>
                    </div>
                    <div className="font-bold flex flex-col items-center">
                        <p className="text-main text-6xl leading-20">150K</p>
                        <p className="text-gray leading-6">Monthly Visitors</p>
                    </div>
                    <div className="font-bold flex flex-col items-center">
                        <p className="text-main text-6xl leading-20">15</p>
                        <p className="text-gray leading-6">Countries Worldwide</p>
                    </div>
                    <div className="font-bold flex flex-col items-center">
                        <p className="text-main text-6xl leading-20">100+</p>
                        <p className="text-gray leading-6">Top Partners</p>
                    </div>
                </div>
            </section>

            {/* Video Bölümü */}
            <div className="relative max-w-[1000px] px-3 my-[115px] max-h-[540px] mx-auto cursor-pointer" onClick={handleVideo}>
                <video ref={videoRef} className="relative z-10 rounded-3xl" poster="./img/video-thumb.png">
                    <source src="about-us-video.mp4" type="video/mp4" />
                </video>
                {/* Oynatma / Durdurma Butonu */}
                <button className={"left-0 right-0 top-0 bottom-0 text-center mx-auto my-auto w-[7%] aspect-square bg-cover absolute z-20 bg-[url('./img/video-start-button.svg')] " + (playButtonShown ? "block" : "hidden")}></button>
            </div>

            {/* Takım Üyeleri Bölümü */}
            <section className="w-screen">
                <div className="max-w-page-content mx-auto my-0 flex flex-col items-center py-[112px] gap-[112px]">
                    <div className="flex flex-col gap-2.5">
                        <h3 className="text-center text-4.5xl text-main font-bold leading-12.5">Meet Our Team</h3>
                        <p className="text-center text-sm text-gray leading-5">
                            Problems trying to resolve the conflict between <br />
                            the two major realms of Classical physics: Newtonian mechanics
                        </p>
                    </div>
                    {/* Takım Üyesi Kartları */}
                    <div className="flex flex-wrap justify-center gap-[30px]">
                        {memberDataSmall.map((item, index) => {
                            return <TeamMemberCard key={index} data={item} />;
                        })}
                    </div>
                </div>
            </section>

            {/* İş Ortakları Bölümü */}
            <section className="w-screen bg-light-gray-1 pb-20">
                <div className="max-w-page-content flex flex-col pt-20 mx-auto my-0">
                    <div className="flex flex-col gap-[30px] pb-6 text-center items-center">
                        <h2 className="text-main font-bold text-4.5xl leading-12.5 sm:w-[55%]">Big Companies Are Here</h2>
                        <p className="text-gray text-sm leading-5 sm:w-[70%]">
                            Problems trying to resolve the conflict between <br className="sm:hidden" />
                            the two major realms of Classical physics: Newtonian mechanics.
                        </p>
                    </div>
                </div>
                {/* İş Ortakları Bileşeni */}
                <Clients />
            </section>

            {/* İş Birliği Çağrısı Bölümü */}
            <section className="w-screen bg-[#2A7CC7] ">
                <div className="max-w-[1440px] mx-auto flex h-[637px] gap-5 justify-between items-center pl-[10%] md:pl-0 md:text-center md:justify-center">
                    <div className="text-white flex flex-col gap-6 my-[195px]">
                        <p className="font-bold leading-6">WORK WITH US</p>
                        <h3 className="font-bold leading-12.5 text-4.5xl">Now Let’s grow Yours</h3>
                        <p className="text-sm leading-5 max-w-[450px]">
                            The gradual accumulation of information about atomic and small-scale behavior during the first quarter of the 20th.
                        </p>
                        <div>
                            <button className="px-[38px] py-[14px] border border-white rounded">Button</button>
                        </div>
                    </div>
                    {/* Sağ Tarafta Görsel */}
                    <div className="h-full md:hidden">
                        <img src="./img/about-us-1.svg" className="h-full object-cover" />
                    </div>
                </div>
            </section>
        </>
    );
}
