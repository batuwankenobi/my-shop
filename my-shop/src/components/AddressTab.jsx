import React, { useState } from "react";
import {
  Dialog, // Açılır pencere bileşeni
  DialogContent, // Açılır pencerenin içeriği
  DialogHeader, // Açılır pencerenin başlığı
  DialogTitle, // Açılır pencerenin başlık metni
  DialogTrigger, // Açılır pencereyi tetikleyen bileşen
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"; // Buton bileşeni
import { Checkbox } from "@/components/ui/checkbox"; // Checkbox bileşeni
import { Label } from "@/components/ui/label"; // Etiket bileşeni
import { RadioGroup } from "@/components/ui/radio-group"; // Radyo grubu bileşeni
import { PlusCircle } from "lucide-react"; // Lucide-react'ten "+" ikonlu buton
import AddressCard from "./AddressCard"; // Adres kartı bileşeni
import AddressForm from "./AddressForm"; // Adres formu bileşeni
import {
  addNewAddress, // Yeni adres ekleme aksiyonu
  deleteExistingAddress, // Mevcut adresi silme aksiyonu
  updateExistingAddress, // Mevcut adresi güncelleme aksiyonu
} from "../store/actions/clientActions";
import { setAddress } from "../store/actions/shoppingCartActions"; // Adres seçildiğinde store'a işleme aksiyonu
import { useDispatch, useSelector } from "react-redux"; // Redux için dispatch ve selector kullanımı

// Adres yönetim bileşeni
const AddressTab = ({
  shippingAddress, // Kullanıcının seçtiği teslimat adresi
  setShippingAddress, // Teslimat adresini ayarlayan fonksiyon
  billingAddress, // Kullanıcının seçtiği fatura adresi
  setBillingAddress, // Fatura adresini ayarlayan fonksiyon
  useSameAddress, // Kullanıcı aynı adresi hem teslimat hem de fatura adresi olarak kullanıyor mu?
  setUseSameAddress, // Aynı adres kullanım durumunu değiştiren fonksiyon
}) => {
  const dispatch = useDispatch(); // Redux dispatch fonksiyonu
  const addresses = useSelector((state) => state.client.addressList); // Redux store'dan adres listesini çekme

  // Açılır pencere ve düzenleme durumu için state'ler
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false); // Yeni adres ekleme penceresinin açık olup olmadığını kontrol eder
  const [editingAddress, setEditingAddress] = useState(null); // Düzenlenen adresin bilgilerini saklar

  // Yeni adres ekleme fonksiyonu
  const handleAddAddress = (newAddress) => {
    dispatch(addNewAddress(newAddress)); // Redux'a yeni adres ekleme aksiyonunu gönder
    setIsAddDialogOpen(false); // Açılır pencereyi kapat
  };

  // Adresi güncelleme fonksiyonu
  const handleUpdateAddress = (updatedAddress) => {
    dispatch(updateExistingAddress(updatedAddress)); // Redux'a güncelleme aksiyonunu gönder
    setEditingAddress(null); // Düzenleme modundan çık
  };

  // Adresi silme fonksiyonu
  const handleDeleteAddress = (id) => {
    dispatch(deleteExistingAddress(id)); // Redux'tan adresi sil
  };

  // Adres seçme fonksiyonu
  const handleSelectAddress = (type, address) => {
    if (type === "shipping") {
      setShippingAddress(address); // Teslimat adresini ayarla
      dispatch(setAddress(address)); // Redux'a bildir
      if (useSameAddress) {
        setBillingAddress(address); // Eğer aynı adres seçildiyse fatura adresini de güncelle
        dispatch(setAddress(address)); // Redux'a bildir
      }
    } else {
      setBillingAddress(address); // Fatura adresini güncelle
      dispatch(setAddress(address)); // Redux'a bildir
    }
  };

  return (
    <div>
      {/* Başlık ve Yeni Adres Ekleme Butonu */}
      <div className="my-4 flex flex-wrap justify-between gap-4 items-center">
        <h1 className="text-2xl font-bold">Address Information</h1>
        {/* Yeni adres ekleme açılır penceresi */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            <AddressForm onSubmit={handleAddAddress} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Aynı adresi kullan seçeneği */}
      <div className="flex items-center space-x-2 mb-4">
        <Checkbox
          id="sameAddress"
          checked={useSameAddress} // Aynı adres kullanılıyor mu?
          onCheckedChange={setUseSameAddress} // Durumu güncelle
        />
        <Label htmlFor="sameAddress">
          Use the same address for both shipping and billing
        </Label>
      </div>

      {/* Adreslerin gösterildiği grid sistemi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Teslimat Adresleri */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Shipping Addresses</h2>
          <RadioGroup
            value={shippingAddress?.id} // Seçili adresin ID'si
            onValueChange={(value) =>
              handleSelectAddress(
                "shipping",
                addresses.find((a) => a.id === value) // Seçilen adresi bul ve güncelle
              )
            }
          >
            {addresses.map((address) => (
              <AddressCard
                key={address.id} // React için benzersiz anahtar
                address={address} // Adres verisi
                isSelected={shippingAddress?.id === address.id} // Seçili adresi belirleme
                onEdit={() => setEditingAddress(address)} // Düzenleme moduna geç
                onDelete={() => handleDeleteAddress(address.id)} // Silme işlemi
              />
            ))}
          </RadioGroup>
        </div>

        {/* Fatura Adresleri */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Billing Addresses</h2>
          <RadioGroup
            value={billingAddress?.id} // Seçili fatura adresinin ID'si
            onValueChange={(value) =>
              handleSelectAddress(
                "billing",
                addresses.find((a) => a.id === value) // Seçilen adresi bul ve güncelle
              )
            }
            disabled={useSameAddress} // Eğer aynı adres kullanılıyorsa devre dışı bırak
          >
            {addresses.map((address) => (
              <AddressCard
                key={address.id} // React için benzersiz anahtar
                address={address} // Adres verisi
                isSelected={billingAddress?.id === address.id} // Seçili adresi belirleme
                onEdit={() => setEditingAddress(address)} // Düzenleme moduna geç
                onDelete={() => handleDeleteAddress(address.id)} // Silme işlemi
                disabled={useSameAddress} // Eğer aynı adres kullanılıyorsa devre dışı bırak
              />
            ))}
          </RadioGroup>
        </div>
      </div>

      {/* Adres Düzenleme Dialog Penceresi */}
      {editingAddress && (
        <Dialog open={!!editingAddress} onOpenChange={() => setEditingAddress(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Address</DialogTitle>
            </DialogHeader>
            <AddressForm address={editingAddress} onSubmit={handleUpdateAddress} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AddressTab; // Bileşeni dışa aktar
