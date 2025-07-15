import { CollectionConfig } from 'payload'

export const Contacts: CollectionConfig = {
  slug: 'contacts',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'createdAt', 'status'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => false, // Prevent updates to maintain data integrity
    delete: () => false, // Prevent deletion to maintain data integrity
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: "Contact person's full name",
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        description: "Contact person's email address",
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        description: "Contact person's phone number (optional)",
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      admin: {
        description: 'The message content from the contact form',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        {
          label: 'New',
          value: 'new',
        },
        {
          label: 'In Progress',
          value: 'in-progress',
        },
        {
          label: 'Replied',
          value: 'replied',
        },
        {
          label: 'Closed',
          value: 'closed',
        },
      ],
      admin: {
        description: 'Current status of this contact inquiry',
      },
    },
    {
      name: 'ipAddress',
      type: 'text',
      admin: {
        description: 'IP address of the contact person',
        readOnly: true,
      },
    },
    {
      name: 'userAgent',
      type: 'text',
      admin: {
        description: 'Browser/device information',
        readOnly: true,
      },
    },
    {
      name: 'referer',
      type: 'text',
      admin: {
        description: 'Referrer URL where the form was submitted from',
        readOnly: true,
      },
    },
    {
      name: 'submittedAt',
      type: 'date',
      admin: {
        description: 'When the contact form was submitted',
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about this contact inquiry',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        // Add IP address and user agent if available
        if (req) {
          // Try to get IP from various sources
          const reqWithIp = req as {
            ip?: string
            connection?: { remoteAddress?: string }
            socket?: { remoteAddress?: string }
          }
          const ip =
            reqWithIp.ip ||
            reqWithIp.connection?.remoteAddress ||
            reqWithIp.socket?.remoteAddress ||
            req.headers.get('x-forwarded-for') ||
            req.headers.get('x-real-ip') ||
            'unknown'

          data.ipAddress = ip
          data.userAgent = req.headers.get('user-agent') || 'unknown'
          data.referer = req.headers.get('referer') || 'unknown'
          data.submittedAt = new Date().toISOString()
        }
        return data
      },
    ],
  },
}
