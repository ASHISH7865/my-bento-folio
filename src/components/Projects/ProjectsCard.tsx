'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Folder, Star, Calendar, Code } from 'lucide-react'
import { motion } from 'framer-motion'
import { Media } from '@/payload-types'

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
    technologies?: Array<{
        name: string
        icon?: string
        category: string
    }>
    publishedAt: string
}

interface ProjectsCardProps {
    projects: Project[]
}

const ProjectsCard: React.FC<ProjectsCardProps> = ({ projects }) => {
    const featuredProjects = projects.filter(p => p.featured).slice(0, 2)
    const totalProjects = projects.length

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            'web-app': 'bg-blue-500/20 text-blue-400',
            'mobile-app': 'bg-green-500/20 text-green-400',
            'desktop-app': 'bg-purple-500/20 text-purple-400',
            'api': 'bg-orange-500/20 text-orange-400',
            'library': 'bg-pink-500/20 text-pink-400',
            'website': 'bg-cyan-500/20 text-cyan-400',
            'other': 'bg-gray-500/20 text-gray-400',
        }
        return colors[category] || colors.other
    }

    return (
        <div className="h-full flex flex-col p-6 w-full overflow-y-auto scrollbar-custom border rounded-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20">
                        <Folder className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Projects</h3>
                        <p className="text-sm text-muted-foreground">My latest work</p>
                    </div>
                </div>
                <Link href="/projects">
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </Link>
            </div>
            {/* Featured Projects */}
            <div className="flex-1 space-y-3">
                {featuredProjects.length > 0 ? (
                    featuredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <Link href={`/projects/${project.slug}`}>
                                <div className="p-3 rounded-lg bg-muted/10 hover:bg-muted/20 transition-all duration-300 border border-border/20 hover:border-primary/30">
                                    <div className="flex items-start gap-3">
                                        {/* Project Thumbnail */}
                                        <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                                            <Image
                                                src={(project.thumbnailImage as Media)?.cloudinary?.secure_url as string}
                                                alt={project.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Project Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-medium text-sm text-foreground truncate group-hover:text-primary transition-colors">
                                                    {project.title}
                                                </h4>
                                                {project.featured && (
                                                    <Star className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                                                )}
                                            </div>

                                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                                {project.description}
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <Badge
                                                    variant="secondary"
                                                    className={`text-xs ${getCategoryColor(project.category)}`}
                                                >
                                                    {project.category.replace('-', ' ')}
                                                </Badge>
                                                <div className="flex items-center text-xs text-muted-foreground">
                                                    <Calendar className="w-3 h-3 mr-1" />
                                                    {new Date(project.publishedAt).getFullYear()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                            <Code className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No projects yet</p>
                        </div>
                    </div>
                )}
            </div>

            {/* View All Button */}
            {totalProjects > 0 && (
                <div className="mt-4 pt-4 border-t border-border/20">
                    <Link href="/projects">
                        <Button variant="outline" size="sm" className="w-full">
                            View All Projects
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default ProjectsCard
