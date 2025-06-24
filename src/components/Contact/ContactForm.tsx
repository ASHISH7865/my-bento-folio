'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormField } from '@/components/ui/form-field'
import { Mail, Send, User, MessageSquare, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useContactForm } from '@/hooks/use-contact-form'

interface ContactFormProps {
  className?: string
}

const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
  const { form, isSubmitting, submitStatus, onSubmit } = useContactForm()
  const { register, formState: { errors } } = form

  return (
    <div className={cn('w-full', className)}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Name"
            error={errors.name}
            icon={<User className="w-3 h-3" />}
          >
            <Input
              {...register('name')}
              placeholder="Your name"
              className={cn(
                'h-9 text-sm transition-colors',
                errors.name && 'border-red-500 focus-visible:ring-red-500'
              )}
            />
          </FormField>

          <FormField
            label="Email"
            error={errors.email}
            icon={<Mail className="w-3 h-3" />}
          >
            <Input
              {...register('email')}
              type="email"
              placeholder="email@example.com"
              className={cn(
                'h-9 text-sm transition-colors',
                errors.email && 'border-red-500 focus-visible:ring-red-500'
              )}
            />
          </FormField>
        </div>

        <FormField
          label="Phone (Optional)"
          error={errors.phone}
          icon={<Phone className="w-3 h-3" />}
        >
          <Input
            {...register('phone')}
            type="tel"
            placeholder="+1 (555) 123-4567"
            className={cn(
              'h-9 text-sm transition-colors',
              errors.phone && 'border-red-500 focus-visible:ring-red-500'
            )}
          />
        </FormField>

        <FormField
          label="Message"
          error={errors.message}
          icon={<MessageSquare className="w-3 h-3" />}
        >
          <Textarea
            {...register('message')}
            placeholder="Tell me about your project..."
            rows={4}
            className={cn(
              'text-sm resize-none transition-colors',
              errors.message && 'border-red-500 focus-visible:ring-red-500'
            )}
          />
        </FormField>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          size="sm"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-9"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span className="text-xs">Sending...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Send className="w-3 h-3" />
              <span className="text-xs">Send Message</span>
            </div>
          )}
        </Button>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="p-3 rounded-md bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs">
            Message sent successfully! I&apos;ll get back to you soon.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs">
            Something went wrong. Please try again.
          </div>
        )}
      </form>
    </div>
  )
}

export default ContactForm
