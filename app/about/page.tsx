"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Award } from "lucide-react"
import Navigation from "@/components/navigation"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"

export default function AboutPage() {
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

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{t.about.title}</h1>
            <p className="text-2xl text-muted-foreground">{t.about.description}</p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Photo and Basic Info */}
            <div className="space-y-6">
              <div className="relative w-full aspect-square max-w-sm mx-auto">
                <Image
                  src={personalData.avatar || "/placeholder.svg"}
                  alt={personalData.name}
                  fill
                  className="object-cover rounded-2xl shadow-2xl"
                />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">{personalData.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <Badge variant="secondary" className="mb-2">
                      {personalData.title}
                    </Badge>
                    <p className="text-sm text-muted-foreground">{personalData.subtitle}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                      {t.about.location}
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                      {t.about.experience}
                    </div>
                    <div className="flex items-center text-sm">
                      <Award className="w-4 h-4 mr-2 text-muted-foreground" />
                      {t.about.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Detailed Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Bio */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.about.aboutMe}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed text-lg">{personalData.bio}</p>
                  <p className="text-muted-foreground leading-relaxed text-lg">{t.about.passion}</p>
                  <p className="text-muted-foreground leading-relaxed text-lg">{t.about.freeTime}</p>
                </CardContent>
              </Card>

              {/* Experience */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.about.workExperience}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {personalData.experience.map((exp: any, index: number) => (
                    <div key={index} className="border-l-2 border-primary pl-6 relative">
                      <div className="absolute w-3 h-3 bg-primary rounded-full -left-2 top-1"></div>
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold">{exp.position}</h3>
                          <Badge variant="outline">{exp.period}</Badge>
                        </div>
                        <p className="font-medium text-muted-foreground">{exp.company}</p>
                        <p className="text-sm text-muted-foreground">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.about.technicalSkills}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {personalData.skills.map((skill: any) => (
                      <div key={skill.name} className="flex items-center p-2 bg-muted/50 rounded-lg">
                        <span className="text-sm font-medium">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Philosophy */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.about.workPhilosophy}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">{t.about.codeQuality}</h4>
                      <p className="text-sm text-muted-foreground">{t.about.codeQualityDescription}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">{t.about.performance}</h4>
                      <p className="text-sm text-muted-foreground">{t.about.performanceDescription}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">{t.about.scalability}</h4>
                      <p className="text-sm text-muted-foreground">{t.about.scalabilityDescription}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">{t.about.communication}</h4>
                      <p className="text-sm text-muted-foreground">{t.about.communicationDescription}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
