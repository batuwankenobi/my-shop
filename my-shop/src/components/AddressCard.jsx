import React from "react";
import { Button } from "@/components/ui/button"; // ShadCN UI kütüphanesinden buton bileşeni
import { RadioGroupItem } from "@/components/ui/radio-group"; // Radyo butonları için bir bileşen
import { Edit, Trash } from "lucide-react"; // Lucide React kütüphanesinden düzenleme ve çöp kutusu ikonları
import { Label } from "@/components/ui/label"; // ShadCN UI'den label (etiket) bileşeni

// Adres kartı bileşeni, kullanıcıya bir adres seçme ve düzenleme/silme seçenekleri sunar
function AddressCard({ address, isSelected, onEdit, onDelete, disabled }) {
  return (
    <div
      className={`relative p-4 rounded-lg border ${
        isSelected ? "border-slate-800" : "border-slate-200"
      } ${disabled ? "opacity-50" : ""}`} // Seçili adres kalın sınır, devre dışı adresler saydam gösterilir
    >
      {/* Radyo butonu ve adres başlığı */}
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value={address.id} // Adresin ID'sini radyo butonunun değeri olarak belirleme
          id={`address-${address.id}`} // ID oluşturma (etiketle bağlamak için)
          disabled={disabled} // Eğer adres devre dışıysa seçim yapılamaz
        />
        <Label htmlFor={`address-${address.id}`}>{address.title}</Label> 
        {/* Adres başlığını gösteren etiket */}
      </div>

      {/* Adres detaylarının gösterildiği alan */}
      <div className="space-y-1 text-left">
        <p className="text-sm text-muted-foreground">
          {address.name} {address.surname} {/* Kullanıcının adı ve soyadı */}
        </p>
        <p className="text-sm text-muted-foreground">{address.phone}</p> {/* Telefon numarası */}
        <p className="text-sm text-muted-foreground">
          {address.neighborhood} {address.address} {/* Mahalle ve adres detayları */}
        </p>
        <p className="text-sm text-muted-foreground">
          {address.district}, {address.city} {/* İlçe ve şehir bilgisi */}
        </p>
      </div>

      {/* Düzenleme ve silme butonlarının olduğu alan */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onEdit} // Düzenleme fonksiyonunu çalıştırır
          disabled={disabled} // Devre dışıysa tıklanamaz
        >
          <Edit className="h-4 w-4" /> {/* Düzenleme ikonu */}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete} // Silme fonksiyonunu çalıştırır
          disabled={disabled} // Devre dışıysa tıklanamaz
        >
          <Trash className="h-4 w-4" /> {/* Çöp kutusu ikonu */}
        </Button>
      </div>
    </div>
  );
}

export default AddressCard; // Bileşeni dışa aktarma
