import { useState } from "react"; // React state yönetimi için
import { useSelector, useDispatch } from "react-redux"; // Redux'tan state çekmek ve aksiyonları dispatch etmek için
import { useHistory, Link } from "react-router-dom"; // Sayfa yönlendirme işlemleri için
import { Button } from "../components/ui/button"; // UI buton bileşeni
import {
  AlignRight, // Mobil menü açma ikonu
  Heart, // Favoriler ikonu
  Search, // Arama ikonu
  UserRound, // Kullanıcı giriş ikonu
  ChevronDown, // Açılır menü oku
} from "lucide-react";
import { setUser } from "../store/actions/clientActions"; // Kullanıcı bilgilerini temizlemek için Redux aksiyonu
import { toast } from "react-toastify"; // Bildirim göstermek için
import CategoryDropdown from "../components/CategoryDropdown"; // Kategori seçim bileşeni
import Cart from "../components/Cart"; // Sepet bileşeni
import {
  DropdownMenu, // Açılır menü bileşeni
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobil menü açık mı kapalı mı state'i
  const dispatch = useDispatch();
  const history = useHistory();

  // Redux'tan kullanıcı bilgilerini al
  const user = useSelector((state) => state.client.user);

  // Kullanıcı çıkış yapma işlemi
  const handleLogout = () => {
    dispatch(setUser({})); // Redux'taki kullanıcı bilgisini temizle
    localStorage.removeItem("authToken"); // localStorage'dan auth token'ı sil
    localStorage.removeItem("user"); // localStorage'dan kullanıcı bilgilerini sil
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("user");
    localStorage.removeItem("hasVisitedBefore");
    sessionStorage.removeItem("hasVisitedBefore");

    // Kullanıcıyı giriş sayfasına yönlendir
    history.push("/login");
    
    // Başarı bildirimi göster
    toast.success("Logout successful!", {
      autoClose: 3000,
    });
  };

  return (
    <header className="bg-white shadow w-screen">
      <div className="container max-w-[85vw] md:max-w-75vw mx-auto px-4 py-4 md:py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="text-xl md:text-2xl font-bold">
          🦕 Unser Shop
          </a>

          {/* Mobil menü butonu */}
          <div className="xl:hidden flex space-x-6">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <AlignRight />
            </button>
          </div>

          {/* Masaüstü navigasyon */}
          <div className="hidden xl:flex flex-row items-center space-x-2 xl:space-x-4 text-light-gray font-semibold">
            <CategoryDropdown />
            <a href="/about">About</a>
            <a href="/pricing">Pricing</a>
            <a href="/contact">Contact</a>
            <a href="/team">Team</a>
          </div>

          {/* Masaüstü kullanıcı işlemleri */}
          <div className="hidden xl:flex items-center space-x-4 text-primary-color font-semibold">
            {user.name ? (
              <div className="flex items-center space-x-4">
                <img
                  src={user.avatarUrl}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex cursor-pointer">
                      <span className="text-md">{user.name}</span>
                      <ChevronDown className="ml-1 mt-1 h-5 w-5" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="text-primary-color font-semibold">
                    <DropdownMenuItem
                      onSelect={() => history.push("/previous-orders")}
                    >
                      Previous Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <a href="/login">
                <UserRound className="inline" />
                Login / Signup
              </a>
            )}
            <a href="#search">
              <Search />
            </a>
            <Cart />
            <a href="#favorites">
              <Heart />
            </a>
          </div>
        </div>

        {/* Mobil menü */}
        {isMenuOpen && (
          <div className="xl:hidden mt-4">
            <nav className="flex flex-col items-center justify-center space-y-4">
              <CategoryDropdown />
              <a href="/about" className="text-light-gray font-semibold">
                About
              </a>
              <a href="/pricing" className="text-light-gray font-semibold">
                Pricing
              </a>
              <a href="/contact" className="text-light-gray font-semibold">
                Contact
              </a>
              <a href="/team" className="text-light-gray font-semibold">
                Team
              </a>
            </nav>
            <div className="flex flex-col items-center space-y-4 mt-4 pt-4 border-t border-slate-300 text-primary-color font-semibold">
              <div className="flex flex-row items-center space-x-4">
                <a href="#search">
                  <Search />
                </a>
                <Cart />
                <a href="#favorites">
                  <Heart />
                </a>
              </div>
              {user.name ? (
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex flex-row items-center space-x-4">
                    <img
                      src={user.avatarUrl}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="p-2 flex">
                          <span>{user.name}</span>
                          <ChevronDown className="ml-1 mt-1 h-4 w-4" />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="text-primary-color font-semibold">
                        <DropdownMenuItem
                          onSelect={() => history.push("/previous-orders")}
                        >
                          Previous Orders
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={handleLogout}>
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ) : (
                <a href="/login" className="text-primary-color font-semibold">
                  <UserRound className="inline" />
                  Login / Signup
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
