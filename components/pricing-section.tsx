"use client"

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export function PricingSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const { t } = useLanguage()
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly" | "lifetime">("monthly")

  const getPremiumPrice = () => {
    switch (billingCycle) {
      case "monthly":
        return t("pricing.premium.monthly")
      case "yearly":
        return t("pricing.premium.yearly")
      case "lifetime":
        return t("pricing.premium.lifetime")
      default:
        return t("pricing.premium.monthly")
    }
  }

  const plans = [
    {
      name: t("pricing.free"),
      price: t("pricing.free.price"),
      description: "Perfeito para começar",
      features: ["3 decks de flashcards", "10 revisões espaçadas"],
      popular: false,
    },
    {
      name: t("pricing.premium"),
      price: getPremiumPrice(),
      description: "Para estudantes sérios",
      features: ["Decks ilimitados", "Revisões ilimitadas", "Suporte Prioritário"],
      popular: true,
    },
  ]

  return (
    <section id="pricing" ref={ref} className="py-8 md:py-16 lg:py-24">
      <div className="container px-4 md:px-6">
        <div
          className={`space-y-6 transition-all duration-1000 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
              {t("pricing.title")}
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 text-sm sm:text-base md:text-lg">
              {t("pricing.subtitle")}
            </p>
          </div>

          {/* Billing Cycle Toggle for Premium */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2 rounded-lg bg-muted p-1">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === "monthly"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("pricing.monthly")}
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === "yearly"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("pricing.yearly")}
              </button>
              <button
                onClick={() => setBillingCycle("lifetime")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === "lifetime"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("pricing.lifetime")}
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                {plan.popular && <Badge className="absolute -top-2 left-1/2 -translate-x-1/2">Mais Popular</Badge>}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.name === t("pricing.premium") && billingCycle !== "lifetime" && (
                      <span className="text-muted-foreground">/{billingCycle === "monthly" ? "mês" : "ano"}</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Single Try Now Button */}
          <div className="flex justify-center mt-8">
            <Button asChild size="lg" className="px-8 py-3 text-lg">
              <Link href="/login">{t("pricing.try")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
