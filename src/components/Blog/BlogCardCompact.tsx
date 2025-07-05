'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Clock, Calendar, FileText } from 'lucide-react'
import { motion } from 'framer-motion'
import { Blog, Media } from '@/payload-types'

interface BlogCardCompactProps {
  blogs: Blog[]
}

const BlogCardCompact: React.FC<BlogCardCompactProps> = ({ blogs }) => {
  const recentBlogs = blogs.slice(0, 2) // Show only 2 most recent
  const totalBlogs = blogs.length
  const tutorials = blogs.filter(b => b.category === 'tutorial').length
  const techPosts = blogs.filter(b => b.category === 'technology').length

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'technology': 'bg-blue-500/20 text-blue-400',
      'development': 'bg-green-500/20 text-green-400',
      'design': 'bg-purple-500/20 text-purple-400',
      'tutorial': 'bg-orange-500/20 text-orange-400',
      'thoughts': 'bg-gray-500/20 text-gray-400',
      'projects': 'bg-red-500/20 text-red-400',
    }
    return colors[category] || colors.thoughts
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="h-full flex flex-col p-6 w-full overflow-y-auto scrollbar-custom border rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Blog</h3>
            <p className="text-sm text-muted-foreground">Latest thoughts</p>
          </div>
        </div>
        <Link href="/blog">
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="gap-4 mb-6 flex flex-row  self-center items-center mt-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{totalBlogs}</div>
          <div className="text-xs text-muted-foreground">Posts</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-400">{tutorials}</div>
          <div className="text-xs text-muted-foreground">Tutorials</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">{techPosts}</div>
          <div className="text-xs text-muted-foreground">Tech</div>
        </div>
      </div>

      {/* Recent Blog Posts */}
      <div className="flex-1 space-y-3">
        {recentBlogs.length > 0 ? (
          recentBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/blog/${blog.slug}`}>
                <div className="p-3 rounded-lg bg-muted/10 hover:bg-muted/20 transition-all duration-300 border border-border/20 hover:border-primary/30">
                  <div className="flex items-start gap-3">
                    {/* Blog Thumbnail */}
                    {blog.featuredImage && typeof blog.featuredImage === 'object' && 'url' in blog.featuredImage && blog.featuredImage.url ? (
                      <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={(blog.featuredImage as Media)?.cloudinary?.secure_url as string}
                          alt={blog.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-md bg-muted/30 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                      </div>
                    )}

                    {/* Blog Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-foreground truncate group-hover:text-primary transition-colors mb-1">
                        {blog.title}
                      </h4>

                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                        {blog.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <Badge
                          variant="secondary"
                          className={`text-xs ${getCategoryColor(blog.category)}`}
                        >
                          {blog.category}
                        </Badge>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {blog.readingTime && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{blog.readingTime}m</span>
                            </div>
                          )}
                          {blog.publishedAt && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(blog.publishedAt)}</span>
                            </div>
                          )}
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
              <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No blog posts yet</p>
            </div>
          </div>
        )}
      </div>

      {/* View All Button */}
      {totalBlogs > 0 && (
        <div className="mt-4 pt-4  border-border/20">
          <Link href="/blog">
            <Button variant="outline" size="sm" className="w-full">
              Read All Posts
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default BlogCardCompact
