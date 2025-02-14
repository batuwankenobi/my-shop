import React from "react";
import { Button } from "@/components/ui/button"; // Buton bileşeni (ShadCN UI)
import { RadioGroupItem } from "@/components/ui/radio-group"; // Radyo butonu bileşeni (kart seçimi için)
import { CreditCard, Edit, Trash } from "lucide-react"; // Lucide ikonları (Kart, düzenleme ve çöp kutusu ikonları)
import { Label } from "@/components/ui/label"; // Etiket bileşeni (ShadCN UI)

// Kart bileşeni: Kullanıcının kayıtlı kartlarını listelemek ve yönetmek için kullanılır.
const CardItem = ({ card, isSelected, onEdit, onDelete }) => (
  <div
    className={`relative p-4 rounded-lg border ${
      isSelected ? "border-slate-800" : "border-slate-200"
    }`} // Seçili kartın çerçevesini koyu renkte yap
  >
    {/* Radyo butonu: Kart seçimi için */}
    <RadioGroupItem
      value={card.id} // Kartın benzersiz kimliği
      id={`card-${card.id}`} // HTML etiketleriyle ilişkilendirmek için ID
      className="absolute left-4 top-4" // Radyo butonunu sol üst köşeye yerleştir
    />

    {/* Kart bilgileri */}
    <div className="space-y-1 p-4">
      {/* Kart sahibinin adı */}
      <Label
        htmlFor={`card-${card.id}`} // Radyo butonu ile ilişkilendir
        className="font-medium flex items-center"
      >
        <CreditCard className="mr-2 h-4 w-4" /> {/* Kart simgesi */}
        {card.name_on_card} {/* Kart üzerindeki isim */}
      </Label>

      {/* Kart numarasının son 4 hanesi */}
      <p className="text-sm text-muted-foreground">
        **** **** **** {card.card_no.slice(-4)} {/* Güvenlik için sadece son 4 hane gösterilir */}
      </p>

      {/* Kartın son kullanma tarihi */}
      <p className="text-sm text-muted-foreground">
        Expires: {card.expire_month}/{card.expire_year}
      </p>
    </div>

    {/* Düzenleme ve silme butonları */}
    <div className="absolute bottom-4 right-4 flex space-x-2">
      <Button variant="ghost" size="icon" onClick={onEdit}>
        <Edit className="h-4 w-4" /> {/* Düzenleme ikonu */}
      </Button>
      <Button variant="ghost" size="icon" onClick={onDelete}>
        <Trash className="h-4 w-4" /> {/* Silme ikonu */}
      </Button>
    </div>
  </div>
);

export default CardItem; // Bileşeni dışa aktar
