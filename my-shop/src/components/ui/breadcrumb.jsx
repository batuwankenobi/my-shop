import * as React from "react"  // React kütüphanesini içe aktarıyoruz.
import { ChevronRightIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"  // Radix UI'den ikonları içe aktarıyoruz.
import { Slot } from "@radix-ui/react-slot"  // `Slot` bileşenini içe aktarıyoruz (kompozisyon için kullanılır).

import { cn } from "@/lib/utils"  // Sınıfları dinamik olarak birleştirmek için yardımcı fonksiyon `cn`'i içe aktarıyoruz.

// Ana Breadcrumb bileşeni. Bu, tüm breadcrumb (yol gösterici navigasyon) bileşenlerini kapsayan `<nav>` elementidir.
const Breadcrumb = React.forwardRef(
  ({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />
)
Breadcrumb.displayName = "Breadcrumb"  // Bileşen adı belirleniyor.

// Breadcrumb listesini oluşturan `<ol>` (ordered list) bileşeni.
const BreadcrumbList = React.forwardRef(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-slate-500 sm:gap-2.5 dark:text-slate-400",  // Tailwind CSS stilleri uygulanıyor.
      className
    )}
    {...props} />
))
BreadcrumbList.displayName = "BreadcrumbList"

// Breadcrumb içindeki her bir öğeyi temsil eden `<li>` bileşeni.
const BreadcrumbItem = React.forwardRef(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}  // Öğeler arasına boşluk ekleniyor.
    {...props} />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

// Breadcrumb bağlantısı bileşeni (istenirse bir `a` etiketi olarak kullanılabilir).
const BreadcrumbLink = React.forwardRef(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"  // Eğer `asChild` özelliği verilmişse `Slot` kullanılır, yoksa `a` etiketi olur.

  return (
    <Comp
      ref={ref}
      className={cn(
        "transition-colors hover:text-slate-950 dark:hover:text-slate-50",  // Fare üzerine gelindiğinde renk değişir.
        className
      )}
      {...props} />
  );
})
BreadcrumbLink.displayName = "BreadcrumbLink"

// Mevcut sayfayı gösteren (tıpkı `BreadcrumbLink` gibi ama tıklanamaz) bir bileşen.
const BreadcrumbPage = React.forwardRef(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"  // Erişilebilirlik için `role="link"` atanıyor.
    aria-disabled="true"  // Mevcut sayfa olduğu için devre dışı bırakılıyor.
    aria-current="page"  // Bu öğenin mevcut sayfa olduğunu belirtiyor.
    className={cn("font-normal text-slate-950 dark:text-slate-50", className)}
    {...props} />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

// Breadcrumb öğeleri arasındaki ayırıcıyı (genellikle ">" gibi bir simge) temsil eden bileşen.
const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}) => (
  <li
    role="presentation"  // Sadece görsel bir bileşen olduğu için `role="presentation"` ekleniyor.
    aria-hidden="true"  // Erişilebilirlik için gizli olarak işaretleniyor.
    className={cn(" [&\\>svg]:w-3.5 [&\\>svg]:h-3.5", className)}

    {...props}>
    {children ? children : <span>&gt;</span>}

    {/* // Eğer içerik belirtilmezse varsayılan olarak `>` ikonunu kullan. */}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

// Birçok öğe olduğunda "..." şeklinde bir kısayol göstermek için kullanılan bileşen.
const BreadcrumbEllipsis = ({
  className,
  ...props
}) => (
  <span
    role="presentation"  // Yalnızca görsel bir öğe olduğu için `role="presentation"` kullanılıyor.
    aria-hidden="true"  // Ekran okuyucuların görmemesi için gizleniyor.
    className={cn("flex h-9 w-9 items-center justify-center", className)}  // Boyutlandırma ve hizalama ayarlanıyor.
    {...props}>
    <DotsHorizontalIcon className="h-4 w-4" />  // "..." (üç nokta) ikonunu gösteriyor.
    <span className="sr-only">More</span>  // Erişilebilirlik için gizli metin ekleniyor.
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

// Tüm bileşenleri dışa aktarıyoruz, böylece başka yerlerde kullanılabilir.
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
