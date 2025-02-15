import * as React from "react"; // React kütüphanesini içe aktarıyoruz.
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"; // Radix UI'den DropdownMenu bileşenlerini içe aktarıyoruz.
import { cn } from "@/lib/utils"; // Sınıfları birleştirmek için yardımcı fonksiyon `cn`'i içe aktarıyoruz.
import { CheckIcon, ChevronRightIcon, DotFilledIcon } from "@radix-ui/react-icons"; // Radix UI'den ikonları içe aktarıyoruz.

// 🟢 `DropdownMenu`: Ana dropdown (açılır menü) bileşeni.
const DropdownMenu = DropdownMenuPrimitive.Root;

// 🟢 `DropdownMenuTrigger`: Dropdown'u açan tetikleyici bileşen.
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

// 🟢 `DropdownMenuGroup`: Menü öğelerini gruplayan bileşen.
const DropdownMenuGroup = DropdownMenuPrimitive.Group;

// 🟢 `DropdownMenuPortal`: Menüyü bağımsız bir portalda render etmek için kullanılır.
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

// 🟢 `DropdownMenuSub`: Alt menü bileşeni (iç içe menüler oluşturmak için).
const DropdownMenuSub = DropdownMenuPrimitive.Sub;

// 🟢 `DropdownMenuRadioGroup`: Radio seçenekleri için grup bileşeni.
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

// 🟢 `DropdownMenuSubTrigger`: Alt menüleri açmak için kullanılan öğe.
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-slate-100 data-[state=open]:bg-slate-100 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus:bg-slate-800 dark:data-[state=open]:bg-slate-800",
      inset && "pl-8", // Eğer `inset` true ise sola padding ekleniyor.
      className
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="ml-auto" /> {/* Sağ yönlü ok ikonu */}
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

// 🟢 `DropdownMenuSubContent`: Alt menü içeriği bileşeni.
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-200 bg-white p-1 text-slate-950 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50",
      className
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

// 🟢 `DropdownMenuContent`: Dropdown menünün içeriği bileşeni.
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset} // Menü içeriğinin tetikleyici öğeye olan mesafesi.
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-200 bg-white p-1 text-slate-950 shadow-md dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

// 🟢 `DropdownMenuItem`: Açılır menü içindeki standart seçenek bileşeni.
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-slate-100 dark:focus:bg-slate-800",
      inset && "pl-8", // Eğer `inset` true ise sola padding ekleniyor.
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

// 🟢 `DropdownMenuCheckboxItem`: Checkbox olarak kullanılabilen menü öğesi.
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-slate-100 dark:focus:bg-slate-800",
      className
    )}
    checked={checked}
    {...props}
  >
    {/* Checkbox işaretini göstermek için */}
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

// 🟢 `DropdownMenuRadioItem`: Radio seçeneği olarak kullanılabilen menü öğesi.
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-slate-100 dark:focus:bg-slate-800",
      className
    )}
    {...props}
  >
    {/* Radio işaretini göstermek için */}
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <DotFilledIcon className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

// 🟢 `DropdownMenuLabel`: Açılır menü başlığı bileşeni.
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

// 🟢 `DropdownMenuSeparator`: Açılır menü öğeleri arasında çizgi bileşeni.
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-slate-100 dark:bg-slate-800", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

// 🟢 `DropdownMenuShortcut`: Menü öğelerine kısayol tuşlarını eklemek için kullanılan bileşen.
const DropdownMenuShortcut = ({ className, ...props }) => {
  return <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />;
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

// 🟢 Bileşenleri dışa aktarıyoruz.
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
