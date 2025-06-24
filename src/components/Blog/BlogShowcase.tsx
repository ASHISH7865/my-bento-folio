'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, ArrowRight, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Blog } from '@/payload-types'
import BlogCard from './BlogCard'

interface BlogShowcaseProps {
  blogs: Blog[]
  className?: string
}

const BlogShowcase: React.FC<BlogShowcaseProps> = ({ blogs, className }) => {
  const recentBlogs = blogs.slice(0, 3) // Show only 3 most recent

  return (
    <div className={cn(
      'relative flex w-full rounded-xl border dark:border-dark-5 border-dark-3 transform-gpu bg-dark-1 [box-shadow:0_0px_60px_-20px_#ffffff1f_inset] cursor-grab dark:bg-white max-sm:h-max',
      className
    )}>
      <div className="flex flex-col overflow-hidden size-full relative z-10 p-4 items-start justify-between gap-4 max-sm:gap-3">
        {/* Header */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-primary/10 dark:bg-primary/20">
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Latest Posts</h2>
                <p className="text-xs text-muted-foreground">Thoughts & tutorials</p>
              </div>
            </div>

            {/* View All Button */}
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
                View All
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="w-full overflow-y-auto pr-4 scrollbar-custom">
          {recentBlogs.length > 0 ? (
            <div className="grid grid-cols-1 gap-3">
              {recentBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="p-3 rounded-full bg-muted/50 mb-3">
                <Plus className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mb-2">No blog posts yet</p>
              <p className="text-xs text-muted-foreground">
                Start writing your first blog post in the admin panel
              </p>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="w-full pt-3 border-t border-border/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>{blogs.length} total posts</span>
              <span>•</span>
              <span>{blogs.filter(b => b.category === 'tutorial').length} tutorials</span>
            </div>
            <Badge variant="secondary" className="text-[10px] h-5 px-2">
              {blogs.filter(b => b.category === 'technology').length} tech posts
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogShowcase
