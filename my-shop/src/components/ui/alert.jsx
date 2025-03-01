import * as React from "react";
import { cva } from "class-variance-authority"; // Tailwind CSS sınıflarını yönetmek için
import { cn } from "@/lib/utils"; // CSS sınıflarını birleştirmek için yardımcı fonksiyon

// Alert bileşeni için stil varyasyonlarını tanımlama
const alertVariants = cva(
  "relative w-full rounded-lg border border-slate-200 px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-slate-950 [&>svg~*]:pl-7 dark:border-slate-800 dark:[&>svg]:text-slate-50",
  {
    variants: {
      variant: {
        default: "bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50",
        destructive:
          "border-red-500/50 text-red-500 dark:border-red-500 [&>svg]:text-red-500 dark:border-red-900/50 dark:text-red-900 dark:dark:border-red-900 dark:[&>svg]:text-red-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Ana Alert bileşeni
const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert" // Erişilebilirlik (accessibility) için
    className={cn(alertVariants({ variant }), className)} // CSS sınıflarını birleştir
    {...props}
  />
));
Alert.displayName = "Alert";

// Alert başlık bileşeni
const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

// Alert açıklama bileşeni
const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

// Bileşenleri dışa aktar
export { Alert, AlertTitle, AlertDescription };
