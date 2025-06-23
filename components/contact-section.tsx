"use client"

import type React from "react"

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function ContactSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })
  const { t } = useLanguage()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitSuccess(false)
    setSubmitError(null)

    try {
      const response = await fetch("https://formsubmit.co/ajax/sounesatchougo@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Nom: formData.name,
          Email: formData.email,
          Message: formData.message,
          _subject: "Nouveau message du portfolio",
          _captcha: "true",
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue lors de l'envoi du message")
      }

      // Reset form and show success message
      setFormData({ name: "", email: "", message: "" })
      setSubmitSuccess(true)

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (error) {
      console.error("Error:", error)
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Email",
      value: "Sounesatchougo@gmail.com",
      link: "mailto:Sounesatchougo@gmail.com",
    },
    {
      icon: <Phone className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Phone",
      value: "+2290198123353",
      link: "tel:+2290198123353",
    },
    {
      icon: <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Location",
      value: "San Francisco, CA",
      link: "https://maps.google.com/?q=San+Francisco,+CA",
    },
  ]

  return (
    <section id="contact" ref={ref} className="py-8 md:py-16 lg:py-24">
      <div className="container px-4 md:px-6">
        <div
          className={`max-w-2xl mx-auto transition-all duration-1000 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                {t("contact.title")}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base md:text-lg">
                {t("contact.subtitle")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs sm:text-sm font-medium">
                    {t("contact.name")}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={t("contact.name")}
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs sm:text-sm font-medium">
                    {t("contact.email")}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    placeholder={t("contact.email")}
                    required
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs sm:text-sm font-medium">
                  {t("contact.message")}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t("contact.message")}
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="text-sm"
                />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                {isSubmitting ? t("contact.sending") : t("contact.send")}
              </Button>
            </form>

            {submitSuccess && (
              <div className="rounded-lg bg-green-100 p-3 sm:p-4 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                <p className="text-sm sm:text-base font-medium">{t("contact.success.title")}</p>
                <p className="text-xs sm:text-sm">{t("contact.success.message")}</p>
              </div>
            )}
            {submitError && (
              <div className="rounded-lg bg-red-100 p-3 sm:p-4 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                <p className="text-sm sm:text-base font-medium">{t("contact.error.title")}</p>
                <p className="text-xs sm:text-sm">{submitError}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
