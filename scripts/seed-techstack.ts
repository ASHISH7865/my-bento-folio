import { getPayload } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import payloadConfig from '@/payload.config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const seedTechStack = async () => {
  const payload = await getPayload({
    config: payloadConfig,
  })

  // Define the tech stack data with explicit ordering
  const techStackData = [
    {
      category: 'Frontend Development',
      order: 1,
      skills: [
        { name: 'React.js' },
        { name: 'JavaScript ES6+' },
        { name: 'TypeScript' },
        { name: 'Next.js' },
        { name: 'HTML5' },
        { name: 'CSS3' },
        { name: 'Redux' },
        { name: 'SASS' },
        { name: 'Tailwind CSS' },
        { name: 'Material-UI' },
        { name: 'Shadcn UI' },
      ],
    },
    {
      category: 'Backend Development',
      order: 2,
      skills: [
        { name: 'Node.js' },
        { name: 'Express.js' },
        { name: 'NestJS' },
        { name: 'Prisma ORM' },
        { name: 'PostgreSQL' },
        { name: 'MongoDB' },
        { name: 'Redis' },
        { name: 'RabbitMQ' },
      ],
    },
    {
      category: 'Tools & Technologies',
      order: 3,
      skills: [
        { name: 'Docker' },
        { name: 'Git' },
        { name: 'Webpack' },
        { name: 'Vite' },
        { name: 'Jest' },
        { name: 'REST APIs' },
        { name: 'GraphQL' },
      ],
    },
    {
      category: 'UI/UX & Design',
      order: 4,
      skills: [
        { name: 'Figma' },
        { name: 'Responsive Design' },
        { name: 'Cross-browser Compatibility' },
        { name: 'Accessibility' },
        { name: 'Data Visualization' },
      ],
    },
    {
      category: 'Performance & Optimization',
      order: 5,
      skills: [
        { name: 'Code Splitting' },
        { name: 'Lazy Loading' },
        { name: 'SSR/SSG' },
        { name: 'Webpack Optimization' },
      ],
    },
  ]

  try {
    // Delete existing tech stack entries
    const existingTechStack = await payload.find({
      collection: 'tech-stack',
      sort: 'order', // Sort by order when fetching
    })

    for (const tech of existingTechStack.docs) {
      await payload.delete({
        collection: 'tech-stack',
        id: tech.id,
      })
    }

    // Create new tech stack entries
    for (const techCategory of techStackData) {
      await payload.create({
        collection: 'tech-stack',
        data: techCategory,
      })
    }

    console.log('✅ Tech stack seeded successfully!')
  } catch (error) {
    console.error('Error seeding tech stack:', error)
  }

  process.exit(0)
}

seedTechStack()
