import { Link } from "react-router-dom/cjs/react-router-dom.min"; // Sayfalar arası geçiş için Link bileşeni
import { thirdCarouselContent } from "../mock/carouselContentsData"; // Mock veri (carousel içerikleri)
import { useEffect, useState } from "react"; // React hook'ları
import Rating from '@mui/material/Rating'; // Materyal UI'den Rating bileşeni
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // FontAwesome ikonlarını kullanmak için
import ProductDetails from "../components/ProductDetails"; // Ürün detay bileşeni
import Carousel from "../components/Carousel"; // Ürün görsellerini kaydırmalı gösteren bileşen
import { bestseller } from "../mock/bestSellerData"; // Çok satan ürünler verisi
import ProductCardSecond from "../components/ProductCardSecond"; // Ürün kart bileşeni
import Clients from "../components/Clients"; // Müşteri bileşeni
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom"; // Sayfa yönlendirmeleri ve parametreleri almak için
import { useDispatch, useSelector } from "react-redux"; // Redux store işlemleri
import { fetchProductsWithId } from "../store/actions/ProductActions"; // Redux aksiyonu, belirli bir ürünü getirmek için

// Ürün renkleri
const colors = ["[#23A6F0]", "success-green", "[#E77C40]", "[#252B42]"];

export default function ProductPage() {
    // URL parametresinden gelen productId'yi al
    let { productId } = useParams();

    // Redux store'dan ürün verisini al
    let productData = useSelector(store => store.productStore.currentProduct);
    const [productLoading, setProductLoading] = useState(true); // Ürün yüklenme durumunu tutan state
    const dispatch = useDispatch();
    const history = useHistory(); // Sayfa yönlendirme işlemleri için history nesnesi

    // Geri gitme fonksiyonu
    const handleBack = () => {
        if (history.action === 'POP') { // Eğer doğrudan gelinmişse
            history.push('/shop'); // Mağaza sayfasına yönlendir
        } else {
            history.goBack(); // Önceki sayfaya geri dön
        }
    }

    // Sayfa yüklendiğinde ürün detaylarını getir
    useEffect(() => {
        dispatch(fetchProductsWithId(productId, setProductLoading));
    }, []);

    // Eğer ürün yükleniyorsa, boş string döndür
    if (productLoading) return "";

    return (
        <>
            {/* Üst Menü ve Geri Dön Butonu */}
            <section className="width-screen bg-light-gray-1">
                <div className="max-w-page-content mx-auto py-6 flex items-center justify-between font-bold text-sm leading-6">
                    <div className="flex items-center gap-3.5 px-3">
                        <Link to="/" className="text-main">Home</Link> {/* Anasayfa Link'i */}
                        <p className="text-muted-text-color font-thin text-4xl">{">"}</p>
                        <p className="text-muted-text-color">Shop</p> {/* Mağaza metni */}
                    </div>
                    <div>
                        {/* Geri Git Butonu */}
                        <button onClick={handleBack} className="flex items-center gap-2">
                            <FontAwesomeIcon className="text-2xl" icon="fa-solid fa-left-long" /> Go Back
                        </button>
                    </div>
                </div>

                {/* Ürün Bilgileri */}
                <div className="max-w-page-content mx-auto flex sm:flex-col gap-[30px] pb-12 lg:px-7 lg:items-center">
                    {/* Ürün Resmi ve Carousel */}
                    <div className="flex-1 max-w-[506px] flex flex-col">
                        <div className="w-full aspect-[10/9]">
                            <Carousel slides={productData.images} /> {/* Ürün görselleri için carousel */}
                        </div>
                    </div>

                    {/* Ürün Açıklamaları */}
                    <div className="flex-1 flex flex-col gap-4 pt-4 ">
                        <p className="leading-7.5 text-xl text-main">{productData.name}</p> {/* Ürün Adı */}
                        <div className="flex gap-2">
                            <Rating name="read-only" value={Math.round(productData.rating)} readOnly /> {/* Ürün Puanı */}
                            <p className="text-sm leading-6 font-bold">10 Reviews</p> {/* Yorum sayısı */}
                        </div>

                        <p className="text-main text-2xl leading-8">${productData.price}</p> {/* Ürün Fiyatı */}
                        <p className="text-sm leading-6 text-gray font-bold">
                            Availability: <span className="text-primary-blue">{productData.stock > 0 ? "In Stock" : "Out of Stock"}</span>
                        </p> {/* Stok Durumu */}

                        <p className="text-gray text-sm leading-5 max-w-[455]">{productData.description}</p> {/* Ürün Açıklaması */}
                        <hr />

                        {/* Ürün Renkleri */}
                        <div className="flex gap-2.5">
                            {colors.map((item, index) => {
                                return <div key={index} className={`bg-${item} w-[30px] h-[30px] rounded-full`}></div>
                            })}
                        </div>

                        {/* Butonlar (Sepete Ekle, Favorilere Ekle vs.) */}
                        <div className="flex flex-wrap gap-2.5">
                            <div>
                                <button className="rounded bg-primary-blue px-5 py-2.5 sm:px-0 text-white text-sm leading-6">Select Options</button>
                            </div>
                            <div className="flex gap-2.5">
                                <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                    <FontAwesomeIcon icon="fa-regular fa-heart" /> {/* Favorilere Ekle */}
                                </button>
                                <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                    <FontAwesomeIcon icon="fa-solid fa-cart-shopping" /> {/* Sepete Ekle */}
                                </button>
                                <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                    <FontAwesomeIcon icon="fa-solid fa-eye" /> {/* Ürünü Detaylı İncele */}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ürün Detayları Bölümü */}
            <ProductDetails />

            {/* En Çok Satan Ürünler */}
            <section className="w-screen bg-light-gray-1">
                <div className="mx-auto max-w-page-content flex flex-col items-center">
                    <h3 className="self-stretch pt-12 pb-6">BESTSELLER PRODUCTS</h3>
                    <hr className="h-[4px] border-0 mb-6 bg-[#ECECEC] self-stretch" />
                    <div className="flex flex-wrap justify-center gap-x-7 gap-y-6 pb-12">
                        {bestseller.map((item, index) => {
                            return <ProductCardSecond key={index} data={item} /> // En çok satan ürünler listesi
                        })}
                    </div>
                </div>
            </section>

            {/* Müşteri Yorumları veya Sponsorlar */}
            <Clients />
        </>
    );
}
