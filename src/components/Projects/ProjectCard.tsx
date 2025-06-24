'use client'

import React from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ExternalLink, Github, Calendar, Star, Eye } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    category: string
    status: string
    featured: boolean
    thumbnailImage: {
      url: string
      alt?: string
    }
    technologies?: Array<{
      name: string
      icon?: string
      category: string
    }>
    links?: {
      live?: string
      github?: string
    }
    publishedAt: string
  }
  onCardClick: () => void
  className?: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onCardClick,
  className = ''
}) => {
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

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'in-progress': 'bg-yellow-500/20 text-yellow-400',
      'completed': 'bg-green-500/20 text-green-400',
      'maintenance': 'bg-blue-500/20 text-blue-400',
      'archived': 'bg-gray-500/20 text-gray-400',
    }
    return colors[status] || colors.completed
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`group relative ${className}`}
    >
      <Card className="h-full overflow-hidden border border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-pointer">
        <div className="relative overflow-hidden">
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-3 left-3 z-10">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute top-3 right-3 z-10">
            <Badge variant="outline" className={getStatusColor(project.status)}>
              {project.status.replace('-', ' ')}
            </Badge>
          </div>

          {/* Project Image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${project.thumbnailImage.url}`}
              alt={project.thumbnailImage.alt || project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Hover Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <Button
                onClick={onCardClick}
                variant="secondary"
                size="sm"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </div>
          </div>

          <CardContent className="p-6 space-y-4">
            {/* Category */}
            <div className="flex items-center justify-between">
              <Badge variant="outline" className={getCategoryColor(project.category)}>
                {project.category.replace('-', ' ')}
              </Badge>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="w-3 h-3 mr-1" />
                {formatDate(project.publishedAt)}
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 4).map((tech, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs bg-muted/50 hover:bg-muted transition-colors"
                  >
                    {tech.name}
                  </Badge>
                ))}
                {project.technologies.length > 4 && (
                  <Badge variant="secondary" className="text-xs bg-muted/50">
                    +{project.technologies.length - 4} more
                  </Badge>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  onCardClick()
                }}
                variant="outline"
                size="sm"
                className="flex-1 group-hover:border-primary/50 transition-colors"
              >
                View Project
              </Button>

              <div className="flex gap-1">
                {project.links?.live && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(project.links!.live!, '_blank')
                    }}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                )}

                {project.links?.github && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(project.links!.github!, '_blank')
                    }}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
                  >
                    <Github className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}

export default ProjectCard
