import * as React from "react"; // React kütüphanesini içe aktarıyoruz.
import { cn } from "@/lib/utils"; // Sınıfları birleştirmek için yardımcı fonksiyon `cn`'i içe aktarıyoruz.

// 🟢 `Input` bileşeni: Genel amaçlı bir giriş (input) alanı.
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type} // `type` özelliği ile input türü (text, email, password vb.) belirlenir.
      className={cn(
        "flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950",
        "placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "dark:border-slate-800 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
        className // Kullanıcı tarafından eklenen ekstra sınıfları dahil ediyoruz.
      )}
      ref={ref} // `ref` desteği ile bileşenin doğrudan erişilebilir olmasını sağlıyoruz.
      {...props} // Kullanıcıdan gelen tüm diğer özellikleri ekliyoruz.
    />
  );
});

// React DevTools içinde bileşenin tanımlı ismi olarak "Input" gösterilmesini sağlıyoruz.
Input.displayName = "Input";

// 🟢 Bileşeni dışa aktarıyoruz.
export { Input };
