'use client'

import { useEffect } from 'react'

interface UseKeyboardShortcutsProps {
  onNavigationToggle: () => void
}

export const useKeyboardShortcuts = ({ onNavigationToggle }: UseKeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Navigation toggle: N key
      if (event.key.toLowerCase() === 'n' && !event.ctrlKey && !event.metaKey && !event.altKey) {
        // Only trigger if not typing in an input
        const target = event.target as HTMLElement
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA' && !target.contentEditable) {
          event.preventDefault()
          onNavigationToggle()
        }
      }

      // Navigation toggle: Cmd/Ctrl + K (alternative)
      if (event.key.toLowerCase() === 'k' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault()
        onNavigationToggle()
      }

      // Navigation toggle: Escape to close
      if (event.key === 'Escape') {
        // This will be handled by the navigation component itself
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onNavigationToggle])
}
