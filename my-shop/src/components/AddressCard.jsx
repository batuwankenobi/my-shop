import React from "react"; // React kütüphanesini içe aktarıyoruz
import { Button } from "@/components/ui/button"; // Özel olarak oluşturulmuş bir Button bileşeni kullanılıyor
import { RadioGroupItem } from "@/components/ui/radio-group"; // Radio butonu için özel bir bileşen
import { Edit, Trash } from "lucide-react"; // İkonları içe aktarıyoruz (Düzenleme ve Silme için)
import { Label } from "@/components/ui/label"; // Label bileşeni

// AddressCard bileşeni, bir adresi görüntülemek ve düzenleme/silme işlemlerini yapmak için kullanılır
function AddressCard({ address, isSelected, onEdit, onDelete, disabled }) {
  return (
    <div
      className={`relative p-4 rounded-lg border ${
        isSelected ? "border-slate-800" : "border-slate-200" // Seçili adres ise koyu renk çerçeve uygulanıyor
      } ${disabled ? "opacity-50" : ""}`} // Eğer disabled (devre dışı) ise opaklık düşürülüyor
    >
      {/* Radyo butonu ve adres başlığı */}
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value={address.id} // Adresin kimliğini temsil eden radyo butonu
          id={`address-${address.id}`}
          disabled={disabled} // Eğer devre dışı ise radyo butonu tıklanamaz
        />
        <Label htmlFor={`address-${address.id}`}>{address.title}</Label> {/* Adres başlığı */}
      </div>
      
      {/* Adres detayları */}
      <div className="space-y-1 text-left">
        <p className="text-sm text-muted-foreground">
          {address.name} {address.surname} {/* Kullanıcının adı ve soyadı */}
        </p>
        <p className="text-sm text-muted-foreground">{address.phone}</p> {/* Telefon numarası */}
        <p className="text-sm text-muted-foreground">
          {address.neighborhood} {address.address} {/* Mahalle ve tam adres bilgisi */}
        </p>
        <p className="text-sm text-muted-foreground">
          {address.district}, {address.city} {/* İlçe ve şehir bilgisi */}
        </p>
      </div>
      
      {/* Düzenleme ve silme butonları */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onEdit} // Düzenleme butonuna tıklanınca çalışacak fonksiyon
          disabled={disabled} // Eğer devre dışı ise buton çalışmaz
        >
          <Edit className="h-4 w-4" /> {/* Düzenleme ikonu */}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete} // Silme butonuna tıklanınca çalışacak fonksiyon
          disabled={disabled} // Eğer devre dışı ise buton çalışmaz
        >
          <Trash className="h-4 w-4" /> {/* Çöp kutusu (silme) ikonu */}
        </Button>
      </div>
    </div>
  );
}

export default AddressCard; // Bileşeni dışa aktarıyoruz, böylece diğer dosyalarda kullanılabilir
