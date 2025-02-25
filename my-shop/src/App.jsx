import "./App.css";
import { ToastContainer, toast } from "react-toastify"; // Bildirimler için react-toastify kullanılıyor
import { Switch, Route, Link } from "react-router-dom"; // React Router kullanılarak sayfa yönlendirmeleri sağlanıyor
import { useHistory, useLocation } from "react-router-dom"; // Geçmiş ve konum bilgisi için hooklar ekleniyor
import { useEffect } from "react"; // useEffect ile yan etkiler (side effects) yönetiliyor
import { useDispatch, useSelector } from "react-redux"; // Redux ile state yönetimi sağlanıyor
import { setUser, initializeUser } from "./store/actions/clientActions"; // Kullanıcı işlemleri için aksiyonlar çağırılıyor
import { fetchCategories, fetchProducts } from "./store/actions/productActions"; // Ürün ve kategori verilerini getirmek için aksiyonlar
import PrivateRoute from "./components/PrivateRoute"; // Özel (yetkili kullanıcılar için) yönlendirme bileşeni

// Sayfa bileşenleri içe aktarılıyor
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetail from "./pages/ProductDetail";
import ContactPage from "./pages/ContactPage";
import TeamPage from "./pages/TeamPage";
import AboutPage from "./pages/AboutPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderPage from "./pages/OrderPage";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import PreviousOrdersPage from "./pages/PreviousOrdersPage";
import PricingPage from "./pages/PricingPage";

import { Loader2 } from "lucide-react"; // Yükleme simgesi
import "react-toastify/dist/ReactToastify.css"; // React-toastify için gerekli CSS dosyası

function App() {
  const dispatch = useDispatch(); // Redux aksiyonlarını çağırmak için kullanılıyor
  const history = useHistory(); // Sayfa yönlendirmeleri için
  const location = useLocation(); // Mevcut sayfanın URL bilgisini almak için

  // Redux store'dan kullanıcı ve ürün bilgilerini çekiyoruz
  const { isLoading, error } = useSelector((state) => state.client);
  const { productList, fetchState } = useSelector((state) => state.product);

  useEffect(() => {
    console.log("App useEffect running");
    // Kullanıcının giriş yapıp yapmadığını kontrol etmek için token bilgisi alınıyor
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    const hasVisitedBefore =
      localStorage.getItem("hasVisitedBefore") ||
      sessionStorage.getItem("hasVisitedBefore");

    if (token) {
      // Kullanıcı giriş yaptıysa ziyaret edildi bilgisini kaydet
      localStorage.setItem("hasVisitedBefore", "true");
      dispatch(initializeUser()); // Kullanıcı bilgilerini Redux store'a yükle
    }

    // Eğer kullanıcı ilk defa ziyaret ediyorsa ve giriş yapmamışsa, giriş sayfasına yönlendir
    if (!token && !hasVisitedBefore && location.pathname === "/") {
      sessionStorage.setItem("hasVisitedBefore", "true");
      history.push("/login");
      toast.info(
        "Welcome visitor! Please log in to make the most of your experience.",
        { autoClose: 3000, theme: "colored" }
      );
    } else {
      // Ziyaret edildi olarak işaretle
      sessionStorage.setItem("hasVisitedBefore", "true");
    }

    dispatch(fetchCategories()); // Kategori verilerini Redux store'a çek
  }, []);

  useEffect(() => {
    // Sayfa değiştiğinde en üste kaydır
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <div>
      {/* Toast bildirimi göstermek için */}
      <ToastContainer />
      {/* Sayfa üst menüsü */}
      <Header />

      {/* Yüklenme durumu */}
      {isLoading && (
        <div className="bg-white">
          <Loader2 className="mr-2 h-4 w-4 inline animate-spin" />
          Loading...
        </div>
      )}
      {/* Hata mesajı */}
      {error && <div className="bg-white">Error: {error}</div>}

      {/* Sayfa yönlendirme yapısı */}
      <Switch>
        <Route
          path="/shop/:gender/:categoryName/:categoryId/:nameSlug/:productId"
          component={ProductDetail}
        />
        <Route
          exact
          path="/shop/:gender/:categoryName/:categoryId"
          component={ShopPage}
        />
        <Route exact path="/shop" component={ShopPage} />
        <Route exact path="/" component={HomePage} />

        <Route path="/checkout" component={CheckoutPage} />
        <PrivateRoute path="/order" component={OrderPage} />
        <PrivateRoute path="/previous-orders" component={PreviousOrdersPage} />

        <Route path="/pricing" component={PricingPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/team" component={TeamPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>

      {/* Sayfa alt menüsü */}
      <Footer />
    </div>
  );
}

export default App;
