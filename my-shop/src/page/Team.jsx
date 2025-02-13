import { memberDataBig } from "../mock/memberData";
import TeamMemberCard from "../components/TeamMemberCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Team() {
    return (
        <>
            {/* Başlık Bölümü */}
            <section className="w-screen flex flex-col items-center py-[50px] gap-4 px-2">
                <p className="font-bold leading-6 text-gray">WHAT WE DO</p>
                <h2 className="font-bold leading-20 text-4xl md:text-6xl text-main text-center">
                    Innovation tailored for you
                </h2>
                <div className="flex items-center gap-4">
                    <p className="text-sm text-main">Home</p>
                    <p className="text-gray font-thin text-4xl">{">"}</p>
                    <p className="text-sm text-gray">Team</p>
                </div>
            </section>

            {/* Takım Görselleri Bölümü */}
            <section className="w-screen">
                <div className="mx-auto max-w-[1440px] flex md:flex-col gap-3">
                    <div className="flex-1">
                        <img src="./img/team-3.svg" alt="Team Member 3" loading="lazy" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 flex gap-3">
                        <div className="flex-1 flex justify-between flex-wrap gap-3">
                            <img src="./img/team-1.svg" alt="Team Member 1" loading="lazy" className="object-cover flex-1" />
                            <img src="./img/team-4.svg" alt="Team Member 4" loading="lazy" className="object-cover flex-1" />
                        </div>
                        <div className="flex-1 flex justify-between flex-wrap gap-3">
                            <img src="./img/team-2.svg" alt="Team Member 2" loading="lazy" className="object-cover flex-1" />
                            <img src="./img/team-5.svg" alt="Team Member 5" loading="lazy" className="object-cover flex-1" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Takım Üyeleri Bölümü */}
            <section className="w-screen">
                <div className="max-w-page-content mx-auto flex flex-col pb-[112px]">
                    <div className="py-[112px] text-center">
                        <h2 className="font-bold text-4xl md:text-4.5xl leading-12.5">Meet Our Team</h2>
                    </div>
                    <div className="flex flex-wrap gap-x-[30px] gap-y-[112px] justify-center">
                        {memberDataBig.map((item, index) => (
                            <TeamMemberCard key={index} data={item} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Ücretsiz Deneme Bölümü */}
            <section className="w-screen py-[80px] px-3 text-center">
                <div className="max-w-page-content mx-auto flex flex-col gap-[30px] items-center">
                    <h4 className="text-main text-4xl md:text-4.5xl leading-12.5">Start your 14 days free trial</h4>
                    <p className="text-gray text-sm leading-5 text-center max-w-[406px]">
                        Met minim Mollie non desert Alamo est sit cliquey dolor
                        do met sent. RELIT official consequent.
                    </p>
                    <div>
                        <button className="px-10 py-4 bg-primary-blue rounded text-white">Try it free now</button>
                    </div>
                    {/* Sosyal Medya Bağlantıları */}
                    <div className="p-2.5 flex gap-[34px]">
                        <FontAwesomeIcon className="text-[30px] text-[#55ACEE]" icon="fa-brands fa-twitter" aria-label="Twitter" />
                        <FontAwesomeIcon className="text-[30px] text-[#395185]" icon="fa-brands fa-facebook" aria-label="Facebook" />
                        <FontAwesomeIcon className="text-[30px] text-black" icon="fa-brands fa-instagram" aria-label="Instagram" />
                        <FontAwesomeIcon className="text-[30px] text-[#0A66C2]" icon="fa-brands fa-linkedin" aria-label="LinkedIn" />
                    </div>
                </div>
            </section>
        </>
    );
}
