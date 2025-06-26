import { getPayload } from 'payload'
import config from '@payload-config'
import dotenv from 'dotenv';

dotenv.config();

async function seedAbout() {
  const payload = await getPayload({ config })

  try {
    console.log('🌱 Starting about seed...')

    // Check if about data already exists
    const existingAbout = await payload.find({
      collection: 'about',
      limit: 1,
    })

    if (existingAbout.docs.length > 0) {
      console.log('✅ About data already exists, skipping seed')
      return
    }

    const aboutData = {
      title: 'About Ashish Jaiswal',
      subtitle: 'Full Stack Developer & Software Engineer',
      heroImage: null, // You can upload an image later
      introduction: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Full Stack Developer with 3+ years of expertise in building enterprise-grade applications. Proven track record in microservices architecture, low-code/no-code platforms. Recently architected a microservices-based Lead Management System with RabbitMQ event-driven communication and developed a comprehensive case management system that reduced manual workflows by 40%.',
                  version: 1
                }
              ],
              direction: null,
              format: '',
              indent: 0,
              version: 1
            }
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1
        }
      } as any,
      sections: [
        {
          sectionTitle: 'Professional Journey',
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      text: 'I specialize in building scalable, enterprise-grade applications with a focus on microservices architecture and low-code/no-code platforms. My expertise spans full-stack development, from crafting intuitive user interfaces to designing robust backend systems.',
                      version: 1
                    }
                  ],
                  direction: null,
                  format: '',
                  indent: 0,
                  version: 1
                }
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1
            }
          } as any,
          layout: 'standard' as const
        },
        {
          sectionTitle: 'What I Do',
          content: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'list',
                  children: [
                    {
                      type: 'listitem',
                      children: [
                        {
                          type: 'text',
                          text: 'Design and develop microservices-based applications with event-driven communication',
                          version: 1
                        }
                      ],
                      direction: null,
                      format: '',
                      indent: 0,
                      version: 1
                    },
                    {
                      type: 'listitem',
                      children: [
                        {
                          type: 'text',
                          text: 'Build powerful low-code/no-code platforms for rapid application development',
                          version: 1
                        }
                      ],
                      direction: null,
                      format: '',
                      indent: 0,
                      version: 1
                    },
                    {
                      type: 'listitem',
                      children: [
                        {
                          type: 'text',
                          text: 'Create drag-and-drop form builders and workflow automation systems',
                          version: 1
                        }
                      ],
                      direction: null,
                      format: '',
                      indent: 0,
                      version: 1
                    },
                    {
                      type: 'listitem',
                      children: [
                        {
                          type: 'text',
                          text: 'Architect scalable Business Process Management (BPM) systems',
                          version: 1
                        }
                      ],
                      direction: null,
                      format: '',
                      indent: 0,
                      version: 1
                    }
                  ],
                  direction: null,
                  format: '',
                  indent: 0,
                  listType: 'bullet',
                  start: 1,
                  tag: 'ul',
                  version: 1
                }
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1
            }
          } as any,
          layout: 'standard' as const
        }
      ],
      skills: {
        title: 'Technical Expertise',
        categories: [
          {
            categoryName: 'Frontend Development',
            skills: [
              { name: 'React.js', proficiency: 'expert' as const },
              { name: 'JavaScript ES6+', proficiency: 'expert' as const },
              { name: 'TypeScript', proficiency: 'advanced' as const },
              { name: 'Next.js', proficiency: 'advanced' as const },
              { name: 'HTML5/CSS3', proficiency: 'expert' as const },
              { name: 'Redux Toolkit', proficiency: 'advanced' as const },
              { name: 'Tailwind CSS', proficiency: 'advanced' as const },
              { name: 'React Hook Form', proficiency: 'advanced' as const }
            ]
          },
          {
            categoryName: 'Backend Development',
            skills: [
              { name: 'Node.js', proficiency: 'expert' as const },
              { name: 'Express.js', proficiency: 'advanced' as const },
              { name: 'NestJS', proficiency: 'intermediate' as const },
              { name: 'Prisma ORM', proficiency: 'advanced' as const },
              { name: 'PostgreSQL', proficiency: 'advanced' as const },
              { name: 'MongoDB', proficiency: 'intermediate' as const },
              { name: 'Redis', proficiency: 'intermediate' as const },
              { name: 'RabbitMQ', proficiency: 'intermediate' as const }
            ]
          },
          {
            categoryName: 'Tools & DevOps',
            skills: [
              { name: 'Docker', proficiency: 'intermediate' as const },
              { name: 'Git', proficiency: 'advanced' as const },
              { name: 'Webpack', proficiency: 'intermediate' as const },
              { name: 'Vite', proficiency: 'intermediate' as const },
              { name: 'Jest', proficiency: 'intermediate' as const },
              { name: 'REST APIs', proficiency: 'expert' as const },
              { name: 'GraphQL', proficiency: 'intermediate' as const }
            ]
          },
          {
            categoryName: 'Architecture & Design',
            skills: [
              { name: 'Microservices', proficiency: 'advanced' as const },
              { name: 'Event-Driven Architecture', proficiency: 'advanced' as const },
              { name: 'Low-Code Platforms', proficiency: 'expert' as const },
              { name: 'System Design', proficiency: 'advanced' as const },
              { name: 'BPM Systems', proficiency: 'advanced' as const },
              { name: 'Responsive Design', proficiency: 'expert' as const }
            ]
          }
        ]
      },
      experience: {
        title: 'Professional Experience',
        timeline: [
          {
            position: 'Software Engineer 2',
            company: 'Axeno Consulting Private Limited',
            startDate: '2022-04-01',
            endDate: null,
            current: true,
            description: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'list',
                    children: [
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Designed and developed a microservices-based Lead Management System, architecting core services including Authentication, Lead, and Customer Services, and implementing RabbitMQ for event-driven communication',
                            version: 1
                          }
                        ],
                        direction: null,
                        format: '',
                        indent: 0,
                        version: 1
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Engineered and led the end-to-end development of a scalable Business Process Management (BPM) system, enabling custom application views, configurable process workflows, and drag-and-drop automation',
                            version: 1
                          }
                        ],
                        direction: null,
                        format: '',
                        indent: 0,
                        version: 1
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Engineered a powerful low-code/no-code platform that enables developers and business users to build full-fledged, multi-step forms and complex workflows without writing code',
                            version: 1
                          }
                        ],
                        direction: null,
                        format: '',
                        indent: 0,
                        version: 1
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Built a drag-and-drop Form Builder using React 18, TypeScript, Redux Toolkit, and React Hook Form with Yup validation',
                            version: 1
                          }
                        ],
                        direction: null,
                        format: '',
                        indent: 0,
                        version: 1
                      }
                    ],
                    direction: null,
                    format: '',
                    indent: 0,
                    listType: 'bullet',
                    start: 1,
                    tag: 'ul',
                    version: 1
                  }
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1
              }
            } as any,
            technologies: [
              { tech: 'Node.js' },
              { tech: 'React.js' },
              { tech: 'TypeScript' },
              { tech: 'Prisma ORM' },
              { tech: 'PostgreSQL' },
              { tech: 'Redis' },
              { tech: 'RabbitMQ' },
              { tech: 'Redux Toolkit' },
              { tech: 'Docker' }
            ]
          },
          {
            position: 'Software Engineer Intern',
            company: 'Work India',
            startDate: '2021-04-01',
            endDate: '2021-12-31',
            current: false,
            description: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'list',
                    children: [
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Enhanced user engagement and product usability by developing key front-end features in a production-grade application',
                            version: 1
                          }
                        ],
                        direction: null,
                        format: '',
                        indent: 0,
                        version: 1
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Built a real-time Notification System to alert users of unread inbox messages, improving user interaction and responsiveness',
                            version: 1
                          }
                        ],
                        direction: null,
                        format: '',
                        indent: 0,
                        version: 1
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Implemented an Upsell Plan Recommendation module that suggests subscription upgrades based on user behavior',
                            version: 1
                          }
                        ],
                        direction: null,
                        format: '',
                        indent: 0,
                        version: 1
                      },
                      {
                        type: 'listitem',
                        children: [
                          {
                            type: 'text',
                            text: 'Redesigned and developed a Remastered Job Card UI to improve job listing visibility and click-through rates',
                            version: 1
                          }
                        ],
                        direction: null,
                        format: '',
                        indent: 0,
                        version: 1
                      }
                    ],
                    direction: null,
                    format: '',
                    indent: 0,
                    listType: 'bullet',
                    start: 1,
                    tag: 'ul',
                    version: 1
                  }
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1
              }
            } as any,
            technologies: [
              { tech: 'React.js' },
              { tech: 'JavaScript' },
              { tech: 'HTML5' },
              { tech: 'CSS3' },
              { tech: 'REST APIs' }
            ]
          }
        ]
      },
      achievements: [
        {
          title: 'Passionate Performer Award',
          description: 'Recognized for outstanding performance and dedication at Axeno Consulting Private Limited',
          date: '2023-12-01',
          organization: 'Axeno Consulting Private Limited'
        },
        {
          title: 'Process Automation Success',
          description: 'Reduced manual workflows by 40% through development of comprehensive case management system',
          date: '2023-08-01',
          organization: 'Axeno Consulting Private Limited'
        },
        {
          title: 'Low-Code Platform Development',
          description: 'Reduced form development time by 80% with innovative drag-and-drop form builder platform',
          date: '2024-01-01',
          organization: 'Axeno Consulting Private Limited'
        },
        {
          title: 'Bachelor of Technology - Computer Science',
          description: 'Completed B.Tech in Computer Science and Engineering from Lovely Professional University',
          date: '2022-06-30',
          organization: 'Lovely Professional University'
        }
      ],
      status: 'published' as const,
      seo: {
        metaTitle: 'About Ashish Jaiswal - Full Stack Developer & Software Engineer',
        metaDescription: 'Learn about Ashish Jaiswal, a Full Stack Developer with 3+ years of expertise in enterprise applications, microservices architecture, and low-code platforms.',
        keywords: 'Ashish Jaiswal, Full Stack Developer, Software Engineer, React.js, Node.js, TypeScript, Microservices, Low-code Platform, BPM, Enterprise Applications'
      }
    }

    // Create the about entry
    const createdAbout = await payload.create({
      collection: 'about',
      data: aboutData as any,
    })

    console.log('✅ About data seeded successfully!')
    console.log(`   About ID: ${createdAbout.id}`)
    console.log(`   Title: ${createdAbout.title}`)
    console.log(`   Subtitle: ${createdAbout.subtitle}`)
    console.log(`   Status: ${createdAbout.status}`)

  } catch (error) {
    console.error('❌ Error seeding about data:', error)
    throw error
  }
}

export default seedAbout

// Run if called directly
seedAbout()
  .then(() => {
    console.log('🎉 About seeding completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 About seeding failed:', error)
    process.exit(1)
  })
