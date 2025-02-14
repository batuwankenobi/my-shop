import axios from "axios"; // Axios kütüphanesini içe aktarır. Bu, HTTP istekleri yapmak için kullanılır.

// Axios için özel bir örnek (instance) oluşturuluyor
const api = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com", // Tüm API isteklerinin gönderileceği temel URL.
  headers: {
    "Content-Type": "application/json", // Varsayılan olarak JSON formatında veri gönderileceğini belirtiyor.
  },
});

// Her istekten önce belirli işlemleri yapmak için bir interceptor (yakalama mekanizması) ekleniyor
api.interceptors.request.use(
  (config) => {
    // Kullanıcı giriş yapmışsa, localStorage veya sessionStorage içinde token olup olmadığı kontrol edilir.
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    
    if (token) {
      config.headers.Authorization = token; // Eğer token varsa, istek başlığına (headers) eklenir.
    }
    return config; // Güncellenmiş config nesnesi döndürülerek istek devam ettirilir.
  },
  (error) => {
    return Promise.reject(error); // Eğer hata oluşursa, işlem durdurulur ve hata fırlatılır.
  }
);

export default api; // Axios örneğini dışa aktararak diğer dosyalarda kullanılmasını sağlar.
