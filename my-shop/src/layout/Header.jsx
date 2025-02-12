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
        {/* Navbar bölümü */}
        <nav className="bg-transparent px-8 flex items-center justify-between py-8">
            
            {/* Sol Taraf - Logo veya Marka İsmi */}
            <div className="text-xl font-bold">Bandage</div>

            {/* Sağ Taraf - Menü butonu */}
            <div className="flex items-center gap-4">
                <button
                    className="text-white hover:text-gray-400 focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {/* Menü açma/kapatma butonu */}
                    <img src="/icons/align-right.svg" alt="Menu" className="w-6 h-6" />
                </button>
            </div>
        </nav>

        {/* Açılır Menü Bölümü */}
        {isMenuOpen && (
            <div className="bg-gray-50 w-full py-4 flex flex-col">
                
                {/* Menü İçeriği - Sayfa Linkleri */}
                <ul className='flex flex-col flex-wrap content-center gap-8 text-3xl text-center'>
                    <li>
                        <button
                            onClick={() => handleNavigation('/')}
                            className="font-bold"
                        >
                            Home
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleNavigation('/shop')}
                            className="text-secondText"
                        >
                            Shop
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleNavigation('/About')}
                            className="text-secondText"
                        >
                            About
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleNavigation('/Blog')}
                            className="text-secondText"
                        >
                            Blog
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleNavigation('/contact')}
                            className="text-secondText"
                        >
                            Contact
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleNavigation('/Pages')}
                            className="text-secondText"
                        >
                            Pages
                        </button>
                    </li>
                </ul>

                {/* Kullanıcı Giriş ve Kayıt Butonları */}
                <div>
                    <div className='text-3xl text-blueText flex justify-center py-4'>
                        {/* Kullanıcı ikonu */}
                        <img src='/icons/user.svg' alt='Kullanıcı' className='fill-current text-blueText' />
                        <button onClick={() => handleNavigation('/login')}>
                            Login /
                        </button>
                        <button onClick={() => handleNavigation('/register')}>
                            Register
                        </button>
                    </div>

                    {/* Arama, Sepet ve Beğeni Butonları */}
                    <div className='flex flex-col justify-center items-center conta gap-4 py-4'>
                        
                        {/* Arama Butonu */}
                        <button onClick={() => handleNavigation('/search')}>
                            <img src='/icons/search.svg' alt='search' />
                        </button>

                        {/* Alışveriş Sepeti Butonu */}
                        <button onClick={() => handleNavigation('/shopcard')}>
                            <img src='/icons/shopping-cart.svg' alt='shoppingcart' />
                        </button>

                        {/* Beğenilenler Butonu */}
                        <button onClick={() => handleNavigation('/like')}>
                            <img src='/icons/heart.svg' alt='like' />
                        </button>

                    </div>
                </div>
            </div>
        )}
    </>
);
};

export default Navbar;