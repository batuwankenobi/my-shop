import React from "react";
import { Route, Redirect } from "react-router-dom"; // React Router'dan yönlendirme bileşenleri
import { toast } from "react-toastify"; // Bildirim göstermek için Toastify kullanılıyor

// Özel korumalı rota bileşeni (Sadece giriş yapmış kullanıcılar erişebilir)
const PrivateRoute = ({ component: Component, render, ...rest }) => {
  // Kullanıcının kimlik doğrulama durumunu kontrol eden fonksiyon
  const isAuthenticated = () => {
    return (
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken") // Token localStorage veya sessionStorage'da var mı?
    );
  };

  return (
    <Route
      {...rest} // Route bileşenine gelen tüm propsları aktarıyor
      render={(props) => {
        if (isAuthenticated()) {
          // Kullanıcı giriş yaptıysa, ilgili bileşeni render et
          return Component ? <Component {...props} /> : render(props);
        } else {
          // Kullanıcı giriş yapmadıysa, bildirim göster ve giriş sayfasına yönlendir
          toast.info("Please log in to place an order!", {
            autoClose: 3000, // Bildirim 3 saniye sonra kapanır
            theme: "colored", // Tema rengi uygulanır
          });
          return <Redirect to="/login" />; // Kullanıcıyı giriş sayfasına yönlendir
        }
      }}
    />
  );
};

export default PrivateRoute; // Bileşeni dışa aktar
