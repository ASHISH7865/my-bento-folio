import { getPayload } from 'payload'
import config from '@payload-config'
import dotenv from 'dotenv';

dotenv.config();

const seedResume = async () => {
  const payload = await getPayload({ config })

  try {
    console.log('🌱 Starting resume seed...')

    // Check if resume already exists
    const existingResume = await payload.find({
      collection: 'resume',
      limit: 1,
    })

    if (existingResume.docs.length > 0) {
      console.log('✅ Resume already exists, skipping seed')
      return
    }

    // Create the resume entry
    const resumeData = {
      title: 'Ashish Jaiswal - Resume',
      version: '2024.1',
             lastUpdated: new Date().toISOString(),
      personalInfo: {
        fullName: 'ASHISH JAISWAL',
        title: 'Full Stack Developer',
        summary: 'Full Stack Developer with 3+ years of expertise in building enterprise-grade applications. Proven track record in microservices architecture, low-code/no-code platforms. Recently architected a microservices-based Lead Management System with RabbitMQ event-driven communication and developed a comprehensive case management system that reduced manual workflows by 40%. Expert in building scalable low-code platforms with drag-and-drop functionality for rapid enterprise application development.',
        contact: {
          email: 'jaiswalashish9467@gmail.com',
          phone: '+91-9650218385',
          location: 'Noida, Uttar Pradesh, India',
          linkedin: 'https://linkedin.com/in/ashish7865/',
          github: '', // Add if available
          website: '', // Add if available
        },
      },
      experience: [
        {
          position: 'Software Engineer 2',
          company: 'Axeno Consulting Private Limited',
          location: 'Noida, India',
          startDate: '2022-04-01',
          endDate: null,
          current: true,
          description: [
            {
              responsibility: 'Designed and developed a microservices-based Lead Management System, architecting core services including Authentication, Lead, and Customer Services, and implementing RabbitMQ for event-driven communication; built the User Authentication Service from scratch with secure JWT-based access control and role management.'
            },
            {
              responsibility: 'Engineered and led the end-to-end development of a scalable Business Process Management (BPM) system, enabling custom application views, configurable process workflows, and drag-and-drop automation. Empowered non-technical teams to create and monitor workflows, reducing manual effort by 40% across departments.'
            },
            {
              responsibility: 'Engineered a powerful low-code/no-code platform that enables developers and business users to build full-fledged, multi-step forms and complex workflows without writing code. Designed to streamline data collection, automation, and customization across various industries.'
            },
            {
              responsibility: 'Designed a plug-and-play configuration engine supporting Forms, Workflows, Theme customization, API connectors, and PDF document generation and Meta (Reference Data).'
            },
            {
              responsibility: 'Built a drag-and-drop Form Builder using React 18, TypeScript, Redux Toolkit, and React Hook Form with Yup validation. Integrated with REST APIs and external systems via a custom connector system; supported multi-environment (Dev, Stage, Prod) deployments.'
            }
          ],
          technologies: [
            { tech: 'Node.js' },
            { tech: 'React.js' },
            { tech: 'TypeScript' },
            { tech: 'Prisma ORM' },
            { tech: 'PostgreSQL' },
            { tech: 'Redis' },
            { tech: 'RabbitMQ' },
            { tech: 'Redux Toolkit' },
            { tech: 'React Hook Form' },
            { tech: 'Docker' }
          ],
        },
        {
          position: 'Software Engineer Intern',
          company: 'Work India',
          location: 'Bangalore, India',
          startDate: '2021-04-01',
          endDate: '2021-12-31',
          current: false,
          description: [
            {
              responsibility: 'Worked on enhancing user engagement and product usability by developing key front-end features in a production-grade application.'
            },
            {
              responsibility: 'Built a real-time Notification System to alert users of unread inbox messages, improving user interaction and responsiveness.'
            },
            {
              responsibility: 'Implemented an Upsell Plan Recommendation module that suggests subscription upgrades based on user behavior and activity patterns.'
            },
            {
              responsibility: 'Redesigned and developed a Remastered Job Card UI to improve job listing visibility and click-through rates, aligning with modern UX best practices.'
            }
          ],
          technologies: [
            { tech: 'React.js' },
            { tech: 'JavaScript' },
            { tech: 'HTML5' },
            { tech: 'CSS3' },
            { tech: 'REST APIs' }
          ],
        },
      ],
      education: [
        {
          degree: 'Bachelor of Technology in Computer Science and Engineering',
          institution: 'Lovely Professional University',
          location: 'Punjab, India',
          startDate: '2018-07-01',
          endDate: '2022-06-30',
          gpa: '',
          honors: [],
          relevantCoursework: [
            { course: 'Data Structures and Algorithms' },
            { course: 'Software Engineering' },
            { course: 'Database Management Systems' },
            { course: 'Web Development' },
            { course: 'Object-Oriented Programming' }
          ],
        },
        {
          degree: 'Higher Secondary Education',
          institution: 'Vishal International School',
          location: 'India',
          startDate: '2017-04-01',
          endDate: '2017-12-31',
          gpa: '',
          honors: [],
          relevantCoursework: [],
        },
      ],
      skills: {
        technical: [
          {
            category: 'Frontend Development',
            skills: [
              { skill: 'React.js', proficiency: 'expert' as const },
              { skill: 'JavaScript ES6+', proficiency: 'expert' as const },
              { skill: 'TypeScript', proficiency: 'advanced' as const },
              { skill: 'Next.js', proficiency: 'advanced' as const },
              { skill: 'HTML5', proficiency: 'expert' as const },
              { skill: 'CSS3', proficiency: 'expert' as const },
              { skill: 'Redux', proficiency: 'advanced' as const },
              { skill: 'SASS', proficiency: 'advanced' as const },
              { skill: 'Tailwind CSS', proficiency: 'advanced' as const },
              { skill: 'Material-UI', proficiency: 'intermediate' as const },
              { skill: 'Shadcn UI', proficiency: 'intermediate' as const }
            ],
          },
                     {
             category: 'Backend Development',
             skills: [
               { skill: 'Node.js', proficiency: 'expert' as const },
               { skill: 'Express.js', proficiency: 'advanced' as const },
               { skill: 'NestJS', proficiency: 'intermediate' as const },
               { skill: 'Prisma ORM', proficiency: 'advanced' as const },
               { skill: 'PostgreSQL', proficiency: 'advanced' as const },
               { skill: 'MongoDB', proficiency: 'intermediate' as const },
               { skill: 'Redis', proficiency: 'intermediate' as const },
               { skill: 'RabbitMQ', proficiency: 'intermediate' as const }
             ],
           },
           {
             category: 'Tools & Technologies',
             skills: [
               { skill: 'Docker', proficiency: 'intermediate' as const },
               { skill: 'Git', proficiency: 'advanced' as const },
               { skill: 'Webpack', proficiency: 'intermediate' as const },
               { skill: 'Vite', proficiency: 'intermediate' as const },
               { skill: 'Jest', proficiency: 'intermediate' as const },
               { skill: 'REST APIs', proficiency: 'expert' as const },
               { skill: 'GraphQL', proficiency: 'intermediate' as const }
             ],
           },
           {
             category: 'UI/UX & Design',
             skills: [
               { skill: 'Figma', proficiency: 'intermediate' as const },
               { skill: 'Responsive Design', proficiency: 'expert' as const },
               { skill: 'Cross-browser Compatibility', proficiency: 'advanced' as const },
               { skill: 'Accessibility', proficiency: 'intermediate' as const },
               { skill: 'Data Visualization', proficiency: 'intermediate' as const }
             ],
           },
           {
             category: 'Performance & Optimization',
             skills: [
               { skill: 'Code Splitting', proficiency: 'intermediate' as const },
               { skill: 'Lazy Loading', proficiency: 'intermediate' as const },
               { skill: 'SSR/SSG', proficiency: 'intermediate' as const },
               { skill: 'Webpack Optimization', proficiency: 'intermediate' as const }
             ],
           }
        ],
        soft: [
          { skill: 'Team Leadership' },
          { skill: 'Mentoring' },
          { skill: 'Code Reviews' },
          { skill: 'Agile Methodologies' },
          { skill: 'Scrum' },
          { skill: 'Technical Documentation' },
          { skill: 'Cross-functional Teamwork' },
          { skill: 'Stakeholder Communication' },
          { skill: 'Project Management' }
        ],
                 languages: [
           { language: 'English', proficiency: 'fluent' as const },
           { language: 'Hindi', proficiency: 'native' as const }
         ],
      },
      projects: [
        {
          name: 'Low Code / No Code Form Builder',
          description: 'Engineered a modular, drag-and-drop form builder platform that empowers both developers and non-technical users to create complex, multistep dynamic forms with zero or minimal coding. Reduced form development time by 80% while ensuring scalability, security, and enterprise-grade extensibility.',
          technologies: [
            { tech: 'React 18' },
            { tech: 'TypeScript' },
            { tech: 'Redux Toolkit' },
            { tech: 'React Hook Form' },
            { tech: 'Yup Validation' },
            { tech: 'REST APIs' },
            { tech: 'AWS Services' }
          ],
          liveUrl: '',
          githubUrl: '',
          completionDate: '2024-01-01',
        },
        {
          name: 'Business Process Manager - Case Management System',
          description: 'Designed and developed an end-to-end Case Management System to streamline the lifecycle of cases across departments, from intake to resolution, with customizable workflows and role-based access. Implemented modular components and dynamic workflows with conditional steps.',
          technologies: [
            { tech: 'React.js' },
            { tech: 'Node.js' },
            { tech: 'PostgreSQL' },
            { tech: 'Prisma' },
            { tech: 'RBAC' },
            { tech: 'TypeScript' }
          ],
          liveUrl: '',
          githubUrl: '',
          completionDate: '2023-08-01',
        },
        {
          name: 'Microservices Lead Management System',
          description: 'Architected a microservices-based Lead Management System with core services including Authentication, Lead, and Customer Services. Implemented RabbitMQ for event-driven communication and built User Authentication Service with secure JWT-based access control.',
          technologies: [
            { tech: 'Node.js' },
            { tech: 'Microservices' },
            { tech: 'RabbitMQ' },
            { tech: 'PostgreSQL' },
            { tech: 'JWT' },
            { tech: 'Prisma ORM' },
            { tech: 'Redis' }
          ],
          liveUrl: '',
          githubUrl: '',
          completionDate: '2023-12-01',
        }
      ],
      certifications: [
        {
          name: 'Passionate Performer Award',
          issuer: 'Axeno Consulting Private Limited',
          issueDate: '2023-12-01',
          expiryDate: null,
          credentialId: '',
          verificationUrl: '',
        }
      ],
      downloadableFiles: {
        pdfResume: null, // Will be added when you upload the PDF
        docResume: null, // Will be added when you upload the DOC
        customFormats: [],
      },
      displaySettings: {
        showDownloadButtons: true,
        showLastUpdated: true,
        enablePrint: true,
        layout: 'modern',
      },
             status: 'published' as const,
             seo: {
         metaTitle: 'Ashish Jaiswal - Full Stack Developer Resume',
         metaDescription: 'Full Stack Developer with 3+ years expertise in enterprise applications, microservices, and low-code platforms.',
         keywords: 'Full Stack Developer, React.js, Node.js, TypeScript, Microservices, Low-code Platform, BPM, Software Engineer',
       },
    }

         const createdResume = await payload.create({
       collection: 'resume',
       data: resumeData as any,
     })

    console.log('✅ Resume seeded successfully!')
    console.log(`   Resume ID: ${createdResume.id}`)
    console.log(`   Title: ${createdResume.title}`)
    console.log(`   Status: ${createdResume.status}`)

  } catch (error) {
    console.error('❌ Error seeding resume:', error)
  }
}

// Execute if run directly
seedResume()
  .then(() => {
    console.log('🎉 Resume seed completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Resume seed failed:', error)
    process.exit(1)
  })

export default seedResume
