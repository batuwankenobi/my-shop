import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Buton bileşeni (ShadCN UI)
import { Input } from "@/components/ui/input"; // Giriş (input) alanı bileşeni (ShadCN UI)
import {
  Select, // Açılır liste (dropdown) bileşeni
  SelectContent, // Açılır listenin içeriği
  SelectItem, // Açılır listedeki her bir seçenek
  SelectTrigger, // Açılır listeyi tetikleyen bileşen
  SelectValue, // Seçili değeri gösteren bileşen
} from "@/components/ui/select";
import { Label } from "@/components/ui/label"; // Etiket (Label) bileşeni

// Kart bilgilerini eklemek/düzenlemek için bir form bileşeni
const CardForm = ({ card, onSubmit }) => {
  // Form verileri için state tanımlama (Eğer bir kart bilgisi varsa varsayılan olarak alır)
  const [formData, setFormData] = useState(
    card || {
      card_no: "", // Kart numarası
      expire_month: "", // Son kullanma ayı
      expire_year: "", // Son kullanma yılı
      name_on_card: "", // Kartın üzerindeki isim
    }
  );

  // Giriş alanındaki değişiklikleri state'e kaydeden fonksiyon
  const handleChange = (e) => {
    const { name, value } = e.target; // Input'un name ve value değerlerini al
    setFormData((prev) => ({ ...prev, [name]: value })); // State'i güncelle
  };

  // Form gönderildiğinde çalışacak fonksiyon
  const handleSubmit = (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engelle
    onSubmit({
      ...formData,
      expire_month: parseInt(formData.expire_month), // Ay değerini sayıya çevir
      expire_year: parseInt(formData.expire_year), // Yıl değerini sayıya çevir
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Kart Numarası Giriş Alanı */}
      <div>
        <Label htmlFor="card_no">Card Number</Label>
        <Input
          id="card_no"
          name="card_no"
          value={formData.card_no} // State'ten gelen değeri göster
          onChange={handleChange} // Kullanıcı değişiklik yaptığında state'i güncelle
          required // Alanın zorunlu olduğunu belirtiyor
          maxLength={16} // En fazla 16 karakter olacak şekilde sınırlandır
        />
      </div>

      {/* Son Kullanma Tarihi (Ay ve Yıl) Seçimi */}
      <div className="grid grid-cols-2 gap-4">
        {/* Son Kullanma Ayı */}
        <div>
          <Label htmlFor="expire_month">Expiry Month</Label>
          <Select
            name="expire_month"
            value={formData.expire_month} // Seçili ay değerini göster
            onValueChange={(value) =>
              handleChange({ target: { name: "expire_month", value } })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <SelectItem key={month} value={month.toString()}>
                  {month.toString().padStart(2, "0")} {/* Ayı 2 basamaklı göster (01, 02, ..., 12) */}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Son Kullanma Yılı */}
        <div>
          <Label htmlFor="expire_year">Expiry Year</Label>
          <Select
            name="expire_year"
            value={formData.expire_year} // Seçili yıl değerini göster
            onValueChange={(value) =>
              handleChange({ target: { name: "expire_year", value } })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                { length: 10 }, // Sonraki 10 yılı listele
                (_, i) => new Date().getFullYear() + i // Geçerli yıldan başlayarak liste oluştur
              ).map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year} {/* Yılı göster */}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Kart Üzerindeki İsim Giriş Alanı */}
      <div>
        <Label htmlFor="name_on_card">Name on Card</Label>
        <Input
          id="name_on_card"
          name="name_on_card"
          value={formData.name_on_card} // State'ten gelen değeri göster
          onChange={handleChange} // Kullanıcı değişiklik yaptığında state'i güncelle
          required // Alanın zorunlu olduğunu belirtiyor
        />
      </div>

      {/* Kaydet Butonu */}
      <Button type="submit">Save Card</Button>
    </form>
  );
};

export default CardForm; // Bileşeni dışa aktar
