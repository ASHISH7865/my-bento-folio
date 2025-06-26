import { CollectionConfig } from 'payload'

export const ContactPage: CollectionConfig = {
  slug: 'contact-page',
  admin: {
    useAsTitle: 'title',
    description: 'Manage content for the Contact Us page',
    defaultColumns: ['title', 'status', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Contact Me',
      admin: {
        description: 'Main title for the Contact page',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: {
        description: 'Subtitle or tagline for the contact page',
      },
    },
    {
      name: 'description',
      type: 'richText',
      admin: {
        description: 'Introduction text for the contact page',
      },
    },
    {
      name: 'contactInfo',
      type: 'group',
      admin: {
        description: 'Contact information display settings',
      },
      fields: [
        {
          name: 'showEmail',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Display email address on contact page',
          },
        },
        {
          name: 'email',
          type: 'email',
          admin: {
            description: 'Primary contact email',
            condition: (data, siblingData) => siblingData?.showEmail,
          },
        },
        {
          name: 'showPhone',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Display phone number on contact page',
          },
        },
        {
          name: 'phone',
          type: 'text',
          admin: {
            description: 'Contact phone number',
            condition: (data, siblingData) => siblingData?.showPhone,
          },
        },
        {
          name: 'showLocation',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Display location information',
          },
        },
        {
          name: 'location',
          type: 'group',
          admin: {
            condition: (data, siblingData) => siblingData?.showLocation,
          },
          fields: [
            {
              name: 'city',
              type: 'text',
              admin: {
                description: 'City name',
              },
            },
            {
              name: 'country',
              type: 'text',
              admin: {
                description: 'Country name',
              },
            },
            {
              name: 'timezone',
              type: 'text',
              admin: {
                description: 'Timezone (e.g., GMT+5:30)',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'group',
      admin: {
        description: 'Social media and professional links',
      },
      fields: [
        {
          name: 'showSocialLinks',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Display social media links',
          },
        },
        {
          name: 'links',
          type: 'array',
          admin: {
            condition: (data, siblingData) => siblingData?.showSocialLinks,
          },
          fields: [
            {
              name: 'platform',
              type: 'select',
              required: true,
              options: [
                { label: 'GitHub', value: 'github' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Twitter', value: 'twitter' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'Facebook', value: 'facebook' },
                { label: 'YouTube', value: 'youtube' },
                { label: 'Discord', value: 'discord' },
                { label: 'Telegram', value: 'telegram' },
                { label: 'Website', value: 'website' },
                { label: 'Other', value: 'other' },
              ],
              admin: {
                description: 'Social media platform',
              },
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              admin: {
                description: 'Full URL to your profile/page',
              },
            },
            {
              name: 'username',
              type: 'text',
              admin: {
                description: 'Username or handle (optional)',
              },
            },
            {
              name: 'customLabel',
              type: 'text',
              admin: {
                description: 'Custom label (only needed for "Other" platform)',
                condition: (data, siblingData) => siblingData?.platform === 'other',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'contactForm',
      type: 'group',
      admin: {
        description: 'Contact form configuration',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Enable contact form on the page',
          },
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Send me a message',
          admin: {
            description: 'Contact form section title',
            condition: (data, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Description text above the contact form',
            condition: (data, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'successMessage',
          type: 'textarea',
          defaultValue: 'Thank you for your message! I\'ll get back to you soon.',
          admin: {
            description: 'Message shown after successful form submission',
            condition: (data, siblingData) => siblingData?.enabled,
          },
        },
        {
          name: 'requiredFields',
          type: 'array',
          defaultValue: ['name', 'email', 'message'],
          admin: {
            description: 'Fields that are required in the contact form',
            condition: (data, siblingData) => siblingData?.enabled,
          },
          fields: [
            {
              name: 'field',
              type: 'select',
              options: [
                { label: 'Name', value: 'name' },
                { label: 'Email', value: 'email' },
                { label: 'Phone', value: 'phone' },
                { label: 'Message', value: 'message' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'additionalSections',
      type: 'array',
      admin: {
        description: 'Additional content sections for the contact page',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Section title',
          },
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
          admin: {
            description: 'Section content',
          },
        },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Email', value: 'email' },
            { label: 'Phone', value: 'phone' },
            { label: 'Location', value: 'location' },
            { label: 'Time', value: 'time' },
            { label: 'Calendar', value: 'calendar' },
            { label: 'Chat', value: 'chat' },
            { label: 'None', value: 'none' },
          ],
          defaultValue: 'none',
          admin: {
            description: 'Icon to display with this section',
          },
        },
      ],
    },
    {
      name: 'availability',
      type: 'group',
      admin: {
        description: 'Availability and response time information',
      },
      fields: [
        {
          name: 'showAvailability',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show availability status on contact page',
          },
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'available',
          options: [
            { label: 'Available for Work', value: 'available' },
            { label: 'Busy - Limited Availability', value: 'busy' },
            { label: 'Not Available', value: 'unavailable' },
          ],
          admin: {
            description: 'Current availability status',
            condition: (data, siblingData) => siblingData?.showAvailability,
          },
        },
        {
          name: 'responseTime',
          type: 'text',
          defaultValue: 'Within 24 hours',
          admin: {
            description: 'Expected response time',
            condition: (data, siblingData) => siblingData?.showAvailability,
          },
        },
        {
          name: 'note',
          type: 'textarea',
          admin: {
            description: 'Additional note about availability',
            condition: (data, siblingData) => siblingData?.showAvailability,
          },
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
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
            description: 'SEO title for the Contact page',
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
