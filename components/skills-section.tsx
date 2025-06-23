"use client"

import { useInView } from "react-intersection-observer"
import { Calendar, CreditCard, RotateCcw } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function SkillsSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const { t } = useLanguage()

  const features = [
    {
      title: t("skills.calendar"),
      description: t("skills.calendar.desc"),
      icon: <Calendar className="h-8 w-8 md:h-10 md:w-10" />,
    },
    {
      title: t("skills.flashcards"),
      description: t("skills.flashcards.desc"),
      icon: <CreditCard className="h-8 w-8 md:h-10 md:w-10" />,
    },
    {
      title: t("skills.reviews"),
      description: t("skills.reviews.desc"),
      icon: <RotateCcw className="h-8 w-8 md:h-10 md:w-10" />,
    },
  ]

  return (
    <section id="skills" ref={ref} className="bg-muted/40 py-8 md:py-16 lg:py-24">
      <div className="container px-4 md:px-6">
        <div
          className={`space-y-6 transition-all duration-1000 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
              {t("skills.title")}
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 text-sm sm:text-base md:text-lg">
              {t("skills.subtitle")}
            </p>
          </div>
          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-lg border bg-card p-6 sm:p-8 text-card-foreground shadow transition-all hover:shadow-md text-center"
              >
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-4 text-primary">{feature.icon}</div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
