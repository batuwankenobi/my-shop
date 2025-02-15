import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion"; // Radix UI Accordion bileşeni
import { cn } from "@/lib/utils"; // CSS sınıflarını birleştirmek için yardımcı fonksiyon
import { ChevronRight } from "lucide-react"; // Açılır/Kapanır ikon

// Accordion bileşeni Radix UI'nin Root bileşeni olarak atanır
const Accordion = AccordionPrimitive.Root;

// Accordion içindeki her bir öğe bileşeni
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)} // Alt çizgili stil
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem"; // Bileşen adı belirlenir

// Accordion başlığı ve tetikleyici butonu
const AccordionTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center py-4 text-sm font-medium transition-all hover:underline text-left",
          className
        )}
        {...props}
      >
        {/* Açılır/Kapanır Ok İkonu */}
        <ChevronRight className="h-4 w-4 shrink-0 text-primary-color transition-transform duration-200" />
        {children} {/* Accordion başlık metni */}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

// Accordion içeriği (açıldığında görünen alan)
const AccordionContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      {/* Açıldığında içerik gösterilecek alan */}
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
);
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

// Bileşenleri dışa aktar
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
