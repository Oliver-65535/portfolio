"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface VideoModalProps {
  videoUrl: string
  title: string
}

export default function VideoModal({ videoUrl, title }: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Play className="w-4 h-4 mr-2" />
          {t.common.video}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full">
        <div className="aspect-video w-full">
          <video controls className="w-full h-full rounded-lg" poster="/placeholder.svg?height=400&width=600">
            <source src={videoUrl} type="video/mp4" />
            Ваш браузер не поддерживает воспроизведение видео.
          </video>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      </DialogContent>
    </Dialog>
  )
}
