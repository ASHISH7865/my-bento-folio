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
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Validate message length
    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long' },
        { status: 400 },
      )
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: 'Message must be less than 1000 characters' },
        { status: 400 },
      )
    }

    // Get client information
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const referer = request.headers.get('referer') || 'unknown'

    // Try to get IP address from various sources
    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const ip = forwarded?.split(',')[0] || realIp || 'unknown'

    // Create contact record
    const contact = await payload.create({
      collection: 'contacts',
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : '',
        message: message.trim(),
        status: 'new',
        ipAddress: ip,
        userAgent,
        referer,
        submittedAt: new Date().toISOString(),
      },
    })

    // Optional: Send email notification
    // You can integrate with email services like SendGrid, Resend, etc.
    // await sendEmailNotification(contact)

    return NextResponse.json(
      {
        success: true,
        message: 'Contact form submitted successfully',
        id: contact.id,
        timestamp: new Date().toISOString(),
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Contact form submission error:', error)

    // Check if it's a Payload validation error
    if (error && typeof error === 'object' && 'errors' in error) {
      const validationErrors = (error as any).errors
      const errorMessages = Object.values(validationErrors)
        .map((err: any) => err.message)
        .join(', ')

      return NextResponse.json({ error: `Validation error: ${errorMessages}` }, { status: 400 })
    }

    return NextResponse.json(
      { error: 'Failed to submit contact form. Please try again later.' },
      { status: 500 },
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
