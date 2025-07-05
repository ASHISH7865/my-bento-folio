'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Navigation } from 'lucide-react'
import { usePathname } from 'next/navigation'
import GraphNavigation from './GraphNavigation'
import { cn } from '@/lib/utils'
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts'

const FloatingNavTrigger = () => {
    const [isNavOpen, setIsNavOpen] = useState(false)
    const pathname = usePathname()

    const toggleNav = () => setIsNavOpen(!isNavOpen)
    const closeNav = () => setIsNavOpen(false)

    // Keyboard shortcuts
    useKeyboardShortcuts({
        onNavigationToggle: toggleNav
    })

    return (
        <>
            {/* Floating Trigger Button */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
                className="fixed bottom-8 right-8 z-40 sm:top-6 sm:right-6 h-fit"
            >
                <motion.button
                    onClick={toggleNav}
                    className={cn(
                        "group relative w-16 h-16 rounded-full",
                        "bg-gradient-to-br from-background via-background to-background/80 backdrop-blur-xl border border-border/30",
                        "shadow-2xl hover:shadow-primary/20 transition-all duration-500",
                        "flex items-center justify-center overflow-hidden",
                        "hover:bg-gradient-to-br hover:from-primary/5 hover:to-primary/10 hover:border-primary/50"
                    )}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                >
                    {/* Animated Background Gradient */}
                    <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 via-transparent to-primary/10"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Background Glow */}
                    <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: isNavOpen ? [0.3, 0.6, 0.3] : [0, 0.3, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Icon Container */}
                    <div className="relative z-10">
                        <motion.div
                            animate={{
                                rotate: isNavOpen ? 180 : 0,
                                scale: isNavOpen ? 1.1 : 1
                            }}
                            transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                        >
                            {isNavOpen ? (
                                <motion.div
                                    initial={{ scale: 0, rotate: -90 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <X className="w-7 h-7 text-foreground" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ scale: 0, rotate: 90 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Navigation className="w-7 h-7 text-foreground" />
                                </motion.div>
                            )}
                        </motion.div>
                    </div>

                    {/* Multiple Pulse Rings */}
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-primary/40"
                        initial={{ scale: 1, opacity: 0 }}
                        animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0, 0.6, 0]
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    <motion.div
                        className="absolute inset-0 rounded-full border border-primary/20"
                        initial={{ scale: 1, opacity: 0 }}
                        animate={{
                            scale: [1, 1.8, 1],
                            opacity: [0, 0.3, 0]
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                        }}
                    />

                    {/* Sparkle Effects */}
                    {!isNavOpen && (
                        <>
                            {[...Array(4)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-1 h-1 bg-primary rounded-full"
                                    style={{
                                        top: `${25 + Math.sin(i * Math.PI / 2) * 20}%`,
                                        left: `${25 + Math.cos(i * Math.PI / 2) * 20}%`,
                                    }}
                                    animate={{
                                        scale: [0, 1, 0],
                                        opacity: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.3,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                        </>
                    )}
                </motion.button>
            </motion.div>

            {/* Graph Navigation Component */}
            <GraphNavigation
                isOpen={isNavOpen}
                onClose={closeNav}
                currentPath={pathname}
            />
        </>
    )
}

export default FloatingNavTrigger
