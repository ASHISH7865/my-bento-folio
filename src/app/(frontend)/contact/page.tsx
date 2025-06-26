import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Mail, MessageSquare, Send, Phone, MapPin, Clock, CheckCircle, Globe, ExternalLink, Sparkles, Calendar, Heart, Zap } from 'lucide-react'
import Link from 'next/link'
import ContactForm from '@/components/Contact/ContactForm'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'
import type { ContactPage } from '@/payload-types'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: payloadConfig })

  const contactData = await payload.find({
    collection: 'contact-page',
    where: { status: { equals: 'published' } },
    limit: 1,
  })

  const contact = contactData.docs[0] as ContactPage

  if (!contact) {
    return {
      title: 'Contact',
      description: 'Get in touch with me',
    }
  }

  return {
    title: contact.seo?.metaTitle || contact.title,
    description: contact.seo?.metaDescription || contact.subtitle || 'Get in touch with me',
    keywords: contact.seo?.keywords,
    openGraph: {
      title: contact.seo?.metaTitle || contact.title,
      description: contact.seo?.metaDescription || contact.subtitle || 'Get in touch with me',
      type: 'website',
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
          <p key={index} className="text-muted-foreground leading-relaxed mb-4">
            {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
          </p>
        )
      case 'text':
        let className = ''
        if (node.format && node.format & 1) className += ' font-semibold' // Bold
        if (node.format && node.format & 2) className += ' italic' // Italic
        if (node.format && node.format & 8) className += ' underline' // Underline

        return (
          <span key={index} className={className}>
            {node.text}
          </span>
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

// Function to get platform icon
function getPlatformIcon(platform: string) {
  switch (platform) {
    case 'github':
      return <Globe className="w-5 h-5" />
    case 'linkedin':
      return <Globe className="w-5 h-5" />
    case 'twitter':
      return <Globe className="w-5 h-5" />
    case 'website':
      return <Globe className="w-5 h-5" />
    default:
      return <Globe className="w-5 h-5" />
  }
}

// Function to get availability status color
function getAvailabilityColor(status: string) {
  switch (status) {
    case 'available':
      return 'bg-green-500/20 text-green-400 border-green-500/30'
    case 'busy':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    case 'unavailable':
      return 'bg-red-500/20 text-red-400 border-red-500/30'
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }
}

export default async function ContactPage() {
  const payload = await getPayload({ config: payloadConfig })

  // Fetch contact page data
  const contactData = await payload.find({
    collection: 'contact-page',
    where: {
      status: {
        equals: 'published'
      }
    },
    limit: 1,
  })

  const contact = contactData.docs[0] as ContactPage

  if (!contact) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/5 py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Contact Content Not Found</h1>
            <p className="text-muted-foreground mb-6">
              No published contact content available.
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

  return (
    <div className="min-h-screen ">

      <div className="container mx-auto px-6 max-w-7xl py-12 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-8 group hover:bg-primary/10 transition-all duration-300">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Button>
          </Link>

          <div className="text-center mb-12">
            {/* Animated Icon */}
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-primary/20 via-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 animate-bounce">
              <MessageSquare className="w-12 h-12 text-primary animate-pulse" />
            </div>

            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent animate-in slide-in-from-bottom-4 duration-1000">
              {contact.title}
            </h1>
            {contact.subtitle && (
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
                {contact.subtitle}
              </p>
            )}
          </div>

          {/* Description */}
          {contact.description && (
            <div className="max-w-3xl mx-auto text-center mb-8">
              {renderRichTextContent(contact.description)}
            </div>
          )}

          {/* Availability Status */}
          {contact.availability?.showAvailability && contact.availability.status && (
            <div className="flex justify-center mb-8">
              <Badge className={`${getAvailabilityColor(contact.availability.status)} px-6 py-3 text-sm animate-pulse`}>
                <CheckCircle className="w-5 h-5 mr-2" />
                {contact.availability.status === 'available' && 'Available for Work'}
                {contact.availability.status === 'busy' && 'Busy - Limited Availability'}
                {contact.availability.status === 'unavailable' && 'Not Available'}
                {contact.availability.responseTime && ` • ${contact.availability.responseTime}`}
              </Badge>
              {contact.availability.note && (
                <p className="text-sm text-muted-foreground mt-2 text-center">{contact.availability.note}</p>
              )}
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Form - Takes 2 columns */}
          {contact.contactForm?.enabled && (
            <div className="lg:col-span-2">
              <Card className="p-8 hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary/20 to-blue-500/20 flex items-center justify-center">
                    <Send className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">
                      {contact.contactForm.title || 'Send me a message'}
                    </h2>
                    {contact.contactForm.description && (
                      <p className="text-muted-foreground">{contact.contactForm.description}</p>
                    )}
                  </div>
                </div>
                <ContactForm className="mt-6" />
              </Card>
            </div>
          )}

          {/* Quick Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              Quick Contact
            </h3>

            {/* Email */}
            {contact.contactInfo?.showEmail && contact.contactInfo.email && (
              <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Email</h4>
                      <p className="text-sm text-muted-foreground">Best way to reach me</p>
                    </div>
                  </div>
                  <a
                    href={`mailto:${contact.contactInfo.email}`}
                    className="text-sm hover:text-primary transition-colors font-medium block p-2 rounded-lg hover:bg-primary/5"
                  >
                    {contact.contactInfo.email}
                  </a>
                </CardContent>
              </Card>
            )}

            {/* Phone */}
            {contact.contactInfo?.showPhone && contact.contactInfo.phone && (
              <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Phone</h4>
                      <p className="text-sm text-muted-foreground">Call or text</p>
                    </div>
                  </div>
                  <a
                    href={`tel:${contact.contactInfo.phone}`}
                    className="text-sm hover:text-primary transition-colors font-medium block p-2 rounded-lg hover:bg-primary/5"
                  >
                    {contact.contactInfo.phone}
                  </a>
                </CardContent>
              </Card>
            )}

            {/* Location */}
            {contact.contactInfo?.showLocation && contact.contactInfo.location && (
              <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Location</h4>
                      <p className="text-sm text-muted-foreground">Where I&apos;m based</p>
                    </div>
                  </div>
                  <div className="text-sm space-y-1">
                    {contact.contactInfo.location.city && contact.contactInfo.location.country && (
                      <p className="font-medium">{contact.contactInfo.location.city}, {contact.contactInfo.location.country}</p>
                    )}
                    {contact.contactInfo.location.timezone && (
                      <p className="text-muted-foreground">{contact.contactInfo.location.timezone}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Response Time */}
            {contact.availability?.showAvailability && contact.availability.responseTime && (
              <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-orange-500/5 to-yellow-500/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500/20 to-yellow-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Response Time</h4>
                      <p className="text-sm text-muted-foreground">How quickly I&apos;ll get back</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium">{contact.availability.responseTime}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Social Links Section */}
        {contact.socialLinks?.showSocialLinks && contact.socialLinks.links && contact.socialLinks.links.length > 0 && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                <Heart className="w-8 h-8 text-red-500 animate-pulse" />
                Find me online
              </h3>
              <p className="text-muted-foreground">Connect with me on these platforms</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {contact.socialLinks.links.map((link, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-500 hover:scale-105 border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 hover:text-primary transition-colors relative z-10"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {getPlatformIcon(link.platform)}
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-lg capitalize block">
                          {link.platform === 'other' ? link.customLabel : link.platform}
                        </span>
                        {link.username && (
                          <p className="text-sm text-muted-foreground">@{link.username}</p>
                        )}
                      </div>
                      <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Additional Sections */}
        {contact.additionalSections && contact.additionalSections.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {contact.additionalSections.map((section, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {section.icon && section.icon !== 'none' && (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {section.icon === 'email' && <Mail className="w-5 h-5 text-primary" />}
                        {section.icon === 'phone' && <Phone className="w-5 h-5 text-primary" />}
                        {section.icon === 'location' && <MapPin className="w-5 h-5 text-primary" />}
                        {section.icon === 'time' && <Clock className="w-5 h-5 text-primary" />}
                        {section.icon === 'calendar' && <Calendar className="w-5 h-5 text-primary" />}
                        {section.icon === 'chat' && <MessageSquare className="w-5 h-5 text-primary" />}
                      </div>
                    )}
                    <span className="text-xl">{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderRichTextContent(section.content)}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* What I can help with (if no additional sections) */}
        {(!contact.additionalSections || contact.additionalSections.length === 0) && (
          <Card className="max-w-4xl mx-auto border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-r from-primary/20 to-blue-500/20 flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">What I can help with</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  'Web application development',
                  'Full-stack projects',
                  'Technical consulting',
                  'Code reviews',
                  'Mentoring and guidance',
                  'Architecture planning'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

    </div>
  )
}
