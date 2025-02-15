import * as React from "react"; // React kütüphanesini içe aktarıyoruz.

import { cn } from "@/lib/utils"; // Sınıfları birleştirmek için yardımcı fonksiyon `cn`'i içe aktarıyoruz.

// 🟢 Ana `Card` bileşeni: Kartın dış kabuğunu oluşturur.
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-slate-200 bg-white text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50",
      className
    )} // Tailwind CSS ile kartın stilini belirliyoruz.
    {...props} // Gelen ek özellikleri `div` içine ekliyoruz.
  />
));
Card.displayName = "Card"; // React DevTools içinde görünmesi için adlandırma yapıyoruz.

// 🟢 `CardHeader`: Kartın üst başlık alanını oluşturur.
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)} // Başlık kısmına boşluk ve padding ekliyoruz.
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// 🟢 `CardTitle`: Kart başlığını tanımlayan bileşen.
const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)} // Başlık için font ayarları yapılıyor.
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// 🟢 `CardDescription`: Kart başlığı altındaki açıklamayı temsil eder.
const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-slate-500 dark:text-slate-400", className)} // Açıklamayı daha küçük ve açık renkli yapıyoruz.
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// 🟢 `CardContent`: Kartın gövde kısmını oluşturur.
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} /> // Kart içeriği için padding ekleniyor.
));
CardContent.displayName = "CardContent";

// 🟢 `CardFooter`: Kartın alt kısmını oluşturur (örneğin butonlar veya ekstra bilgiler için).
const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)} // Footer için hizalama ve padding ekleniyor.
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// 🟢 Tüm bileşenleri dışa aktarıyoruz, böylece başka yerlerde kullanılabilir.
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
