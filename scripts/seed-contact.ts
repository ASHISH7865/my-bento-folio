import { getPayload } from 'payload'
import config from '@payload-config'

async function seedContactPage() {
  const payload = await getPayload({ config })

  try {
    console.log('🌱 Seeding ContactPage collection...')

    // Check if ContactPage data already exists
    const existingContact = await payload.find({
      collection: 'contact-page',
      limit: 1,
    })

    if (existingContact.docs.length > 0) {
      console.log('📝 ContactPage data already exists, skipping...')
      return
    }

    // Create ContactPage content
    const contactData = {
      title: 'Let\'s Build Something Amazing Together',
      subtitle: 'Ready to bring your ideas to life? Let\'s connect!',
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: "I'm always excited to work on new projects and collaborate with passionate people. Whether you're looking to build a cutting-edge web application, need expertise in microservices architecture, or want to create a powerful low-code platform, I'd love to hear from you."
                }
              ]
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: "With 3+ years of experience in full-stack development and a proven track record of reducing workflows by 40%, I specialize in creating scalable solutions that make a real impact. Let's turn your vision into reality!"
                }
              ]
            }
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1
        }
      },
      contactInfo: {
        showEmail: true,
        email: 'jaiswalashish9467@gmail.com',
        showPhone: true,
        phone: '+91-9650218385',
        showLocation: true,
        location: {
          city: 'Noida',
          country: 'India',
          timezone: 'IST (UTC+5:30)'
        }
      },
      socialLinks: {
        showSocialLinks: true,
        links: [
          {
            platform: 'github' as const,
            url: 'https://github.com/ashish7865',
            username: 'ashish7865'
          },
          {
            platform: 'linkedin' as const,
            url: 'https://linkedin.com/in/ashish7865/',
            username: 'ashish7865'
          },
          {
            platform: 'website' as const,
            url: 'https://ashishjaiswal.dev',
            customLabel: 'Portfolio'
          }
        ]
      },
      availability: {
        status: 'available' as const,
        message: 'Currently available for new projects and collaborations',
        responseTime: '24-48 hours',
        workingHours: 'Monday - Friday, 9 AM - 6 PM IST'
      },
      contactForm: {
        enabled: true,
        title: 'Send me a message',
        description: 'Have a project in mind? Let\'s discuss it! Fill out the form below and I\'ll get back to you within 24 hours.',
        successMessage: 'Thank you for reaching out! I\'ll review your message and get back to you within 24-48 hours.',
        requiredFields: [
          { field: 'name' },
          { field: 'email' },
          { field: 'message' }
        ]
      },
      additionalSections: [
        {
          title: 'What I can help with',
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'list',
                  listType: 'bullet',
                  children: [
                    {
                      type: 'listitem',
                      children: [
                        {
                          type: 'text',
                          text: 'Microservices architecture and development'
                        }
                      ]
                    },
                    {
                      type: 'listitem',
                      children: [
                        {
                          type: 'text',
                          text: 'Low-code/No-code platform development'
                        }
                      ]
                    },
                    {
                      type: 'listitem',
                      children: [
                        {
                          type: 'text',
                          text: 'Business Process Management (BPM) systems'
                        }
                      ]
                    },
                    {
                      type: 'listitem',
                      children: [
                        {
                          type: 'text',
                          text: 'React.js and Next.js application development'
                        }
                      ]
                    },
                    {
                      type: 'listitem',
                      children: [
                        {
                          type: 'text',
                          text: 'Node.js backend development with Prisma ORM'
                        }
                      ]
                    },
                    {
                      type: 'listitem',
                      children: [
                        {
                          type: 'text',
                          text: 'Drag-and-drop form builders and automation'
                        }
                      ]
                    },
                    {
                      type: 'listitem',
                      children: [
                        {
                          type: 'text',
                          text: 'Event-driven communication with RabbitMQ'
                        }
                      ]
                    },
                    {
                      type: 'listitem',
                      children: [
                        {
                          type: 'text',
                          text: 'Enterprise application development'
                        }
                      ]
                    }
                  ]
                }
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1
            }
          },
          icon: 'chat'
        },
        {
          title: 'Let\'s Collaborate',
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'I\'m passionate about working on challenging projects that make a real impact. Whether you\'re a startup looking to build scalable applications, an enterprise needing workflow automation, or a team requiring microservices expertise, I\'d love to collaborate.'
                    }
                  ]
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'My approach focuses on understanding your business needs, delivering high-quality solutions, and ensuring long-term success. I believe in clear communication, agile development, and creating systems that grow with your business.'
                    }
                  ]
                }
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1
            }
          },
          icon: 'calendar'
        },
        {
          title: 'Quick Facts',
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'list',
                  listType: 'bullet',
                  children: [
                    {
                      type: 'listitem',
                      children: [
                        {
                          type: 'text',
                          text: '⚡ Usually respond within 24-48 hours'
                        }
                      ]
                    },
                    {
                      type: 'listitem',
                      children: [
                        {
                          type: 'text',
                          text: '🏆 Passionate Performer Award winner at Axeno Consulting'
                        }
                      ]
                    },
                    {
                      type: 'listitem',
                      children: [
                        {
                          type: 'text',
                          text: '📈 Proven track record of 40% workflow reduction'
                        }
                      ]
                    },
                    {
                      type: 'listitem',
                      children: [
                        {
                          type: 'text',
                          text: '🚀 Expertise in modern tech stack (React, Node.js, TypeScript)'
                        }
                      ]
                    },
                    {
                      type: 'listitem',
                      children: [
                        {
                          type: 'text',
                          text: '☕ Fueled by tea and passion for innovation'
                        }
                      ]
                    }
                  ]
                }
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1
            }
          },
          icon: 'time'
        }
      ],
      status: 'published' as const,
      seo: {
        metaTitle: 'Contact Ashish Jaiswal - Full Stack Developer',
        metaDescription: 'Get in touch with Ashish Jaiswal for your next web development project. Specializing in microservices, low-code platforms, and enterprise applications.',
        keywords: 'contact, Ashish Jaiswal, full stack developer, hire developer, web development, microservices, low-code platform, React developer, Node.js developer'
      }
    }

    // Create the contact page entry
    const createdContact = await payload.create({
      collection: 'contact-page',
      data: contactData as any,
    })

    console.log('✅ ContactPage content created successfully!')
    console.log(`📄 Contact ID: ${createdContact.id}`)
    console.log(`📝 Title: ${createdContact.title}`)
    console.log(`📧 Email: ${createdContact.contactInfo?.email}`)
    console.log(`📍 Location: ${createdContact.contactInfo?.location?.city}, ${createdContact.contactInfo?.location?.country}`)

  } catch (error) {
    console.error('❌ Error seeding ContactPage collection:', error)
    throw error
  }
}

export default seedContactPage

// Run if called directly
  seedContactPage()
    .then(() => {
      console.log('🎉 ContactPage seeding completed!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('💥 ContactPage seeding failed:', error)
      process.exit(1)
    })
