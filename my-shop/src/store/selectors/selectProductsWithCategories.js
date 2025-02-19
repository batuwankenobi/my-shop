// **Ürünleri Kategoriler ile Birleştiren Selector Fonksiyonu**
// Bu fonksiyon, ürün listesine bağlı her ürüne uygun kategori bilgisini ekler.

// **Parametreler:**
// - `productList`: Ürünlerin bulunduğu dizi (her ürün bir `category_id` içerir).
// - `categories`: Kategori bilgilerini içeren dizi (her kategori `id` değerine sahiptir).

// **Döndürdüğü Değer:**
// - Kategori bilgisi ile zenginleştirilmiş ürün listesi.

export const selectProductsWithCategories = (productList, categories) => {
  return productList.map((product) => ({
    ...product, // Ürün bilgilerini korur
    category: categories.find(
      (category) => category.id === product.category_id // Ürünün `category_id` değeri ile eşleşen kategoriyi bul
    ),
  }));
};
