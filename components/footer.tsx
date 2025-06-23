"use client"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t py-4 sm:py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <Link
            href="/"
            className="flex items-center gap-2 text-base sm:text-lg font-bold tracking-tighter transition-colors hover:text-primary"
          >
            <Image src="/logo.png" alt="Revisya" width={24} height={24} />
            Revisya
          </Link>
          <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 md:text-left">
            &copy; {new Date().getFullYear()} Revisya. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}
