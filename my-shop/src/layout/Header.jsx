import { useState } from 'react'; // useState hook'unu içe aktarıyoruz.
import { useHistory } from 'react-router-dom'; // Sayfa yönlendirme için useHistory hook'unu içe aktarıyoruz.

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Açılır menünün açık/kapalı durumunu yönetmek için state.
  const history = useHistory(); // Sayfa yönlendirmesi için useHistory hook'unu kullanıyoruz.

  // Menüye tıklanınca sayfa yönlendirmesi ve menüyü kapatma işlemi yapılır.
  const handleNavigation = (path) => {
    setIsMenuOpen(false); // Menü kapatılır.
    history.push(path); // Belirtilen path'e yönlendirme yapılır.
  };

  return (
    <>
      {/* Navbar alanı */}
      <nav className="bg-transparent px-4 py-2 flex items-center justify-between">
        {/* Sol Taraf: Logo veya başlık */}
        <div className="text-xl font-bold">Bandage</div>

        {/* Sağ Taraf: Arama, alışveriş ve menü butonu */}
        <div className="flex items-center gap-4">
          {/* Arama ikonu */}
          <img src='/icons/search.svg' alt="Search" className="w-6 h-6 cursor-pointer" />

          {/* Alışveriş sepeti ikonu */}
          <img src="/icons/shopping-cart.svg" alt="Shopping" className="w-6 h-6 cursor-pointer" />

          {/* Menü butonu (Align Right ikonlu) */}
          <button
            className="text-white hover:text-gray-400 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)} // Menü aç/kapat işlevi
          >
            <img src="/icons/align-right.svg" alt="Menu" className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Açılır Menü */}
      {isMenuOpen && (
        <div className="bg-gray-50 w-full py-4 flex flex-col">
          {/* Menü öğeleri */}
          <ul className='flex flex-col flex-wrap content-center gap-8 text-3xl'>
            <li>
              {/* Ana Sayfa */}
              <button
                onClick={() => handleNavigation('/')}
                className="text-secondText"
              >
                Home
              </button>
            </li>
            <li>
              {/* Ürünler Sayfası */}
              <button
                onClick={() => handleNavigation('/product')}
                className="text-secondText"
              >
                Product
              </button>
            </li>
            <li>
              {/* Fiyatlandırma Sayfası */}
              <button
                onClick={() => handleNavigation('/pricing')}
                className="text-secondText"
              >
                Pricing
              </button>
            </li>
            <li>
              {/* İletişim Sayfası */}
              <button
                onClick={() => handleNavigation('/contact')}
                className="text-secondText"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar; // Navbar bileşeni dışa aktarılıyor.
