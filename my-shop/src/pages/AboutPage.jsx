import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";
import BrandLogos from "../components/BrandLogos";

const teamMembers = [
  {
    name: "Username",
    role: "Profession",
    image: "https://placehold.co/400x250/thistle/white",
  },
  {
    name: "Username",
    role: "Profession",
    image: "https://placehold.co/400x250/thistle/white",
  },
  {
    name: "Username",
    role: "Profession",
    image: "https://placehold.co/400x250/thistle/white",
  },
];
const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="max-w-[85vw] md:max-w-75vw mx-auto py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-md text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4">ABOUT US</h1>
            <p className="text-light-gray font-semibold mb-4">
              We know how large objects will act, but things on a small scale
            </p>
            <Button>Get Quote Now</Button>
          </div>
          <div className="max-w-md mb-8 md:mb-0">
            <img src="/none.png" alt="Placeholder" />
          </div>
        </div>
      </section>
      {/* Statistics Section */}
      <section className="max-w-[85vw] md:max-w-75vw mx-auto py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-text-color">15K</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-text-color">150K</div>
            <div className="text-gray-600">Monthly Visitors</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-text-color">15</div>
            <div className="text-gray-600">Countries Worldwide</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-text-color">100+</div>
            <div className="text-gray-600">Top Partners</div>
          </div>
        </div>
      </section>
      {/* Video Section */}
      <section className="max-w-[85vw] md:max-w-75vw mx-auto bg-gray-100 py-12">
  <div className="container mx-auto justify-center object-contain">
    <video
      src="/aboutus.mp4"  // Video dosyanızın yolu (public klasöründe)
      controls           // Kullanıcı oynatma/durdurma yapabilir
      autoPlay           // Sayfa yüklendiğinde otomatik başlat (isteğe bağlı)
      loop               // Sürekli oynat (isteğe bağlı)
      muted              // Sessiz başlat (isteğe bağlı)
      className="w-full h-auto" // Responsive video boyutu
    >
      Tarayıcınız video etiketini desteklemiyor.
    </video>
  </div>
</section>


      {/* Big Companies Section */}
      <section className="bg-gray w-screen py-12">
        <div className="container mx-auto max-w-[85vw] md:max-w-75vw">
          <h2 className="text-3xl font-bold mb-8">Big Companies Are Here</h2>
          <p className="text-light-gray font-semibold m-4">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics
          </p>
        </div>
        <BrandLogos />
      </section>
      {/* "Now Let's grow Yours" Section */}
      <section className="bg-blue-500 text-white mb-4">
        <div className="container ml-auto mr-0 flex items-center justify-between">
          <div className="max-w-md p-12">
            <p className="font-bold mb-6">WORK WITH US</p>
            <h2 className="text-3xl font-bold mb-6">Now Let's Grow Yours</h2>
            <p className="mb-6">
              The grateful accumulation of information about clients and
              small-scale behavior during the first quarter of the 20th.
            </p>
            <Button variant="ghost" className="border-1 border-white">
              Contact
            </Button>
          </div>
          <div className="hidden md:block max-h-full justify-center">
  <img
    src="/growyourteam.jpg"
    alt="Grow Your Team"
    className="w-[500px] h-auto max-w-s-sm mx-auto rounded-xl"
  />
</div>

        </div>
      </section>
    </div>
  );
};

export default AboutPage;
