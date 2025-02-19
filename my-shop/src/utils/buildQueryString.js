// **buildQueryString Fonksiyonu**
// Bu fonksiyon, bir nesneyi (params) alıp, geçerli bir query string'e dönüştürür.
// Örneğin, { page: 2, limit: 10 } objesini "?page=2&limit=10" formatına çevirir.

// **Parametreler:**
// - `params`: Query string oluşturmak için kullanılacak anahtar-değer çiftlerini içeren nesne.

// **Döndürdüğü Değer:**
// - `"?key1=value1&key2=value2"` formatında bir query string.

// **Örnek Kullanım:**
// `buildQueryString({ page: 1, search: "laptop", sort: "price" })`
// Sonuç: `"?page=1&search=laptop&sort=price"`

export const buildQueryString = (params) => {
  const query = Object.entries(params) // `params` nesnesini [key, value] çiftleri dizisine çevirir
    .filter(([, value]) => value != null) // `null` veya `undefined` olanları filtreler
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}` // Key ve Value'yu URL'ye uygun hale getirir
    )
    .join("&"); // Tüm çiftleri "&" ile birleştirir

  return `?${query}`; // Son olarak "?" ekleyerek query string döndürür
};
