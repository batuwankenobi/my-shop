import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import TeamPage from "./pages/TeamPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import Layout from "./layout/Layout.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts, verifyToken } from "./redux/actions/thunkActions.js";
import PrivateRoute from "./components/privateRoute.jsx";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    verifyToken(dispatch);
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Layout>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="products/:id" element={<ProductPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="about" element={<AboutPage />} />

          <Route
            path="signup"
            element={<PrivateRoute element={SignUpPage} redirectTo="/" />}
          />
          <Route
            path="login"
            element={<PrivateRoute element={LoginPage} redirectTo="/" />}
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
