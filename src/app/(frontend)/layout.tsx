import React from 'react'
import { Space_Grotesk } from 'next/font/google'
import './styles.css'
import { ThemeProvider } from 'next-themes'
import FloatingNavTrigger from '@/components/Navigation/FloatingNavTrigger'
import { Analytics } from '@vercel/analytics/react'

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    display: 'swap',
})

export const metadata = {
    description: 'Ashish is a software engineer with a passion for building web applications and mobile apps.',
    title: 'Ashish',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
    const { children } = props

    return (
        <html lang="en" suppressHydrationWarning className={spaceGrotesk.className}>
            <body>
                <main className="min-h-screen flex items-center justify-center relative mx-auto max-w-7xl bg-dark-1la dark:bg-white">
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <FloatingNavTrigger />
                        {children}
                        <Analytics mode="auto" />
                    </ThemeProvider>
                </main>
            </body>
        </html>
    )
}
