'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import {
    Mail,
    Github,
    Linkedin,
    Twitter,
    ExternalLink,
    MessageSquare,
    Briefcase,
    Globe
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Profile } from '@/payload-types'
import ContactForm from './ContactForm'

interface ContactLinksProps {
    className?: string
    profile?: Profile
}

const ContactLinks = ({ className, profile }: ContactLinksProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleHireMe = () => {
        const subject = encodeURIComponent('Hiring Inquiry - Let\'s work together!')
        const body = encodeURIComponent(`Hi there,\n\nI'm interested in working with you on a project.\n\nProject details:\n- Type: \n- Timeline: \n- Budget: \n\nPlease let me know if you're available and interested.\n\nBest regards,`)
        const email = profile?.socialLinks?.email || 'your-email@example.com'
        window.open(`mailto:${email}?subject=${subject}&body=${body}`)
    }

    const socialLinks = [
        {
            name: 'GitHub',
            url: profile?.socialLinks?.github || 'https://github.com/yourusername',
            icon: Github,
            color: 'hover:text-yellow-300 dark:hover:text-yellow-300'
        },
        {
            name: 'LinkedIn',
            url: profile?.socialLinks?.linkedin || 'https://linkedin.com/in/yourusername',
            icon: Linkedin,
            color: 'hover:text-blue-600 dark:hover:text-blue-400'
        },
        {
            name: 'Twitter',
            url: profile?.socialLinks?.twitter || 'https://twitter.com/yourusername',
            icon: Twitter,
            color: 'hover:text-blue-400 dark:hover:text-blue-300'
        },
        {
            name: 'Website',
            url: profile?.socialLinks?.website || 'https://yourwebsite.com',
            icon: Globe,
            color: 'hover:text-green-600 dark:hover:text-green-400'
        }
    ]

    return (
        <div className={cn(
            'relative flex w-full rounded-xl border dark:border-dark-5 border-dark-3 transform-gpu bg-dark-1 [box-shadow:0_0px_60px_-20px_#ffffff1f_inset] cursor-grab dark:bg-white h-full',
            className
        )}>
            <div className="flex flex-col md:flex-row overflow-hidden size-full relative z-10 p-4 items-start justify-between gap-4 max-sm:gap-2">
                {/* Header */}
                <div className="w-full md:w-auto">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 rounded-md bg-primary/10 dark:bg-primary/20">
                            <MessageSquare className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">Connect</h2>
                            <p className="text-xs text-muted-foreground">Let&apos;s work together</p>
                        </div>
                    </div>
                    <div className="w-full space-y-3">
                        <div className="grid grid-cols-2 gap-2 md:gap-3">
                            <Button
                                onClick={handleHireMe}
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-8 md:h-9"
                            >
                                <Briefcase className="w-3 h-3 mr-1.5 md:mr-2" />
                                <span className="text-[11px] md:text-xs">Hire Me</span>
                            </Button>

                            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full h-8 md:h-9"
                                    >
                                        <Mail className="w-3 h-3 mr-1.5 md:mr-2" />
                                        <span className="text-[11px] md:text-xs">Contact</span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>Get in Touch</DialogTitle>
                                    </DialogHeader>
                                    <ContactForm />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="lg:self-end w-full md:w-auto">
                    <div className="mb-2">
                        <p className="text-xs font-medium text-muted-foreground mb-1.5 md:mb-2">Follow & Connect</p>
                    </div>
                    <div className="grid grid-cols-4 md:flex md:flex-wrap gap-1.5 md:gap-2">
                        {socialLinks.map((link) => {
                            const Icon = link.icon
                            return (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(
                                        "flex items-center justify-center md:justify-start w-full md:w-fit gap-1.5 md:gap-2 p-1.5 md:p-2 rounded-md border border-border/50 bg-background/30 hover:bg-background/50 transition-colors",
                                        link.color
                                    )}
                                >
                                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                                    <ExternalLink className="w-2 h-2 opacity-50 hidden md:block" />
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactLinks
