"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ChevronLeft, ChevronRight, X, ExternalLink, Github } from "lucide-react"
import Navigation from "@/components/navigation"
import { useLanguage } from "@/contexts/language-context"

interface PageProps {
  params: {
    id: string
  }
}

export default function GalleryPage({ params }: PageProps) {
  const { t, language } = useLanguage()
  const [projectsData, setProjectsData] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

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

  const project = projectsData.projects.find((p: any) => p.id === Number.parseInt(params.id))

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
        <Navigation />
        <div className="pt-24 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">{t.portfolio.projectNotFound}</h1>
            <Button asChild>
              <Link href="/portfolio">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.common.backToPortfolio}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.screenshots.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Navigation />

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button variant="outline" asChild className="mb-4 bg-transparent">
              <Link href="/portfolio">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.common.backToPortfolio}
              </Link>
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-muted-foreground mb-4">{project.shortDescription}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Gallery */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main Image */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-muted">
                    <Image
                      src={project.screenshots[currentImageIndex] || "/placeholder.svg"}
                      alt={`${project.title} - скриншот ${currentImageIndex + 1}`}
                      fill
                      className="object-cover cursor-pointer"
                      onClick={() => setIsFullscreen(true)}
                    />

                    {/* Navigation Arrows */}
                    {project.screenshots.length > 1 && (
                      <>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute left-4 top-1/2 -translate-y-1/2"
                          onClick={prevImage}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                          onClick={nextImage}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                      {currentImageIndex + 1} / {project.screenshots.length}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Thumbnail Gallery */}
              {project.screenshots.length > 1 && (
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {project.screenshots.map((screenshot: string, index: number) => (
                    <div
                      key={index}
                      className={`relative aspect-video cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? "border-primary"
                          : "border-transparent hover:border-muted-foreground"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <Image
                        src={screenshot || "/placeholder.svg"}
                        alt={`${project.title} - миниатюра ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Project Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.portfolio.aboutProject}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{project.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2">{t.portfolio.location}</h4>
                    <Badge variant="secondary">{project.location}</Badge>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">{t.portfolio.technologies}:</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech: string) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t.portfolio.functionality}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {project.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t.common.links}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.links.github && (
                    <Button variant="outline" size="sm" asChild className="w-full justify-start bg-transparent">
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        {t.common.sourceCode}
                      </a>
                    </Button>
                  )}
                  {project.links.demo && (
                    <Button variant="outline" size="sm" asChild className="w-full justify-start bg-transparent">
                      <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {t.common.demoVersion}
                      </a>
                    </Button>
                  )}
                  {project.links.docs && (
                    <Button variant="outline" size="sm" asChild className="w-full justify-start bg-transparent">
                      <a href={project.links.docs} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {t.common.documentation}
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-4 right-4 z-10"
            onClick={() => setIsFullscreen(false)}
          >
            <X className="w-4 h-4" />
          </Button>

          <div className="relative w-full h-full max-w-6xl max-h-[90vh] m-4">
            <Image
              src={project.screenshots[currentImageIndex] || "/placeholder.svg"}
              alt={`${project.title} - скриншот ${currentImageIndex + 1}`}
              fill
              className="object-contain"
            />

            {project.screenshots.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
