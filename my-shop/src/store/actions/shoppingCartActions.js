// **Action Types** (Eylem Tipleri)
// Redux'ta kullanılacak action (eylem) türleri tanımlanıyor.
// Bu sabitler, aksiyonların türünü belirtmek için kullanılır.
export const SET_CART = "SET_CART"; // Sepeti tamamen güncelle
export const SET_PAYMENT = "SET_PAYMENT"; // Ödeme bilgisini ayarla
export const SET_ADDRESS = "SET_ADDRESS"; // Adresi güncelle
export const ADD_TO_CART = "ADD_TO_CART"; // Sepete ürün ekle
export const UPDATE_ITEM_COUNT = "UPDATE_ITEM_COUNT"; // Sepetteki ürün miktarını güncelle
export const TOGGLE_ITEM_CHECK = "TOGGLE_ITEM_CHECK"; // Ürünün seçili olup olmadığını değiştir
export const REMOVE_FROM_CART = "REMOVE_FROM_CART"; // Sepetten ürünü kaldır
export const CLEAR_CART = "CLEAR_CART"; // Sepeti tamamen temizle

// **Action Creators** (Eylem Yaratıcıları)
// Redux store'unu güncellemek için kullanılacak fonksiyonlar

// Sepeti belirlenen yeni sepet ile değiştirir
export const setCart = (cart) => ({ type: SET_CART, payload: cart });

// Ödeme bilgisini günceller
export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment,
});

// Adres bilgisini günceller
export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address,
});

// Sepete yeni bir ürün ekler
export const addToCart = (product) => ({ type: ADD_TO_CART, payload: product });

// Sepetteki belirli bir ürünün miktarını günceller
export const updateItemCount = (productId, count) => ({
  type: UPDATE_ITEM_COUNT,
  payload: { productId, count },
});

// Bir ürünün seçili olup olmadığını değiştirir
export const toggleItemCheck = (productId) => ({
  type: TOGGLE_ITEM_CHECK,
  payload: productId,
});

// Sepetten belirli bir ürünü kaldırır
export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

// Sepeti tamamen boşaltır
export const clearCart = () => ({ type: CLEAR_CART });

// **Selectors** (Verileri Çekmek İçin Kullanılan Fonksiyonlar)

// Sepetteki ürünleri getirir
export const getCartItems = (state) => state.cart.cart;

// Sepette seçili olan ürünlerin toplam fiyatını hesaplar
export const getCartTotal = (state) => {
  return state.cart.cart.reduce((total, item) => {
    if (item.checked) { // Eğer ürün seçiliyse
      return total + item.product.price * item.count; // Ürün fiyatı * adet sayısı eklenir
    }
    return total; // Seçili değilse toplam değeri değiştirme
  }, 0);
};

// Sepetteki toplam ürün sayısını döndürür
export const getCartItemCount = (state) => {
  return state.cart.cart.reduce((total, item) => total + item.count, 0);
};

// Sepetteki seçili ürünleri döndürür
export const getCheckedItems = (state) => {
  return state.cart.cart.filter((item) => item.checked);
};
