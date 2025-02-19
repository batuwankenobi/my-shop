// **Redux Toolkit ile Mağaza (Store) Yapılandırması**
// Redux store'unu oluşturmak için `configureStore` kullanıyoruz.
import { configureStore } from "@reduxjs/toolkit";
// Redux-thunk, async işlemler için middleware olarak ekleniyor.
import { thunk } from "redux-thunk";
// Redux-logger, uygulamada yapılan state değişikliklerini console'a yazdırmak için kullanılıyor.
import logger from "redux-logger";
// Reducer'ları birleştirmek için `combineReducers` kullanılıyor.
import { combineReducers } from "redux";

// **Reducer'ları İçe Aktarma**
// Farklı state bölümlerini yöneten reducer'ları içe aktarıyoruz.
import { clientReducer } from "./reducers/clientReducer"; // Kullanıcı ve ayar bilgilerini yönetir.
import { productReducer } from "./reducers/productReducer"; // Ürün ve kategori bilgilerini yönetir.
import { shoppingCartReducer } from "./reducers/shoppingCartReducer"; // Alışveriş sepetini yönetir.

// **Root Reducer (Ana Reducer)**
// Farklı reducer'ları tek bir reducer içinde birleştiriyoruz.
// Bu yapı, Redux store'un tüm parçalarını düzenli bir şekilde yönetmemizi sağlar.
const rootReducer = combineReducers({
  client: clientReducer,   // Kullanıcı bilgileri ve ayarlar
  product: productReducer, // Ürünler ve kategoriler
  cart: shoppingCartReducer, // Alışveriş sepeti ve ödeme bilgileri
});

// **Redux Store'un Yapılandırılması**
// `configureStore`, Redux Toolkit'in sağladığı daha sade bir store yapılandırma yöntemidir.
// Middleware olarak `thunk` ve `logger` eklenmiştir.
const store = configureStore({
  reducer: rootReducer, // Birleştirilmiş reducer'ları store'a ekliyoruz.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, logger), // Varsayılan middleware'lere thunk ve logger ekleniyor.
});

// **Store'u Dışa Aktarma**
// Store'u dışa aktararak uygulamanın diğer bölümlerinde kullanılmasını sağlıyoruz.
export default store;
