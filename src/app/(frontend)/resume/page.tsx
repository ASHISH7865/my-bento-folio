import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import PrintButton from '@/components/ui/print-button'
import {
  ArrowLeft,
  Download,
  MapPin,
  Mail,
  Phone,
  Globe,
  Calendar,
  ExternalLink,
  Github,
  Linkedin,
  Building2,
  GraduationCap,
  Award,
  Code,
  Briefcase,
  Star,
  FileText,
  Clock,
  CheckCircle2
} from 'lucide-react'
import Link from 'next/link'
import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'
import { Resume } from '@/payload-types'
import { format } from 'date-fns'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: payloadConfig })

  const resumeData = await payload.find({
    collection: 'resume',
    where: { status: { equals: 'published' } },
    limit: 1,
  })

  const resume = resumeData.docs[0] as Resume

  if (!resume) {
    return {
      title: 'Resume',
      description: 'Professional resume and experience',
    }
  }

  return {
    title: resume.seo?.metaTitle || `${resume.personalInfo?.fullName} - Resume`,
    description: resume.seo?.metaDescription || resume.personalInfo?.summary?.substring(0, 160),
    keywords: resume.seo?.keywords,
    openGraph: {
      title: resume.seo?.metaTitle || `${resume.personalInfo?.fullName} - Resume`,
      description: resume.seo?.metaDescription || resume.personalInfo?.summary?.substring(0, 160),
      type: 'profile',
    },
  }
}

export default async function ResumePage() {
  const payload = await getPayload({ config: payloadConfig })

  // Fetch resume data
  const resumeData = await payload.find({
    collection: 'resume',
    where: {
      status: {
        equals: 'published'
      }
    },
    limit: 1,
  })

  const resume = resumeData.docs[0] as Resume

  if (!resume) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/5 py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Resume Not Found</h1>
            <p className="text-muted-foreground mb-6">
              No published resume data available.
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

  const formatFullDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM dd, yyyy')
  }

  const getProficiencyLevel = (proficiency: string): number => {
    switch (proficiency) {
      case 'expert': return 95
      case 'advanced': return 80
      case 'intermediate': return 60
      case 'beginner': return 30
      default: return 50
    }
  }

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'expert': return 'text-green-600 dark:text-green-400'
      case 'advanced': return 'text-blue-600 dark:text-blue-400'
      case 'intermediate': return 'text-yellow-600 dark:text-yellow-400'
      case 'beginner': return 'text-gray-600 dark:text-gray-400'
      default: return 'text-gray-500'
    }
  }

  const layoutClass = resume.displaySettings?.layout === 'classic'
    ? 'bg-white text-black print:bg-white'
    : resume.displaySettings?.layout === 'minimal'
    ? 'bg-gray-50 dark:bg-gray-900'
    : 'bg-card'

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/5 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header Actions */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-6 group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Button>
          </Link>

          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{resume.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Version {resume.version}
                </span>
                {resume.displaySettings?.showLastUpdated && resume.lastUpdated && (
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Updated {formatDate(resume.lastUpdated)}
                  </span>
                )}
              </div>
            </div>

            {/* Download Section */}
            {resume.displaySettings?.showDownloadButtons && (
              <div className="flex gap-2 flex-wrap">
                {resume.downloadableFiles?.pdfResume && (
                  <Button size="lg" asChild>
                    <a
                      href={resume.downloadableFiles.pdfResume}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </a>
                  </Button>
                )}
                {resume.downloadableFiles?.docResume && (
                  <Button size="lg" variant="outline" asChild>
                    <a
                      href={resume.downloadableFiles.docResume}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download DOC
                    </a>
                  </Button>
                )}
                {resume.downloadableFiles?.customFormats && resume.downloadableFiles.customFormats.map((format, index) => (
                  <Button key={index} size="lg" variant="outline" asChild>
                    <a
                      href={typeof format.file === 'object' && format.file ? format.file.url || '' : ''}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {format.label}
                    </a>
                  </Button>
                ))}
                {resume.displaySettings?.enablePrint && (
                  <PrintButton size="lg" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Print
                  </PrintButton>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Main Resume Content */}
        <div className={`${layoutClass} rounded-xl border border-border/50 shadow-lg print:shadow-none print:border-0`}>
          {/* Personal Header */}
          <div className="p-8 pb-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {resume.personalInfo?.fullName}
              </h2>
              <p className="text-2xl text-muted-foreground mb-6 font-medium">
                {resume.personalInfo?.title}
              </p>

              {/* Contact Information */}
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground flex-wrap mb-6">
                {resume.personalInfo?.contact?.email && (
                  <div className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${resume.personalInfo.contact.email}`}>
                      {resume.personalInfo.contact.email}
                    </a>
                  </div>
                )}
                {resume.personalInfo?.contact?.phone && (
                  <div className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${resume.personalInfo.contact.phone}`}>
                      {resume.personalInfo.contact.phone}
                    </a>
                  </div>
                )}
                {resume.personalInfo?.contact?.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{resume.personalInfo.contact.location}</span>
                  </div>
                )}
                {resume.personalInfo?.contact?.website && (
                  <div className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Globe className="w-4 h-4" />
                    <a href={resume.personalInfo.contact.website} target="_blank" rel="noopener noreferrer">
                      {resume.personalInfo.contact.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-4">
                {resume.personalInfo?.contact?.linkedin && (
                  <a
                    href={resume.personalInfo.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-muted"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {resume.personalInfo?.contact?.github && (
                  <a
                    href={resume.personalInfo.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-muted"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

            {/* Professional Summary */}
            {resume.personalInfo?.summary && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" />
                    Professional Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {resume.personalInfo.summary}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="px-8 pb-8 space-y-8">
            {/* Work Experience */}
            {resume.experience && resume.experience.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    Professional Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {resume.experience.map((exp, index) => (
                    <div key={index} className="relative pl-8 border-l-2 border-primary/20 last:border-l-0">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>

                      <div className="space-y-3">
                        <div className="flex items-start justify-between flex-wrap gap-2">
                          <div>
                            <h4 className="text-xl font-semibold text-primary">{exp.position}</h4>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Building2 className="w-4 h-4" />
                              <span className="font-medium">{exp.company}</span>
                              {exp.location && (
                                <>
                                  <span>•</span>
                                  <span>{exp.location}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {formatDate(exp.startDate)} - {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : 'Present'}
                            </span>
                          </div>
                        </div>

                        {exp.description && exp.description.length > 0 && (
                          <div className="space-y-2">
                            {exp.description.map((desc, descIndex) => (
                              <div key={descIndex} className="flex items-start gap-3">
                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground leading-relaxed">
                                  {desc.responsibility}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className="space-y-2">
                            <h5 className="text-sm font-medium text-muted-foreground">Technologies Used:</h5>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech, techIndex) => (
                                <Badge key={techIndex} variant="secondary" className="text-xs">
                                  {tech.tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Technical Skills */}
            {resume.skills?.technical && resume.skills.technical.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-primary" />
                    Technical Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {resume.skills.technical.map((category, index) => (
                      <div key={index} className="space-y-4">
                        <h4 className="font-semibold text-lg border-b border-border pb-2">
                          {category.category}
                        </h4>
                        <div className="space-y-3">
                          {category.skills?.map((skill, skillIndex) => (
                            <div key={skillIndex} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{skill.skill}</span>
                                {/* {skill.proficiency && (
                                  <span className={`text-xs font-medium uppercase tracking-wider ${getProficiencyColor(skill.proficiency)}`}>
                                    {skill.proficiency}
                                  </span>
                                )} */}
                              </div>
                              {/* {skill.proficiency && (
                                <Progress
                                  value={getProficiencyLevel(skill.proficiency)}
                                  className="h-2"
                                />
                              )} */}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Soft Skills & Languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Soft Skills */}
              {resume.skills?.soft && resume.skills.soft.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-primary" />
                      Soft Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {resume.skills.soft.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          {skill.skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Languages */}
              {resume.skills?.languages && resume.skills.languages.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-primary" />
                      Languages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {resume.skills.languages.map((lang, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="font-medium">{lang.language}</span>
                          <span className="text-sm text-muted-foreground capitalize">
                            {lang.proficiency}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Notable Projects */}
            {resume.projects && resume.projects.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-primary" />
                    Notable Projects
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resume.projects.map((project, index) => (
                    <div key={index} className="border border-border/50 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="space-y-2">
                          <h4 className="text-xl font-semibold">{project.name}</h4>
                          {project.completionDate && (
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Completed {formatDate(project.completionDate)}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {project.liveUrl && (
                            <Button size="sm" variant="outline" asChild>
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                          )}
                          {project.githubUrl && (
                            <Button size="sm" variant="outline" asChild>
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className="text-xs">
                              {tech.tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Education */}
            {resume.education && resume.education.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resume.education.map((edu, index) => (
                    <div key={index} className="relative pl-8 border-l-2 border-primary/20 last:border-l-0">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>

                      <div className="space-y-3">
                        <div className="flex items-start justify-between flex-wrap gap-2">
                          <div>
                            <h4 className="text-lg font-semibold">{edu.degree}</h4>
                            <p className="text-primary font-medium">{edu.institution}</p>
                            {edu.location && (
                              <p className="text-sm text-muted-foreground">{edu.location}</p>
                            )}
                          </div>
                          {(edu.startDate || edu.endDate) && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {edu.startDate && formatDate(edu.startDate)} - {edu.endDate && formatDate(edu.endDate)}
                              </span>
                            </div>
                          )}
                        </div>

                        {edu.gpa && (
                          <p className="text-sm text-muted-foreground">
                            <strong>GPA:</strong> {edu.gpa}
                          </p>
                        )}

                        {edu.honors && edu.honors.length > 0 && (
                          <div>
                            <h5 className="text-sm font-medium mb-2">Honors & Awards:</h5>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {edu.honors.map((honor, honorIndex) => (
                                <li key={honorIndex} className="flex items-center gap-2">
                                  <Award className="w-3 h-3 text-yellow-500" />
                                  {honor.honor}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {edu.relevantCoursework && edu.relevantCoursework.length > 0 && (
                          <div>
                            <h5 className="text-sm font-medium mb-2">Relevant Coursework:</h5>
                            <div className="flex flex-wrap gap-2">
                              {edu.relevantCoursework.map((course, courseIndex) => (
                                <Badge key={courseIndex} variant="secondary" className="text-xs">
                                  {course.course}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Certifications & Awards */}
            {resume.certifications && resume.certifications.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Certifications & Awards
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resume.certifications.map((cert, index) => (
                    <div key={index} className="border border-border/50 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-semibold">{cert.name}</h4>
                          <p className="text-primary font-medium">{cert.issuer}</p>
                        </div>
                        {cert.issueDate && (
                          <div className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                            {formatFullDate(cert.issueDate)}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2 text-sm text-muted-foreground">
                        {cert.credentialId && (
                          <p><strong>Credential ID:</strong> {cert.credentialId}</p>
                        )}
                        {cert.expiryDate && (
                          <p><strong>Expires:</strong> {formatFullDate(cert.expiryDate)}</p>
                        )}
                        {cert.verificationUrl && (
                          <a
                            href={cert.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Verify Certificate
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            This resume was generated on {formatFullDate(new Date().toISOString())}
            {resume.displaySettings?.showLastUpdated && resume.lastUpdated && (
              <span> • Last updated {formatFullDate(resume.lastUpdated)}</span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
