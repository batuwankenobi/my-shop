import { useEffect, useState } from "react";
import { Checkbox } from "@mui/material"; // Checkbox bileşeni
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // FontAwesome ikonları
import AddressHookForm from "../components/AddressHookForm"; // Adres formu bileşeni
import { ecommerceAPI } from "../instance"; // API instance
import { useDispatch, useSelector } from "react-redux"; // Redux işlemleri
import { getCities, getDistrictsByCityCode } from 'turkey-neighbourhoods'; // Türkiye şehir ve ilçeler verisi
import OrderSummary from "../components/OrderSummary"; // Sipariş özeti bileşeni
import AddressBox from "../components/AddressBox"; // Adres kutusu bileşeni
import CardHookForm from "../components/CardHookForm"; // Kredi kartı formu bileşeni
import CreditCardCard from "../components/CreditCardCard"; // Kredi kartı kutusu bileşeni
import { useHistory } from "react-router-dom/cjs/react-router-dom"; // Sayfa yönlendirme
import { cleanCartAction } from "../store/actions/ShoppingCartActions"; // Redux aksiyonu: Sepeti temizleme

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function CreateOrder() {
    // Sayfa state'leri
    const [page, setPage] = useState("address"); // "address" veya "payment"
    const [paymentReceipt, setPaymentReceipt] = useState(true); // Fatura adresi aynı mı?
    const token = useSelector(store => store.user.user.token); // Kullanıcı token'ı
    const cart = useSelector(store => store.shoppingCart.cart); // Sepet içeriği

    // Form açma-kapama state'leri
    const [addressFormOpen, setAddressFormOpen] = useState(false);
    const [cardFormOpen, setCardFormOpen] = useState(false);

    // Kullanıcının adres ve kart bilgileri
    const [allAddress, setAllAddress] = useState([]);
    const [addressEdit, setAddressEdit] = useState({});
    const [cardEdit, setCardEdit] = useState({});
    const [allCards, setAllCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState({});
    const [selectedShippingAddress, setSelectedShippingAddress] = useState({});

    const history = useHistory();
    const dispatch = useDispatch();

    // Sayfa değiştirme
    const handlePage = (page) => setPage(page);

    // Fatura adresi kontrol kutusunu değiştirme
    const handleReceiptCheck = () => setPaymentReceipt(!paymentReceipt);

    // Adres formunu aç/kapat
    const handleAddressForm = () => setAddressFormOpen(!addressFormOpen);
    const handleAddressGoBack = () => {
        setAddressFormOpen(false);
        setAddressEdit({});
    };

    // Kart formunu aç/kapat
    const handleCardForm = () => setCardFormOpen(!cardFormOpen);
    const handleCardGoBack = () => {
        setCardFormOpen(false);
        setCardEdit({});
    };

    // Kullanıcının adreslerini getir
    const getAddress = () => {
        ecommerceAPI.get("/user/address", { headers: { Authorization: token } })
            .then((res) => setAllAddress(res.data))
            .catch(err => console.error(err));
    };

    // Kullanıcının kayıtlı kartlarını getir
    const getCard = () => {
        ecommerceAPI.get("/user/card", { headers: { Authorization: token } })
            .then((res) => setAllCards(res.data))
            .catch(err => console.error(err));
    };

    // Adres düzenleme işlemi
    const handleAddressEdit = (element) => {
        if (element.target.id) {
            for (const addr of allAddress) {
                if (addr.id == element.target.id) {
                    let cityCode = getCities().find(o => o.name == addr.city).code;
                    let districtCode = getDistrictsByCityCode(cityCode).indexOf(getDistrictsByCityCode(cityCode).find(o => o == addr.district));
                    setAddressEdit({ ...addr, city: cityCode, district: districtCode });
                    break;
                }
            }
        }
        handleAddressForm();
    };

    // Kullanıcının siparişi tamamlaması
    const completeOrder = () => {
        // Sepetteki ürünlerin toplam fiyatını hesapla
        const totalPriceProducts = cart.reduce((acc, item) => {
            return item.checked ? acc + item.count * item.product.price : acc;
        }, 0);

        // Kargo ücreti
        const shippingPaymentPrice = 29.90;
        const shippingDiscountLimit = 150;
        let totalPriceAll = totalPriceProducts + shippingPaymentPrice - (totalPriceProducts >= shippingDiscountLimit ? shippingPaymentPrice : 0);
        totalPriceAll = (Math.round(totalPriceAll * 100) / 100).toFixed(2);

        // Sepetteki ürünleri listele
        const productsBought = cart.filter(item => item.checked).map(product => ({
            product_id: product.product.id,
            count: product.count,
            detail: product.product.name
        }));

        // Sipariş oluşturma isteği
        ecommerceAPI.post("/order", {
            "address_id": selectedShippingAddress.id,
            "order_date": new Date().toISOString().slice(0, 19),
            "card_no": selectedCard.card_no,
            "card_name": selectedCard.name_on_card,
            "card_expire_month": selectedCard.expire_month,
            "card_expire_year": selectedCard.expire_year,
            "card_ccv": 111, // Test verisi
            "price": totalPriceAll,
            "products": [...productsBought]
        }, {
            headers: {
                Authorization: token
            }
        }).then(() => dispatch(cleanCartAction())) // Sepeti temizle
            .then(() => history.push("/orderCompleted")) // Sipariş tamamlandı sayfasına yönlendir
            .catch(err => console.error(err));
    };

    // Sayfa yüklendiğinde adresleri ve kartları getir
    useEffect(() => {
        getAddress();
        setSelectedShippingAddress(allAddress[0]);
        getCard();
    }, []);

    return (
        <div className="w-screen text-main">
            <div className="flex max-w-[1450px] mx-auto xl:flex-col xl:gap-10">
                
                {/* Adres ve Ödeme Seçenekleri */}
                <div className="basis-[60%]">
                    <div className="flex mb-3">
                        {/* Adres Bilgileri Sekmesi */}
                        <div onClick={() => handlePage("address")} className={"basis-[50%] border-b-8 px-3 py-2 cursor-pointer" + (page === "address" ? " border-primary-blue text-primary-blue" : "")}>
                            <h2 className="text-2xl">Adres Bilgileri</h2>
                            <p className="text-gray text-sm">{selectedShippingAddress?.title || allAddress[0]?.title || ""}</p>
                            <p className="text-gray text-sm">{selectedShippingAddress?.address || allAddress[0]?.address || ""}</p>
                        </div>
                        
                        {/* Ödeme Seçenekleri Sekmesi */}
                        <div onClick={() => handlePage("payment")} className={"basis-[50%] border-b-8 px-3 py-2 cursor-pointer" + (page === "payment" ? " border-primary-blue text-primary-blue" : "")}>
                            <h2 className="text-2xl">Ödeme Seçenekleri</h2>
                            <p className="text-sm text-main"><span className="font-bold">Banka/Kredi Kartı</span> ile ödeme yapabilirsiniz.</p>
                        </div>
                    </div>
                    
                    {/* Adres veya Ödeme Seçenekleri İçeriği */}
                    {page === "address" ? <AddressHookForm submitFn={completeOrder} /> : <CardHookForm submitFn={completeOrder} />}
                </div>

                {/* Sipariş Özeti */}
                <div className="basis-[40%]">
                    <OrderSummary />
                    <div className="px-10">
                        <button className="w-full py-3 bg-primary-blue text-white mt-4 text-xl rounded text-center" onClick={completeOrder}>
                            Complete Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
