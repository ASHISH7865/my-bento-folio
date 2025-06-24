import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config: payloadConfig })
    const body = await request.json()

    // Validate required fields
    const { name, email, phone, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create contact record
    const contact = await payload.create({
      collection: 'contacts',
      data: {
        name,
        email,
        phone: phone || '',
        message,
        status: 'new',
      },
    })

    // Optional: Send email notification
    // You can integrate with email services like SendGrid, Resend, etc.
    // await sendEmailNotification(contact)

    return NextResponse.json(
      {
        success: true,
        message: 'Contact form submitted successfully',
        id: contact.id
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Contact form submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}

// Optional: Email notification function
// async function sendEmailNotification(contact: any) {
//   // Implement your email service here
//   // Example with SendGrid:
//   // const sgMail = require('@sendgrid/mail')
//   // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
//   //
//   // const msg = {
//     to: 'your-email@example.com',
//     from: 'noreply@yourdomain.com',
//     subject: `New Contact Form Submission from ${contact.name}`,
//     text: `Name: ${contact.name}\nEmail: ${contact.email}\nPhone: ${contact.phone}\nMessage: ${contact.message}`,
//   }
//   //
//   // await sgMail.send(msg)
// }
