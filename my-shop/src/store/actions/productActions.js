import api from "../../api/axios";
import { buildQueryString } from "../../utils/buildQueryString";

// Aksiyon türleri (Redux için sabit değerler tanımlanıyor)
export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_PRODUCT_LIST = "SET_PRODUCT_LIST";
export const SET_TOTAL = "SET_TOTAL";
export const SET_FETCH_STATE = "SET_FETCH_STATE";
export const SET_LIMIT = "SET_LIMIT";
export const SET_OFFSET = "SET_OFFSET";
export const SET_FILTER = "SET_FILTER";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_SORT = "SET_SORT";
export const SET_PRODUCT = "SET_PRODUCT";
export const SET_CATEGORY = "SET_CATEGORY";

// Aksiyon oluşturucular (Redux store'unu güncellemek için kullanılır)
export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});
export const setProductList = (productList) => ({
  type: SET_PRODUCT_LIST,
  payload: productList,
});
export const setTotal = (total) => ({ type: SET_TOTAL, payload: total });
export const setFetchState = (fetchState) => ({
  type: SET_FETCH_STATE,
  payload: fetchState,
});
export const setLimit = (limit) => ({ type: SET_LIMIT, payload: limit });
export const setOffset = (offset) => ({ type: SET_OFFSET, payload: offset });
export const setFilter = (filter) => ({ type: SET_FILTER, payload: filter });
export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});
export const setSort = (sort) => ({ type: SET_SORT, payload: sort });
export const setProduct = (product) => ({
  type: SET_PRODUCT,
  payload: product,
});

// setCategory aksiyonu çağrıldığında, console.log ile debug bilgisi veriliyor
export const setCategory = (categoryId) => (
  console.log("setCategory called with categoryId:", categoryId),
  { type: SET_CATEGORY, payload: categoryId }
);

// Kategorileri API'den çekme işlemi
export const fetchCategories = () => async (dispatch) => {
  dispatch(setFetchState("FETCHING")); // Yüklenme durumu başlatılıyor
  try {
    const response = await api.get("/categories"); // API çağrısı yapılıyor
    dispatch(setCategories(response.data)); // Gelen veriler Redux store'a kaydediliyor
    dispatch(setFetchState("FETCHED")); // Başarılı şekilde tamamlandı
  } catch (error) {
    console.error("Error fetching categories:", error);
    dispatch(setFetchState("FAILED")); // Hata durumunda state güncelleniyor
  }
};

// Ürünleri API'den çekme işlemi
export const fetchProducts =
  (params = {}) =>
  async (dispatch, getState) => {
    const { limit, offset, filter, sort, category } = getState().product;

    // API için query string oluşturuluyor
    const query = buildQueryString({
      limit,
      offset,
      category: category || null,
      filter,
      sort: params.sort || sort,
    });

    console.log(
      "Current category:",
      params.category !== undefined ? params.category : category
    );
    console.log("Requesting URL: ", `/products${query}`);

    dispatch(setFetchState("FETCHING"));

    try {
      const response = await api.get(`/products${query}`);
      const data = response.data;
      dispatch(setProductList(data.products)); // Ürün listesi güncelleniyor
      dispatch(setTotal(data.total)); // Toplam ürün sayısı güncelleniyor
      dispatch(setFetchState("FETCHED")); // Başarı durumu
      console.log("fetched products:", data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      dispatch(setFetchState("FAILED"));
    }
  };

// Filtreleme işlemi
export const updateFilter = (newFilter) => (dispatch) => {
  dispatch(setFilter(newFilter)); // Yeni filtre değeri güncelleniyor
  dispatch(changePage(1)); // İlk sayfaya dönülüyor
};

// Sıralama işlemi
export const updateSort = (newSort) => (dispatch) => {
  dispatch(setSort(newSort)); // Yeni sıralama türü güncelleniyor
  dispatch(changePage(1)); // İlk sayfaya dönülüyor
};

// Kategori güncelleme işlemi
export const updateCategory = (categoryId) => (dispatch) => {
  dispatch(setCategory(categoryId)); // Seçilen kategori güncelleniyor
  dispatch(setOffset(0)); // Sayfa sıfırlanıyor
  dispatch(changePage(1)); // İlk sayfaya gidiliyor
};

// Tek bir ürünü API'den çekme işlemi
export const fetchProduct = (productId) => async (dispatch) => {
  dispatch(setFetchState("FETCHING"));

  try {
    const response = await api.get(`/products/${productId}`);
    dispatch(setProduct(response.data)); // Ürün bilgileri güncelleniyor
    dispatch(setFetchState("FETCHED"));
  } catch (error) {
    console.error("Error fetching product:", error);
    dispatch(setFetchState("FAILED"));
  }
};

// Sayfa değiştirme işlemi
export const changePage = (page) => (dispatch, getState) => {
  const { limit } = getState().product;

  // Yeni sayfa için offset hesaplanıyor
  const offset = (page - 1) * limit;

  // Redux store güncelleniyor
  dispatch(setCurrentPage(page));
  dispatch(setOffset(offset));
  dispatch(fetchProducts()); // Yeni sayfaya göre ürünler tekrar çekiliyor
};

// Ürünleri ve kategorileri eşleştiren fonksiyon
const selectProductsWithCategories = (state) => {
  const productList = state.product.productList;
  const categories = state.product.categories;

  return productList.map((product) => ({
    ...product,
    category: categories.find(
      (category) => category.id === product.category_id
    ),
  }));
};

// Mağaza sayfasını başlatan aksiyon
export const initializeShopPage =
  (categoryId = null) =>
  (dispatch) => {
    dispatch(setCategory(categoryId)); // Belirtilen kategoriyle başlatılıyor
    dispatch(setOffset(0)); // Sayfa sıfırlanıyor
    dispatch(setCurrentPage(1)); // İlk sayfa seçiliyor
    dispatch(fetchProducts()); // Ürünler çekiliyor
  };
