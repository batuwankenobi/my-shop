import { useSelector, useDispatch } from "react-redux"; // Redux ile state yönetimi
import { Link } from "react-router-dom"; // Sayfa yönlendirme
import {
  DropdownMenu, // Açılır menü bileşeni
  DropdownMenuContent, // Açılır menü içeriği
  DropdownMenuItem, // Açılır menü öğesi
  DropdownMenuTrigger, // Açılır menü tetikleyicisi
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react"; // Aşağı ok simgesi
import createSlug from "../utils/createSlug"; // URL dostu slug oluşturmak için
import { updateCategory } from "../store/actions/productActions"; // Redux aksiyonu

// Kategori Dropdown Menüsü
const CategoryDropdown = () => {
  const dispatch = useDispatch(); // Redux aksiyonlarını çağırmak için

  // Kategoriye tıklanınca Redux state'ini günceller
  const handleCategoryClick = (categoryId) => {
    dispatch(updateCategory(categoryId));
  };

  // Redux store'dan kategorileri alır
  const categories = useSelector((state) => state.product.categories);

  // Kadın ve erkek kategorilerini ayır
  const femaleCategories = categories.filter(
    (category) => category.gender === "k"
  );
  const maleCategories = categories.filter(
    (category) => category.gender === "e"
  );

  return (
    <div className="inline-flex items-center justify-center text-center space-x-0 text-light-gray">
      {/* Mağaza Ana Sayfasına Link */}
      <Link to="/shop" className="ml-4 font-semibold">
        Shop
      </Link>

      {/* Dropdown Menü */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ChevronDown className="mt-1" /> {/* Açılır menü simgesi */}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-4 grid grid-cols-2 gap-4">
          
          {/* Kadın Kategorileri */}
          <div>
            <h4 className="font-semibold text-dark-gray mb-2">Kadın</h4>
            {femaleCategories.map((category) => (
              <DropdownMenuItem key={category.id} asChild>
                <Link
                  to={`/shop/kadin/${createSlug(category.title)}/${category.id}`}
                  className="text-dark-gray"
                  onClick={() => handleCategoryClick(category.id)}
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
                  to={`/shop/erkek/${createSlug(category.title)}/${category.id}`}
                  className="text-dark-gray"
                  onClick={() => handleCategoryClick(category.id)}
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

export default CategoryDropdown;
