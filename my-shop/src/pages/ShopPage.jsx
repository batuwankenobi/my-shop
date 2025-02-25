import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/ProductCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LayoutGrid, List, ChevronRight, Filter } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import {
  updateFilter,
  updateSort,
  updateCategory,
  setFilter,
  initializeShopPage,
  setCurrentPage,
} from "../store/actions/productActions";

import BrandLogos from "../components/BrandLogos";

import { Loader2 } from "lucide-react";
import { ShopPagination } from "../components/ShopPagination";
import { selectProductsWithCategories } from "../store/selectors/selectProductsWithCategories";
import createSlug from "../utils/createSlug";
import ProductGrid from "../components/ProductGrid";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import { set } from "react-hook-form";

const ShopPage = () => {
  const dispatch = useDispatch();
  const { gender, categoryName, categoryId } = useParams();
  const location = useLocation();
  const history = useHistory();

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const {
    productList,
    total,
    fetchState,
    categories,
    limit,
    offset,
    filter,
    sort,
    currentPage,
    category,
  } = useSelector((state) => state.product);

  const productsWithCategories = selectProductsWithCategories(
    productList,
    categories
  );

  useEffect(() => {
    if (location.pathname === "/shop") {
      // Reset category to null when we're back on /shop
      dispatch(initializeShopPage()); // Or directly set the state to null if not using Redux
    }
  }, [location, dispatch]);

  // Sort categories by rating and take top 5
  const topCategories = [...categories]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  // Handle category selection
  const handleCategoryChange = async (categoryId, gender, categoryTitle) => {
    const slug = createSlug(categoryTitle);
    history.push(
      `/shop/${gender === "k" ? "kadin" : "erkek"}/${slug}/${categoryId}`
    );
    dispatch(updateCategory(categoryId));
  };

  // Handle filter input
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedUpdateFilter = useCallback(
    debounce((newFilter) => {
      dispatch(updateFilter(newFilter));
    }, 1000),
    []
  );

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    dispatch(setFilter(newFilter));
    debouncedUpdateFilter(newFilter);
  };

  // Handle sort selection
  const handleSortChange = (value) => {
    dispatch(updateSort(value));
    console.log("new sorting criterion: ", value);
  };

  if (fetchState === "FETCHING" && productList.length === 0) {
    return <div>Loading...</div>;
  }

  if (fetchState === "FAILED" && productList.length === 0) {
    return <div>Error loading data. Please try again.</div>;
  }

  return (
    <>
      <div className="container max-w-[85vw] md:max-w-75vw mx-auto px-8 py-8 md:py-12">
        {/* Header and Breadcrumb */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-0">Shop</h3>

          <DynamicBreadcrumb gender={gender} categoryId={categoryId} />
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-8 md:mb-12">
          {topCategories.map((category) => (
            <Card
              key={category.id}
              onClick={() =>
                handleCategoryChange(
                  category.id,
                  category.gender,
                  category.title
                )
              }
              className="relative overflow-hidden group cursor-pointer transition-all hover:scale-105"
            >
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  <img
                    src={category.img}
                    alt={category.title}
                    className="w-full h-full object-cover object-top transition-opacity"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h3 className="font-bold text-lg md:text-xl text-center mb-1 drop-shadow-lg uppercase">
                      {category.gender === "k" ? "KADIN" : "ERKEK"}
                    </h3>
                    <h3 className="font-bold text-lg md:text-xl text-center mb-1 drop-shadow-lg uppercase">
                      {category.title}
                    </h3>
                    <p className="text-xs md:text-sm drop-shadow-lg">
                      Rating: {category.rating}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filter Controls - Mobile */}
        <div className="md:hidden flex flex-col gap-4 mb-6">
          <div className="flex flex-col justify-between items-center gap-4">
            <span className="text-sm text-gray-500">
              Showing {offset + 1} to {offset + productList.length} of {total}{" "}
              results
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {showMobileFilters && (
            <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-lg">
              <Select
                value={sort}
                onValueChange={handleSortChange}
                className="w-full"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price:asc">Price: Low to High</SelectItem>
                  <SelectItem value="price:desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating:asc">
                    Rating: Low to High
                  </SelectItem>
                  <SelectItem value="rating:desc">
                    Rating: High to Low
                  </SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="text"
                placeholder="Filter products..."
                value={filter}
                onChange={handleFilterChange}
                className="border rounded px-2 py-1"
              />
            </div>
          )}
        </div>

        {/* Filter Controls - Desktop */}
        <div className="hidden md:flex justify-between items-center mb-8">
          <div className="text-sm text-gray-500">
            Showing {offset + 1} to {offset + productList.length} of {total}{" "}
            results
          </div>
          <div className="flex items-center gap-4">
            <Select value={sort} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price:asc">Price: Low to High</SelectItem>
                <SelectItem value="price:desc">Price: High to Low</SelectItem>
                <SelectItem value="rating:asc">Rating: Low to High</SelectItem>
                <SelectItem value="rating:desc">Rating: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Filter products..."
              value={filter}
              onInput={handleFilterChange}
              className="border rounded px-2 py-1 w-[200px]"
            />
            <Button
              variant="outline"
              size="lg"
              onClick={() => dispatch(updateFilter(""))}
            >
              Clear Filter
            </Button>
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid
          fetchState={fetchState}
          productsWithCategories={productsWithCategories}
        />

        {/* Pagination */}
        <div className="flex justify-center mb-2">
          <ShopPagination />
        </div>
      </div>
      <BrandLogos />
    </>
  );
};

export default ShopPage;