import { useDispatch, useSelector } from "react-redux"; 
import { addToCartAction, deleteFromCartAction, removeFromCartAction, toggleCheckAction } from "../store/actions/ShoppingCartActions"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { Checkbox } from "@mui/material"; 
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom"; 
import OrderSummary from "../components/OrderSummary"; 

// Checkbox bileşeni için etiket tanımlama
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function ShoppingCart() {
    // Redux store'dan sepeti alıyoruz. 
    // JSON.stringify kullanarak önceki ve yeni state'in içeriğini karşılaştırıp gereksiz render'ları önlüyoruz.
    const cart = useSelector(store => store.shoppingCart.cart, (prev, next) => JSON.stringify(prev) === JSON.stringify(next));

    // Sepetteki seçili ürünlerin toplam fiyatını hesaplıyoruz
    const totalPriceProducts = cart.reduce((accumulator, item) => 
        item.checked ? accumulator + item.count * item.product.price : accumulator, 0
    );

    // Kargo ücreti ve ücretsiz kargo limiti tanımlamaları
    const shippingPaymentPrice = 29.90;
    const shippingDiscountLimit = 150;
    
    // Eğer toplam fiyat ücretsiz kargo limitini geçerse kargo ücreti eklenmez.
    const totalPriceAll = totalPriceProducts >= shippingDiscountLimit 
        ? totalPriceProducts 
        : totalPriceProducts + shippingPaymentPrice;

    const dispatch = useDispatch(); // Redux aksiyonlarını kullanmak için dispatch tanımlıyoruz.
    const navigate = useNavigate(); // Sayfa yönlendirme işlemleri için useNavigate() kullanıyoruz.

    // Sepet işlemleri için bir fonksiyon oluşturuyoruz.
    const handleCart = (id, type) => {
        const product = cart.find(p => p.product.id === id); // Sepetteki ürünü buluyoruz.
        if (!product) return;

        // İşlem tipine göre doğru Redux aksiyonunu çalıştırıyoruz.
        const actions = {
            add: addToCartAction,
            remove: removeFromCartAction,
            delete: deleteFromCartAction
        };

        dispatch(actions[type](product.product)); // Seçilen işlemi Redux'a iletiyoruz.
    };

    // Checkbox kontrolünü değiştiren fonksiyon
    const handleCheck = (id) => {
        const product = cart.find(p => p.product.id === id);
        if (!product) return;

        dispatch(toggleCheckAction(product.product)); // Redux'ta ürünün seçili olup olmadığını değiştiriyoruz.
    };

    // Fiyatı 2 ondalık basamak olarak biçimlendiren fonksiyon
    const toFixed2 = (num) => parseFloat(num).toFixed(2);

    // Kullanıcıyı önceki sayfaya geri döndüren fonksiyon
    const handleGoBack = () => navigate(-1);

    // Eğer sepet boşsa, kullanıcıya "Sepetiniz Boş" mesajı gösteriyoruz.
    if (cart.length === 0) {
        return (
            <div className="w-screen h-[40vh] flex flex-col justify-center items-center">
                <p className="text-3xl">Your Cart is Empty</p>
                <button onClick={handleGoBack} className="bg-primary-blue py-3 px-5 rounded text-white text-2xl mt-3">
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="w-screen pt-3">
            {/* Ana konteyner */}
            <div className="flex max-w-[1450px] mx-auto lg:flex-col lg:gap-10">
                
                {/* Sepetteki ürünler listesi */}
                <div className="basis-[60%]">
                    {cart.map((item, index) => (
                        <div key={index} className={`flex justify-between py-2 pl-8 pr-8 sm:pr-4 sm:pl-2 gap-1 ${index % 2 === 0 ? "bg-light-gray-1" : ""}`}>
                            
                            {/* Ürün bilgileri */}
                            <div className="flex-[3] flex items-center w-full gap-3 sm:gap-1">
                                {/* Checkbox ile ürünü seçme */}
                                <Checkbox className="flex-1 size-2" {...label} checked={item.checked} onClick={() => handleCheck(item.product.id)} />
                                
                                {/* Ürün resmi */}
                                <div className="flex-[3] aspect-[3/4]">
                                    <img 
                                        className="min-w-[70px] w-full object-cover object-center sm:none" 
                                        src={item.product.images[0].url} 
                                        alt={item.product.name} 
                                        loading="lazy" 
                                    />
                                </div>

                                {/* Ürün adı ve açıklaması */}
                                <div className="flex-[15]">
                                    <p className="text-main sm:text-[14px]">{item.product.name}</p>
                                    <p className="text-sm sm:text-[12px] max-w-[350px] sm:max-w-[200px] text-muted-text-color line-clamp-2">
                                        {item.product.description}
                                    </p>
                                </div>
                            </div>

                            {/* Fiyat, adet kontrolü ve silme butonları */}
                            <div className="flex-1 flex flex-row justify-between gap-1">
                                
                                {/* Ürün toplam fiyatı */}
                                <div className="flex-1 flex items-center sm:text-[14px] min-w-[70px]">
                                    <p className="w-full">{toFixed2(item.product.price * item.count)}$</p>
                                </div>

                                {/* Adet artırma/azaltma butonları */}
                                <div className="flex-1 justify-center flex flex-col items-center bg-white border rounded text-[14px] min-w-[60px] sm:min-w-[40px]">
                                    <button className="w-full" onClick={() => handleCart(item.product.id, "add")}>
                                        <FontAwesomeIcon icon="fa-solid fa-angle-up" />
                                    </button>
                                    <p>{item.count}</p>
                                    <button className="w-full" onClick={() => handleCart(item.product.id, "remove")}>
                                        <FontAwesomeIcon icon="fa-solid fa-angle-down" />
                                    </button>
                                </div>

                                {/* Ürünü sepetten tamamen kaldırma butonu */}
                                <div className="flex-1 flex items-center min-w-[50px]">
                                    <button onClick={() => handleCart(item.product.id, "delete")} className="text-xl hover:text-[#800000] sm:text-[16px] w-full">
                                        <FontAwesomeIcon icon="fa-solid fa-trash" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sipariş Özeti */}
                <div className="basis-[40%]">
                    <OrderSummary />
                    
                    {/* Sipariş oluşturma butonu */}
                    <Link to="/createOrder">
                        <button className="w-full py-3 bg-primary-blue text-white mt-4 text-xl rounded text-center">
                            Create Order
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
