import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import { Switch, Route, Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, initializeUser } from "./store/actions/clientActions";
import { fetchCategories, fetchProducts } from "./store/actions/productActions";
import PrivateRoute from "./components/PrivateRoute";

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

import { Loader2 } from "lucide-react";

import "react-toastify/dist/ReactToastify.css";

import PreviousOrdersPage from "./pages/PreviousOrdersPage";
import PricingPage from "./pages/PricingPage";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { isLoading, error } = useSelector((state) => state.client);
  const { productList, fetchState } = useSelector((state) => state.product);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <div>
      <ToastContainer />
      <Header />
      {isLoading && (
        <div className="bg-white">
          <Loader2 className="mr-2 h-4 w-4 inline animate-spin" />
          Loading...
        </div>
      )}
      {error && <div className="bg-white">Error: {error}</div>}
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
      <Footer />
    </div>
  );
}

export default App;
