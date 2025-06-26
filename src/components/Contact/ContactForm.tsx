'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormField } from '@/components/ui/form-field'
import { Mail, Send, User, MessageSquare, Phone, CheckCircle2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useContactForm } from '@/hooks/use-contact-form'

interface ContactFormProps {
  className?: string
}

const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
  const { form, isSubmitting, submitStatus, onSubmit } = useContactForm()
  const { register, formState: { errors }, watch } = form
  const [focusedField, setFocusedField] = useState<string | null>(null)

  // Watch form values for dynamic styling
  const watchedValues = watch()

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName)
  }

  const handleBlur = () => {
    setFocusedField(null)
  }

  return (
    <div className={cn('w-full', className)}>
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="group">
            <FormField
              label="Name"
              error={errors.name}
              icon={<User className="w-4 h-4" />}
            >
              <div className="relative">
                <Input
                  {...register('name')}
                  placeholder="Your full name"
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  className={cn(
                    'h-12 text-sm transition-all duration-300 pl-4 pr-4',
                    'border-2 rounded-xl',
                    'focus:border-primary focus:ring-4 focus:ring-primary/20',
                    'hover:border-primary/50',
                    errors.name && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                    focusedField === 'name' && 'scale-[1.02] shadow-lg',
                    watchedValues.name && 'border-green-500/50'
                  )}
                />
                {watchedValues.name && !errors.name && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                )}
              </div>
            </FormField>
          </div>

          <div className="group">
            <FormField
              label="Email"
              error={errors.email}
              icon={<Mail className="w-4 h-4" />}
            >
              <div className="relative">
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="your.email@example.com"
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  className={cn(
                    'h-12 text-sm transition-all duration-300 pl-4 pr-4',
                    'border-2 rounded-xl',
                    'focus:border-primary focus:ring-4 focus:ring-primary/20',
                    'hover:border-primary/50',
                    errors.email && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                    focusedField === 'email' && 'scale-[1.02] shadow-lg',
                    watchedValues.email && !errors.email && 'border-green-500/50'
                  )}
                />
                {watchedValues.email && !errors.email && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                )}
              </div>
            </FormField>
          </div>
        </div>

        {/* Phone Field */}
        <div className="group">
          <FormField
            label="Phone (Optional)"
            error={errors.phone}
            icon={<Phone className="w-4 h-4" />}
          >
            <div className="relative">
              <Input
                {...register('phone')}
                type="tel"
                placeholder="+1 (555) 123-4567"
                onFocus={() => handleFocus('phone')}
                onBlur={handleBlur}
                className={cn(
                  'h-12 text-sm transition-all duration-300 pl-4 pr-4',
                  'border-2 rounded-xl',
                  'focus:border-primary focus:ring-4 focus:ring-primary/20',
                  'hover:border-primary/50',
                  errors.phone && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                  focusedField === 'phone' && 'scale-[1.02] shadow-lg',
                  watchedValues.phone && !errors.phone && 'border-green-500/50'
                )}
              />
              {watchedValues.phone && !errors.phone && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </div>
              )}
            </div>
          </FormField>
        </div>

        {/* Message Field */}
        <div className="group">
          <FormField
            label="Message"
            error={errors.message}
            icon={<MessageSquare className="w-4 h-4" />}
          >
            <div className="relative">
              <Textarea
                {...register('message')}
                placeholder="Tell me about your project, goals, timeline, or any questions you might have..."
                rows={5}
                onFocus={() => handleFocus('message')}
                onBlur={handleBlur}
                className={cn(
                  'text-sm resize-none transition-all duration-300 p-4',
                  'border-2 rounded-xl',
                  'focus:border-primary focus:ring-4 focus:ring-primary/20',
                  'hover:border-primary/50',
                  'min-h-[120px]',
                  errors.message && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                  focusedField === 'message' && 'scale-[1.01] shadow-lg',
                  watchedValues.message && watchedValues.message.length >= 10 && !errors.message && 'border-green-500/50'
                )}
              />
              {watchedValues.message && watchedValues.message.length >= 10 && !errors.message && (
                <div className="absolute right-3 top-3">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </div>
              )}
              <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                {watchedValues.message?.length || 0}/1000
              </div>
            </div>
          </FormField>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              'w-full h-14 text-base font-semibold rounded-xl',
              'transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
              'group relative overflow-hidden'
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {isSubmitting ? (
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Sending your message...</span>
              </div>
            ) : (
              <div className="flex items-center gap-3 relative z-10">
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <span>Send Message</span>
              </div>
            )}
          </Button>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 text-green-600 dark:text-green-400 animate-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="font-semibold">Message sent successfully!</p>
                                 <p className="text-sm opacity-80">I&apos;ll get back to you within 24-48 hours.</p>
              </div>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 text-red-600 dark:text-red-400 animate-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="font-semibold">Something went wrong</p>
                <p className="text-sm opacity-80">Please try again or contact me directly via email.</p>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Form Tips */}
      <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-blue-500/10">
        <h4 className="font-semibold mb-2 text-sm">💡 Quick Tips:</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Include project details, timeline, and budget if applicable</li>
          <li>• Mention any specific technologies or requirements</li>
          <li>• Feel free to attach files or links in your message</li>
          <li>• I typically respond within 24-48 hours</li>
        </ul>
      </div>
    </div>
  )
}

export default ContactForm
