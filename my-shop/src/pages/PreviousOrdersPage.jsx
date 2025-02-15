import api from "../api/axios"; // API istekleri için axios kullanılıyor.
import { useEffect, useState } from "react"; // React hook'larını içe aktarıyoruz.
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"; // UI bileşenlerinden kart bileşenleri.
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // UI bileşenlerinden tablo bileşenleri.

// 🛍 `PreviousOrdersPage`: Kullanıcının önceki siparişlerini listeleyen sayfa bileşeni.
const PreviousOrdersPage = () => {
  // 🟢 Siparişleri saklamak için state tanımlanıyor.
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🟢 Siparişleri API'den çekmek için `useEffect` kullanılıyor.
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await api.get("/order");

        // 📌 Siparişleri tarihe göre sıralıyoruz (En yeni sipariş en üstte olacak şekilde).
        const sortedOrders = response.data.sort(
          (a, b) =>
            new Date(b.order_date).getTime() - new Date(a.order_date).getTime()
        );

        setOrders(sortedOrders); // Siparişleri state'e kaydet.
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders"); // Hata mesajı saklanıyor.
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // 📌 Yüklenme durumu için mesaj gösterme.
  if (loading) return <div>Loading...</div>;

  // 📌 Hata durumunda hata mesajı gösterme.
  if (error) return <div>{error}</div>;

  // 📌 Eğer hiç sipariş yoksa "No orders found" mesajını göster.
  if (orders.length === 0)
    return (
      <div className="flex justify-center items-center my-16">
        No orders found
      </div>
    );

  return (
    <div className="container max-w-[85vw] md:max-w-75vw mx-auto p-4">
      <h1 className="text-2xl font-bold my-4">Previous Orders</h1>

      {/* 📦 Kullanıcının daha önce verdiği tüm siparişleri listeleme */}
      {orders.map((order) => (
        <Card key={order.id} className="mb-4">
          <CardHeader>
            <CardTitle>Order #{order.id}</CardTitle> {/* Sipariş numarası */}
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-2 mb-2">
              <p className="font-semibold">Date:</p>
              <p>{new Date(order.order_date).toLocaleString()}</p> {/* Sipariş tarihi */}
            </div>

            {/* 📜 Sipariş içeriği tablosu */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <img
                          src={product.images[0].url} // Ürün görseli
                          alt={product.name}
                          className="w-12 h-12 object-cover object-top"
                        />
                        <span>{product.name}</span> {/* Ürün adı */}
                      </div>
                    </TableCell>
                    <TableCell>{product.count}</TableCell> {/* Ürün miktarı */}
                    <TableCell>${product.price.toFixed(2)}</TableCell> {/* Ürün fiyatı */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>

          {/* 🏷 Sipariş toplamı */}
          <CardFooter className="flex justify-end mb-2">
            <div className="flex items-center space-x-2 mr-2 md:mr-16">
              <p className="font-semibold text-right">Total:</p>
              <p className="text-right">${order.price.toFixed(2)}</p> {/* Toplam fiyat */}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PreviousOrdersPage;
