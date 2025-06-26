import { CollectionConfig } from 'payload'

export const Resume: CollectionConfig = {
  slug: 'resume',
  admin: {
    useAsTitle: 'title',
    description: 'Manage resume/CV content and downloadable files',
    defaultColumns: ['title', 'version', 'status', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'My Resume',
      admin: {
        description: 'Title for the resume page',
      },
    },
    {
      name: 'version',
      type: 'text',
      defaultValue: '1.0',
      admin: {
        description: 'Resume version for tracking updates',
      },
    },
    {
      name: 'lastUpdated',
      type: 'date',
      defaultValue: () => new Date(),
      admin: {
        description: 'When the resume was last updated',
      },
    },
    {
      name: 'personalInfo',
      type: 'group',
      admin: {
        description: 'Personal information section',
      },
      fields: [
        {
          name: 'fullName',
          type: 'text',
          required: true,
          admin: {
            description: 'Full name as it appears on resume',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Professional title (e.g., Full Stack Developer)',
          },
        },
        {
          name: 'summary',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Professional summary or objective',
          },
        },
        {
          name: 'contact',
          type: 'group',
          fields: [
            {
              name: 'email',
              type: 'email',
              required: true,
            },
            {
              name: 'phone',
              type: 'text',
            },
            {
              name: 'location',
              type: 'text',
              admin: {
                description: 'City, Country or full address',
              },
            },
            {
              name: 'website',
              type: 'text',
              admin: {
                description: 'Personal website URL',
              },
            },
            {
              name: 'linkedin',
              type: 'text',
              admin: {
                description: 'LinkedIn profile URL',
              },
            },
            {
              name: 'github',
              type: 'text',
              admin: {
                description: 'GitHub profile URL',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'experience',
      type: 'array',
      required: true,
      admin: {
        description: 'Professional work experience',
      },
      fields: [
        {
          name: 'position',
          type: 'text',
          required: true,
          admin: {
            description: 'Job title/position',
          },
        },
        {
          name: 'company',
          type: 'text',
          required: true,
          admin: {
            description: 'Company/organization name',
          },
        },
        {
          name: 'location',
          type: 'text',
          admin: {
            description: 'Work location (city, country)',
          },
        },
        {
          name: 'startDate',
          type: 'date',
          required: true,
          admin: {
            description: 'Employment start date',
          },
        },
        {
          name: 'endDate',
          type: 'date',
          admin: {
            description: 'Employment end date (leave empty if current)',
          },
        },
        {
          name: 'current',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Currently working in this position',
          },
        },
        {
          name: 'description',
          type: 'array',
          required: true,
          admin: {
            description: 'List of responsibilities and achievements',
          },
          fields: [
            {
              name: 'responsibility',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'technologies',
          type: 'array',
          admin: {
            description: 'Technologies and tools used',
          },
          fields: [
            {
              name: 'tech',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'education',
      type: 'array',
      admin: {
        description: 'Educational background',
      },
      fields: [
        {
          name: 'degree',
          type: 'text',
          required: true,
          admin: {
            description: 'Degree type and field of study',
          },
        },
        {
          name: 'institution',
          type: 'text',
          required: true,
          admin: {
            description: 'School/university name',
          },
        },
        {
          name: 'location',
          type: 'text',
          admin: {
            description: 'Institution location',
          },
        },
        {
          name: 'startDate',
          type: 'date',
          admin: {
            description: 'Education start date',
          },
        },
        {
          name: 'endDate',
          type: 'date',
          admin: {
            description: 'Graduation date',
          },
        },
        {
          name: 'gpa',
          type: 'text',
          admin: {
            description: 'GPA or grade (optional)',
          },
        },
        {
          name: 'honors',
          type: 'array',
          admin: {
            description: 'Academic honors, awards, or achievements',
          },
          fields: [
            {
              name: 'honor',
              type: 'text',
            },
          ],
        },
        {
          name: 'relevantCoursework',
          type: 'array',
          admin: {
            description: 'Relevant courses or projects',
          },
          fields: [
            {
              name: 'course',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'skills',
      type: 'group',
      admin: {
        description: 'Technical and professional skills',
      },
      fields: [
        {
          name: 'technical',
          type: 'array',
          admin: {
            description: 'Technical skills by category',
          },
          fields: [
            {
              name: 'category',
              type: 'text',
              required: true,
              admin: {
                description: 'Skill category (e.g., Frontend, Backend, Tools)',
              },
            },
            {
              name: 'skills',
              type: 'array',
              required: true,
              fields: [
                {
                  name: 'skill',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'proficiency',
                  type: 'select',
                  options: [
                    { label: 'Beginner', value: 'beginner' },
                    { label: 'Intermediate', value: 'intermediate' },
                    { label: 'Advanced', value: 'advanced' },
                    { label: 'Expert', value: 'expert' },
                  ],
                  defaultValue: 'intermediate',
                },
              ],
            },
          ],
        },
        {
          name: 'soft',
          type: 'array',
          admin: {
            description: 'Soft skills and personal qualities',
          },
          fields: [
            {
              name: 'skill',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'languages',
          type: 'array',
          admin: {
            description: 'Spoken languages',
          },
          fields: [
            {
              name: 'language',
              type: 'text',
              required: true,
            },
            {
              name: 'proficiency',
              type: 'select',
              options: [
                { label: 'Native', value: 'native' },
                { label: 'Fluent', value: 'fluent' },
                { label: 'Proficient', value: 'proficient' },
                { label: 'Intermediate', value: 'intermediate' },
                { label: 'Basic', value: 'basic' },
              ],
              defaultValue: 'intermediate',
            },
          ],
        },
      ],
    },
    {
      name: 'projects',
      type: 'array',
      admin: {
        description: 'Notable projects (if not showing from projects collection)',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Project name',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Brief project description',
          },
        },
        {
          name: 'technologies',
          type: 'array',
          fields: [
            {
              name: 'tech',
              type: 'text',
            },
          ],
        },
        {
          name: 'liveUrl',
          type: 'text',
          admin: {
            description: 'Live project URL',
          },
        },
        {
          name: 'githubUrl',
          type: 'text',
          admin: {
            description: 'GitHub repository URL',
          },
        },
        {
          name: 'completionDate',
          type: 'date',
          admin: {
            description: 'Project completion date',
          },
        },
      ],
    },
    {
      name: 'certifications',
      type: 'array',
      admin: {
        description: 'Professional certifications and licenses',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Certification name',
          },
        },
        {
          name: 'issuer',
          type: 'text',
          required: true,
          admin: {
            description: 'Issuing organization',
          },
        },
        {
          name: 'issueDate',
          type: 'date',
          admin: {
            description: 'Date certificate was issued',
          },
        },
        {
          name: 'expiryDate',
          type: 'date',
          admin: {
            description: 'Expiry date (if applicable)',
          },
        },
        {
          name: 'credentialId',
          type: 'text',
          admin: {
            description: 'Credential ID or license number',
          },
        },
        {
          name: 'verificationUrl',
          type: 'text',
          admin: {
            description: 'URL to verify the certification',
          },
        },
      ],
    },
    {
      name: 'downloadableFiles',
      type: 'group',
      admin: {
        description: 'Downloadable resume files',
      },
      fields: [
        {
          name: 'pdfResume',
          type: 'text',
          admin: {
            description: 'PDF version of the resume',
          },
        },
        {
          name: 'docResume',
          type: 'text',
          admin: {
            description: 'Word document version of the resume',
          },
        },
        {
          name: 'customFormats',
          type: 'array',
          admin: {
            description: 'Additional resume formats',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: {
                description: 'Format label (e.g., "Creative Resume", "Technical Resume")',
              },
            },
            {
              name: 'file',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'displaySettings',
      type: 'group',
      admin: {
        description: 'Resume page display settings',
      },
      fields: [
        {
          name: 'showDownloadButtons',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show download buttons on the resume page',
          },
        },
        {
          name: 'showLastUpdated',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Display last updated date',
          },
        },
        {
          name: 'enablePrint',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Enable print functionality',
          },
        },
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'modern',
          options: [
            { label: 'Modern', value: 'modern' },
            { label: 'Classic', value: 'classic' },
            { label: 'Minimal', value: 'minimal' },
            { label: 'Creative', value: 'creative' },
          ],
          admin: {
            description: 'Resume page layout style',
          },
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        description: 'Publication status',
      },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          admin: {
            description: 'SEO title for the Resume page',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          maxLength: 160,
          admin: {
            description: 'SEO description (max 160 characters)',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          admin: {
            description: 'SEO keywords (comma-separated)',
          },
        },
      ],
    },
  ],
}
