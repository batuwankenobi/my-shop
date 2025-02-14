import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb"; // Adjust the import based on your actual component
import { ChevronRight } from "lucide-react"; // Adjust the icon import as necessary
import createSlug from "../utils/createSlug";

function DynamicBreadcrumb({ gender, categoryId }) {
  const history = useHistory();
  const categoryTitle = useSelector((state) => {

    const category = state.product.categories.find(
      (cat) => cat.id === parseInt(categoryId)
    );
    return category ? category.title : "";
  });

  const getBreadcrumbItems = () => {
    const items = [
      { label: "Home", path: "/" },
      { label: "Shop", path: "/shop" },
    ];

    if (gender && categoryTitle) {
      items.push({
        label: gender === "kadin" ? "Kadın" : "Erkek",
        path: `/shop/${gender}`,
      });
      items.push({
        label: categoryTitle,
        path: `/shop/${gender}/${createSlug(categoryTitle)}/${categoryId}`,
      });
    }

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  return (
    <Breadcrumb className="flex flex-row">
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={item.path}>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => history.push(item.path)}
              className={
                index === breadcrumbItems.length - 1
                  ? "font-bold cursor-pointer"
                  : "cursor-pointer"
              }
            >
              {item.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
          {index < breadcrumbItems.length - 1 && <ChevronRight />}
        </React.Fragment>
      ))}
    </Breadcrumb>
  );
}

export default DynamicBreadcrumb;
