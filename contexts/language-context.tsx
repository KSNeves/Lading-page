"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "pt" | "en" | "es" | "fr" | "de" | "it" | "ja" | "ko" | "zh" | "ar" | "hi" | "ru"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, Record<string, string>> = {
  pt: {
    // Navigation
    "nav.about": "Sobre",
    "nav.skills": "Recursos",
    "nav.pricing": "Preços",
    "nav.contact": "Contato",
    "nav.login": "Entrar",
    "nav.register": "Cadastrar",

    // Hero Section
    "hero.title": "Organize seus estudos com",
    "hero.subtitle": "Plataforma de estudos baseada em revisão espaçada para maximizar seu aprendizado e retenção",

    // About Section
    "about.title": "Sobre o Revisya",
    "about.p1":
      "O Revisya é uma plataforma inovadora de organização de estudos baseada no método de revisão espaçada, cientificamente comprovado para maximizar a retenção de conhecimento.",
    "about.p2":
      "Nossa metodologia utiliza algoritmos inteligentes para determinar o momento ideal para revisar cada conteúdo, otimizando seu tempo de estudo e garantindo que você nunca mais esqueça o que aprendeu.",
    "about.p3":
      "Seja você um estudante universitário, concurseiro ou alguém que busca aprender algo novo, o Revisya é a ferramenta perfeita para transformar sua forma de estudar.",

    // Skills Section (now Resources)
    "skills.title": "Recursos Principais",
    "skills.subtitle":
      "Ferramentas poderosas para organizar e otimizar seus estudos com base na ciência da aprendizagem.",
    "skills.calendar": "Calendário",
    "skills.calendar.desc": "Organize suas sessões de estudo e revisões de forma inteligente",
    "skills.flashcards": "Flashcards",
    "skills.flashcards.desc": "Crie e pratique com flashcards adaptativos baseados em níveis de retenção do conteúdo",
    "skills.reviews": "Revisões",
    "skills.reviews.desc": "Sistema automatizado de revisões no momento ideal para máxima retenção",

    // Pricing Section
    "pricing.title": "Escolha seu Plano",
    "pricing.subtitle": "Comece gratuitamente e evolua conforme suas necessidades de estudo",
    "pricing.free": "Gratuito",
    "pricing.premium": "Premium",
    "pricing.monthly": "Mensal",
    "pricing.yearly": "Anual",
    "pricing.lifetime": "Vitalício",
    "pricing.free.price": "R$ 0",
    "pricing.premium.monthly": "R$ 19,90",
    "pricing.premium.yearly": "R$ 199,90",
    "pricing.premium.lifetime": "R$ 399,90",
    "pricing.free.features": ["3 decks de flashcards", "10 revisões espaçadas"],
    "pricing.premium.features": ["Decks ilimitados", "Revisões ilimitadas", "Suporte Prioritário"],
    "pricing.choose": "Escolher Plano",
    "pricing.current": "Plano Atual",
    "pricing.try": "Experimente já!",

    // Contact Section
    "contact.title": "Entre em Contato",
    "contact.subtitle": "Tem dúvidas sobre o Revisya ou precisa de ajuda? Envie sua mensagem!",
    "contact.name": "Nome",
    "contact.email": "Email",
    "contact.message": "Mensagem",
    "contact.send": "Enviar Mensagem",
    "contact.sending": "Enviando...",
    "contact.success.title": "Obrigado pela sua mensagem!",
    "contact.success.message": "Sua mensagem foi enviada com sucesso. Responderemos em breve.",
    "contact.error.title": "Erro",

    // Footer
    "footer.rights": "Todos os direitos reservados.",

    // Auth Pages
    "auth.login.title": "Entrar no Revisya",
    "auth.login.subtitle": "Acesse sua conta e continue seus estudos",
    "auth.register.title": "Criar Conta no Revisya",
    "auth.register.subtitle": "Comece sua jornada de estudos inteligentes",
    "auth.email": "Email",
    "auth.password": "Senha",
    "auth.confirmPassword": "Confirmar Senha",
    "auth.login.button": "Entrar",
    "auth.register.button": "Criar Conta",
    "auth.login.link": "Já tem uma conta? Entre aqui",
    "auth.register.link": "Não tem conta? Cadastre-se aqui",
    "auth.back": "Voltar",
  },

  en: {
    // Navigation
    "nav.about": "About",
    "nav.skills": "Features",
    "nav.pricing": "Pricing",
    "nav.contact": "Contact",
    "nav.login": "Login",
    "nav.register": "Sign Up",

    // Hero Section
    "hero.title": "Organize your studies with",
    "hero.subtitle": "Study platform based on spaced repetition to maximize your learning and retention",

    // About Section
    "about.title": "About Revisya",
    "about.p1":
      "Revisya is an innovative study organization platform based on the spaced repetition method, scientifically proven to maximize knowledge retention.",
    "about.p2":
      "Our methodology uses intelligent algorithms to determine the ideal time to review each content, optimizing your study time and ensuring you never forget what you learned.",
    "about.p3":
      "Whether you're a university student, preparing for exams, or someone looking to learn something new, Revisya is the perfect tool to transform your way of studying.",

    // Skills Section (now Resources)
    "skills.title": "Main Features",
    "skills.subtitle": "Powerful tools to organize and optimize your studies based on learning science.",
    "skills.calendar": "Calendar",
    "skills.calendar.desc": "Organize your study sessions and reviews intelligently",
    "skills.flashcards": "Flashcards",
    "skills.flashcards.desc": "Create and practice with adaptive flashcards based on content retention levels",
    "skills.reviews": "Reviews",
    "skills.reviews.desc": "Automated review system at the ideal time for maximum retention",

    // Pricing Section
    "pricing.title": "Choose Your Plan",
    "pricing.subtitle": "Start for free and evolve according to your study needs",
    "pricing.free": "Free",
    "pricing.premium": "Premium",
    "pricing.monthly": "Monthly",
    "pricing.yearly": "Yearly",
    "pricing.lifetime": "Lifetime",
    "pricing.free.price": "$0",
    "pricing.premium.monthly": "$19.90",
    "pricing.premium.yearly": "$199.90",
    "pricing.premium.lifetime": "$399.90",
    "pricing.free.features": ["3 flashcard decks", "10 spaced reviews"],
    "pricing.premium.features": ["Unlimited decks", "Unlimited reviews", "Priority Support"],
    "pricing.try": "Try it now!",

    // Contact Section
    "contact.title": "Get in Touch",
    "contact.subtitle": "Have questions about Revisya or need help? Send us a message!",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.success.title": "Thank you for your message!",
    "contact.success.message": "Your message has been sent successfully. We'll respond soon.",
    "contact.error.title": "Error",

    // Footer
    "footer.rights": "All rights reserved.",

    // Auth Pages
    "auth.login.title": "Login to Revisya",
    "auth.login.subtitle": "Access your account and continue your studies",
    "auth.register.title": "Create Revisya Account",
    "auth.register.subtitle": "Start your smart study journey",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.login.button": "Login",
    "auth.register.button": "Create Account",
    "auth.login.link": "Already have an account? Login here",
    "auth.register.link": "Don't have an account? Sign up here",
    "auth.back": "Back",
  },

  // Add other languages with similar structure...
  es: {
    "nav.about": "Acerca",
    "nav.skills": "Características",
    "nav.pricing": "Precios",
    "nav.contact": "Contacto",
    "nav.login": "Iniciar Sesión",
    "nav.register": "Registrarse",
    "hero.title": "Organiza tus estudios con",
    "hero.subtitle": "Plataforma de estudios basada en repetición espaciada para maximizar tu aprendizaje y retención",
    "skills.flashcards.desc": "Crea y practica con flashcards adaptativos basados en niveles de retención de contenido",
    "pricing.free.features": ["3 mazos de flashcards", "10 revisiones espaciadas"],
    "pricing.premium.features": ["Mazos ilimitados", "Revisiones ilimitadas", "Soporte Prioritario"],
    "pricing.try": "¡Pruébalo ya!",
    "auth.back": "Volver",
  },

  fr: {
    "nav.about": "À propos",
    "nav.skills": "Fonctionnalités",
    "nav.pricing": "Tarifs",
    "nav.contact": "Contact",
    "nav.login": "Connexion",
    "nav.register": "S'inscrire",
    "hero.title": "Organisez vos études avec",
    "hero.subtitle":
      "Plateforme d'études basée sur la répétition espacée pour maximiser votre apprentissage et rétention",
    "skills.flashcards.desc":
      "Créez et pratiquez avec des flashcards adaptatifs basés sur les niveaux de rétention du contenu",
    "pricing.free.features": ["3 paquets de flashcards", "10 révisions espacées"],
    "pricing.premium.features": ["Paquets illimités", "Révisions illimitées", "Support Prioritaire"],
    "pricing.try": "Essayez maintenant!",
    "auth.back": "Retour",
  },

  // Add minimal translations for other languages
  de: { "auth.back": "Zurück", "pricing.try": "Jetzt testen!" },
  it: { "auth.back": "Indietro", "pricing.try": "Prova ora!" },
  ja: { "auth.back": "戻る", "pricing.try": "今すぐ試す!" },
  ko: { "auth.back": "뒤로", "pricing.try": "지금 시도해보세요!" },
  zh: { "auth.back": "返回", "pricing.try": "立即尝试!" },
  ar: { "auth.back": "رجوع", "pricing.try": "جرب الآن!" },
  hi: { "auth.back": "वापस", "pricing.try": "अभी आज़माएं!" },
  ru: { "auth.back": "Назад", "pricing.try": "Попробуйте сейчас!" },
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("pt")

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language)
    }
  }, [language])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
        setLanguage(savedLanguage)
      }
    }
  }, [])

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
