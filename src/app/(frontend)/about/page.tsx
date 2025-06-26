import React from 'react'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Download,
  MapPin,
  Calendar,
  Code,
  Heart,
  User,
  Award,
  Briefcase,
  Mail,
  Github,
  Linkedin,
  Globe,
  Coffee,
  Zap,
  Star,
  Trophy,
  Sparkles,
  CheckCircle2,
  Rocket,
  Target,
  Lightbulb,
  BookOpen,
  Headphones,
  Camera,
  Mountain,
  Palette
} from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'
import { About } from '@/payload-types'
import { format } from 'date-fns'
import { Metadata } from 'next'
import Image from 'next/image'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: payloadConfig })

  const aboutData = await payload.find({
    collection: 'about',
    where: { status: { equals: 'published' } },
    limit: 1,
  })

  const about = aboutData.docs[0] as About

  if (!about) {
    return {
      title: 'About',
      description: 'Learn more about me and my journey',
    }
  }

  return {
    title: about.seo?.metaTitle || about.title,
    description: about.seo?.metaDescription || about.subtitle || 'Learn more about me and my journey',
    keywords: about.seo?.keywords,
    openGraph: {
      title: about.seo?.metaTitle || about.title,
      description: about.seo?.metaDescription || about.subtitle || 'Learn more about me and my journey',
      type: 'profile',
    },
  }
}

// Function to render rich text content
function renderRichTextContent(content: any) {
  if (!content || !content.root || !content.root.children) {
    return null
  }

  const renderNode = (node: any, index: number): React.ReactNode => {
    switch (node.type) {
      case 'paragraph':
        return (
          <p key={index} className="text-foreground/80 leading-relaxed mb-4 text-base">
            {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
          </p>
        )
      case 'heading':
        const headingLevel = node.tag || 2
        if (headingLevel === 1) {
          return (
            <h1 key={index} className="text-3xl font-bold mb-4 text-foreground">
              {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
            </h1>
          )
        } else if (headingLevel === 2) {
          return (
            <h2 key={index} className="text-2xl font-semibold mb-4 text-foreground">
              {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
            </h2>
          )
        } else {
          return (
            <h3 key={index} className="text-lg font-medium mb-3 text-foreground">
              {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
            </h3>
          )
        }
      case 'text':
        let className = ''
        if (node.format && node.format & 1) className += ' font-semibold'
        if (node.format && node.format & 2) className += ' italic'
        if (node.format && node.format & 8) className += ' underline'

        return (
          <span key={index} className={className}>
            {node.text}
          </span>
        )
      case 'list':
        const ListTag = node.listType === 'number' ? 'ol' : 'ul'
        return (
          <ListTag key={index} className="mb-4 space-y-2">
            {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
          </ListTag>
        )
      case 'listitem':
        return (
          <li key={index} className="text-foreground/80 flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
            <span>
              {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
            </span>
          </li>
        )
      default:
        return (
          <div key={index}>
            {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
          </div>
        )
    }
  }

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      {content.root.children.map((node: any, index: number) => renderNode(node, index))}
    </div>
  )
}

// Skill proficiency colors
const getProficiencyColor = (proficiency: string) => {
  switch (proficiency) {
    case 'expert': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
    case 'advanced': return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
    case 'intermediate': return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
    case 'beginner': return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white'
    default: return 'bg-gradient-to-r from-primary to-primary/70 text-white'
  }
}

export default async function AboutPage() {
  const payload = await getPayload({ config: payloadConfig })

  // Fetch about data
  const aboutData = await payload.find({
    collection: 'about',
    where: {
      status: {
        equals: 'published'
      }
    },
    limit: 1,
  })

  const about = aboutData.docs[0] as About

  if (!about) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/5 py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">About Content Not Found</h1>
            <p className="text-muted-foreground mb-6">
              No published about content available.
            </p>
            <Link href="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM yyyy')
  }

  // Skill categories with custom colors and icons
  const skillCategoryIcons: { [key: string]: any } = {
    'Frontend Development': { icon: Palette, color: 'from-pink-500 to-rose-500' },
    'Backend Development': { icon: Code, color: 'from-blue-500 to-indigo-500' },
    'Tools & DevOps': { icon: Zap, color: 'from-purple-500 to-violet-500' },
    'Architecture & Design': { icon: Lightbulb, color: 'from-orange-500 to-amber-500' },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Floating shapes background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
        <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-purple-500/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-green-500/20 rounded-full animate-pulse" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/6 right-1/3 w-5 h-5 bg-blue-500/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/6 w-4 h-4 bg-orange-500/20 rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <div className="container mx-auto px-6 pt-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Hero Section - Full width with split layout */}
        <section className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Text content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
                  <Sparkles className="w-4 h-4" />
                  Hey there! 👋
                </div>

                <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                  I&apos;m <span className="text-primary">Ashish</span>
                </h1>

                <div className="text-xl lg:text-2xl text-muted-foreground space-y-2">
                  <p>A passionate <strong className="text-foreground">Full Stack Developer</strong></p>
                  <p>who loves building <strong className="text-foreground">amazing digital experiences</strong></p>
                </div>

                {renderRichTextContent(about.introduction)}
              </div>

              {/* Fun stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">3+</div>
                  <div className="text-sm text-muted-foreground">Years of Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-500">40%</div>
                  <div className="text-sm text-muted-foreground">Workflow Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">∞</div>
                  <div className="text-sm text-muted-foreground">Cups of Coffee</div>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="rounded-full" asChild>
                  <Link href="/contact">
                   {" Let's Chat "}<Heart className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full" asChild>
                  <Link href="/projects">
                    View My Work <Rocket className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right side - Visual elements */}
            <div className="relative">
              <div className="relative w-full max-w-lg mx-auto">
                {/* Main profile area */}
                <div className="relative">
                  {about.heroImage && typeof about.heroImage === 'object' ? (
                    <div className="w-80 h-80 mx-auto relative">
                      <div className="w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-purple-500/20 p-2">
                        <Image
                          src={about.heroImage.cloudinary?.secure_url || ''}
                          alt={about.heroImage.alt}
                          width={320}
                          height={320}
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-80 h-80 mx-auto bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-3xl flex items-center justify-center">
                      <User className="w-32 h-32 text-primary/60" />
                    </div>
                  )}

                  {/* Floating elements around the image */}
                  <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border">
                    <Code className="w-8 h-8 text-blue-500" />
                  </div>

                  <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border">
                    <Coffee className="w-8 h-8 text-orange-500" />
                  </div>

                  <div className="absolute top-1/2 -left-8 bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-lg border">
                    <Lightbulb className="w-6 h-6 text-yellow-500" />
                  </div>

                  <div className="absolute top-1/4 -right-8 bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-lg border">
                    <Rocket className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What I Do Section */}
        {about.sections && about.sections.length > 0 && (
          <section className="bg-muted/30 py-20">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">What I Do</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  I specialize in creating digital solutions that make a difference
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {about.sections.map((section, index) => (
                  <div key={index} className="group">
                    <div className="bg-card rounded-3xl p-8 h-full hover:shadow-xl transition-all duration-300 border hover:border-primary/20">
                      <div className="mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Target className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">{section.sectionTitle}</h3>
                      </div>
                      <div className="text-muted-foreground">
                        {renderRichTextContent(section.content)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Skills Section - Creative Layout */}
        {about.skills && about.skills.categories && about.skills.categories.length > 0 && (
          <section className="py-20">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">My Arsenal</h2>
                <p className="text-xl text-muted-foreground">
                  Tools and technologies I love working with
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {about.skills.categories.map((category, index) => {
                  const categoryConfig = skillCategoryIcons[category.categoryName] ||
                    { icon: Code, color: 'from-gray-500 to-slate-500' }
                  const IconComponent = categoryConfig.icon

                  return (
                    <div key={index} className="group">
                      <div className="bg-card rounded-2xl p-6 border hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
                        <div className="mb-4">
                          <div className={`w-12 h-12 bg-gradient-to-r ${categoryConfig.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-lg">{category.categoryName}</h3>
                        </div>

                        <div className="space-y-2">
                          {category.skills?.slice(0, 4).map((skill, skillIndex) => (
                            <div key={skillIndex} className="flex items-center justify-between">
                              <span className="text-sm">{skill.name}</span>
                              <div className="flex">
                                {[...Array(4)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < (skill.proficiency === 'expert' ? 4 :
                                           skill.proficiency === 'advanced' ? 3 :
                                           skill.proficiency === 'intermediate' ? 2 : 1)
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-muted-foreground'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                          {category.skills && category.skills.length > 4 && (
                            <div className="text-xs text-muted-foreground pt-2">
                              +{category.skills.length - 4} more
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Journey Timeline */}
        {about.experience && about.experience.timeline && about.experience.timeline.length > 0 && (
          <section className="bg-muted/30 py-20">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">My Journey</h2>
                <p className="text-xl text-muted-foreground">
                  The path that led me here
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                {about.experience.timeline.map((exp, index) => (
                  <div key={index} className="relative flex items-start mb-12 last:mb-0">
                    {/* Timeline line */}
                    {index !== about.experience!.timeline!.length - 1 && (
                      <div className="absolute left-6 top-16 w-0.5 h-24 bg-primary/20"></div>
                    )}

                    {/* Timeline dot */}
                    <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-6 relative z-10">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-card rounded-2xl p-8 border">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-primary">{exp.position}</h3>
                          <p className="text-lg font-medium text-muted-foreground">{exp.company}</p>
                        </div>
                        <div className="text-sm text-muted-foreground bg-muted rounded-full px-3 py-1 mt-2 md:mt-0">
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : 'Present'}
                        </div>
                      </div>

                      {exp.description && (
                        <div className="mb-4">
                          {renderRichTextContent(exp.description)}
                        </div>
                      )}

                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="secondary" className="text-xs">
                              {tech.tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Personal Touch Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-8">Beyond the Code</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mb-3">
                    <Coffee className="w-8 h-8 text-blue-500" />
                  </div>
                  <span className="text-sm font-medium">Tea Enthusiast</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mb-3">
                    <BookOpen className="w-8 h-8 text-green-500" />
                  </div>
                  <span className="text-sm font-medium">Continuous Learner</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-2xl flex items-center justify-center mb-3">
                    <Headphones className="w-8 h-8 text-purple-500" />
                  </div>
                  <span className="text-sm font-medium">Music Lover</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-2xl flex items-center justify-center mb-3">
                    <Mountain className="w-8 h-8 text-orange-500" />
                  </div>
                  <span className="text-sm font-medium">Explorer</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 rounded-3xl p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-4">Let&apos;s Build Something Amazing Together!</h3>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  I&apos;m always excited to work on new projects and collaborate with passionate people.
                  Whether you have an idea or just want to chat about tech, I&apos;d love to hear from you!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="rounded-full" asChild>
                    <Link href="/contact">
                      <Mail className="w-5 h-5 mr-2" />
                      Get In Touch
                    </Link>
                  </Button>

                  <Button variant="outline" size="lg" className="rounded-full" asChild>
                    <Link href="/resume">
                      <Download className="w-5 h-5 mr-2" />
                      Download Resume
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
