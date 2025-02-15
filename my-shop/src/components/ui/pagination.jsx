import * as React from "react"; // React kütüphanesini içe aktarıyoruz.
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"; // Radix UI'den ikonları içe aktarıyoruz.

import { cn } from "@/lib/utils"; // Sınıfları birleştirmek için yardımcı fonksiyon `cn`'i içe aktarıyoruz.
import { buttonVariants } from "@/components/ui/button"; // Daha önce tanımladığımız buton stillerini içe aktarıyoruz.

// 🟢 `Pagination`: Sayfalama bileşeni için kapsayıcı `<nav>` öğesi.
const Pagination = ({ className, ...props }) => (
  <nav
    role="navigation"
    aria-label="pagination" // Erişilebilirlik için aria etiketi ekleniyor.
    className={cn("mx-auto flex w-full justify-center", className)} // Sayfalama bileşeni merkeze hizalanıyor.
    {...props}
  />
);
Pagination.displayName = "Pagination";

// 🟢 `PaginationContent`: Sayfalama içeriğini düzenleyen `<ul>` öğesi.
const PaginationContent = React.forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)} // Sayfa numaraları yatay hizalanıyor.
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

// 🟢 `PaginationItem`: Her bir sayfa veya özel buton (önceki, sonraki) için `<li>` öğesi.
const PaginationItem = React.forwardRef(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

// 🟢 `PaginationLink`: Sayfa numaralarını temsil eden `<a>` öğesi.
const PaginationLink = ({ className, isActive, size = "icon", ...props }) => (
  <a
    aria-current={isActive ? "page" : undefined} // Aktif sayfa için erişilebilirlik desteği.
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost", // Aktif sayfa vurgulanıyor.
        size,
      }),
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

// 🟢 `PaginationPrevious`: Önceki sayfaya gitmek için buton.
const PaginationPrevious = ({ className, ...props }) => (
  <PaginationLink
    aria-label="Go to previous page" // Erişilebilirlik için açıklama ekleniyor.
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeftIcon className="h-4 w-4" /> {/* Sol ok ikonu */}
    <span>Previous</span> {/* "Önceki" metni */}
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

// 🟢 `PaginationNext`: Sonraki sayfaya gitmek için buton.
const PaginationNext = ({ className, ...props }) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span> {/* "Sonraki" metni */}
    <ChevronRightIcon className="h-4 w-4" /> {/* Sağ ok ikonu */}
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

// 🟢 `PaginationEllipsis`: Aradaki sayfaları gizleyen üç nokta (`...`).
const PaginationEllipsis = ({ className, ...props }) => (
  <span
    aria-hidden // Ekran okuyucular için gizleniyor.
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <DotsHorizontalIcon className="h-4 w-4" /> {/* Üç nokta ikonu */}
    <span className="sr-only">More pages</span> {/* Erişilebilirlik için gizli metin */}
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

// 🟢 Tüm bileşenleri dışa aktarıyoruz.
export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
