'use client'

import { Button } from './button'
import { Download } from 'lucide-react'

interface PrintButtonProps {
  children?: React.ReactNode
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
}

export default function PrintButton({ children, variant = 'outline', size = 'lg', className }: PrintButtonProps) {
  const handlePrint = () => {
    window.print()
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handlePrint}
      className={className}
    >
      {children || (
        <>
          <Download className="w-4 h-4 mr-2" />
          Print
        </>
      )}
    </Button>
  )
}
