'use client'

import React, { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Search, Filter, Grid, Sparkles, Code, Smartphone, Monitor, Server, Package, Globe, Gamepad2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'

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

interface ProjectsShowcaseProps {
  projects: Project[]
}

const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ projects }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0)

  // Get unique categories and their counts
  const categories = useMemo(() => {
    const categoryCount: Record<string, number> = {}
    projects.forEach(project => {
      categoryCount[project.category] = (categoryCount[project.category] || 0) + 1
    })
    return [
      { value: 'all', label: 'All Projects', count: projects.length },
      ...Object.entries(categoryCount).map(([value, count]) => ({
        value,
        label: value.replace('-', ' '),
        count
      }))
    ]
  }, [projects])

  // Get unique statuses
  const statuses = useMemo(() => {
    const statusCount: Record<string, number> = {}
    projects.forEach(project => {
      statusCount[project.status] = (statusCount[project.status] || 0) + 1
    })
    return [
      { value: 'all', label: 'All Statuses', count: projects.length },
      ...Object.entries(statusCount).map(([value, count]) => ({
        value,
        label: value.replace('-', ' '),
        count
      }))
    ]
  }, [projects])

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.technologies?.some(tech =>
                             tech.name.toLowerCase().includes(searchTerm.toLowerCase())
                           )
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
      const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [projects, searchTerm, selectedCategory, selectedStatus])

  // Separate featured and regular projects
  const featuredProjects = filteredProjects.filter(p => p.featured)
  const regularProjects = filteredProjects.filter(p => !p.featured)

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, React.ReactNode> = {
      'web-app': <Code className="w-4 h-4" />,
      'mobile-app': <Smartphone className="w-4 h-4" />,
      'desktop-app': <Monitor className="w-4 h-4" />,
      'api': <Server className="w-4 h-4" />,
      'library': <Package className="w-4 h-4" />,
      'website': <Globe className="w-4 h-4" />,
      'game': <Gamepad2 className="w-4 h-4" />,
      'other': <Grid className="w-4 h-4" />,
    }
    return icons[category] || icons.other
  }

  const handleCardClick = (project: Project) => {
    const projectIndex = projects.findIndex(p => p.id === project.id)
    setSelectedProjectIndex(projectIndex)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="relative container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Grid className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                  My Projects
                </span>
              </h1>
            </div>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Explore my portfolio of innovative solutions, from web applications to mobile apps.
              Each project represents a journey of learning, creativity, and technical excellence.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>{projects.length} Total Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span>{featuredProjects.length} Featured</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>{projects.filter(p => p.status === 'completed').length} Completed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="container mx-auto px-6 pb-12">
        <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 space-y-6">
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search projects, technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>

            {/* Category Filters */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-medium text-foreground">Categories</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    size="sm"
                    className="gap-2"
                  >
                    {category.value !== 'all' && getCategoryIcon(category.value)}
                    {category.label}
                    <Badge variant="secondary" className="ml-1">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            {/* Status Filters */}
            <div className="space-y-3">
              <h3 className="font-medium text-foreground">Status</h3>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                  <Button
                    key={status.value}
                    onClick={() => setSelectedStatus(status.value)}
                    variant={selectedStatus === status.value ? "default" : "outline"}
                    size="sm"
                  >
                    {status.label}
                    <Badge variant="secondary" className="ml-1">
                      {status.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-6 pb-20">
        <AnimatePresence>
          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="w-6 h-6 text-yellow-500" />
                <h2 className="text-3xl font-bold text-foreground">Featured Projects</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {featuredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onCardClick={() => handleCardClick(project)}
                    className={`${index === 0 ? 'md:col-span-2 xl:col-span-1' : ''}`}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Regular Projects */}
          {regularProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {featuredProjects.length > 0 && (
                <div className="flex items-center gap-3 mb-8">
                  <Grid className="w-6 h-6 text-primary" />
                  <h2 className="text-3xl font-bold text-foreground">All Projects</h2>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {regularProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onCardClick={() => handleCardClick(project)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">No Projects Found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters to find what you&apos;re looking for.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('all')
                    setSelectedStatus('all')
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projects={projects}
        initialIndex={selectedProjectIndex}
      />
    </div>
  )
}

export default ProjectsShowcase
