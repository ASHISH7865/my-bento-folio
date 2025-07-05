import React from 'react'
import { notFound } from 'next/navigation'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import { Blog, Media } from '@/payload-types'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, Clock, ArrowLeft, Share2, Eye, Heart, Bookmark, Copy, Twitter, Linkedin, Facebook, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import BlogContentRenderer from '@/components/Blog/BlogContentRenderer'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const payload = await getPayloadHMR({ config: configPromise })

  // Fetch the blog post by slug
  const { docs: blogs } = await payload.find({
    collection: 'blogs',
    where: {
      slug: {
        equals: slug,
      },
      status: {
        equals: 'published',
      },
    },
    depth: 2, // To populate relationships like featured image and tags
  })

  const blog = blogs[0] as Blog

  if (!blog) {
    notFound()
  }

  // Format the publication date
  const publishedDate = new Date(blog.publishedAt || '').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Calculate time ago
  const timeAgo = (() => {
    const now = new Date()
    const published = new Date(blog.publishedAt || '')
    const diffInMs = now.getTime() - published.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return '1 day ago'
    if (diffInDays < 30) return `${diffInDays} days ago`
    if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30)
      return `${months} ${months === 1 ? 'month' : 'months'} ago`
    }
    const years = Math.floor(diffInDays / 365)
    return `${years} ${years === 1 ? 'year' : 'years'} ago`
  })()

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 bg-primary/3 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header with enhanced styling */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="group text-muted-foreground hover:text-foreground transition-all duration-200">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span className="hidden sm:inline">Back to Blog</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>

          <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
            <span className="font-medium">{publishedDate}</span>
            <div className="h-1 w-1 rounded-full bg-muted-foreground/50" />
            <span>({timeAgo})</span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content with enhanced layout */}
      <main className="container mx-auto px-6 py-16 max-w-4xl relative z-10">
        {/* Featured Image - Enhanced hero style */}
        {blog.featuredImage && typeof blog.featuredImage === 'object' && blog.featuredImage.url && (
          <div className="group mb-16 overflow-hidden rounded-3xl bg-gradient-to-br from-muted/50 to-muted/20 backdrop-blur-sm border border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-500">
            <div className="flex items-center justify-center p-20 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <Image
                src={(blog.featuredImage as Media)?.cloudinary?.secure_url as string}
                alt={blog.title}
                width={500}
                height={500}
                className="h-80 w-80 object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        )}

        {/* Article Header with enhanced typography */}
        <article className="space-y-12">
          {/* Category Badge with animation */}
          <div className="flex items-center gap-4">
            <Badge
              variant="secondary"
              className="group relative overflow-hidden rounded-full bg-primary/10 px-6 py-2 text-primary border border-primary/20 font-medium tracking-wide hover:bg-primary/20 transition-all duration-300"
            >
              <span className="relative z-10">{blog.category}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>{blog.views || 0} views</span>
            </div>
            {blog.difficulty && (
              <Badge variant="outline" className="capitalize">
                {blog.difficulty}
              </Badge>
            )}
            {blog.primaryLanguage && (
              <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                {blog.primaryLanguage}
              </Badge>
            )}
          </div>

          {/* Enhanced Title */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground tracking-tight">
              <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text">
                {blog.title}
              </span>
            </h1>

            {/* Enhanced Meta Information */}
            <div className="flex flex-wrap items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <CalendarDays className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{publishedDate}</p>
                  <p className="text-xs">{timeAgo}</p>
                </div>
              </div>
              {blog.readingTime && (
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{blog.readingTime} min read</p>
                    <p className="text-xs">Average reading time</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Excerpt */}
          {blog.excerpt && (
            <div className="group relative rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 p-8 border border-border/50 backdrop-blur-sm hover:from-muted/40 hover:to-muted/20 transition-all duration-300">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="text-xl leading-relaxed text-foreground/90 font-medium relative z-10">
                {blog.excerpt}
              </p>
              <div className="absolute top-4 left-4 text-6xl text-primary/10 font-serif">&ldquo;</div>
            </div>
          )}

          {/* Prerequisites and Learning Outcomes */}
          {(blog.prerequisites && blog.prerequisites.length > 0) || (blog.learningOutcomes && blog.learningOutcomes.length > 0) ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blog.prerequisites && blog.prerequisites.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Prerequisites</h3>
                  <ul className="space-y-2">
                    {blog.prerequisites.map((prereq, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <div className="h-2 w-2 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                        <span>{prereq.prerequisite}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {blog.learningOutcomes && blog.learningOutcomes.length > 0 && (
                <div className="space-y-4">
                                     <h3 className="text-lg font-semibold text-foreground">What You&apos;ll Learn</h3>
                  <ul className="space-y-2">
                    {blog.learningOutcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <div className="h-2 w-2 rounded-full bg-green-500/60 mt-2 flex-shrink-0" />
                        <span>{outcome.outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : null}

          {/* Elegant Divider */}
          <div className="flex items-center gap-4 my-16">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="h-2 w-2 rounded-full bg-primary/60" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          {/* Enhanced Blog Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <BlogContentRenderer content={blog.content} />
          </div>

          {/* Enhanced Tags Section */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-20 pt-12 border-t border-border/50">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  Related Topics
                </h3>
                <div className="flex flex-wrap gap-3">
                  {blog.tags.map((tagObj: { tag?: string | null; id?: string | null }, index: number) => (
                    tagObj.tag && (
                      <Badge
                        key={index}
                        variant="outline"
                        className="group relative overflow-hidden rounded-full border-border/50 bg-background/50 text-foreground hover:bg-muted/50 transition-all duration-300 px-4 py-2"
                      >
                        <span className="relative z-10">#{tagObj.tag}</span>
                        <div className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </Badge>
                    )
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Technologies Used */}
          {blog.technologies && blog.technologies.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border/50">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Technologies Used</h3>
                <div className="flex flex-wrap gap-3">
                  {blog.technologies.map((techObj: { technology?: string | null; id?: string | null }, index: number) => (
                    techObj.technology && (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                      >
                        {techObj.technology}
                      </Badge>
                    )
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* External Links */}
          {blog.externalLinks && blog.externalLinks.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border/50">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground">Useful Resources</h3>
                <div className="space-y-3">
                  {blog.externalLinks.map((linkObj: { title?: string | null; url?: string | null; description?: string | null; id?: string | null }, index: number) => (
                    linkObj.title && linkObj.url && (
                      <a
                        key={index}
                        href={linkObj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 rounded-lg border border-border/50 bg-card/30 hover:bg-card/50 transition-colors group"
                      >
                        <div className="flex items-center gap-2 font-medium text-foreground group-hover:text-primary transition-colors">
                          {linkObj.title}
                          <ExternalLink className="h-4 w-4" />
                        </div>
                        {linkObj.description && (
                          <p className="text-sm text-muted-foreground mt-1">{linkObj.description}</p>
                        )}
                      </a>
                    )
                  ))}
                </div>
              </div>
            </div>
          )}
        </article>

        {/* Enhanced Footer Actions */}
        <div className="mt-20 pt-12 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Heart className="h-4 w-4" />
                Like ({blog.likes || 0})
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Bookmark className="h-4 w-4" />
                Save
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Share:</span>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const payload = await getPayloadHMR({ config: configPromise })

  const { docs: blogs } = await payload.find({
    collection: 'blogs',
    where: {
      slug: {
        equals: slug,
      },
      status: {
        equals: 'published',
      },
    },
  })

  const blog = blogs[0] as Blog

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
    }
  }

  return {
    title: blog.seo?.metaTitle || blog.title,
    description: blog.seo?.metaDescription || blog.excerpt,
    keywords: blog.seo?.keywords,
    openGraph: {
      title: blog.seo?.metaTitle || blog.title,
      description: blog.seo?.metaDescription || blog.excerpt,
      type: 'article',
      publishedTime: blog.publishedAt,
      authors: ['Your Name'], // You can customize this
      images: blog.featuredImage && typeof blog.featuredImage === 'object' && blog.featuredImage.url
        ? [(blog.featuredImage as Media)?.cloudinary?.secure_url as string]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.seo?.metaTitle || blog.title,
      description: blog.seo?.metaDescription || blog.excerpt,
      images: blog.featuredImage && typeof blog.featuredImage === 'object' && blog.featuredImage.url
        ? [(blog.featuredImage as Media)?.cloudinary?.secure_url as string]
        : [],
    },
  }
}
