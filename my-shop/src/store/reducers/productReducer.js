// **Immer Kütüphanesi ile Redux Reducer** 
// Immer, immutable state yönetimini kolaylaştıran bir kütüphanedir.
// "produce" fonksiyonu, doğrudan state üzerinde değişiklik yapıyormuşuz gibi yazmamıza izin verir, 
// ancak gerçekte immutable bir kopya oluşturur.
import { produce } from "immer";

// **Action Types (Eylem Tipleri)**
// Ürünler ve kategoriler ile ilgili aksiyon türlerini içe aktarıyoruz.
import {
  SET_CATEGORIES,   // Kategori listesini ayarla
  SET_PRODUCT_LIST, // Ürün listesini ayarla
  SET_TOTAL,        // Toplam ürün sayısını belirle
  SET_FETCH_STATE,  // Veri çekme durumunu belirle
  SET_LIMIT,        // Sayfa başına gösterilecek ürün sayısını belirle
  SET_OFFSET,       // Verilerin başlangıç noktasını belirle (pagination için)
  SET_FILTER,       // Filtreleme kriterlerini belirle
  SET_CURRENT_PAGE, // Mevcut sayfa numarasını ayarla (pagination için)
  SET_SORT,         // Ürünlerin sıralama düzenini belirle
  SET_PRODUCT,      // Seçili ürünü belirle
  SET_CATEGORY,     // Seçili kategoriyi belirle
} from "../actions/productActions";

// **Başlangıç Durumu (Initial State)**
// Redux store'un başlangıç değerlerini belirler.
const initialState = {
  categories: [],        // Kategori listesi (başlangıçta boş)
  productList: [],       // Ürün listesi (başlangıçta boş)
  total: 0,              // Toplam ürün sayısı (başlangıçta 0)
  limit: 20,             // Sayfa başına gösterilecek ürün sayısı (varsayılan 20)
  offset: 0,             // Sayfalama için başlangıç noktası (varsayılan 0)
  filter: "",            // Ürün listesi için filtreleme kriteri (varsayılan boş)
  fetchState: "NOT_FETCHED", // Veri çekme durumu: 'NOT_FETCHED', 'FETCHING', 'FETCHED', 'FAILED' olabilir
  currentPage: 1,        // Mevcut sayfa numarası (varsayılan 1)
  sort: "",              // Sıralama yöntemi (varsayılan boş)
  product: null,         // Seçili ürün (varsayılan olarak null)
  category: null,        // Seçili kategori (varsayılan olarak null)
};

// **Reducer Fonksiyonu**
// Immer kullanarak state'i daha kolay güncelleyebiliriz.
// Immer sayesinde doğrudan değişiklik yapıyormuşuz gibi yazabiliriz ancak immutable bir yapı korunur.
export const productReducer = produce((draft, action) => {
  switch (action.type) {
    
    // Kategorileri günceller
    case SET_CATEGORIES:
      draft.categories = action.payload;
      break;

    // Ürün listesini günceller
    case SET_PRODUCT_LIST:
      draft.productList = action.payload;
      break;

    // Toplam ürün sayısını günceller
    case SET_TOTAL:
      draft.total = action.payload;
      break;

    // API'den veri çekme durumunu günceller ('NOT_FETCHED', 'FETCHING', 'FETCHED', 'FAILED')
    case SET_FETCH_STATE:
      draft.fetchState = action.payload;
      break;

    // Sayfa başına gösterilecek ürün sayısını belirler
    case SET_LIMIT:
      draft.limit = action.payload;
      break;

    // Sayfalama için başlangıç noktasını ayarlar (örneğin kaçıncı üründen başlanacağını belirler)
    case SET_OFFSET:
      draft.offset = action.payload;
      break;

    // Ürün listesindeki filtreleme kriterini belirler (örneğin kategoriye göre filtreleme)
    case SET_FILTER:
      draft.filter = action.payload;
      break;

    // Mevcut sayfa numarasını ayarlar (sayfalama için kullanılır)
    case SET_CURRENT_PAGE:
      draft.currentPage = action.payload;
      break;

    // Ürünlerin sıralama düzenini belirler (örneğin fiyat, popülerlik, vb.)
    case SET_SORT:
      draft.sort = action.payload;
      break;

    // Seçili ürünü günceller (ürün detayları sayfası için kullanılabilir)
    case SET_PRODUCT:
      draft.product = action.payload;
      break;

    // Seçili kategoriyi belirler
    case SET_CATEGORY:
      draft.category = action.payload;
      break;

    // Varsayılan durumda herhangi bir değişiklik yapma
    default:
      break;
  }
}, initialState);
