"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSelectorDropdown } from "@/components/language-selector-dropdown"
import { useMobile } from "@/hooks/use-mobile"
import { useLanguage } from "@/contexts/language-context"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobile()
  const [isScrolled, setIsScrolled] = useState(false)
  const { t } = useLanguage()

  // Update navigation items
  const navItems = [
    { id: "about", label: t("nav.about") },
    { id: "skills", label: t("nav.skills") },
    { id: "pricing", label: t("nav.pricing") },
    { id: "contact", label: t("nav.contact") },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const scrollToSection = (id: string) => {
    closeMenu()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 transition-colors hover:opacity-80">
          <Image src="/logo.png" alt="Revisya" width={32} height={32} />
          <span className="text-xl font-bold tracking-tighter">Revisya</span>
        </Link>

        {isMobile ? (
          <>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
            {isOpen && (
              <div className="fixed inset-0 top-0 z-50 flex h-screen w-full flex-col bg-background p-6">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
                    <Image src="/logo.png" alt="Revisya" width={24} height={24} />
                    <span className="text-xl font-bold">Revisya</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={closeMenu} className="mt-0">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="mt-8 flex flex-col gap-6">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-lg font-medium hover:text-primary text-left"
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
                <div className="mt-8 space-y-4">
                  <div>
                    <p className="mb-2 text-sm font-medium">Idioma:</p>
                    <LanguageSelectorDropdown />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/login">{t("nav.login")}</Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link href="/register">{t("nav.register")}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center gap-6">
            <nav className="hidden gap-6 md:flex">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium hover:text-primary"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <LanguageSelectorDropdown />
              <Button asChild variant="outline" size="sm">
                <Link href="/login">{t("nav.login")}</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">{t("nav.register")}</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
