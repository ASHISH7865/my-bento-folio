import React from 'react'
import { Space_Grotesk } from 'next/font/google'
import './styles.css'
import { ThemeProvider } from 'next-themes'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning className={spaceGrotesk.className}>
      <body>
        <main className="min-h-screen flex items-center justify-center relative mx-auto max-w-5xl bg-dark-1la dark:bg-white">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </main>
      </body>
    </html>
  )
}
