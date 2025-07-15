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
            <form onSubmit={onSubmit} className="space-y-8">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <FormField
                            label="Name"
                            error={errors.name}
                            icon={<User className="w-4 h-4" />}
                        >
                            <Input
                                {...register('name')}
                                placeholder="Your full name"
                                onFocus={() => handleFocus('name')}
                                onBlur={handleBlur}
                                className={cn(
                                    'h-14 text-base transition-all duration-200',
                                    'focus:border-primary focus:ring-2 focus:ring-primary/20',
                                    'border-2 rounded-xl',
                                    errors.name && 'border-destructive focus:border-destructive focus:ring-destructive/20',
                                    watchedValues.name && !errors.name && 'border-green-500 dark:border-green-400'
                                )}
                            />
                        </FormField>
                    </div>

                    <div>
                        <FormField
                            label="Email"
                            error={errors.email}
                            icon={<Mail className="w-4 h-4" />}
                        >
                            <Input
                                {...register('email')}
                                type="email"
                                placeholder="your.email@example.com"
                                onFocus={() => handleFocus('email')}
                                onBlur={handleBlur}
                                className={cn(
                                    'h-14 text-base transition-all duration-200',
                                    'focus:border-primary focus:ring-2 focus:ring-primary/20',
                                    'border-2 rounded-xl',
                                    errors.email && 'border-destructive focus:border-destructive focus:ring-destructive/20',
                                    watchedValues.email && !errors.email && 'border-green-500 dark:border-green-400'
                                )}
                            />
                        </FormField>
                    </div>
                </div>

                {/* Phone Field */}
                <div>
                    <FormField
                        label="Phone (Optional)"
                        error={errors.phone}
                        icon={<Phone className="w-4 h-4" />}
                    >
                        <Input
                            {...register('phone')}
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            onFocus={() => handleFocus('phone')}
                            onBlur={handleBlur}
                            className={cn(
                                'h-14 text-base transition-all duration-200',
                                'focus:border-primary focus:ring-2 focus:ring-primary/20',
                                'border-2 rounded-xl',
                                errors.phone && 'border-destructive focus:border-destructive focus:ring-destructive/20',
                                watchedValues.phone && !errors.phone && 'border-green-500 dark:border-green-400'
                            )}
                        />
                    </FormField>
                </div>

                {/* Message Field */}
                <div>
                    <FormField
                        label="Message"
                        error={errors.message}
                        icon={<MessageSquare className="w-4 h-4" />}
                    >
                        <Textarea
                            {...register('message')}
                            placeholder="Tell me about your project, goals, timeline, or any questions you might have..."
                            rows={6}
                            onFocus={() => handleFocus('message')}
                            onBlur={handleBlur}
                            className={cn(
                                'text-base resize-none transition-all duration-200',
                                'focus:border-primary focus:ring-2 focus:ring-primary/20',
                                'border-2 rounded-xl min-h-[140px]',
                                errors.message && 'border-destructive focus:border-destructive focus:ring-destructive/20',
                                watchedValues.message && watchedValues.message.length >= 10 && !errors.message && 'border-green-500 dark:border-green-400'
                            )}
                        />
                        <div className="text-sm text-muted-foreground mt-3 text-right">
                            {watchedValues.message?.length || 0}/1000
                        </div>
                    </FormField>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={cn(
                            'w-full h-14 text-lg font-semibold rounded-xl',
                            'disabled:opacity-50 disabled:cursor-not-allowed',
                            'transition-all duration-200 hover:scale-[1.02]'
                        )}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                <span>Sending your message...</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Send className="w-5 h-5" />
                                <span>Send Message</span>
                            </div>
                        )}
                    </Button>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                    <div className="p-6 rounded-2xl border border-emerald-200 text-emerald-800 dark:bg-emerald-950 dark:border-emerald-400 dark:text-emerald-400">
                        <div className="flex items-center gap-4">
                            <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-lg">Message sent successfully!</p>
                                <p className="text-emerald-700 dark:text-emerald-300">I&apos;ll get back to you within 24-48 hours.</p>
                            </div>
                        </div>
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-red-800 dark:bg-red-950/50 dark:border-red-800 dark:text-red-400">
                        <div className="flex items-center gap-4">
                            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-lg">Something went wrong</p>
                                <p className="text-red-700 dark:text-red-300">Please try again or contact me directly via email.</p>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    )
}

export default ContactForm
