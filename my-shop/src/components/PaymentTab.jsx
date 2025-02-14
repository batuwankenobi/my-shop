import React, { useState } from "react";
import {
  Dialog, // Açılır pencere bileşeni
  DialogContent, // Diyalog içeriği
  DialogHeader, // Diyalog başlığı bölümü
  DialogTitle, // Diyalog başlığı
  DialogTrigger, // Diyalog açma tetikleyicisi
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group"; // Radyo buton grubu
import { PlusCircle } from "lucide-react"; // Artı simgesi (kart eklemek için)
import CardItem from "./CardItem"; // Tek tek kart bileşeni
import CardForm from "./CardForm"; // Kart ekleme ve düzenleme formu
import { useDispatch, useSelector } from "react-redux";
import {
  getCards, // Kayıtlı kartları getirme
  addCard, // Yeni kart ekleme
  updateCard, // Kart güncelleme
  deleteCard, // Kart silme
} from "../store/actions/clientActions";
import { setPayment } from "../store/actions/shoppingCartActions"; // Seçili ödeme kartını Redux'a kaydetme

// Ödeme sekmesi bileşeni
const PaymentTab = ({ selectedCard, setSelectedCard }) => {
  const dispatch = useDispatch(); // Redux'taki action'ları çağırmak için kullanılır
  const cards = useSelector((state) => state.client.creditCards); // Kullanıcının kayıtlı kartlarını Redux'tan alır

  const [isAddCardDialogOpen, setIsAddCardDialogOpen] = useState(false); // Yeni kart ekleme popup'ının açık olup olmadığını kontrol eder
  const [editingCard, setEditingCard] = useState(null); // Düzenlenecek kart bilgisini saklar

  // Yeni kart ekleme fonksiyonu
  const handleAddCard = (cardData) => {
    dispatch(addCard(cardData)); // Redux store'a yeni kartı ekler
    setIsAddCardDialogOpen(false); // Popup'ı kapatır
  };

  // Kartı güncelleme fonksiyonu
  const handleUpdateCard = (cardData) => {
    dispatch(updateCard(cardData)); // Redux store'daki kartı günceller
    setEditingCard(null); // Düzenleme modundan çıkar
  };

  // Kartı silme fonksiyonu
  const handleDeleteCard = (cardId) => {
    dispatch(deleteCard(cardId)); // Redux store'dan kartı kaldırır
  };

  // Kart seçme fonksiyonu
  const handleSelectCard = (card) => {
    setSelectedCard(card); // Seçili kartı state içinde saklar
    dispatch(setPayment(card)); // Redux store'a seçilen kartı kaydeder
  };

  return (
    <div>
      {/* Başlık ve yeni kart ekleme butonu */}
      <div className="my-4 flex flex-wrap justify-between gap-4 items-center">
        <h2 className="text-2xl font-bold">Payment Information</h2>
        
        {/* Yeni kart ekleme butonu */}
        <Dialog
          open={isAddCardDialogOpen}
          onOpenChange={setIsAddCardDialogOpen} // Açılır pencerenin durumunu yönetir
        >
          <DialogTrigger asChild>
            <Button variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Card
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Card</DialogTitle>
            </DialogHeader>
            {/* Yeni kart ekleme formu */}
            <CardForm onSubmit={handleAddCard} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Kayıtlı kartları listeleme alanı */}
      <RadioGroup
        value={selectedCard?.id} // Seçili kartın ID'sini belirler
        onValueChange={(value) =>
          handleSelectCard(cards.find((c) => c.id === value)) // Kullanıcının seçtiği kartı kaydeder
        }
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Kullanıcının tüm kartlarını listele */}
        {cards.map((card) => (
          <CardItem
            key={card.id}
            card={card} // Kart bilgilerini gönderir
            isSelected={selectedCard?.id === card.id} // Seçili kartı belirler
            onEdit={() => setEditingCard(card)} // Düzenleme butonuna basınca kart bilgisini saklar
            onDelete={() => handleDeleteCard(card.id)} // Silme butonuna basınca kartı kaldırır
          />
        ))}
      </RadioGroup>

      {/* Kart düzenleme popup'ı */}
      {editingCard && (
        <Dialog open={!!editingCard} onOpenChange={() => setEditingCard(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Card</DialogTitle>
            </DialogHeader>
            {/* Düzenleme formu, mevcut kart bilgileriyle açılır */}
            <CardForm card={editingCard} onSubmit={handleUpdateCard} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PaymentTab; // Bileşeni dışa aktar
