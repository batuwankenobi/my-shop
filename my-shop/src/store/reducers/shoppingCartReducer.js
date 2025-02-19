// **Action Types (Eylem Tipleri)** 
// Redux aksiyonlarının türlerini içe aktarıyoruz.
// Bu aksiyonlar, alışveriş sepeti, ödeme ve adres bilgilerini yönetmek için kullanılıyor.
import {
  SET_CART,           // Sepeti tamamen güncelle
  SET_PAYMENT,        // Ödeme bilgilerini ayarla
  SET_ADDRESS,        // Adres bilgisini ayarla
  ADD_TO_CART,        // Sepete yeni bir ürün ekle
  UPDATE_ITEM_COUNT,  // Sepetteki bir ürünün miktarını güncelle
  TOGGLE_ITEM_CHECK,  // Bir ürünün seçili olup olmadığını değiştir
  REMOVE_FROM_CART,   // Sepetten bir ürünü kaldır
  CLEAR_CART,         // Sepeti tamamen temizle
} from "../actions/shoppingCartActions";

// **Başlangıç Durumu (Initial State)**
// Redux store'daki başlangıç değerlerini belirler.
const initialState = {
  cart: [],      // Sepetteki ürünler listesi
  payment: null, // Ödeme bilgisi (varsayılan olarak boş)
  address: null, // Adres bilgisi (varsayılan olarak boş)
};

// **Reducer Fonksiyonu**
// Gelen aksiyon türüne göre state'i günceller.
export const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {

    // Sepeti tamamen günceller (yeni bir sepet atanır)
    case SET_CART:
      return {
        ...state,
        cart: action.payload,
      };

    // Sepete yeni bir ürün ekler
    case ADD_TO_CART: {
      // Sepette aynı ürün olup olmadığını kontrol eder
      const existingItem = state.cart.find(
        (item) => item.product.id === action.payload.id
      );

      if (existingItem) {
        // Eğer ürün zaten sepette varsa, miktarını artır
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === action.payload.id
              ? { ...item, count: item.count + 1 } // Miktarı artır
              : item
          ),
        };
      } else {
        // Yeni ürünü sepete ekle (varsayılan olarak count: 1, checked: true)
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              product: action.payload, // Ürün bilgileri
              count: 1,               // Varsayılan adet
              checked: true,          // Varsayılan olarak seçili
            },
          ],
        };
      }
    }

    // Sepetteki belirli bir ürünün miktarını günceller
    case UPDATE_ITEM_COUNT:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, count: action.payload.count } // Yeni miktar ile güncelle
            : item
        ),
      };

    // Sepetteki bir ürünün seçili olup olmadığını değiştirir
    case TOGGLE_ITEM_CHECK:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload
            ? { ...item, checked: !item.checked } // Seçili durumunu tersine çevir
            : item
        ),
      };

    // Sepetten belirli bir ürünü kaldırır
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload),
      };

    // Sepeti tamamen temizler
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    // Ödeme bilgilerini günceller
    case SET_PAYMENT:
      return {
        ...state,
        payment: action.payload,
      };

    // Adres bilgilerini günceller
    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };

    // Varsayılan durumda mevcut state'i döndür
    default:
      return state;
  }
};
