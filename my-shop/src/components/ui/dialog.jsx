import * as React from "react"; // React kütüphanesini içe aktarıyoruz.
import * as DialogPrimitive from "@radix-ui/react-dialog"; // Radix UI'den Dialog bileşenlerini içe aktarıyoruz.
import { cn } from "@/lib/utils"; // Sınıfları birleştirmek için yardımcı fonksiyon `cn`'i içe aktarıyoruz.
import { Cross2Icon } from "@radix-ui/react-icons"; // Radix UI'den kapatma ikonu içe aktarıyoruz.

// 🟢 `Dialog`: Ana açılır pencere (modal) bileşeni.
const Dialog = DialogPrimitive.Root;

// 🟢 `DialogTrigger`: Modal'ı açmak için kullanılan tetikleyici bileşen.
const DialogTrigger = DialogPrimitive.Trigger;

// 🟢 `DialogPortal`: Modal'ı ayrı bir portal içine ekler, böylece tüm ekranı kapsayabilir.
const DialogPortal = DialogPrimitive.Portal;

// 🟢 `DialogClose`: Modal'ı kapatma bileşeni.
const DialogClose = DialogPrimitive.Close;

// 🟢 `DialogOverlay`: Modal'ın arkaplanını kaplayan opak alan.
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )} // Açılıp kapanma animasyonları eklenmiş.
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

// 🟢 `DialogContent`: Modal'ın içeriğini oluşturan bileşen.
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg dark:border-slate-800 dark:bg-slate-950",
        className
      )} // Modal açılıp kapanırken farklı animasyonlar çalıştırılıyor.
      {...props}
    >
      {children}
      {/* Modal kapatma butonu */}
      <DialogPrimitive.Close
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500 dark:ring-offset-slate-950 dark:focus:ring-slate-300 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-400"
      >
        <Cross2Icon className="h-4 w-4" />
        <span className="sr-only">Close</span> {/* Erişilebilirlik için ekran okuyuculara özel metin. */}
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

// 🟢 `DialogHeader`: Modal başlık ve açıklama bölgesi.
const DialogHeader = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} // Başlık ve açıklamayı iç içe koyan yapı.
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

// 🟢 `DialogFooter`: Modal'ın alt kısmındaki butonlar için alan.
const DialogFooter = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

// 🟢 `DialogTitle`: Modal'ın başlığı.
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

// 🟢 `DialogDescription`: Modal başlığının altında açıklama metni.
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-slate-500 dark:text-slate-400", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

// 🟢 Bileşenleri dışa aktarıyoruz.
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
