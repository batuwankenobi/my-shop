import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router v6 için useNavigate kullanıyoruz

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Menü açık/kapalı durumu
    const navigate = useNavigate(); // Sayfa yönlendirmeleri için kullanılır

    // Menüdeki bir butona tıklanınca çalışacak fonksiyon
    const handleNavigation = (path) => {
        setIsMenuOpen(false); // Menü kapansın
        navigate(path); // İlgili sayfaya yönlendir
    };

    return (
        <>
            {/* Navbar Bölümü */}
            <nav className="bg-transparent px-8 flex items-center justify-between py-8">
                
                {/* Sol Taraf - Logo veya Marka İsmi */}
                <div className="text-xl font-bold">Bandage</div>

                {/* Sağ Taraf - Açılır Menü Butonu */}
                <div className="flex items-center gap-4">
                    <button
                        className="text-white hover:text-gray-400 focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)} // Menü aç/kapa
                    >
                        <img src="/icons/align-right.svg" alt="Menu" className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            {/* Açılır Menü */}
            {isMenuOpen && (
                <div className="bg-gray-50 w-full py-4 flex flex-col">
                    
                    {/* Menü İçeriği - Sayfa Linkleri */}
                    <ul className="flex flex-col flex-wrap content-center gap-8 text-3xl text-center">
                        <li>
                            <button onClick={() => handleNavigation('/')} className="font-bold">
                                Home
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleNavigation('/shop')} className="text-secondText">
                                Shop
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleNavigation('/about')} className="text-secondText">
                                About
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleNavigation('/blog')} className="text-secondText">
                                Blog
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleNavigation('/contact')} className="text-secondText">
                                Contact
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleNavigation('/pages')} className="text-secondText">
                                Pages
                            </button>
                        </li>
                    </ul>

                    {/* Kullanıcı Giriş ve Kayıt Butonları */}
                    <div>
                        <div className="text-3xl text-blueText flex justify-center py-4">
                            <img src='/icons/user.svg' alt="User Icon" className="fill-current text-blueText" />
                            <button onClick={() => handleNavigation('/login')}>Login /</button>
                            <button onClick={() => handleNavigation('/register')}>Register</button>
                        </div>

                        {/* Arama, Sepet ve Beğeni Butonları */}
                        <div className="flex flex-col justify-center items-center conta gap-4 py-4">
                            {/* Arama Butonu */}
                            <button onClick={() => handleNavigation('/search')}>
                                <img src="/icons/search.svg" alt="Search" />
                            </button>

                            {/* Alışveriş Sepeti Butonu */}
                            <button onClick={() => handleNavigation('/shopcard')}>
                                <img src="/icons/shopping-cart.svg" alt="Shopping Cart" />
                            </button>

                            {/* Beğenilenler Butonu */}
                            <button onClick={() => handleNavigation('/like')}>
                                <img src="/icons/heart.svg" alt="Like" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
