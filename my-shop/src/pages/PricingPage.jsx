import { Switch } from "@/components/ui/switch"; // UI bileşeni: Yıllık/aylık fiyat geçişi için switch
import { Button } from "@/components/ui/button"; // UI bileşeni: Butonlar
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // UI bileşeni: Kart yapısı
import { useState } from "react"; // React'in state yönetimi için hook'u
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  ChevronRight,
  Check,
} from "lucide-react"; // İkonlar için Lucide React
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb"; // UI bileşeni: Breadcrumb (sayfa yolu)
import BrandLogos from "../components/BrandLogos"; // Güvenilir markaların logolarını gösteren bileşen
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // UI bileşeni: SSS için açılır menü

// 🏷 `PricingPage`: Fiyatlandırma sayfası bileşeni
const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false); // Yıllık/aylık ödeme planı state'i

  // 📦 Paketler listesi
  const plans = [
    {
      name: "FREE",
      description: "Organize across all apps by hand",
      price: 0,
      features: [
        { name: "Unlimited product updates", included: true },
        { name: "1GB Cloud storage", included: false },
        { name: "Email and community support", included: false },
      ],
    },
    {
      name: "STANDARD",
      description: "Organize across all apps by hand",
      price: 9.99,
      features: [
        { name: "Unlimited product updates", included: true },
        { name: "5GB Cloud storage", included: true },
        { name: "Email and community support", included: true },
      ],
    },
    {
      name: "PREMIUM",
      description: "Organize across all apps by hand",
      price: 19.99,
      features: [
        { name: "Unlimited product updates", included: true },
        { name: "50GB Cloud storage", included: true },
        { name: "Priority support", included: true },
      ],
    },
  ];

  // ❓ Sıkça Sorulan Sorular (FAQ)
  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit cards, PayPal, and bank transfers.",
    },
    {
      question: "Can I cancel my subscription?",
      answer: "Yes, you can cancel anytime with no extra charges.",
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes, we offer a 14-day free trial on all plans.",
    },
  ];

  // 🏷 Aylık ve yıllık fiyat hesaplama fonksiyonu (%25 indirim uygulanıyor)
  const calculatePrice = (basePrice) => {
    if (isYearly) {
      return (basePrice * 0.75).toFixed(2);
    }
    return basePrice.toFixed(2);
  };

  return (
    <div>
      {/* 📌 Sayfa Başlığı ve Breadcrumb */}
      <section className="text-center text-text-color py-16 max-w-75vw mx-auto">
        <p className="uppercase text-light-gray font-semibold">PRICING</p>
        <h1 className="text-5xl font-bold my-4">Simple Pricing</h1>
        <Breadcrumb className="flex flex-row justify-center">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <ChevronRight />
          <BreadcrumbItem>
            <BreadcrumbLink href="/pricing" className="font-bold">
              Pricing
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </section>

      {/* 📌 Fiyatlandırma Bölümü */}
      <div className="bg-gray">
        <div className="py-12 max-w-75vw mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Pricing</h2>
          <p className="text-light-gray font-medium">
            Choose the best plan for your needs.
          </p>
        </div>

        {/* 🕹 Aylık/Yıllık Geçiş */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <span className={`text-lg ${!isYearly ? "font-bold" : "font-medium"}`}>
            Monthly
          </span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} />
          <span className={`text-lg ${isYearly ? "font-bold" : "font-medium"}`}>
            Yearly
          </span>
          <span className="ml-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
            Save 25%
          </span>
        </div>

        {/* 🏷 Fiyat Kartları */}
        <div className="grid md:grid-cols-3 gap-4 max-w-75vw mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative ${
                index === 1 ? "bg-text-color text-white shadow-lg scale-105" : "bg-white"
              }`}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  {plan.name}
                </CardTitle>
                <p className="text-center mt-2 text-sm">{plan.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center text-primary-color">
                  <span className="text-5xl font-bold">${calculatePrice(plan.price)}</span>
                  <span className="text-sm block">Per Month</span>
                </div>
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className={`h-5 w-5 ${feature.included ? "text-success-color" : "text-gray-400"}`} />
                      <span className="font-medium">{feature.name}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full">Try for free</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 🔹 Güvenilir Markalar */}
        <BrandLogos />

        {/* ❓ SSS Bölümü */}
        <div className="container max-w-75vw mx-auto py-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Pricing FAQs</h2>
            <p className="text-light-gray font-medium max-w-xl mx-auto">
              Find answers to common questions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Accordion key={index} type="single" collapsible>
                <AccordionItem value={`item-${index}`} className="border-none w-full">
                  <AccordionTrigger className="flex gap-2">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-light-gray ml-6">{faq.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>

        {/* 📞 İletişim ve Sosyal Medya */}
        <section className="bg-gray-100 py-12 text-center">
          <h3 className="text-2xl font-bold">Start your 14 days free trial</h3>
          <Button>Try it free now</Button>
          <div className="flex justify-center space-x-6 mt-6">
            <Twitter />
            <Facebook />
            <Instagram />
            <Linkedin />
          </div>
        </section>
      </div>
    </div>
  );
};

export default PricingPage;
