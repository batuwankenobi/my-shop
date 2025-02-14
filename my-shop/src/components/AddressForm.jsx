import React, { useState, useEffect } from "react"; // React ve ilgili hook'ları içe aktarıyoruz
import axios from "axios"; // HTTP istekleri yapmak için axios kullanıyoruz
import { Button } from "@/components/ui/button"; // UI için özel olarak tanımlanmış Button bileşeni
import { Input } from "@/components/ui/input"; // Form girdileri için Input bileşeni
import { Label } from "@/components/ui/label"; // Form elemanları için Label bileşeni
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Şehir seçimi için Select bileşeni
import { Textarea } from "@/components/ui/textarea"; // Adres alanı için Textarea bileşeni

// AddressForm bileşeni, yeni adres eklemek veya mevcut bir adresi düzenlemek için kullanılır
function AddressForm({ address, onSubmit }) {
  // Form verisini tutan state, eğer adres verildiyse onu başlat, yoksa boş bir form başlat
  const [formData, setFormData] = useState(
    address || {
      title: "",
      name: "",
      surname: "",
      phone: "",
      city: "",
      district: "",
      neighborhood: "",
      address: "",
    }
  );

  const [cities, setCities] = useState([]); // Şehir listesini tutan state
  const [isLoading, setIsLoading] = useState(false); // Yüklenme durumunu belirleyen state
  const [error, setError] = useState(null); // Hata mesajını tutan state

  // Şehirleri API'den çekmek için useEffect kullanılıyor
  useEffect(() => {
    const fetchCities = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/cities",
          {
            country: "turkey", // Türkiye şehirlerini almak için API isteği yapılıyor
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data;
        if (data.error) {
          throw new Error(data.msg);
        }
        setCities(data.data.slice(0, 81)); // API'den gelen şehir listesini al ve state'e kaydet
      } catch (err) {
        setError("Failed to fetch cities. Please try again.");
        console.error("Error fetching cities:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);

  // Form alanları değiştiğinde state'i güncelleyen fonksiyon
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form gönderildiğinde onSubmit fonksiyonunu çağıran fonksiyon
  const handleSubmit = (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engelle
    onSubmit(formData); // Üst bileşene form verisini gönder
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Adres başlığı girdisi */}
      <div>
        <Label htmlFor="title">Address Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      
      {/* İsim ve soyisim girdileri */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="surname">Surname</Label>
          <Input id="surname" name="surname" value={formData.surname} onChange={handleChange} required />
        </div>
      </div>
      
      {/* Telefon ve şehir seçimi */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Select name="city" value={formData.city} onValueChange={(value) => handleChange({ target: { name: "city", value } })}>
            <SelectTrigger>
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* İlçe ve mahalle */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="district">District</Label>
          <Input id="district" name="district" value={formData.district} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="neighborhood">Neighborhood</Label>
          <Input id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange} required />
        </div>
      </div>
      
      {/* Adres metin alanı */}
      <div>
        <Label htmlFor="address">Address</Label>
        <Textarea id="address" name="address" value={formData.address} onChange={handleChange} required />
      </div>
      
      {/* Kaydet butonu */}
      <Button type="submit">Save Address</Button>
    </form>
  );
}

export default AddressForm; // Bileşeni dışa aktarıyoruz
