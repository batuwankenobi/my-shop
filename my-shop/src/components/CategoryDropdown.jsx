import { useSelector, useDispatch } from "react-redux"; // Redux hook'ları
import { Link } from "react-router-dom"; // Sayfa yönlendirme için Link bileşeni
import {
  DropdownMenu, // Açılır menü bileşeni
  DropdownMenuContent, // Açılır menü içeriği
  DropdownMenuItem, // Açılır menü öğesi
  DropdownMenuTrigger, // Açılır menüyü tetikleyen bileşen
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react"; // Açılır menü için aşağı ok simgesi
import createSlug from "../utils/createSlug"; // SEO dostu URL slug oluşturma fonksiyonu
import { updateCategory } from "../store/actions/productActions"; // Redux aksiyonu: Kategoriyi günceller

// Kategori dropdown bileşeni
const CategoryDropdown = () => {
  const dispatch = useDispatch(); // Redux aksiyonlarını çağırmak için

  // Kullanıcı bir kategoriye tıkladığında Redux store'u güncelle
  const handleCategoryClick = (categoryId) => {
    dispatch(updateCategory(categoryId));
  };

  // Redux store'dan kategori listesini çek
  const categories = useSelector((state) => state.product.categories);

  // Kadın kategorilerini filtrele (gender === "k")
  const femaleCategories = categories.filter(
    (category) => category.gender === "k"
  );

  // Erkek kategorilerini filtrele (gender === "e")
  const maleCategories = categories.filter(
    (category) => category.gender === "e"
  );

  return (
    <div className="inline-flex items-center justify-center text-center space-x-0 text-light-gray">
      {/* Ana "Shop" Linki */}
      <Link to="/shop" className="ml-4 font-semibold">
        Shop
      </Link>

      {/* Açılır menü (Dropdown) */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ChevronDown className="mt-1" /> {/* Açılır menü simgesi */}
        </DropdownMenuTrigger>

        {/* Açılır menü içeriği */}
        <DropdownMenuContent className="p-4 grid grid-cols-2 gap-4">
          {/* Kadın Kategorileri */}
          <div>
            <h4 className="font-semibold text-dark-gray mb-2">Kadın</h4>
            {femaleCategories.map((category) => (
              <DropdownMenuItem key={category.id} asChild>
                <Link
                  to={`/shop/kadin/${createSlug(category.title)}/${category.id}`} // SEO dostu slug ile yönlendirme
                  className="text-dark-gray"
                  onClick={() => handleCategoryClick(category.id)} // Redux'a kategori ID'sini gönder
                >
                  {category.title}
                </Link>
              </DropdownMenuItem>
            ))}
          </div>

          {/* Erkek Kategorileri */}
          <div>
            <h4 className="font-semibold text-dark-gray mb-2">Erkek</h4>
            {maleCategories.map((category) => (
              <DropdownMenuItem key={category.id} asChild>
                <Link
                  to={`/shop/erkek/${createSlug(category.title)}/${category.id}`} // SEO dostu slug ile yönlendirme
                  className="text-dark-gray"
                  onClick={() => handleCategoryClick(category.id)} // Redux'a kategori ID'sini gönder
                >
                  {category.title}
                </Link>
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CategoryDropdown; // Bileşeni dışa aktar
