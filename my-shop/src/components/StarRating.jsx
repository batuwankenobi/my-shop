import React from "react";
import { Star } from "lucide-react"; // Yıldız ikonunu içe aktarıyoruz

// Yıldızlı değerlendirme bileşeni
const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => {
        // Her yıldız için doluluk oranını hesaplar (0 ile 1 arasında)
        const fillPercentage = Math.max(0, Math.min(1, rating - (star - 1)));

        return (
          <div key={star} className="relative">
            {/* Boş yıldız (gri renk) */}
            <Star className="w-5 h-5 text-slate-300" />

            {/* Dolu yıldız (sarı renk) - Kesilmiş olarak gösterilecek */}
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${fillPercentage * 100}%` }} // Doluluk oranına göre genişlik ayarlanır
            >
              <Star className="w-5 h-5 text-sunburst fill-sunburst" /> {/* Dolu yıldız */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
