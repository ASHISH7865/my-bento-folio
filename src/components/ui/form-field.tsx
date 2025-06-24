import React from 'react'
import { FieldError } from 'react-hook-form'
import { cn } from '@/lib/utils'

interface FormFieldProps {
  label: string
  error?: FieldError
  children: React.ReactNode
  icon?: React.ReactNode
  className?: string
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  children,
  icon,
  className
}) => {
  return (
    <div className={cn('space-y-1', className)}>
      <label className="text-xs font-medium flex items-center gap-1 text-foreground">
        {icon}
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500 dark:text-red-400">
          {error.message}
        </p>
      )}
    </div>
  )
}
