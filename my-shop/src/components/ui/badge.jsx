import * as React from "react"  // React kütüphanesini içe aktarıyoruz.
import { cva } from "class-variance-authority";  // class-variance-authority kütüphanesinden `cva` fonksiyonunu içe aktarıyoruz.

import { cn } from "@/lib/utils"  // Yardımcı fonksiyon `cn`'i utils dosyasından içe aktarıyoruz. Bu, sınıfları birleştirmek için kullanılır.

// `badgeVariants` adında bir stil varyantları oluşturuyoruz.
// `cva` fonksiyonu, belirli varyantlar ve stiller ile birlikte bir bileşenin sınıf adlarını dinamik olarak oluşturur.
const badgeVariants = cva(
  "inline-flex items-center rounded-md border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-300",
  { 
    variants: {
      variant: { // Farklı "variant" (varyant) türlerine göre stiller belirleniyor.
        default: // Varsayılan stil
          "border-transparent bg-slate-900 text-slate-50 shadow hover:bg-slate-900/80 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80",
        secondary: // İkincil stil
          "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        destructive: // "Tehlikeli" veya "silme" amaçlı bir buton stili
          "border-transparent bg-red-500 text-slate-50 shadow hover:bg-red-500/80 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/80",
        outline: // Kenarlıklı stil
          "text-slate-950 dark:text-slate-50",
      },
    },
    defaultVariants: { // Varsayılan varyant ayarlanıyor.
      variant: "default",
    },
  }
)

// `Badge` adlı fonksiyonel bileşeni tanımlıyoruz.
// Bu bileşen, belirli stiller ve varyantlarla bir etiket (badge) oluşturur.
function Badge({
  className, // Kullanıcıdan gelen ekstra sınıf adları
  variant,   // Varyant türü (default, secondary, destructive, outline)
  ...props   // Diğer tüm props'lar
}) {
  return (
    <div 
      className={cn(badgeVariants({ variant }), className)} // `badgeVariants` içinden seçilen varyant ve ekstra sınıfları birleştiriyoruz.
      {...props} // Bileşene gelen diğer tüm özellikleri (props) aktarıyoruz.
    />
  );
}

// `Badge` ve `badgeVariants` bileşenlerini dışa aktarıyoruz, böylece başka dosyalarda kullanılabilir.
export { Badge, badgeVariants }
