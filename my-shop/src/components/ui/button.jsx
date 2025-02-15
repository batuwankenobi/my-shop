import * as React from "react"; // React kütüphanesini içe aktarıyoruz.
import { Slot } from "@radix-ui/react-slot"; // Radix UI'den Slot bileşenini içe aktarıyoruz (kompozisyon için kullanılır).
import { cva } from "class-variance-authority"; // class-variance-authority'den cva fonksiyonunu içe aktarıyoruz.

import { cn } from "@/lib/utils"; // Sınıfları dinamik olarak birleştirmek için yardımcı fonksiyon `cn`'i içe aktarıyoruz.

// `buttonVariants` adlı bir stil yönetim fonksiyonu oluşturuyoruz. Bu fonksiyon, butonun farklı varyant ve boyutlarına göre stiller belirler.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: { // Farklı buton türleri için stiller belirleniyor.
        default:
          "bg-primary-color text-white font-bold shadow hover:bg-primary-color/90 dark:bg-white dark:text-primary-color dark:hover:bg-white/90",
        destructive: // "Tehlikeli" buton (örneğin silme işlemi için).
          "bg-danger-color text-white font-bold shadow-sm hover:bg-danger-color/90 dark:bg-red-900 dark:text-white dark:hover:bg-red-900/90",
        outline: // Kenarlıklı buton.
          "border border-primary-color bg-white text-bold shadow-sm hover:bg-slate-100 text-primary-color dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-white",
        secondary: // İkincil buton.
          "bg-success-color text-white font-bold shadow-sm hover:bg-success-color/80 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-800/80",
        ghost: // Arka planı olmayan buton.
          "hover:bg-slate-100 hover:text-primary-color dark:hover:bg-slate-800 dark:hover:text-white",
        link: // Bağlantı (underline) stilinde buton.
          "text-primary-color underline-offset-4 hover:underline dark:text-white",
      },
      size: { // Farklı buton boyutları.
        default: "h-9 px-4 py-4", // Varsayılan boyut.
        sm: "h-8 rounded-md px-3 text-xs", // Küçük boyut.
        lg: "h-10 rounded-md px-8", // Büyük boyut.
        icon: "h-9 w-9", // Simge butonu (genişlik ve yükseklik eşit).
      },
    },
    defaultVariants: { // Varsayılan varyant ve boyut ayarları.
      variant: "default",
      size: "default",
    },
  }
);

// Buton bileşeni oluşturuluyor.
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"; // Eğer `asChild` true ise `Slot`, değilse `button` kullanılır.
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))} // Stil sınıfları burada birleştirilerek uygulanıyor.
        ref={ref}
        {...props} // Tüm ekstra props'ları bileşene aktarıyoruz.
      />
    );
  }
);
Button.displayName = "Button"; // React DevTools içinde görünmesi için butonun adını belirliyoruz.

// Bileşeni ve stilleri dışa aktarıyoruz.
export { Button, buttonVariants };
