import api from "../../api/axios"; // API isteklerini yapmak için axios modülünü içe aktarıyoruz.

// Action Types (Redux için tanımlanmış action türleri)
export const SET_USER = "SET_USER"; // Kullanıcı bilgisini Redux store'a kaydetmek için
export const SET_ROLES = "SET_ROLES"; // Kullanıcı rollerini kaydetmek için
export const SET_THEME = "SET_THEME"; // Tema ayarlarını değiştirmek için
export const SET_LANGUAGE = "SET_LANGUAGE"; // Dil ayarlarını değiştirmek için
export const SET_LOADING = "SET_LOADING"; // Yükleme durumunu belirlemek için
export const SET_ERROR = "SET_ERROR"; // Hata mesajlarını kaydetmek için
export const GET_ADDRESSES = "GET_ADDRESSES"; // Kullanıcının adreslerini almak için
export const ADD_ADDRESS = "ADD_ADDRESS"; // Yeni adres eklemek için
export const UPDATE_ADDRESS = "UPDATE_ADDRESS"; // Mevcut adresi güncellemek için
export const DELETE_ADDRESS = "DELETE_ADDRESS"; // Adres silmek için
export const GET_CARDS = "GET_CARDS"; // Kullanıcının kayıtlı kartlarını almak için
export const ADD_CARD = "ADD_CARD"; // Yeni kart eklemek için
export const UPDATE_CARD = "UPDATE_CARD"; // Kayıtlı bir kartı güncellemek için
export const DELETE_CARD = "DELETE_CARD"; // Kayıtlı bir kartı silmek için

// Action Creators (Redux için action fonksiyonları)
export const setUser = (user) => {
  console.log("setUser action creator called with:", user);
  return { type: SET_USER, payload: user };
};

export const setRoles = (roles) => ({ type: SET_ROLES, payload: roles });
export const setTheme = (theme) => ({ type: SET_THEME, payload: theme });
export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
});
export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});
export const setError = (error) => ({ type: SET_ERROR, payload: error });

// Kullanıcının adreslerini kaydetmek için action creator
export const getAddresses = (addresses) => ({
  type: GET_ADDRESSES,
  payload: addresses,
});

// Yeni adres eklemek için action creator
export const addAddress = (address) => ({
  type: ADD_ADDRESS,
  payload: address,
});

// Mevcut bir adresi güncellemek için action creator
export const updateAddress = (address) => ({
  type: UPDATE_ADDRESS,
  payload: address,
});

// Belirli bir adresi silmek için action creator
export const deleteAddress = (addressId) => ({
  type: DELETE_ADDRESS,
  payload: addressId,
});

// Kullanıcının oturum bilgisini localStorage veya sessionStorage'dan alarak Redux store'a yükleyen thunk fonksiyonu
export const initializeUser = () => async (dispatch) => {
  console.log("initializeUser thunk started");
  try {
    dispatch(setLoading(true));

    // Kullanıcının token'ını localStorage veya sessionStorage'dan al
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    if (!token || !storedUser) {
      throw new Error("No authentication data found");
    }

    // Token doğrulama için backend'e istek at
    const response = await api.get("/verify", {
      headers: { Authorization: token },
    });

    const userData = response.data;
    console.log("Verified user data:", userData);

    // Kullanıcının avatar bilgisini saklamak için local'deki veriyi backend'den gelen veri ile birleştir
    const parsedUser = JSON.parse(storedUser);
    const completeUserData = JSON.parse(
      JSON.stringify({ ...userData, avatarUrl: parsedUser.avatarUrl })
    );

    // Kullanıcıyı Redux store'a kaydet
    dispatch(setUser(completeUserData));

    // Axios için global olarak token'ı ayarla
    api.defaults.headers.common["Authorization"] = token;

    dispatch(setLoading(false));
  } catch (error) {
    console.error("Error initializing user:", error);
    dispatch(setError(error.message));
    dispatch(setLoading(false));

    // Oturumu sıfırla
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    api.defaults.headers.common["Authorization"] = null;
    dispatch(setUser({}));
  }
};

// Kullanıcı giriş yaptığında bilgilerini kaydeden action
export const loginUser = (userData, rememberMe) => (dispatch) => {
  if (rememberMe) {
    localStorage.setItem("authToken", userData.token);
    localStorage.setItem("user", JSON.stringify(userData));
  } else {
    sessionStorage.setItem("authToken", userData.token);
    sessionStorage.setItem("user", JSON.stringify(userData));
  }

  dispatch(setUser(userData));
};

// Kullanıcı rollerini API'den almak için thunk
export const fetchRolesIfNeeded = () => async (dispatch, getState) => {
  const { roles } = getState().client;
  if (roles.length === 0) {
    try {
      const response = await api.get("/roles");
      dispatch(setRoles(response.data));
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  }
};

// Kullanıcının adreslerini API'den çekip Redux store'a kaydetmek için thunk
export const fetchAddresses = () => async (dispatch) => {
  try {
    const response = await api.get("/user/address");
    dispatch(getAddresses(response.data));
  } catch (error) {
    console.error("Error fetching addresses:", error);
  }
};

// Kullanıcının yeni bir adres eklemesini sağlayan thunk
export const addNewAddress = (addressData) => async (dispatch) => {
  try {
    const response = await api.post("/user/address", addressData);
    dispatch(addAddress(response.data));
    dispatch(fetchAddresses());
  } catch (error) {
    console.error("Error adding new address:", error);
  }
};

// Kullanıcının adresini güncellemesini sağlayan thunk
export const updateExistingAddress = (addressData) => async (dispatch) => {
  try {
    const response = await api.put(`/user/address`, addressData);
    dispatch(updateAddress(response.data));
    dispatch(fetchAddresses());
  } catch (error) {
    console.error("Error updating address:", error);
  }
};

// Kullanıcının adresini silmesini sağlayan thunk
export const deleteExistingAddress = (addressId) => async (dispatch) => {
  try {
    await api.delete(`/user/address/${addressId}`);
    dispatch(deleteAddress(addressId));
    dispatch(fetchAddresses());
  } catch (error) {
    console.error("Error deleting address:", error);
  }
};

// Kullanıcının kredi kartlarını almak için thunk
export const getCards = () => async (dispatch) => {
  try {
    const response = await api.get("/user/card");
    dispatch({ type: GET_CARDS, payload: response.data });
  } catch (error) {
    console.error("Error fetching user cards:", error);
  }
};

// Kullanıcının yeni bir kart eklemesini sağlayan thunk
export const addCard = (cardData) => async (dispatch) => {
  try {
    const response = await api.post("/user/card", cardData);
    const card = response.data["0"];
    dispatch({ type: ADD_CARD, payload: card });
    dispatch(getCards());
  } catch (error) {
    console.error("Error adding user card:", error);
  }
};

// Kullanıcının kartını güncellemesini sağlayan thunk
export const updateCard = (cardData) => async (dispatch) => {
  try {
    const response = await api.put("/user/card", cardData);
    dispatch({ type: UPDATE_CARD, payload: response.data });
    dispatch(getCards());
  } catch (error) {
    console.error("Error updating user card:", error);
  }
};

// Kullanıcının kartını silmesini sağlayan thunk
export const deleteCard = (cardId) => async (dispatch) => {
  try {
    await api.delete(`/user/card/${cardId}`);
    dispatch({ type: DELETE_CARD, payload: cardId });
    dispatch(getCards());
  } catch (error) {
    console.error("Error deleting user card:", error);
  }
};
