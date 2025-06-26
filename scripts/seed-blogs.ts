import { getPayload } from 'payload'
import config from '@payload-config'
import dotenv from 'dotenv';

dotenv.config();

const sampleBlogs = [
  {
    title: "Building a Modern Portfolio with Next.js and Payload CMS",
    excerpt: "Learn how to create a stunning portfolio website using Next.js 14, Payload CMS, and modern design patterns. This comprehensive guide covers everything from setup to deployment.",
    category: "tutorial",
    status: "published",
    publishedAt: "2024-01-15",
    readingTime: 8,
    tags: [
      { tag: "nextjs" },
      { tag: "payload" },
      { tag: "portfolio" },
      { tag: "web-development" }
    ],
    seo: {
      metaTitle: "Modern Portfolio with Next.js and Payload CMS - Complete Guide",
      metaDescription: "Build a stunning portfolio website using Next.js 14 and Payload CMS. Learn modern design patterns, deployment strategies, and best practices.",
      keywords: "nextjs, payload cms, portfolio, web development, react, typescript"
    }
  },
  {
    title: "The Future of Web Development: AI-Powered Tools and Workflows",
    excerpt: "Exploring how artificial intelligence is transforming the web development landscape, from code generation to automated testing and deployment strategies.",
    category: "technology",
    status: "published",
    publishedAt: "2024-01-10",
    readingTime: 6,
    tags: [
      { tag: "ai" },
      { tag: "web-development" },
      { tag: "future-tech" },
      { tag: "automation" }
    ],
    seo: {
      metaTitle: "AI-Powered Web Development: The Future of Coding",
      metaDescription: "Discover how AI is revolutionizing web development with automated tools, code generation, and intelligent workflows.",
      keywords: "ai, web development, automation, coding, future technology"
    }
  },
  {
    title: "Designing for Dark Mode: Best Practices and Implementation",
    excerpt: "A deep dive into dark mode design principles, implementation strategies, and user experience considerations for modern web applications.",
    category: "design",
    status: "published",
    publishedAt: "2024-01-08",
    readingTime: 7,
    tags: [
      { tag: "dark-mode" },
      { tag: "ui-design" },
      { tag: "ux" },
      { tag: "css" }
    ],
    seo: {
      metaTitle: "Dark Mode Design: Complete Guide to Implementation",
      metaDescription: "Master dark mode design with best practices, implementation strategies, and user experience considerations.",
      keywords: "dark mode, ui design, ux, css, web design"
    }
  },
  {
    title: "TypeScript vs JavaScript: When to Use Each in Modern Development",
    excerpt: "Comparing TypeScript and JavaScript for different project scenarios. Learn when to choose TypeScript for type safety and when JavaScript might be the better option.",
    category: "development",
    status: "published",
    publishedAt: "2024-01-05",
    readingTime: 5,
    tags: [
      { tag: "typescript" },
      { tag: "javascript" },
      { tag: "programming" },
      { tag: "comparison" }
    ],
    seo: {
      metaTitle: "TypeScript vs JavaScript: Complete Comparison Guide",
      metaDescription: "Compare TypeScript and JavaScript to choose the right language for your project. Learn when to use each for optimal development.",
      keywords: "typescript, javascript, programming, comparison, web development"
    }
  },
  {
    title: "My Journey from Junior to Senior Developer: Lessons Learned",
    excerpt: "Personal insights and lessons learned during my transition from junior to senior developer. Tips, challenges, and growth strategies for career advancement.",
    category: "thoughts",
    status: "published",
    publishedAt: "2024-01-03",
    readingTime: 4,
    tags: [
      { tag: "career" },
      { tag: "personal-growth" },
      { tag: "development" },
      { tag: "experience" }
    ],
    seo: {
      metaTitle: "Junior to Senior Developer: My Career Journey and Lessons",
      metaDescription: "Personal journey from junior to senior developer with valuable lessons, challenges, and growth strategies for career advancement.",
      keywords: "career growth, developer journey, senior developer, programming career"
    }
  },
  {
    title: "Building a Real-Time Chat Application with WebSockets",
    excerpt: "Step-by-step guide to creating a real-time chat application using WebSockets, Node.js, and React. Includes authentication, message persistence, and deployment.",
    category: "tutorial",
    status: "published",
    publishedAt: "2024-01-01",
    readingTime: 10,
    tags: [
      { tag: "websockets" },
      { tag: "nodejs" },
      { tag: "react" },
      { tag: "real-time" },
      { tag: "chat" }
    ],
    seo: {
      metaTitle: "Real-Time Chat App with WebSockets: Complete Tutorial",
      metaDescription: "Build a real-time chat application using WebSockets, Node.js, and React. Complete tutorial with authentication and deployment.",
      keywords: "websockets, nodejs, react, real-time, chat application, tutorial"
    }
  }
]

async function seedBlogs() {
  try {
    console.log('🌱 Starting blog seeding...' )

    const payload = await getPayload({ config })

    for (let i = 0; i < sampleBlogs.length; i++) {
      const blog = sampleBlogs[i]

      try {
        // Create blog without featured image for now
        const createdBlog = await payload.create({
          collection: 'blogs',
          data: {
            title: blog.title,
            slug: blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
            excerpt: blog.excerpt,
            category: blog.category,
            status: blog.status,
            publishedAt: blog.publishedAt,
            readingTime: blog.readingTime,
            tags: blog.tags,
            seo: blog.seo,
            content: {
              root: {
                children: [
                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: `This is a sample blog post about ${blog.title.toLowerCase()}. In a real blog post, this would contain rich content with headings, paragraphs, code blocks, and other formatting.`,
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                  },
                  {
                    children: [
                      {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'This is a second paragraph with more content. You can add code examples, images, and other rich content here.',
                        type: 'text',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    type: 'paragraph',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'root',
                version: 1,
              },
            },
          } as any,
        })

        console.log(`✅ Created blog: "${createdBlog.title}"`)
      } catch (error) {
        console.error(`❌ Failed to create blog "${blog.title}":`, error)
      }
    }

    console.log('🎉 Blog seeding completed!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

seedBlogs()
