import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, MapPin, Calendar, Code, Heart } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export default function AboutPage() {
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
              <Code className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">About Me</h1>
              <p className="text-muted-foreground text-lg">
                Passionate developer building digital experiences
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">My Story</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                                 <p className="text-muted-foreground leading-relaxed mb-4">
                   I&apos;m a passionate full-stack developer with a love for creating beautiful,
                   functional web applications. My journey in tech started with curiosity and
                   has evolved into a career focused on building solutions that make a difference.
                 </p>
                 <p className="text-muted-foreground leading-relaxed mb-4">
                   When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing
                   to open source projects, or sharing knowledge through writing and mentoring.
                   I believe in the power of clean code, thoughtful design, and collaborative development.
                 </p>
                 <p className="text-muted-foreground leading-relaxed">
                   I&apos;m always excited to work on challenging projects that push the boundaries
                   of what&apos;s possible on the web.
                 </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">What I Do</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Frontend Development',
                  'Backend Development',
                  'UI/UX Design',
                  'Database Design',
                  'API Development',
                  'DevOps & Deployment'
                ].map((skill) => (
                  <div
                    key={skill}
                    className="p-4 rounded-lg bg-muted/50 border border-border/50 hover:bg-muted/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-medium">{skill}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-muted/30 border border-border/50">
              <h3 className="font-semibold mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>Noida, India</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Available for projects</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>Coffee enthusiast</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-muted/30 border border-border/50">
              <h3 className="font-semibold mb-4">Currently</h3>
              <div className="space-y-3">
                <Badge variant="secondary" className="w-full justify-start">
                  🚀 Building amazing projects
                </Badge>
                <Badge variant="secondary" className="w-full justify-start">
                  📚 Learning new technologies
                </Badge>
                <Badge variant="secondary" className="w-full justify-start">
                  ✍️ Writing technical blogs
                </Badge>
              </div>
            </div>

            <Button className="w-full" size="lg">
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
