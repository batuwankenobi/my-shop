import {
  getCartItems,
  getCartTotal,
  clearCart,
  setPayment,
} from "../store/actions/shoppingCartActions";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import api from "../api/axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function OrderSummary({
  handleConfirmOrder,
  activeTab,
  setActiveTab,
  shippingAddress,
  billingAddress,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false); // Yükleme durumunu takip eder
  const [showSuccess, setShowSuccess] = useState(false); // Sipariş başarıyla tamamlandı mı?
  const [error, setError] = useState(""); // Hata mesajını saklar

  // Redux store'dan alışveriş sepeti verilerini alır
  const cartItems = useSelector(getCartItems);
  const subtotal = useSelector(getCartTotal);
  const cart = useSelector((state) => state.cart);
  const selectedCard = cart.payment; // Seçilen ödeme yöntemi

  // Sipariş tutarını hesaplar
  const shipping = subtotal > 0 ? 5 : 0; // Sepette ürün varsa 5$ kargo ücreti eklenir
  const discount = subtotal > 0 ? 5 : 0; // Sepette ürün varsa 5$ indirim uygulanır
  const total = subtotal + shipping - discount; // Toplam tutar hesaplanır

  // Sipariş oluşturma fonksiyonu
  const createOrder = async () => {
    setLoading(true);
    setError("");

    // Kullanıcı adres ve sepet bilgilerini al
    const addressId = cart.address.id;
    const products = cart.cart.filter((item) => item.checked);
    const orderProducts = products.map((item) => ({
      product_id: item.product.id,
      count: item.count,
      detail: `${item.product.description}`,
    }));

    // Backend'e gönderilecek sipariş verileri
    const payload = {
      address_id: addressId,
      order_date: new Date().toISOString(),
      card_no: parseInt(selectedCard.card_no, 10),
      card_name: selectedCard.name_on_card,
      card_expire_month: selectedCard.expire_month,
      card_expire_year: selectedCard.expire_year,
      price: total,
      products: orderProducts,
    };

    try {
      await api.post("/order", payload); // Sipariş API'ye gönderilir
      console.log("Order created with payload:", payload);
      setShowSuccess(true); // Sipariş başarıyla oluşturuldu mesajını göster
      dispatch(clearCart()); // Sepeti temizle
      dispatch(setPayment(null)); // Ödeme bilgilerini sıfırla
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create order"); // Hata mesajını ekrana yazdır
    } finally {
      setLoading(false);
    }
  };

  // Butona tıklanınca yapılacak işlemler
  const handleButtonClick = () => {
    if (handleConfirmOrder) {
      handleConfirmOrder(); // Eğer alışveriş sepetindeysek, ödeme sekmesine yönlendir
    } else if (activeTab === "payment") {
      createOrder(); // Eğer ödeme sekmesindeysek, siparişi oluştur
    } else {
      setActiveTab("payment"); // Eğer ödeme sekmesine gelinmemişse, ödeme sekmesine yönlendir
    }
  };

  // Sipariş tamamlandıktan sonra ana sayfaya yönlendirme
  const handleSuccess = () => {
    setShowSuccess(false);
    history.push("/");
  };

  // Butonun devre dışı olup olmayacağını kontrol eder
  const isDisabled = () => {
    if (total === 0) return true; // Sepet boşsa butonu devre dışı bırak

    if (!handleConfirmOrder) {
      if (activeTab === "payment") {
        return !selectedCard; // Ödeme sekmesindeyken kart seçilmemişse buton devre dışı bırakılır
      }
      return !shippingAddress || !billingAddress; // Adres bilgileri eksikse buton devre dışı bırakılır
    }

    return false;
  };

  // Buton metni ve bilgilendirme mesajlarını belirler
  const getButtonContent = () => {
    if (total === 0) {
      return { buttonText: "No Items Selected", message: "" };
    }

    if (!handleConfirmOrder) {
      if (activeTab === "payment") {
        if (!selectedCard) {
          return { buttonText: "Place Order", message: "Please select a payment method" };
        }
        return { buttonText: loading ? "Processing..." : "Place Order", message: "" };
      }
      if (!shippingAddress || !billingAddress) {
        return { buttonText: "Continue to Payment", message: "Please fill in both shipping and billing addresses" };
      }
    }

    return {
      buttonText: handleConfirmOrder ? "Proceed to Checkout" : "Continue to Payment",
      message: "",
    };
  };

  const { buttonText, message } = getButtonContent();

  return (
    <>
      {/* Sipariş Özeti Kartı */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-2 border-slate-300">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          {/* Sipariş Ver Butonu */}
          <div className="mt-3 space-y-2">
            <Button
              className="w-2/3 mt-3"
              onClick={handleButtonClick}
              disabled={isDisabled() || loading}
            >
              {buttonText}
            </Button>
            {message && <p className="text-sm text-danger-color text-center">{message}</p>}
            {error && <p className="text-sm text-danger-color text-center">{error}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Sipariş Başarıyla Tamamlandı Mesajı */}
      <Dialog open={showSuccess} onOpenChange={handleSuccess}>
        <DialogContent className="max-w-75vw mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              Order Placed Successfully!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-5">
            <p className="mb-2">Thank you for your purchase! Your order has been confirmed.</p>
            <div className="flex justify-center space-x-4">
              <Button onClick={() => history.push("/shop")}>Continue Shopping</Button>
              <Button onClick={() => history.push("/previous-orders")}>View Your Orders</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
