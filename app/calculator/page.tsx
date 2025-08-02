"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Calculator, Clock, RussianRubleIcon as Ruble, ArrowRight } from "lucide-react"
import Navigation from "@/components/navigation"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

interface ProjectFeature {
  id: string
  name: string
  description: string
  cost: number
  time: number
}

const projectTypes = [
  { id: "simple", name: "Простое API", multiplier: 1, baseTime: 2 },
  { id: "medium", name: "Средний проект", multiplier: 1.5, baseTime: 4 },
  { id: "complex", name: "Сложная система", multiplier: 2.5, baseTime: 8 },
]

const features: ProjectFeature[] = [
  { id: "auth", name: "Аутентификация", description: "JWT, OAuth, роли пользователей", cost: 15000, time: 1 },
  { id: "database", name: "База данных", description: "PostgreSQL/MongoDB с оптимизацией", cost: 20000, time: 1.5 },
  { id: "api", name: "REST API", description: "Полнофункциональное API с документацией", cost: 25000, time: 2 },
  { id: "graphql", name: "GraphQL", description: "GraphQL API с резолверами", cost: 30000, time: 2.5 },
  { id: "websocket", name: "WebSocket", description: "Реальное время, чаты, уведомления", cost: 20000, time: 1.5 },
  { id: "payments", name: "Платежи", description: "Интеграция с платежными системами", cost: 35000, time: 2 },
  { id: "files", name: "Файлы", description: "Загрузка, обработка, хранение файлов", cost: 15000, time: 1 },
  { id: "email", name: "Email", description: "Отправка писем, шаблоны, очереди", cost: 10000, time: 0.5 },
  { id: "admin", name: "Админ панель", description: "Панель администратора", cost: 25000, time: 2 },
  { id: "tests", name: "Тестирование", description: "Unit и интеграционные тесты", cost: 15000, time: 1 },
  { id: "docker", name: "Docker", description: "Контейнеризация и развертывание", cost: 10000, time: 0.5 },
  { id: "monitoring", name: "Мониторинг", description: "Логирование, метрики, алерты", cost: 20000, time: 1 },
]

export default function CalculatorPage() {
  const [projectType, setProjectType] = useState("simple")
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [complexity, setComplexity] = useState([3])
  const [timeline, setTimeline] = useState([4])
  const { t } = useLanguage()

  const selectedProjectType = projectTypes.find((type) => type.id === projectType)!
  const selectedFeatureObjects = features.filter((feature) => selectedFeatures.includes(feature.id))

  const baseCost = 50000
  const featuresCost = selectedFeatureObjects.reduce((sum, feature) => sum + feature.cost, 0)
  const complexityMultiplier = complexity[0] / 5
  const timelineMultiplier = timeline[0] <= 2 ? 1.5 : timeline[0] <= 4 ? 1.2 : 1

  const totalCost = Math.round(
    (baseCost + featuresCost) * selectedProjectType.multiplier * (1 + complexityMultiplier) * timelineMultiplier,
  )

  const baseTime = selectedProjectType.baseTime
  const featuresTime = selectedFeatureObjects.reduce((sum, feature) => sum + feature.time, 0)
  const totalTime = Math.round((baseTime + featuresTime) * (1 + complexityMultiplier * 0.5))

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId) ? prev.filter((id) => id !== featureId) : [...prev, featureId],
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <Navigation />

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{t.calculator.title}</h1>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">{t.calculator.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Configuration */}
            <div className="lg:col-span-2 space-y-6">
              {/* Project Type */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.calculator.projectType.title}</CardTitle>
                  <CardDescription>{t.calculator.projectType.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={projectType} onValueChange={setProjectType}>
                    {projectTypes.map((type) => (
                      <div key={type.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                        <RadioGroupItem value={type.id} id={type.id} />
                        <Label htmlFor={type.id} className="flex-1 cursor-pointer">
                          <div className="font-medium">{type.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {t.calculator.projectType.baseTime}: {type.baseTime} {t.calculator.weeks}
                          </div>
                        </Label>
                        <Badge variant="outline">x{type.multiplier}</Badge>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.calculator.features.title}</CardTitle>
                  <CardDescription>{t.calculator.features.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {features.map((feature) => (
                      <div key={feature.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                        <Checkbox
                          id={feature.id}
                          checked={selectedFeatures.includes(feature.id)}
                          onCheckedChange={() => handleFeatureToggle(feature.id)}
                        />
                        <div className="flex-1">
                          <Label htmlFor={feature.id} className="cursor-pointer">
                            <div className="font-medium">{feature.name}</div>
                            <div className="text-sm text-muted-foreground">{feature.description}</div>
                            <div className="text-sm font-medium text-primary mt-1">
                              +{feature.cost.toLocaleString()}₽ • {feature.time}
                              {t.calculator.weeksShort}
                            </div>
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Additional Parameters */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.calculator.additionalParams.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-base font-medium">
                      {t.calculator.additionalParams.complexity}: {complexity[0]}/10
                    </Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t.calculator.additionalParams.complexityDescription}
                    </p>
                    <Slider
                      value={complexity}
                      onValueChange={setComplexity}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label className="text-base font-medium">
                      {t.calculator.additionalParams.timeline}: {timeline[0]} {t.calculator.weeks}
                    </Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t.calculator.additionalParams.timelineDescription}
                    </p>
                    <Slider value={timeline} onValueChange={setTimeline} max={12} min={1} step={1} className="w-full" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Ruble className="w-5 h-5 mr-2" />
                    {t.calculator.estimation.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">{totalCost.toLocaleString()}₽</div>
                    <div className="flex items-center justify-center text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {totalTime} {t.calculator.weeks}
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>{t.calculator.estimation.baseCost}:</span>
                      <span>{baseCost.toLocaleString()}₽</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.calculator.estimation.features}:</span>
                      <span>+{featuresCost.toLocaleString()}₽</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.calculator.estimation.projectType}:</span>
                      <span>x{selectedProjectType.multiplier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.calculator.estimation.complexity}:</span>
                      <span>+{Math.round(complexityMultiplier * 100)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.calculator.estimation.timeline}:</span>
                      <span>x{timelineMultiplier}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground mb-4">{t.calculator.estimation.disclaimer}</p>
                    <Button size="lg" className="w-full" asChild>
                      <Link href="/order">
                        {t.calculator.orderProject}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Selected Features */}
              {selectedFeatures.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>{t.calculator.selectedFeatures.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedFeatureObjects.map((feature) => (
                        <div key={feature.id} className="flex justify-between items-center text-sm">
                          <span>{feature.name}</span>
                          <Badge variant="outline">{feature.cost.toLocaleString()}₽</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
