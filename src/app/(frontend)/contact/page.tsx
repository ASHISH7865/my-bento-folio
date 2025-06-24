import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Mail, MessageSquare, Send } from 'lucide-react'
import Link from 'next/link'
import ContactForm from '@/components/Contact/ContactForm'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/5 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-6 group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Button>
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Get in Touch</h1>
              <p className="text-muted-foreground text-lg">
                Let&apos;s discuss your next project
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Send me a message</h2>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Let&apos;s connect</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I&apos;m always interested in hearing about new opportunities,
                interesting projects, or just having a chat about technology.
                Feel free to reach out!
              </p>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-muted/30 border border-border/50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-sm text-muted-foreground">Best way to reach me</p>
                  </div>
                </div>
                <p className="text-sm">hello@yourname.com</p>
              </div>

              <div className="p-6 rounded-xl bg-muted/30 border border-border/50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Send className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Response Time</h3>
                    <p className="text-sm text-muted-foreground">How quickly I&apos;ll get back</p>
                  </div>
                </div>
                <p className="text-sm">Usually within 24 hours</p>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="font-semibold mb-4">What I can help with:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Web application development</li>
                <li>• Full-stack projects</li>
                <li>• Technical consulting</li>
                <li>• Code reviews</li>
                <li>• Mentoring and guidance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
