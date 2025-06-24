'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { ExternalLink, Github, Calendar, ChevronLeft, ChevronRight, X, Eye, Code, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Project {
  id: string
  slug: string
  title: string
  description: string
  category: string
  status: string
  featured: boolean
  thumbnailImage: {
    url: string
    alt?: string
  }
  images?: Array<{
    image: {
      url: string
      alt?: string
    }
    caption?: string
  }>
  technologies?: Array<{
    name: string
    icon?: string
    category: string
  }>
  links?: {
    live?: string
    github?: string
    documentation?: string
    download?: string
  }
  features?: Array<{
    title: string
    description?: string
    icon?: string
  }>
  publishedAt: string
}

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  projects: Project[]
  initialIndex?: number
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  projects,
  initialIndex = 0
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [imageIndex, setImageIndex] = useState(0)

  const currentProject = projects[currentIndex]

  useEffect(() => {
    setCurrentIndex(initialIndex)
    setImageIndex(0)
  }, [initialIndex, isOpen])

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
    setImageIndex(0)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
    setImageIndex(0)
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'web-app': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'mobile-app': 'bg-green-500/20 text-green-400 border-green-500/30',
      'desktop-app': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'api': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'library': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'website': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      'game': 'bg-red-500/20 text-red-400 border-red-500/30',
      'other': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    }
    return colors[category] || colors.other
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!currentProject) return null

  const allImages = [
    { image: currentProject.thumbnailImage, caption: 'Main Preview' },
    ...(currentProject.images || [])
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0 bg-gradient-to-br from-background via-background to-muted/10">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="flex flex-row items-center justify-between p-6 border-b border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                {currentProject.title}
              </DialogTitle>
              {currentProject.featured && (
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Project Navigation */}
              {projects.length > 1 && (
                <div className="flex items-center gap-1 mr-4">
                  <Button
                    onClick={prevProject}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground px-2">
                    {currentIndex + 1} / {projects.length}
                  </span>
                  <Button
                    onClick={nextProject}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}

              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6"
              >
                {/* Image Carousel */}
                <div className="space-y-4">
                  <div className="relative">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {allImages.map((img, index) => (
                          <CarouselItem key={index}>
                            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted/20">
                              <Image
                                src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${img.image.url}`}
                                alt={img.image.alt || img.caption || currentProject.title}
                                fill
                                className="object-cover"
                              />
                              {img.caption && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                  <p className="text-white text-sm">{img.caption}</p>
                                </div>
                              )}
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      {allImages.length > 1 && (
                        <>
                          <CarouselPrevious className="left-2" />
                          <CarouselNext className="right-2" />
                        </>
                      )}
                    </Carousel>
                  </div>

                  {/* Image Thumbnails */}
                  {allImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {allImages.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setImageIndex(index)}
                          className={`relative w-16 h-12 rounded border-2 overflow-hidden flex-shrink-0 transition-all ${
                            index === imageIndex
                              ? 'border-primary shadow-lg'
                              : 'border-border/30 hover:border-border'
                          }`}
                        >
                          <Image
                            src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${img.image.url}`}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Project Details */}
                <div className="space-y-6">
                  {/* Meta Information */}
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="outline" className={getCategoryColor(currentProject.category)}>
                      {currentProject.category.replace('-', ' ')}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(currentProject.publishedAt)}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">About This Project</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {currentProject.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  {currentProject.technologies && currentProject.technologies.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <Code className="w-5 h-5" />
                        Technologies Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {currentProject.technologies.map((tech, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-muted/50 hover:bg-muted transition-colors"
                          >
                            {tech.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Features */}
                  {currentProject.features && currentProject.features.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground">Key Features</h3>
                      <div className="space-y-2">
                        {currentProject.features.slice(0, 4).map((feature, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20">
                            <div className="mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground">{feature.title}</h4>
                              {feature.description && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  {feature.description}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-border/50">
                    <Link href={`/projects/${currentProject.slug}`}>
                      <Button className="bg-primary hover:bg-primary/90">
                        <Eye className="w-4 h-4 mr-2" />
                        View Full Details
                      </Button>
                    </Link>

                    {currentProject.links?.live && (
                      <Button
                        onClick={() => window.open(currentProject.links!.live!, '_blank')}
                        variant="outline"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    )}

                    {currentProject.links?.github && (
                      <Button
                        onClick={() => window.open(currentProject.links!.github!, '_blank')}
                        variant="outline"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Source Code
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProjectModal
