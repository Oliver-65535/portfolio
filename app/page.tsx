"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, Database, Server } from "lucide-react"
import Navigation from "@/components/navigation"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"

export default function HomePage() {
  const { t, language } = useLanguage()
  const [personalData, setPersonalData] = useState<any>(null)

  useEffect(() => {
    const loadPersonalData = async () => {
      const data = await import(`@/data/personal-${language}.json`)
      setPersonalData(data.default)
    }
    loadPersonalData()
  }, [language])

  if (!personalData)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="w-fit">
                  {personalData.availability}
                </Badge>
                <h1 className="text-5xl md:text-7xl font-bold">
                  {t.home.greeting}{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {personalData.name}
                  </span>
                </h1>
                <h2 className="text-2xl md:text-3xl text-muted-foreground">{personalData.title}</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">{personalData.subtitle}</p>
                <p className="text-lg text-muted-foreground leading-relaxed">{personalData.bio}</p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/portfolio">
                    {t.home.viewPortfolio}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contacts">{t.home.contactMe}</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl opacity-20"></div>
                <Image
                  src={personalData.avatar || "/placeholder.svg"}
                  alt={personalData.name}
                  fill
                  className="object-cover rounded-full border-4 border-background shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.home.skillsTitle}</h2>
            <p className="text-muted-foreground text-xl">{t.home.skillsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                <Server className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold">{t.home.backendDevelopment}</h3>
              <p className="text-muted-foreground text-lg">{t.home.backendDescription}</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Database className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold">{t.home.databaseDesign}</h3>
              <p className="text-muted-foreground text-lg">{t.home.databaseDescription}</p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold">{t.home.apiDevelopment}</h3>
              <p className="text-muted-foreground text-lg">{t.home.apiDescription}</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {personalData.skills.map((skill: any) => (
              <Badge key={skill.name} variant="secondary" className="text-sm py-2 px-4">
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">{t.home.ctaTitle}</h2>
          <p className="text-xl text-muted-foreground">{t.home.ctaSubtitle}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/contacts">
                {t.home.orderDevelopment}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">{t.home.learnMore}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
