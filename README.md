🛒 E-Commerce Platform (React.js)
📌 Proje Hakkında
Bu proje, React.js kullanılarak geliştirilmiş modern bir e-ticaret platformudur. Kullanıcıların ürünleri görüntüleyebildiği, sepete ekleyebildiği ve sipariş oluşturabildiği bir arayüze sahiptir. Proje, state management, API entegrasyonu ve ödeme sistemleri gibi temel e-ticaret işlevlerini içermektedir.

🚀 Özellikler
✅ Ürün Listeleme: Kullanıcılar kategorilere göre filtrelenmiş ürünleri görebilir.
✅ Ürün Detay Sayfası: Ürünlerin açıklamalarını, fiyatlarını ve stok bilgilerini görüntüleyebilir.
✅ Sepete Ekleme: Kullanıcılar seçtikleri ürünleri sepete ekleyebilir ve miktarlarını yönetebilir.
✅ Kullanıcı Kimlik Doğrulama: JWT tabanlı kimlik doğrulama (giriş, kayıt, oturum yönetimi).
✅ Ödeme Entegrasyonu: Stripe veya başka bir ödeme sistemi ile alışveriş tamamlama.
✅ Admin Paneli: Ürün ekleme, silme ve stok yönetimi özellikleri.
✅ Mobil Uyumlu: Tamamen responsive tasarım.
🛠️ Kullanılan Teknolojiler
Frontend: React.js, React Router, Context API / Redux, Tailwind CSS,ShadCN UI
Kimlik Doğrulama: JWT Authentication 
State Management: Redux Toolkit / Context API
📦 Kurulum
1️⃣ Projeyi Klonlayın
Kopyala
Düzenle
git clone https://github.com/batuwankenobi/my-shop
cd ecommerce-react
2️⃣ Gerekli Bağımlılıkları Yükleyin
bash
Kopyala
Düzenle
npm install
# veya
yarn install
3️⃣ Çevre Değişkenlerini Ayarlayın
Ana dizinde bir .env dosyası oluşturun ve aşağıdaki bilgileri ekleyin:

env
Kopyala
Düzenle
REACT_APP_API_URL=https://api.example.com
REACT_APP_STRIPE_KEY=your_stripe_public_key
REACT_APP_FIREBASE_API_KEY=your_firebase_key
4️⃣ Projeyi Çalıştırın
bash
Kopyala
Düzenle
npm start
# veya
yarn start
Uygulama, tarayıcınızda şu adreste açılacaktır:
👉 http://localhost:3000

📁 Proje Dizini
bash
Kopyala
Düzenle
/ecommerce-react
│── /public
│── /src
│   │── /components
│   │── /pages
│   │── /context
│   │── /redux
│   │── /api
│   │── /assets
│   ├── App.js
│   ├── index.js
│── package.json
│── .env
│── README.md
🚀 API Entegrasyonu
Bu proje, ürünleri ve kullanıcı verilerini almak için bir RESTful API kullanır. Örnek API çağrıları:

Ürünleri Listeleme

js
Kopyala
Düzenle
fetch(`${process.env.REACT_APP_API_URL}/products`)
  .then(response => response.json())
  .then(data => console.log(data));
Kullanıcı Girişi

js
Kopyala
Düzenle
fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "customer@commerce.com", password: "123456" })
})
  .then(response => response.json())
  .then(data => console.log(data));
📜 Yol Haritası
 Ürün Arama ve Filtreleme ekle
 Yorum ve Puanlama Sistemi ekle
 Gerçek Zamanlı Stok Yönetimi ekle
 Çoklu Ödeme Yöntemleri ekle
 Admin Paneli geliştir
🤝 Katkıda Bulunma
Eğer projeye katkıda bulunmak istiyorsanız: batuhanbartuu@gmail.com

Fork yapın 🍴
Yeni bir branch oluşturun: feature-xyz
Değişikliklerinizi commit edin: git commit -m "Yeni özellik eklendi"
Push yapın: git push origin feature-xyz
Bir Pull Request (PR) gönderin 🚀

📩 İletişim & Destek
Herhangi bir sorunuz veya öneriniz varsa, batuhanbartuu@gmail.com adresinden bana ulaşabilirsiniz.
