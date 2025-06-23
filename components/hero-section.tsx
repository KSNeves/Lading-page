"use client"

import { ArrowDownIcon, BookOpen, Brain, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-8 text-center md:py-12 lg:py-24">
      <div
        className={`container px-4 transition-all duration-1000 md:px-6 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4 mb-4">
            <Image src="/logo.png" alt="Revisya" width={64} height={64} />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              {t("hero.title")} <span className="text-primary">Revisya</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-base text-gray-500 dark:text-gray-400 sm:text-lg md:text-xl">
              {t("hero.subtitle")}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Brain className="h-5 w-5 text-primary" />
              <span>Revisão Espaçada</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Organização Inteligente</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <BookOpen className="h-5 w-5 text-primary" />
              <span>Aprendizado Eficaz</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <Button variant="ghost" size="icon" className="animate-bounce rounded-full" onClick={scrollToAbout}>
          <ArrowDownIcon className="h-6 w-6" />
          <span className="sr-only">Scroll down</span>
        </Button>
      </div>
    </section>
  )
}
