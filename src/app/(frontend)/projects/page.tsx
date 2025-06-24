import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import ProjectCard from '@/components/Projects/ProjectCard'
import { Folder } from 'lucide-react'

export default async function ProjectsPage() {
  const payload = await getPayloadHMR({ config: configPromise })

  // Fetch all projects
  const { docs: projects } = await payload.find({
    collection: 'projects',
    depth: 2,
    sort: '-publishedAt',
    limit: 50,
  }) as { docs: any[] }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Folder className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore my portfolio of innovative solutions, from web applications to mobile apps.
            Each project represents a journey of learning, creativity, and technical excellence.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>{projects.length} Total Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <span>{projects.filter(p => p.featured).length} Featured</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>{projects.filter(p => p.status === 'completed').length} Completed</span>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onCardClick={() => {}} // Not used in this context
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Folder className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-xl font-semibold mb-2">No Projects Yet</h3>
            <p className="text-muted-foreground">Projects will appear here once they are added to the CMS.</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata() {
  return {
    title: 'Projects | Portfolio',
    description: 'Explore my portfolio of web applications, mobile apps, and software projects. Built with modern technologies and best practices.',
    keywords: 'projects, portfolio, web development, mobile apps, software engineering',
    openGraph: {
      title: 'Projects | Portfolio',
      description: 'Explore my portfolio of web applications, mobile apps, and software projects.',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Projects | Portfolio',
      description: 'Explore my portfolio of web applications, mobile apps, and software projects.',
    },
  }
}
