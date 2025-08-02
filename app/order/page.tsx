"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ShoppingCart, CheckCircle, MessageCircle, Mail, Phone, ArrowRight, FileText, Calculator } from "lucide-react"
import Navigation from "@/components/navigation"
import Link from "next/link"
import contactsData from "@/data/contacts.json"
import { useLanguage } from "@/contexts/language-context"

const projectTypes = [
  "REST API",
  "GraphQL API",
  "Микросервисы",
  "Веб-приложение",
  "Мобильное API",
  "Интеграции",
  "Другое",
]

const budgetRanges = [
  "До 50,000₽",
  "50,000₽ - 100,000₽",
  "100,000₽ - 200,000₽",
  "200,000₽ - 500,000₽",
  "500,000₽+",
  "Обсуждается",
]

const timeframes = ["1-2 недели", "3-4 недели", "1-2 месяца", "2-3 месяца", "3+ месяца", "Гибкие сроки"]

export default function OrderPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    timeframe: "",
    description: "",
    hasDesign: false,
    hasDocumentation: false,
    needsConsultation: true,
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const { t } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Здесь будет логика отправки формы
    setIsSubmitted(true)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
        <Navigation />
        <div className="pt-24 pb-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">{t.order.successTitle}</h1>
            <p className="text-xl text-muted-foreground mb-8">{t.order.successSubtitle}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link href="/portfolio">{t.order.portfolioButton}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contacts">{t.order.contactsButton}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
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
              <ShoppingCart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{t.order.title}</h1>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">{t.order.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t.order.formTitle}</CardTitle>
                  <CardDescription>{t.order.formDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Contact Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">{t.order.nameLabel} *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">{t.order.emailLabel} *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">{t.order.phoneLabel}</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="company">{t.order.companyLabel}</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="projectType">{t.order.projectTypeLabel} *</Label>
                        <Select
                          value={formData.projectType}
                          onValueChange={(value) => handleInputChange("projectType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={t.order.selectTypePlaceholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {projectTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="budget">{t.order.budgetLabel}</Label>
                        <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder={t.order.selectBudgetPlaceholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {budgetRanges.map((range) => (
                              <SelectItem key={range} value={range}>
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="timeframe">{t.order.timeframeLabel}</Label>
                        <Select
                          value={formData.timeframe}
                          onValueChange={(value) => handleInputChange("timeframe", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={t.order.selectTimeframePlaceholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {timeframes.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Project Description */}
                    <div>
                      <Label htmlFor="description">{t.order.descriptionLabel} *</Label>
                      <Textarea
                        id="description"
                        placeholder={t.order.descriptionPlaceholder}
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        rows={6}
                        required
                      />
                    </div>

                    {/* Additional Options */}
                    <div className="space-y-3">
                      <Label className="text-base font-medium">{t.order.additionalOptionsLabel}:</Label>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hasDesign"
                          checked={formData.hasDesign}
                          onCheckedChange={(checked) => handleInputChange("hasDesign", checked as boolean)}
                        />
                        <Label htmlFor="hasDesign">{t.order.hasDesignLabel}</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hasDocumentation"
                          checked={formData.hasDocumentation}
                          onCheckedChange={(checked) => handleInputChange("hasDocumentation", checked as boolean)}
                        />
                        <Label htmlFor="hasDocumentation">{t.order.hasDocumentationLabel}</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="needsConsultation"
                          checked={formData.needsConsultation}
                          onCheckedChange={(checked) => handleInputChange("needsConsultation", checked as boolean)}
                        />
                        <Label htmlFor="needsConsultation">{t.order.needsConsultationLabel}</Label>
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      {t.order.submitButton}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Process Steps */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.order.processTitle}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactsData.orderProcess.steps.map((step) => (
                    <div key={step.step} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{step.title}</h4>
                        <p className="text-xs text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.order.usefulLinksTitle}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" size="sm" asChild className="w-full justify-start bg-transparent">
                    <Link href="/calculator">
                      <Calculator className="w-4 h-4 mr-2" />
                      {t.order.calculatorLink}
                    </Link>
                  </Button>

                  <Button variant="outline" size="sm" asChild className="w-full justify-start bg-transparent">
                    <Link href="/portfolio">
                      <FileText className="w-4 h-4 mr-2" />
                      {t.order.portfolioLink}
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.order.contactDirectlyTitle}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" size="sm" asChild className="w-full justify-start bg-transparent">
                    <a href={`mailto:${contactsData.email}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </a>
                  </Button>

                  <Button variant="outline" size="sm" asChild className="w-full justify-start bg-transparent">
                    <a href={contactsData.social.telegram} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Telegram
                    </a>
                  </Button>

                  <Button variant="outline" size="sm" asChild className="w-full justify-start bg-transparent">
                    <a href={`tel:${contactsData.phone}`}>
                      <Phone className="w-4 h-4 mr-2" />
                      {t.order.phone}
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Guarantees */}
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
                <CardHeader>
                  <CardTitle className="text-green-700 dark:text-green-400">{t.order.guaranteesTitle}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    {t.order.guaranteeResponse}
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    {t.order.guaranteeConsultation}
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    {t.order.guaranteeFixedCost}
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    {t.order.guaranteeSupport}
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
