'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Clock, Calendar, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Blog, Media } from '@/payload-types'

interface BlogCardProps {
  blog: Blog
  className?: string
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, className }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      technology: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      development: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
      design: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      tutorial: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
      thoughts: 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20',
      projects: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
    }
    return colors[category as keyof typeof colors] || colors.thoughts
  }

  return (
    <Link href={`/blog/${blog.slug}`}>
      <article className={cn(
        'group relative overflow-hidden rounded-lg border border-border/50 bg-background/30 hover:bg-background/50 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]',
        className
      )}>
        {/* Featured Image */}
        {blog.featuredImage && typeof blog.featuredImage === 'object' && 'url' in blog.featuredImage && blog.featuredImage.url && (
          <div className="relative h-32 overflow-hidden">
            <Image
              src={(blog.featuredImage as Media)?.cloudinary?.secure_url as string}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Category Badge */}
          <Badge
            variant="outline"
            className={cn('text-xs', getCategoryColor(blog.category))}
          >
            {blog.category}
          </Badge>

          {/* Title */}
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {blog.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              {blog.readingTime && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{blog.readingTime} min read</span>
                </div>
              )}
              {blog.publishedAt && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(blog.publishedAt)}</span>
                </div>
              )}
            </div>

            {/* Read More Arrow */}
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-2">
              {blog.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="text-[10px] text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">
                  #{tag.tag}
                </span>
              ))}
              {blog.tags.length > 2 && (
                <span className="text-[10px] text-muted-foreground">
                  +{blog.tags.length - 2} more
                </span>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}

export default BlogCard
