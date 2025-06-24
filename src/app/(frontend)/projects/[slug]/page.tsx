import React from 'react'
import { notFound } from 'next/navigation'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Clock,
  Users,
  Code2,
  Target,
  Lightbulb,
  CheckCircle,
  Star,
  Eye,
  Download,
  FileText,
  Zap,
  Award
} from 'lucide-react'

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params
  const payload = await getPayloadHMR({ config: configPromise })

    // Fetch the project by slug
  const { docs: projects } = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
  })

  const project = projects[0]

  if (!project) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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

  const allImages = [
    { image: project.thumbnailImage, caption: 'Main Preview' },
    ...(project.images || [])
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/5">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/projects">
            <Button variant="ghost" size="sm" className="group text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Button>
          </Link>

          <div className="flex items-center gap-4">
            {project.featured && (
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}

            <div className="flex items-center gap-2">
              {project.links?.live && (
                <Button
                  onClick={() => window.open(project.links!.live!, '_blank')}
                  variant="outline"
                  size="sm"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Button>
              )}

              {project.links?.github && (
                <Button
                  onClick={() => window.open(project.links!.github!, '_blank')}
                  variant="outline"
                  size="sm"
                >
                  <Github className="w-4 h-4 mr-2" />
                  Source
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Project Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={getCategoryColor(project.category)}>
                    {project.category.replace('-', ' ')}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    {project.publishedAt ? formatDate(project.publishedAt) : 'No date'}
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                  <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                    {project.title}
                  </span>
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.metrics?.duration && (
                  <Card className="p-4 bg-card/50 border-border/50">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-semibold">{project.metrics.duration}</p>
                      </div>
                    </div>
                  </Card>
                )}

                {project.metrics?.teamSize && (
                  <Card className="p-4 bg-card/50 border-border/50">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Team Size</p>
                        <p className="font-semibold">{project.metrics.teamSize}</p>
                      </div>
                    </div>
                  </Card>
                )}

                {project.technologies && (
                  <Card className="p-4 bg-card/50 border-border/50">
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Technologies</p>
                        <p className="font-semibold">{project.technologies.length}</p>
                      </div>
                    </div>
                  </Card>
                )}

                <Card className="p-4 bg-card/50 border-border/50">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-semibold capitalize">{project.status.replace('-', ' ')}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {project.links?.live && (
                  <Button
                    onClick={() => window.open(project.links!.live!, '_blank')}
                    size="lg"
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    View Live Project
                  </Button>
                )}

                {project.links?.github && (
                  <Button
                    onClick={() => window.open(project.links!.github!, '_blank')}
                    variant="outline"
                    size="lg"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    View Source Code
                  </Button>
                )}

                {project.links?.documentation && (
                  <Button
                    onClick={() => window.open(project.links!.documentation!, '_blank')}
                    variant="outline"
                    size="lg"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Documentation
                  </Button>
                )}

                {project.links?.download && (
                  <Button
                    onClick={() => window.open(project.links!.download!, '_blank')}
                    variant="outline"
                    size="lg"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download
                  </Button>
                )}
              </div>
            </div>

            {/* Main Project Image */}
            <div className="relative">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted/20 shadow-2xl">
                {project.thumbnailImage && typeof project.thumbnailImage === 'object' && 'url' in project.thumbnailImage && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${project.thumbnailImage.url}`}
                    alt={project.thumbnailImage.alt || project.title}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16 space-y-16">
        {/* Project Gallery */}
        {allImages.length > 1 && (
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Project Gallery</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore different aspects and features of the project through this visual showcase.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allImages.slice(1).map((img, index) => (
                <Card key={index} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-video">
                    {img.image && typeof img.image === 'object' && 'url' in img.image && (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${img.image.url}`}
                        alt={img.image.alt || img.caption || `${project.title} screenshot ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  {img.caption && (
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">{img.caption}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Detailed Description */}
            {project.detailedDescription && (
              <section>
                <Card className="border-border/50 bg-card/50">
                  <CardHeader>
                    <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                      <FileText className="w-6 h-6 text-primary" />
                      Project Overview
                    </h2>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      {/* Here you would render the rich text content */}
                      <p className="text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>
            )}

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <section>
                <Card className="border-border/50 bg-card/50">
                  <CardHeader>
                    <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                      <Zap className="w-6 h-6 text-primary" />
                      Key Features
                    </h2>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/20">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{feature.title}</h3>
                            {feature.description && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {feature.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>
            )}

            {/* Challenges & Solutions */}
            {project.challenges && project.challenges.length > 0 && (
              <section>
                <Card className="border-border/50 bg-card/50">
                  <CardHeader>
                    <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                      <Target className="w-6 h-6 text-primary" />
                      Challenges & Solutions
                    </h2>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {project.challenges.map((item, index) => (
                        <div key={index} className="space-y-3">
                          <div className="flex items-start gap-3">
                            <Lightbulb className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold text-foreground">Challenge</h3>
                              <p className="text-muted-foreground">{item.challenge}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 pl-8">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold text-foreground">Solution</h3>
                              <p className="text-muted-foreground">{item.solution}</p>
                            </div>
                          </div>
                          {index < project.challenges!.length - 1 && (
                            <Separator className="mt-6" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-primary" />
                    Technologies Used
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['frontend', 'backend', 'database', 'devops', 'mobile', 'design', 'other'].map(category => {
                      const techs = project.technologies?.filter(tech => tech.category === category)
                      if (!techs || techs.length === 0) return null

                      return (
                        <div key={category}>
                          <h4 className="font-medium text-foreground capitalize mb-2">
                            {category === 'devops' ? 'DevOps' : category}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {techs.map((tech, index) => (
                              <Badge key={index} variant="secondary" className="bg-muted/50">
                                {tech.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Project Metrics */}
            {project.metrics && (
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <h3 className="text-xl font-bold text-foreground">Project Metrics</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.metrics.duration && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-medium">{project.metrics.duration}</span>
                      </div>
                    )}
                    {project.metrics.teamSize && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Team Size</span>
                        <span className="font-medium">{project.metrics.teamSize}</span>
                      </div>
                    )}
                    {project.metrics.linesOfCode && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lines of Code</span>
                        <span className="font-medium">{project.metrics.linesOfCode.toLocaleString()}</span>
                      </div>
                    )}
                    {project.metrics.users && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Users</span>
                        <span className="font-medium">{project.metrics.users}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Project Links */}
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <h3 className="text-xl font-bold text-foreground">Project Links</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {project.links?.live && (
                    <Button
                      onClick={() => window.open(project.links!.live!, '_blank')}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  )}

                  {project.links?.github && (
                    <Button
                      onClick={() => window.open(project.links!.github!, '_blank')}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Source Code
                    </Button>
                  )}

                  {project.links?.documentation && (
                    <Button
                      onClick={() => window.open(project.links!.documentation!, '_blank')}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Documentation
                    </Button>
                  )}

                  {project.links?.download && (
                    <Button
                      onClick={() => window.open(project.links!.download!, '_blank')}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params
  const payload = await getPayloadHMR({ config: configPromise })

  const { docs: projects } = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const project = projects[0]

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: project.seo?.metaTitle || `${project.title} | Projects`,
    description: project.seo?.metaDescription || project.description,
    keywords: project.seo?.keywords,
    openGraph: {
      title: project.seo?.metaTitle || project.title,
      description: project.seo?.metaDescription || project.description,
      type: 'article',
      publishedTime: project.publishedAt,
      images: project.thumbnailImage && typeof project.thumbnailImage === 'object' && 'url' in project.thumbnailImage
        ? [`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${project.thumbnailImage.url}`]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.seo?.metaTitle || project.title,
      description: project.seo?.metaDescription || project.description,
      images: project.thumbnailImage && typeof project.thumbnailImage === 'object' && 'url' in project.thumbnailImage
        ? [`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${project.thumbnailImage.url}`]
        : [],
    },
  }
}
