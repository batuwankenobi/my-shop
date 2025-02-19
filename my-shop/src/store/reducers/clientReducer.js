// **Action Types (Eylem Tipleri)** 
// Redux aksiyonlarının türlerini içe aktarıyoruz.
// Bu aksiyonlar, kullanıcı ve ayar bilgileri, adresler ve kredi kartları gibi verilerin yönetimini sağlıyor.
import {
  SET_USER,          // Kullanıcı bilgilerini güncelle
  SET_ROLES,         // Kullanıcının rollerini ayarla
  SET_THEME,         // Tema ayarını değiştir (örneğin "light" veya "dark")
  SET_LANGUAGE,      // Dil ayarını değiştir
  SET_LOADING,       // Yüklenme durumunu değiştir
  SET_ERROR,         // Hata mesajını ayarla
  GET_ADDRESSES,     // Kullanıcının adreslerini getir
  ADD_ADDRESS,       // Yeni bir adres ekle
  UPDATE_ADDRESS,    // Mevcut bir adresi güncelle
  DELETE_ADDRESS,    // Bir adresi sil
  GET_CARDS,         // Kullanıcının kayıtlı kartlarını getir
  ADD_CARD,          // Yeni bir kredi kartı ekle
  UPDATE_CARD,       // Mevcut bir kredi kartını güncelle
  DELETE_CARD,       // Bir kredi kartını sil
} from "../actions/clientActions";

// **Başlangıç Durumu (Initial State)**
// Redux store'da tutulacak başlangıç değerlerini belirler.
const initialState = {
  user: {},           // Kullanıcı bilgileri
  addressList: [],    // Kullanıcının adres listesi
  creditCards: [],    // Kullanıcının kredi kartları listesi
  roles: [],          // Kullanıcının rolleri
  theme: "light",     // Varsayılan tema "light"
  language: "en",     // Varsayılan dil "en" (İngilizce)
  isLoading: false,   // Yüklenme durumu başlangıçta false
  error: null,        // Hata mesajı başlangıçta null
};

// **Reducer Fonksiyonu**
// Redux store'daki verileri güncelleyen fonksiyon.
// Gelen aksiyon türüne göre state'i günceller.
export const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    
    // Kullanıcı bilgilerini günceller
    case SET_USER:
      return { ...state, user: { ...action.payload } };

    // Kullanıcının rollerini belirler
    case SET_ROLES:
      return { ...state, roles: action.payload };

    // Tema ayarını değiştirir (örneğin "dark" veya "light")
    case SET_THEME:
      return { ...state, theme: action.payload };

    // Dil ayarını değiştirir (örneğin "en", "tr" gibi)
    case SET_LANGUAGE:
      return { ...state, language: action.payload };

    // Yüklenme durumunu günceller (true veya false)
    case SET_LOADING:
      return { ...state, isLoading: action.payload };

    // Hata mesajını günceller
    case SET_ERROR:
      return { ...state, error: action.payload };

    // Kullanıcının adres listesini günceller (sunucudan gelen adresleri kaydeder)
    case GET_ADDRESSES:
      return { ...state, addressList: action.payload };

    // Yeni bir adresi listeye ekler
    case ADD_ADDRESS:
      return { ...state, addressList: [...state.addressList, action.payload] };

    // Mevcut bir adresi günceller
    case UPDATE_ADDRESS:
      return {
        ...state,
        addressList: state.addressList.map((address) =>
          address.id === action.payload.id ? action.payload : address
        ),
      };

    // Bir adresi listeden siler
    case DELETE_ADDRESS:
      return {
        ...state,
        addressList: state.addressList.filter(
          (address) => address.id !== action.payload
        ),
      };

    // Kullanıcının kredi kartlarını getirir
    case GET_CARDS:
      return { ...state, creditCards: action.payload };

    // Yeni bir kredi kartı ekler
    case ADD_CARD:
      return { ...state, creditCards: [...state.creditCards, action.payload] };

    // Mevcut bir kredi kartını günceller
    case UPDATE_CARD:
      return {
        ...state,
        creditCards: state.creditCards.map((card) =>
          card.id === action.payload.id ? action.payload : card
        ),
      };

    // Bir kredi kartını listeden siler
    case DELETE_CARD:
      return {
        ...state,
        creditCards: state.creditCards.filter(
          (card) => card.id !== action.payload
        ),
      };

    // Varsayılan durum: Eğer yukarıdaki action'lar ile eşleşmezse mevcut state'i döndür
    default:
      return state;
  }
};
