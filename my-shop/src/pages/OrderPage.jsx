import { useState, useEffect } from "react"; // React'in state ve lifecycle yönetim hook'larını içe aktarıyoruz.
import { useDispatch, useSelector } from "react-redux"; // Redux state yönetimi için gerekli hook'lar.
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // UI bileşenlerinden sekmeler (Tabs).
import { fetchAddresses, getCards } from "../store/actions/clientActions"; // Kullanıcı adresleri ve ödeme bilgilerini almak için aksiyonlar.
import OrderSummary from "../components/OrderSummary"; // Sipariş özeti bileşeni.
import AddressTab from "../components/AddressTab"; // Adres bilgileri sekmesi.
import PaymentTab from "../components/PaymentTab"; // Ödeme bilgileri sekmesi.

const OrderPage = () => {
  const dispatch = useDispatch();

  // 📌 State Yönetimi
  const [shippingAddress, setShippingAddress] = useState(null); // Kullanıcının kargo adresi.
  const [billingAddress, setBillingAddress] = useState(null); // Kullanıcının fatura adresi.
  const [useSameAddress, setUseSameAddress] = useState(false); // Kullanıcı, kargo ve fatura adresini aynı yapmak istiyor mu?
  const [activeTab, setActiveTab] = useState("address"); // Aktif sekmeyi takip eder ("address" veya "payment").
  const [selectedCard, setSelectedCard] = useState(null); // Seçili kredi kartını takip eder.

  // 🟢 Kullanıcının adres ve ödeme bilgilerini almak için API çağrıları yapılıyor.
  useEffect(() => {
    dispatch(fetchAddresses()); // Kullanıcının adreslerini Redux store'a al.
    dispatch(getCards()); // Kullanıcının kayıtlı ödeme bilgilerini al.
  }, [dispatch]);

  // 🟢 Ödeme sekmesini aktif etmek için adres bilgileri dolu mu kontrol edilir.
  const disabled = () => {
    if (!shippingAddress || !billingAddress) {
      return true; // Eğer adreslerden biri eksikse "Payment" sekmesi devre dışı bırakılır.
    }
    return false;
  };

  return (
    <div className="container max-w-[85vw] md:max-w-75vw mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* 🏠 Adres ve Ödeme Sekmeleri */}
        <div className="flex-grow">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            
            {/* 🔄 Sekme Butonları */}
            <TabsList className="grid w-full h-16 grid-cols-2">
              <TabsTrigger className="h-12" value="address">
                Address Info
              </TabsTrigger>
              <TabsTrigger
                className="h-12"
                value="payment"
                disabled={disabled()} // Eğer adres bilgileri eksikse devre dışı bırak.
              >
                Payment Info
              </TabsTrigger>
            </TabsList>

            {/* 🏠 Adres Bilgileri Sekmesi */}
            <TabsContent value="address">
              <AddressTab
                shippingAddress={shippingAddress}
                setShippingAddress={setShippingAddress}
                billingAddress={billingAddress}
                setBillingAddress={setBillingAddress}
                useSameAddress={useSameAddress}
                setUseSameAddress={setUseSameAddress}
              />
            </TabsContent>

            {/* 💳 Ödeme Bilgileri Sekmesi */}
            <TabsContent value="payment">
              <PaymentTab
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* 🧾 Sipariş Özeti */}
        <div className="w-full md:w-1/3 self-center">
          <OrderSummary
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            shippingAddress={shippingAddress}
            billingAddress={billingAddress}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
