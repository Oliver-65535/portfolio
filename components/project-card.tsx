"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Github, Images } from "lucide-react"
import Link from "next/link"
import VideoModal from "@/components/video-modal"
import { useLanguage } from "@/contexts/language-context"

interface Project {
  id: number
  title: string
  shortDescription: string
  description: string
  screenshots: string[]
  technologies: string[]
  location: string
  features: string[]
  demoVideo?: string
  links: {
    github?: string
    demo?: string
    docs?: string
  }
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useLanguage()

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/gallery/${project.id}`} className="block">
        <div className="relative h-48 overflow-hidden cursor-pointer">
          <Image
            src={project.screenshots[0] || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          <div className="absolute top-4 right-4">
            <Badge variant="secondary">{project.location}</Badge>
          </div>
        </div>

        <CardHeader className="cursor-pointer">
          <CardTitle className="flex items-center justify-between">{project.title}</CardTitle>
          <CardDescription>{project.shortDescription}</CardDescription>
        </CardHeader>
      </Link>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-sm">{t.common.mainFeatures}:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {project.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                {feature}
              </li>
            ))}
            {project.features.length > 3 && (
              <li className="text-xs text-muted-foreground">+{project.features.length - 3} {t.common.additionalFeatures}</li>
            )}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 pt-4">
          {project.links.github && (
            <Button size="sm" variant="outline" asChild>
              <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                {t.common.github}
              </a>
            </Button>
          )}
          {project.links.demo && (
            <Button size="sm" variant="outline" asChild>
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                {t.common.demo}
              </a>
            </Button>
          )}
          <Button size="sm" variant="outline" asChild>
            <Link href={`/gallery/${project.id}`}>
              <Images className="w-4 h-4 mr-2" />
              {t.common.gallery}
            </Link>
          </Button>
          {project.demoVideo && <VideoModal videoUrl={project.demoVideo} title={project.title} />}
        </div>
      </CardContent>
    </Card>
  )
}
