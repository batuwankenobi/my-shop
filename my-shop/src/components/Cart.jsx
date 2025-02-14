import { ShoppingCart } from "lucide-react"; // Sepet ikonunu içe aktar
import { Button } from "@/components/ui/button"; // Buton bileşeni (ShadCN UI)
import {
  Popover, // Açılır pencere bileşeni
  PopoverContent, // Açılır pencerenin içeriği
  PopoverTrigger, // Açılır pencereyi tetikleyen buton
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card"; // Kart bileşenleri (ShadCN UI)
import { useSelector, useDispatch } from "react-redux"; // Redux state'ini almak ve aksiyonları kullanmak için
import {
  removeFromCart, // Sepetten ürün kaldırma aksiyonu
  updateItemCount, // Ürün adetini güncelleme aksiyonu
  getCartItems, // Sepetteki ürünleri getiren selector
  getCartTotal, // Sepet toplam tutarını getiren selector
} from "../store/actions/shoppingCartActions";
import { Minus, Plus, Trash2 } from "lucide-react"; // Lucide ikonları (Eksi, Artı, Çöp Kutusu)
import { useHistory } from "react-router-dom"; // Sayfa yönlendirmesi için useHistory hook'u

// Sepet bileşeni (Kullanıcı alışveriş sepetini görmek için kullanır)
const Cart = () => {
  const dispatch = useDispatch(); // Redux aksiyonlarını çalıştırmak için
  const history = useHistory(); // Sayfa yönlendirme işlemi için

  // Sepetteki ürünleri Redux store'dan çek
  const cartItems = useSelector(getCartItems);
  const cartTotal = useSelector(getCartTotal); // Sepet toplam fiyatını al

  // Sepette toplam kaç ürün olduğunu hesapla
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.count, 0);

  // Ürün miktarını artırma veya azaltma fonksiyonu
  const handleUpdateQuantity = (productId, currentCount, change) => {
    const newCount = currentCount + change; // Yeni ürün adedini hesapla
    if (newCount < 1) {
      dispatch(removeFromCart(productId)); // Eğer 1'in altına düşerse ürünü sepetten kaldır
    } else {
      dispatch(updateItemCount(productId, newCount)); // Yeni adedi güncelle
    }
  };

  // Ürünü tamamen sepetten kaldırma fonksiyonu
  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <Popover>
      {/* Sepet simgesi ve içindeki ürün sayısı */}
      <PopoverTrigger asChild>
        <div className="relative cursor-pointer">
          <ShoppingCart className="text-primary-color font-semibold" /> {/* Sepet ikonu */}
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary-color text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {totalQuantity} {/* Sepetteki toplam ürün adedi */}
            </span>
          )}
        </div>
      </PopoverTrigger>

      {/* Sepet içeriği (Açılır pencere) */}
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <h3 className="font-medium leading-none">Shopping Cart</h3>

          {/* Sepetteki ürünler listesi */}
          <div className="grid gap-2 max-h-[300px] overflow-y-auto">
            {cartItems.length === 0 ? (
              // Eğer sepet boşsa kullanıcıya mesaj göster
              <p className="text-sm text-muted-foreground text-center py-4">
                Your cart is empty
              </p>
            ) : (
              // Eğer sepette ürünler varsa, her birini kart bileşeni içinde göster
              cartItems.map((item) => (
                <Card key={item.product.id} className="shadow-none">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-4">
                      {/* Ürün görseli */}
                      <img
                        src={item.product.images[0].url}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-md object-cover object-top"
                      />
                      {/* Ürün bilgileri */}
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ${(item.product.price * item.count).toFixed(2)} {/* Toplam fiyat */}
                        </p>

                        {/* Ürün adetini artırma ve azaltma butonları */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              handleUpdateQuantity(item.product.id, item.count, -1)
                            }
                          >
                            <Minus className="h-3 w-3" /> {/* Eksi butonu */}
                          </Button>
                          <span className="text-sm">{item.count}</span> {/* Ürün adedi */}
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              handleUpdateQuantity(item.product.id, item.count, 1)
                            }
                          >
                            <Plus className="h-3 w-3" /> {/* Artı butonu */}
                          </Button>
                        </div>
                      </div>
                      {/* Ürünü sepetten kaldırma butonu */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleRemoveItem(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" /> {/* Çöp kutusu ikonu */}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Sepet toplamı ve ödeme butonu */}
          {cartItems.length > 0 && (
            <>
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Total:</p>
                <p className="text-sm font-medium">${cartTotal.toFixed(2)}</p>
              </div>
              <Button
                className="w-full"
                onClick={() => history.push("/checkout")} // Ödeme sayfasına yönlendir
              >
                Checkout
              </Button>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Cart; // Bileşeni dışa aktar
