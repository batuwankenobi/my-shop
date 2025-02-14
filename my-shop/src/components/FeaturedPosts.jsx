import React from "react"; 
import { Badge } from "@/components/ui/badge"; // Etiket bileşeni
import {
  Card, // Kart bileşeni (Ana konteyner)
  CardContent, // Kart içeriği (Başlık, açıklama vb.)
  CardDescription, // Açıklama metni
  CardFooter, // Kart alt kısmı (Tarih, yorum bilgisi vb.)
  CardHeader, // Kart üst kısmı (Resim alanı)
  CardTitle, // Kart başlığı
} from "@/components/ui/card";
import { Calendar, ChartArea } from "lucide-react"; // Takvim ve grafik ikonları

// Öne çıkan gönderileri gösteren bileşen
const FeaturedPosts = () => {
  // Gönderi listesi (Başlık, açıklama, tarih, yorum sayısı, kategoriler ve görseller)
  const posts = [
    {
      title: "Loudest à la Madison #1 (L'integral)", // Başlık
      description:
        "We focus on ergonomics and meeting you where you work. It’s only a keystroke away.", // Açıklama metni
      date: "22 April 2021", // Yayınlanma tarihi
      comments: 10, // Yorum sayısı
      category: ["Google", "Trending", "New"], // Kategori etiketleri
      image: "unsplash_hHdHCfAifHU.jpg", // Gönderi görseli
    },
    {
      title: "Loudest à la Madison #2 (L'integral)",
      description:
        "We focus on ergonomics and meeting you where you work. It’s only a keystroke away.",
      date: "22 April 2021",
      comments: 10,
      category: ["Google", "Trending", "New"],
      image: "unsplash_tVEqStC2uz8.jpg",
    },
    {
      title: "Loudest à la Madison #3 (L'integral)",
      description:
        "We focus on ergonomics and meeting you where you work. It’s only a keystroke away.",
      date: "22 April 2021",
      comments: 10,
      category: ["Google", "Trending", "New"],
      image: "unsplash_dEGu-oCuB1Y.jpg",
    },
  ];

  return (
    <div className="max-w-[80vw] md:max-w-75vw mx-auto my-12">
      {/* Sayfa başlığı ve açıklama */}
      <h2 className="text-sm text-primary-color font-semibold">
        Practice Advice
      </h2>
      <h2 className="text-2xl font-bold text-center mt-2">Featured Posts</h2>
      <p className="text-light-gray m-4">
        Problems trying to resolve the conflict between the two major realms of
        Classical physics: Newtonian mechanics
      </p>

      {/* Gönderilerin listelendiği grid yapısı */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post, index) => (
          <Card key={index} className="rounded-lg overflow-hidden shadow-md">
            {/* Kartın üst kısmı (Görsel ve 'NEW' etiketi) */}
            <CardHeader className="relative">
              <img
                src={post.image} // Gönderiye ait görsel
                alt={post.title} // Alternatif metin
                className="w-full h-full object-cover" // Resmin kapsama şekli
              />
              <Badge className="absolute top-8 left-8 bg-danger-color text-white px-2 py-1">
                NEW
              </Badge>
            </CardHeader>

            {/* Kart içeriği */}
            <CardContent className="p-4">
              {/* Kategori etiketleri */}
              <div className="flex space-x-2 text-sm text-gray-500 mb-2">
                {post.category.map((cat, i) => (
                  <span key={i}>{cat}</span> // Her kategori için bir etiket oluştur
                ))}
              </div>
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3> {/* Gönderi başlığı */}
              <p className="text-gray-600 text-sm">{post.description}</p> {/* Açıklama metni */}
            </CardContent>

            {/* Kartın alt kısmı (Tarih ve yorum sayısı) */}
            <CardFooter className="p-4 border-t text-sm flex justify-between text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar /> {/* Takvim ikonu */}
                <span>{post.date}</span> {/* Yayınlanma tarihi */}
              </div>
              <div className="flex items-center space-x-1">
                <ChartArea /> {/* Yorumlar/görüşler ikonu */}
                <span>{post.comments} comments</span> {/* Yorum sayısı */}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts; // Bileşeni dışa aktar
