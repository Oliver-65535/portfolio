"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Clock, Github, Linkedin, MessageCircle, ArrowRight, CheckCircle } from "lucide-react"
import Navigation from "@/components/navigation"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"

export default function ContactsPage() {
  const { t, language } = useLanguage()
  const [contactsData, setContactsData] = useState<any>(null)

  useEffect(() => {
    const loadContactsData = async () => {
      const data = await import(`@/data/contacts-${language}.json`)
      setContactsData(data.default)
    }
    loadContactsData()
  }, [language])

  if (!contactsData)
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
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{t.contacts.title}</h1>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">{t.contacts.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    {t.contacts.contactInformation.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-lg">{t.contacts.contactInformation.emailLabel}</p>
                        <a href={`mailto:${contactsData.email}`} className="text-primary hover:underline">
                          {contactsData.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-lg">{t.contacts.contactInformation.phoneLabel}</p>
                        <a href={`tel:${contactsData.phone}`} className="text-primary hover:underline">
                          {contactsData.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-lg">{t.contacts.contactInformation.locationLabel}</p>
                        <p className="text-muted-foreground">{contactsData.location}</p>
                        <p className="text-sm text-muted-foreground">{contactsData.timezone}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-lg">{t.contacts.contactInformation.workingHoursLabel}</p>
                        <p className="text-muted-foreground">{contactsData.workingHours}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Badge variant="secondary" className="mb-4">
                      {contactsData.availability}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.contacts.socialLinks.title}</CardTitle>
                  <CardDescription>{t.contacts.socialLinks.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" size="lg" asChild>
                      <a
                        href={contactsData.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="justify-start"
                      >
                        <Github className="w-5 h-5 mr-2" />
                        GitHub
                      </a>
                    </Button>

                    <Button variant="outline" size="lg" asChild>
                      <a
                        href={contactsData.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="justify-start"
                      >
                        <Linkedin className="w-5 h-5 mr-2" />
                        LinkedIn
                      </a>
                    </Button>

                    <Button variant="outline" size="lg" asChild>
                      <a
                        href={contactsData.social.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="justify-start"
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Telegram
                      </a>
                    </Button>

                    <Button variant="outline" size="lg" asChild>
                      <a href={`mailto:${contactsData.social.email}`} className="justify-start">
                        <Mail className="w-5 h-5 mr-2" />
                        Email
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Process */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>{contactsData.orderProcess.title}</CardTitle>
                  <CardDescription>{t.contacts.orderProcess.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {contactsData.orderProcess.steps.map((step: any) => (
                      <div key={step.step} className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {step.step}
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold">{step.title}</h3>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* CTA Card */}
              <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardHeader>
                  <CardTitle>{t.contacts.cta.title}</CardTitle>
                  <CardDescription>{t.contacts.cta.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      {t.contacts.cta.freeConsultation}
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      {t.contacts.cta.fastResponse}
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      {t.contacts.cta.detailedAssessment}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button size="lg" asChild className="flex-1">
                      <a href={`mailto:${contactsData.email}?subject=Заказ разработки`}>
                        {t.contacts.cta.emailButton}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="flex-1 bg-transparent">
                      <a href={contactsData.social.telegram} target="_blank" rel="noopener noreferrer">
                        Telegram
                        <MessageCircle className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.contacts.faq.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1 text-lg">{t.contacts.faq.question1.title}</h4>
                    <p className="text-sm text-muted-foreground">{t.contacts.faq.question1.answer}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{t.contacts.faq.question2.title}</h4>
                    <p className="text-sm text-muted-foreground">{t.contacts.faq.question2.answer}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{t.contacts.faq.question3.title}</h4>
                    <p className="text-sm text-muted-foreground">{t.contacts.faq.question3.answer}</p>
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
