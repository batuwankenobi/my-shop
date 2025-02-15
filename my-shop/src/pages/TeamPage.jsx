import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  ChevronRight,
} from "lucide-react"; // Sosyal medya ve breadcrumb ikonları
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb"; // UI breadcrumb bileşeni
import { Button } from "@/components/ui/button"; // UI buton bileşeni

// 🏆 Takım Üyeleri Listesi
const teamMembers = [
  {
    name: "Batuhan Bartu BEBEK",
    role: "Full Stack Developer",
    image: "/batubbb.jpg",
  },
  {
    name: "Gökhan Özdemir",
    role: "Scrum Master",
    image: "/gokhan_ozdemir.jpeg",
  },
  {
    name: "Username",
    role: "Profession",
    image: "/team-1-user-3.jpg",
  },
];

// 🏢 `TeamPage`: Takım sayfası bileşeni
const TeamPage = () => {
  return (
    <div className="bg-gray-50">
      {/* 🏷 Başlık ve Breadcrumb */}
      <section className="text-center pt-16 pb-12 max-w-[85vw] md:max-w-75vw mx-auto">
        <p className="uppercase text-gray-500 font-medium">What we do</p>
        <h1 className="text-5xl font-bold text-gray-800 my-4">
          Innovation tailored for you
        </h1>
        <Breadcrumb className="flex flex-row justify-center">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <ChevronRight />
          <BreadcrumbItem>
            <BreadcrumbLink href="/team" className="font-bold">
              Team
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </section>

      {/* 🖼 Takım Görselleri Izgarası */}
      <section className="grid gap-4 py-2 grid-cols-2 grid-rows-4 md:grid-cols-4 md:grid-rows-4">
        {[
          "/teamup5.jpg",
          "/teamup2.jpg",
          "/teamup3.jpg",
          "/teamup6.jpg",
          "/teamup1.jpg",
        ].map((src, index) => (
          <div
            key={index}
            className={`relative ${
              index === 0 ? "col-span-2 row-span-2 md:row-span-4" : "row-span-2"
            }`}
          >
            <img
              src={src}
              alt={`Team Up ${index + 1}`}
              className="w-full h-full object-cover aspect-[1/1]"
            />
          </div>
        ))}
      </section>

      {/* 👥 Takım Üyeleri */}
      <section className="text-center py-12 max-w-75vw mx-auto">
        <h2 className="text-3xl font-bold text-gray-800">Meet Our Team</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg pb-6 flex flex-col items-center">
              <div className="w-48 h-48 overflow-hidden rounded-full">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover aspect-square"
                />
              </div>
              <h3 className="text-xl font-bold mt-4">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
              <div className="flex space-x-4 mt-4">
                <Facebook className="text-primary-color cursor-pointer" />
                <Instagram className="text-primary-color cursor-pointer" />
                <Twitter className="text-primary-color cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🚀 CTA Bölümü */}
      <section className="bg-gray-100 py-16 text-center max-w-75vw mx-auto">
        <h3 className="text-2xl font-bold">Start your 14 days free trial</h3>
        <p className="text-gray-600 mt-2 mb-4">
          Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
        </p>
        <Button>Try it free now</Button>
        <div className="flex justify-center space-x-6 mt-6">
          <Twitter className="text-primary-color cursor-pointer" />
          <Facebook className="text-primary-color cursor-pointer" />
          <Instagram className="text-primary-color cursor-pointer" />
          <Linkedin className="text-primary-color cursor-pointer" />
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
