import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, MapPin, Mail, Phone, Globe } from 'lucide-react'
import Link from 'next/link'

export default function ResumePage() {
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

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Resume</h1>
              <p className="text-muted-foreground text-lg">
                My professional experience and skills
              </p>
            </div>
            <Button size="lg">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Resume Content */}
        <div className="bg-card rounded-xl border border-border/50 p-8 shadow-sm">
          {/* Header */}
          <div className="text-center mb-8 pb-8 border-b border-border/50">
            <h2 className="text-3xl font-bold mb-2">Your Name</h2>
            <p className="text-xl text-muted-foreground mb-4">Full Stack Developer</p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>hello@yourname.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Noida, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>yourwebsite.com</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Professional Summary</h3>
            <p className="text-muted-foreground leading-relaxed">
              Passionate full-stack developer with 3+ years of experience building scalable web applications.
              Expertise in React, Node.js, and modern web technologies. Strong problem-solving skills and
              a commitment to writing clean, maintainable code.
            </p>
          </section>

          {/* Experience */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-6">Work Experience</h3>
            <div className="space-y-6">
              <div className="border-l-2 border-primary/20 pl-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-medium">Senior Full Stack Developer</h4>
                  <span className="text-sm text-muted-foreground">2022 - Present</span>
                </div>
                <p className="text-muted-foreground mb-2">Tech Company Inc.</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Built and maintained multiple React applications serving 10K+ users</li>
                  <li>• Developed RESTful APIs using Node.js and Express</li>
                  <li>• Collaborated with design team to implement pixel-perfect UIs</li>
                </ul>
              </div>

              <div className="border-l-2 border-primary/20 pl-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-medium">Frontend Developer</h4>
                  <span className="text-sm text-muted-foreground">2021 - 2022</span>
                </div>
                <p className="text-muted-foreground mb-2">Startup Solutions</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Developed responsive web applications using React and TypeScript</li>
                  <li>• Implemented modern UI/UX designs with Tailwind CSS</li>
                  <li>• Optimized application performance and loading times</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-6">Technical Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-3">Frontend</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>React / Next.js</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>Framer Motion</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Backend</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Node.js / Express</li>
                  <li>PostgreSQL</li>
                  <li>MongoDB</li>
                  <li>REST APIs</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Tools</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Git / GitHub</li>
                  <li>Docker</li>
                  <li>AWS / Vercel</li>
                  <li>Figma</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className="text-xl font-semibold mb-6">Education</h3>
            <div className="border-l-2 border-primary/20 pl-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-medium">Bachelor of Technology</h4>
                <span className="text-sm text-muted-foreground">2018 - 2022</span>
              </div>
              <p className="text-muted-foreground">Computer Science Engineering</p>
              <p className="text-sm text-muted-foreground">University Name</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
