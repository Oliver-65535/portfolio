"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, ArrowRight, ShoppingCart } from "lucide-react"
import Navigation from "@/components/navigation"
import ProjectCard from "@/components/project-card"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"

export default function PortfolioPage() {
  const { t, language } = useLanguage()
  const [projectsData, setProjectsData] = useState<any>(null)

  useEffect(() => {
    const loadProjectsData = async () => {
      const data = await import(`@/data/projects-${language}.json`)
      setProjectsData(data.default)
    }
    loadProjectsData()
  }, [language])

  if (!projectsData)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Navigation />

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{t.portfolio.title}</h1>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">{t.portfolio.description}</p>
          </div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {projectsData.projects.map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
              <CardHeader className="text-center">
                <Calculator className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <CardTitle className="text-2xl">{t.portfolio.quickActions.calculator.title}</CardTitle>
                <CardDescription>{t.portfolio.quickActions.calculator.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button size="lg" asChild>
                  <Link href="/calculator">
                    {t.portfolio.quickActions.calculator.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
              <CardHeader className="text-center">
                <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <CardTitle className="text-2xl">{t.portfolio.quickActions.order.title}</CardTitle>
                <CardDescription>{t.portfolio.quickActions.order.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button size="lg" asChild>
                  <Link href="/order">
                    {t.portfolio.quickActions.order.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
