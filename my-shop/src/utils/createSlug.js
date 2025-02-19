export default function createSlug(name) {
  // Türkçe karakterleri İngilizce karşılıklarına çevirmek için bir eşleme (harita) oluşturuyoruz.
  const trToEngMap = {
    ç: "c",
    Ç: "C",
    ğ: "g",
    Ğ: "G",
    ı: "i",
    İ: "I",
    ö: "o",
    Ö: "O",
    ş: "s",
    Ş: "S",
    ü: "u",
    Ü: "U",
  };

  return name
    .split("") // İsmi karakterlerine ayırıyoruz.
    .map((char) => trToEngMap[char] || char) // Eğer karakter Türkçe harf ise eşdeğer İngilizce harfe çeviriyoruz.
    .join("") // Tekrar birleştiriyoruz.
    .toLowerCase() // Tüm harfleri küçük harfe çeviriyoruz.
    .replace(/[^a-z0-9]+/g, "-") // Harf ve rakam dışındaki karakterleri "-" ile değiştiriyoruz.
    .replace(/^-+|-+$/g, ""); // Baştaki ve sondaki "-" işaretlerini temizliyoruz.
}
