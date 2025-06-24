import React from 'react'
import { notFound } from 'next/navigation'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import { Blog } from '@/payload-types'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, Clock, ArrowLeft, Share2, Eye, Heart, Bookmark, Copy, Twitter, Linkedin, Facebook } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// Define proper types for Lexical editor content
interface LexicalTextNode {
  type: 'text'
  text: string
  format?: number
}

interface LexicalElementNode {
  type: string
  tag?: number
  listType?: 'number' | 'bullet'
  children?: LexicalNode[]
  [key: string]: unknown
}

type LexicalNode = LexicalTextNode | LexicalElementNode

interface LexicalContent {
  root: {
    children: LexicalNode[]
    [key: string]: unknown
  }
  [key: string]: unknown
}

// Function to render Lexical editor content with enhanced styling
function renderLexicalContent(content: LexicalContent | null | undefined) {
  if (!content || !content.root || !content.root.children) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            <Eye className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No content available</p>
        </div>
      </div>
    )
  }

  const renderNode = (node: LexicalNode, index: number): React.ReactNode => {
    switch (node.type) {
      case 'paragraph':
        return (
          <p key={index} className="mb-8 text-lg leading-relaxed text-foreground/90 tracking-wide">
            {(node as LexicalElementNode).children?.map((child: LexicalNode, childIndex: number) => renderNode(child, childIndex))}
          </p>
        )
      case 'heading':
        const headingLevel = (node as LexicalElementNode).tag || 2
        if (headingLevel === 1) {
          return (
            <h1 key={index} className="group mb-8 mt-16 text-4xl font-bold text-foreground first:mt-0 relative">
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {(node as LexicalElementNode).children?.map((child: LexicalNode, childIndex: number) => renderNode(child, childIndex))}
              </span>
              <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-primary to-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </h1>
          )
        } else if (headingLevel === 2) {
          return (
            <h2 key={index} className="group mb-6 mt-12 text-3xl font-bold text-foreground first:mt-0 relative">
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                {(node as LexicalElementNode).children?.map((child: LexicalNode, childIndex: number) => renderNode(child, childIndex))}
              </span>
              <div className="absolute -left-3 top-0 h-full w-0.5 bg-primary/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </h2>
          )
        } else if (headingLevel === 3) {
          return (
            <h3 key={index} className="mb-4 mt-10 text-2xl font-semibold text-foreground first:mt-0">
              {(node as LexicalElementNode).children?.map((child: LexicalNode, childIndex: number) => renderNode(child, childIndex))}
            </h3>
          )
        } else {
          return (
            <h4 key={index} className="mb-4 mt-8 text-xl font-medium text-foreground first:mt-0">
              {(node as LexicalElementNode).children?.map((child: LexicalNode, childIndex: number) => renderNode(child, childIndex))}
            </h4>
          )
        }
      case 'text':
        const textNode = node as LexicalTextNode
        let className = 'text-foreground/90'
        if (textNode.format && textNode.format & 1) className += ' font-semibold' // Bold
        if (textNode.format && textNode.format & 2) className += ' italic' // Italic
        if (textNode.format && textNode.format & 8) className += ' underline decoration-primary/50 underline-offset-4' // Underline

        return (
          <span key={index} className={className}>
            {textNode.text}
          </span>
        )
      case 'code':
        return (
          <code key={index} className="group relative rounded-lg bg-muted/80 px-3 py-1.5 font-mono text-sm text-primary border border-border/50 backdrop-blur-sm hover:bg-muted transition-all duration-200">
            {(node as LexicalElementNode).children?.map((child: LexicalNode, childIndex: number) => renderNode(child, childIndex))}
            <span className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </code>
        )
      case 'codeblock':
        return (
          <div key={index} className="group my-10 overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between border-b border-border/50 bg-muted/30 px-6 py-3 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">Code</span>
                <div className="h-1 w-8 bg-primary/30 rounded-full" />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Copy className="h-3 w-3" />
                </Button>
                <div className="flex space-x-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/80"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/80"></div>
                </div>
              </div>
            </div>
            <pre className="overflow-x-auto p-6 bg-gradient-to-br from-background/50 to-muted/20">
              <code className="font-mono text-sm text-foreground/90 leading-relaxed">
                {(node as LexicalElementNode).children?.map((child: LexicalNode, childIndex: number) => renderNode(child, childIndex))}
              </code>
            </pre>
          </div>
        )
      case 'quote':
        return (
          <blockquote key={index} className="group relative my-8 border-l-4 border-primary/60 bg-gradient-to-r from-muted/40 to-muted/20 pl-8 py-6 italic text-foreground/90 rounded-r-lg backdrop-blur-sm">
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary to-primary/20 rounded-full transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
            <div className="relative z-10">
              {(node as LexicalElementNode).children?.map((child: LexicalNode, childIndex: number) => renderNode(child, childIndex))}
            </div>
            <div className="absolute top-4 left-4 text-4xl text-primary/20 font-serif">&ldquo;</div>
          </blockquote>
        )
      case 'list':
        const listNode = node as LexicalElementNode
        const ListTag = listNode.listType === 'number' ? 'ol' : 'ul'
        return (
          <ListTag key={index} className="mb-8 ml-6 space-y-3 text-foreground/90">
            {(node as LexicalElementNode).children?.map((child: LexicalNode, childIndex: number) => renderNode(child, childIndex))}
          </ListTag>
        )
      case 'listitem':
        return (
          <li key={index} className="relative text-foreground/90 pl-2">
            <div className="absolute -left-6 top-2 h-2 w-2 rounded-full bg-primary/60" />
            {(node as LexicalElementNode).children?.map((child: LexicalNode, childIndex: number) => renderNode(child, childIndex))}
          </li>
        )
      default:
        return (
          <div key={index}>
            {(node as LexicalElementNode).children?.map((child: LexicalNode, childIndex: number) => renderNode(child, childIndex))}
          </div>
        )
    }
  }

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      {content.root.children.map((node: LexicalNode, index: number) => renderNode(node, index))}
    </div>
  )
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

          <div className="flex items-center gap-6">
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
        </div>
      </header>

      {/* Main content with enhanced layout */}
      <main className="container mx-auto max-w-4xl px-6 py-12 relative z-10">
        {/* Featured Image - Enhanced hero style */}
        {blog.featuredImage && typeof blog.featuredImage === 'object' && blog.featuredImage.url && (
          <div className="group mb-16 overflow-hidden rounded-3xl bg-gradient-to-br from-muted/50 to-muted/20 backdrop-blur-sm border border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-500">
            <div className="flex items-center justify-center p-20 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <Image
                src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${blog.featuredImage.url}`}
                alt={blog.featuredImage.alt || blog.title}
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
        <article className="space-y-8">
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
              <span>2.1k views</span>
            </div>
          </div>

          {/* Enhanced Title */}
          <div className="space-y-6">
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

          {/* Elegant Divider */}
          <div className="flex items-center gap-4 my-16">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="h-2 w-2 rounded-full bg-primary/60" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          {/* Enhanced Blog Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            {renderLexicalContent(blog.content)}
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
        </article>

        {/* Enhanced Footer Actions */}
        <footer className="mt-20 space-y-8">
          {/* Social Share */}
          <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 to-card/20 backdrop-blur-sm p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Share this article</h3>
                <p className="text-muted-foreground">Help others discover this content</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="group hover:bg-blue-500/10 hover:border-blue-500/30">
                  <Twitter className="mr-2 h-4 w-4 group-hover:text-blue-500 transition-colors" />
                  Twitter
                </Button>
                <Button variant="outline" size="sm" className="group hover:bg-blue-600/10 hover:border-blue-600/30">
                  <Linkedin className="mr-2 h-4 w-4 group-hover:text-blue-600 transition-colors" />
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" className="group hover:bg-blue-700/10 hover:border-blue-700/30">
                  <Facebook className="mr-2 h-4 w-4 group-hover:text-blue-700 transition-colors" />
                  Facebook
                </Button>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 to-primary/2 backdrop-blur-sm p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">Enjoyed this post?</h3>
                <p className="text-muted-foreground">Discover more articles and insights on my blog</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="group border-border/50 bg-background/50 text-foreground hover:bg-muted/50">
                  <Heart className="mr-2 h-4 w-4 group-hover:text-red-500 transition-colors" />
                  Like
                </Button>
                <Link href="/blog">
                  <Button className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300">
                    More Articles
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </footer>
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
        ? [`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${blog.featuredImage.url}`]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.seo?.metaTitle || blog.title,
      description: blog.seo?.metaDescription || blog.excerpt,
      images: blog.featuredImage && typeof blog.featuredImage === 'object' && blog.featuredImage.url
        ? [`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${blog.featuredImage.url}`]
        : [],
    },
  }
}
