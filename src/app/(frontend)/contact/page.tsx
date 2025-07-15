import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Mail, MessageSquare, Phone, MapPin, Clock, CheckCircle, Globe, ExternalLink } from 'lucide-react'
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
            return ' text-emerald-800 dark:bg-emerald-100/30 dark:text-emerald-400'
        case 'busy':
            return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
        case 'unavailable':
            return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
        default:
            return 'bg-muted text-muted-foreground'
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
            <div className="min-h-screen bg-background py-12">
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
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-6 max-w-5xl py-16">
                {/* Header */}
                <div className="mb-16">
                    <Link href="/">
                        <Button variant="ghost" size="sm" className="mb-8 hover:bg-muted">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Button>
                    </Link>

                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold mb-6 text-foreground">
                            {contact.title}
                        </h1>
                        {contact.subtitle && (
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                                {contact.subtitle}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    {contact.description && (
                        <div className="max-w-4xl mx-auto text-center mb-12">
                            {renderRichTextContent(contact.description)}
                        </div>
                    )}

                    {/* Availability Status */}
                    {contact.availability?.showAvailability && contact.availability.status && (
                        <div className="flex justify-center mb-12">
                            <Badge className={`${getAvailabilityColor(contact.availability.status)} px-6 py-3 text-sm font-medium`}>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                {contact.availability.status === 'available' && 'Available for Work'}
                                {contact.availability.status === 'busy' && 'Busy - Limited Availability'}
                                {contact.availability.status === 'unavailable' && 'Not Available'}
                                {contact.availability.responseTime && ` • ${contact.availability.responseTime}`}
                            </Badge>
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    {contact.contactForm?.enabled && (
                        <div className="order-2 lg:order-1">
                            <div className="sticky top-8">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold mb-4">
                                        {contact.contactForm.title || 'Send me a message'}
                                    </h2>
                                    {contact.contactForm.description && (
                                        <p className="text-muted-foreground text-lg">{contact.contactForm.description}</p>
                                    )}
                                </div>
                                <ContactForm />
                            </div>
                        </div>
                    )}

                    {/* Contact Information */}
                    <div className="order-1 lg:order-2">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold mb-6">Get in touch</h3>
                                <p className="text-muted-foreground text-lg mb-8">
                                    I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                                </p>
                            </div>

                            {/* Contact Methods */}
                            <div className="space-y-6">
                                {/* Email */}
                                {contact.contactInfo?.showEmail && contact.contactInfo.email && (
                                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-muted/50 hover:bg-muted transition-colors">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg mb-1">Email</h4>
                                            <a
                                                href={`mailto:${contact.contactInfo.email}`}
                                                className="text-muted-foreground hover:text-primary transition-colors text-lg"
                                            >
                                                {contact.contactInfo.email}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {/* Phone */}
                                {contact.contactInfo?.showPhone && contact.contactInfo.phone && (
                                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-muted/50 hover:bg-muted transition-colors">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg mb-1">Phone</h4>
                                            <a
                                                href={`tel:${contact.contactInfo.phone}`}
                                                className="text-muted-foreground hover:text-primary transition-colors text-lg"
                                            >
                                                {contact.contactInfo.phone}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {/* Location */}
                                {contact.contactInfo?.showLocation && contact.contactInfo.location && (
                                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-muted/50 hover:bg-muted transition-colors">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg mb-1">Location</h4>
                                            <div className="text-muted-foreground text-lg">
                                                {contact.contactInfo.location.city && contact.contactInfo.location.country && (
                                                    <p>{contact.contactInfo.location.city}, {contact.contactInfo.location.country}</p>
                                                )}
                                                {contact.contactInfo.location.timezone && (
                                                    <p className="text-sm">{contact.contactInfo.location.timezone}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Response Time */}
                                {contact.availability?.showAvailability && contact.availability.responseTime && (
                                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-muted/50 hover:bg-muted transition-colors">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg mb-1">Response Time</h4>
                                            <p className="text-muted-foreground text-lg">{contact.availability.responseTime}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Social Links */}
                            {contact.socialLinks?.showSocialLinks && contact.socialLinks.links && contact.socialLinks.links.length > 0 && (
                                <div className="pt-8">
                                    <h4 className="text-xl font-semibold mb-6">Follow me</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {contact.socialLinks.links.map((link, index) => (
                                            <a
                                                key={index}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                                    {getPlatformIcon(link.platform)}
                                                </div>
                                                <div className="flex-1">
                                                    <span className="font-medium capitalize">
                                                        {link.platform === 'other' ? link.customLabel : link.platform}
                                                    </span>
                                                    {link.username && (
                                                        <p className="text-sm text-muted-foreground">@{link.username}</p>
                                                    )}
                                                </div>
                                                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Additional Sections */}
                {contact.additionalSections && contact.additionalSections.length > 0 && (
                    <div className="mt-24">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {contact.additionalSections.map((section, index) => (
                                <Card key={index} className="border-0 shadow-none bg-muted/30">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-3">
                                            {section.icon && section.icon !== 'none' && (
                                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                                    {section.icon === 'email' && <Mail className="w-5 h-5 text-primary" />}
                                                    {section.icon === 'phone' && <Phone className="w-5 h-5 text-primary" />}
                                                    {section.icon === 'location' && <MapPin className="w-5 h-5 text-primary" />}
                                                    {section.icon === 'time' && <Clock className="w-5 h-5 text-primary" />}
                                                    {section.icon === 'calendar' && <Clock className="w-5 h-5 text-primary" />}
                                                    {section.icon === 'chat' && <MessageSquare className="w-5 h-5 text-primary" />}
                                                </div>
                                            )}
                                            <span className="text-2xl">{section.title}</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {renderRichTextContent(section.content)}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* What I can help with (if no additional sections) */}
                {(!contact.additionalSections || contact.additionalSections.length === 0) && (
                    <div className="mt-24">
                        <Card className="border-0 shadow-none bg-muted/30">
                            <CardContent className="p-12">
                                <div className="text-center mb-12">
                                    <h3 className="text-3xl font-bold mb-6">What I can help with</h3>
                                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                        I specialize in creating digital solutions that help businesses grow and succeed.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[
                                        'Web application development',
                                        'Full-stack projects',
                                        'Technical consulting',
                                        'Code reviews',
                                        'Mentoring and guidance',
                                        'Architecture planning'
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted transition-colors">
                                            <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0"></div>
                                            <span className="font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}
