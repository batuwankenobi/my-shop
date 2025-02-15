import React from "react";
import { useSelector, useDispatch } from "react-redux"; // Redux'tan gerekli hook'ları içe aktarıyoruz.
import { useHistory } from "react-router-dom"; // Sayfa yönlendirmesi için `useHistory` kullanıyoruz.
import { Minus, Plus, Trash2 } from "lucide-react"; // Lucide React ikonlarını içe aktarıyoruz.
import { Button } from "@/components/ui/button"; // UI bileşenleri içe aktarılıyor.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; 
import { Checkbox } from "@/components/ui/checkbox"; // Checkbox bileşeni.

import {
  updateItemCount,
  removeFromCart,
  toggleItemCheck,
  getCartItems,
  getCartTotal,
} from "../store/actions/shoppingCartActions"; // Redux aksiyonları.

import OrderSummary from "../components/OrderSummary"; // Sipariş özeti bileşeni.

// 🛒 `CheckoutPage`: Sepet sayfası bileşeni.
const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(getCartItems); // Sepet içindeki ürünleri Redux store'dan alıyoruz.
  const history = useHistory(); // Sayfa yönlendirmesi için `useHistory` kullanılıyor.

  // 🟢 Ürün miktarını güncelleme işlemi.
  const handleQuantityChange = (productId, currentCount, change) => {
    const newCount = currentCount + change;
    if (newCount < 1) {
      dispatch(removeFromCart(productId)); // Ürün miktarı 1'in altına düşerse ürünü sepetten çıkar.
    } else {
      dispatch(updateItemCount(productId, newCount)); // Ürün miktarını güncelle.
    }
  };

  // 🟢 Ürünü sepetten kaldırma işlemi.
  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  // 🟢 Checkbox ile ürün seçim işlemi.
  const handleToggleCheck = (productId) => {
    dispatch(toggleItemCheck(productId));
  };

  // 🟢 Siparişi onaylama işlemi.
  const handleConfirmOrder = () => {
    history.push("/order"); // Sipariş tamamlandı sayfasına yönlendir.
  };

  // 🛒 Sepet boşsa kullanıcıya mesaj göster.
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-8">Your cart is empty</h1>
        <Button variant="outline" onClick={() => history.push("/shop")}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-[85vw] md:max-w-75vw mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {/* 🛒 Sol tarafta sepet ürünleri listeleniyor. */}
        <div className="md:col-span-2">
          <div className="grid gap-4">
            {cartItems.map((item) => (
              <Card key={item.product.id}>
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 space-x-4">
                    <div className="flex flex-row flex-1 items-center space-x-4">
                      {/* 🟢 Checkbox ile ürün seçme */}
                      <Checkbox
                        id={`product-${item.product.id}`}
                        checked={item.checked}
                        onCheckedChange={() =>
                          handleToggleCheck(item.product.id)
                        }
                      />
                      {/* 🛍 Ürün görseli, adı ve fiyatı */}
                      <label
                        htmlFor={`product-${item.product.id}`}
                        className="flex items-center space-x-4 flex-1 cursor-pointer"
                      >
                        <img
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-md object-cover object-top"
                        />
                        <div className="text-left">
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ${item.product.price.toFixed(2)}
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* ➕➖ Ürün miktarını artırma / azaltma */}
                    <div className="flex flex-row space-x-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleQuantityChange(
                              item.product.id,
                              item.count,
                              -1
                            )
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{item.count}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleQuantityChange(item.product.id, item.count, 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* 🗑 Ürünü kaldırma butonu */}
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveItem(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 🛍 Sağ tarafta sipariş özeti ve siparişi onaylama butonu */}
        <div className="self-center">
          <OrderSummary handleConfirmOrder={handleConfirmOrder} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
