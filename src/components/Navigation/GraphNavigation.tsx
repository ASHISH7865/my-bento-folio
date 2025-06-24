'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, User, Code, BookOpen, Mail, FileText, Briefcase } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NavNode {
    id: string
    label: string
    href: string
    icon: React.ComponentType<any>
    x: number
    y: number
    connections: string[]
}

const navigationNodes: NavNode[] = [
    {
        id: 'home',
        label: 'Home',
        href: '/',
        icon: Home,
        x: 50,
        y: 50,
        connections: ['about', 'projects', 'blog', 'contact']
    },
    {
        id: 'about',
        label: 'About',
        href: '/about',
        icon: User,
        x: 20,
        y: 20,
        connections: ['home', 'resume']
    },
    {
        id: 'projects',
        label: 'Projects',
        href: '/projects',
        icon: Code,
        x: 80,
        y: 20,
        connections: ['home', 'blog']
    },
    {
        id: 'blog',
        label: 'Blog',
        href: '/blog',
        icon: BookOpen,
        x: 80,
        y: 80,
        connections: ['home', 'projects']
    },
    {
        id: 'contact',
        label: 'Contact',
        href: '/contact',
        icon: Mail,
        x: 20,
        y: 80,
        connections: ['home', 'resume']
    },
    {
        id: 'resume',
        label: 'Resume',
        href: '/resume',
        icon: FileText,
        x: 50,
        y: 15,
        connections: ['about', 'contact']
    }
]

interface GraphNavigationProps {
    isOpen: boolean
    onClose: () => void
    currentPath: string
}

const GraphNavigation: React.FC<GraphNavigationProps> = ({ isOpen, onClose, currentPath }) => {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null)
    const [selectedNode, setSelectedNode] = useState<string>('home')
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, opacity: number }>>([])
    const containerRef = useRef<HTMLDivElement>(null)

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            return () => document.removeEventListener('keydown', handleEscape)
        }
    }, [isOpen, onClose])

    // Mouse tracking for interactive effects
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                setMousePosition({
                    x: ((e.clientX - rect.left) / rect.width) * 100,
                    y: ((e.clientY - rect.top) / rect.height) * 100
                })
            }
        }

        if (isOpen && containerRef.current) {
            containerRef.current.addEventListener('mousemove', handleMouseMove)
            return () => containerRef.current?.removeEventListener('mousemove', handleMouseMove)
        }
    }, [isOpen])

    // Particle system
    useEffect(() => {
        if (!isOpen) return

        const interval = setInterval(() => {
            setParticles(prev => {
                const newParticles = prev
                    .map(p => ({ ...p, opacity: p.opacity - 0.02 }))
                    .filter(p => p.opacity > 0)

                // Add new particle occasionally
                if (Math.random() < 0.3) {
                    newParticles.push({
                        id: Date.now(),
                        x: Math.random() * 100,
                        y: Math.random() * 100,
                        opacity: 0.6
                    })
                }

                return newParticles
            })
        }, 100)

        return () => clearInterval(interval)
    }, [isOpen])

    // Update selected node based on current path
    useEffect(() => {
        const currentNode = navigationNodes.find(node =>
            node.href === currentPath ||
            (currentPath.startsWith(node.href) && node.href !== '/')
        )
        if (currentNode) {
            setSelectedNode(currentNode.id)
        }
    }, [currentPath])

    const getConnections = (nodeId: string) => {
        const node = navigationNodes.find(n => n.id === nodeId)
        return node?.connections || []
    }

    const isConnected = (nodeId: string, targetId: string) => {
        return getConnections(nodeId).includes(targetId) || getConnections(targetId).includes(nodeId)
    }

    const renderConnections = () => {
        const connections: React.ReactElement[] = []
        const processed = new Set<string>()

        navigationNodes.forEach(node => {
            node.connections.forEach(connectionId => {
                const connectionKey = [node.id, connectionId].sort().join('-')
                if (!processed.has(connectionKey)) {
                    processed.add(connectionKey)
                    const targetNode = navigationNodes.find(n => n.id === connectionId)
                    if (targetNode) {
                        const isHighlighted = hoveredNode &&
                            (hoveredNode === node.id || hoveredNode === targetNode.id)

                        connections.push(
                            <g key={connectionKey}>
                                {/* Main connection line */}
                                <motion.line
                                    x1={`${node.x}%`}
                                    y1={`${node.y}%`}
                                    x2={`${targetNode.x}%`}
                                    y2={`${targetNode.y}%`}
                                    stroke="currentColor"
                                    strokeWidth={isHighlighted ? "3" : "1"}
                                    className={cn(
                                        "transition-all duration-300",
                                        isHighlighted
                                            ? "text-primary opacity-80"
                                            : "text-muted-foreground opacity-30"
                                    )}
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: isHighlighted ? 0.8 : 0.3 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                />

                                {/* Glowing effect when highlighted */}
                                {isHighlighted && (
                                    <motion.line
                                        x1={`${node.x}%`}
                                        y1={`${node.y}%`}
                                        x2={`${targetNode.x}%`}
                                        y2={`${targetNode.y}%`}
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        className="text-primary opacity-20"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                    />
                                )}

                                {/* Data flow animation */}
                                {isHighlighted && (
                                    <motion.circle
                                        r="3"
                                        fill="currentColor"
                                        className="text-primary"
                                        initial={{
                                            cx: `${node.x}%`,
                                            cy: `${node.y}%`,
                                            opacity: 0
                                        }}
                                        animate={{
                                            cx: `${targetNode.x}%`,
                                            cy: `${targetNode.y}%`,
                                            opacity: [0, 1, 0]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                )}
                            </g>
                        )
                    }
                }
            })
        })

        return connections
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={containerRef}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md overflow-hidden"
                    onClick={onClose}
                >
                    {/* Background Grid */}
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full">
                            <defs>
                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                    </div>

                    {/* Floating Particles */}
                    <div className="absolute inset-0 pointer-events-none">
                        {particles.map(particle => (
                            <motion.div
                                key={particle.id}
                                className="absolute w-1 h-1 bg-primary rounded-full"
                                style={{
                                    left: `${particle.x}%`,
                                    top: `${particle.y}%`,
                                    opacity: particle.opacity
                                }}
                                animate={{
                                    y: [0, -20],
                                    opacity: [particle.opacity, 0]
                                }}
                                transition={{
                                    duration: 3,
                                    ease: "easeOut"
                                }}
                            />
                        ))}
                    </div>

                    {/* Mouse follower effect */}
                    <motion.div
                        className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-primary/20 to-transparent pointer-events-none blur-xl"
                        style={{
                            left: `${mousePosition.x}%`,
                            top: `${mousePosition.y}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                        animate={{
                            scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    <div
                        className="relative w-full max-w-4xl h-96 mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <svg className="absolute inset-0 w-full h-full">
                            <defs>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                            {renderConnections()}
                        </svg>

                        {navigationNodes.map((node, index) => {
                            const Icon = node.icon
                            const isActive = selectedNode === node.id
                            const isHovered = hoveredNode === node.id
                            const isConnectedToHovered = hoveredNode && isConnected(node.id, hoveredNode)

                            return (
                                <motion.div
                                    key={node.id}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: 1,
                                        scale: isActive ? 1.2 : isHovered ? 1.1 : 1,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        delay: index * 0.1,
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20
                                    }}
                                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                                    style={{
                                        left: `${node.x - 4}%`,
                                        top: `${node.y - 10}%`,
                                    }}
                                    onMouseEnter={() => setHoveredNode(node.id)}
                                    onMouseLeave={() => setHoveredNode(null)}
                                >
                                    <Link href={node.href} onClick={onClose}>
                                        <motion.div
                                            className={cn(
                                                "relative flex flex-col items-center group cursor-pointer",
                                                "transition-all duration-300"
                                            )}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <div
                                                className={cn(
                                                    "w-16 h-16 rounded-full flex items-center justify-center relative",
                                                    "border-2 transition-all duration-300",
                                                    "backdrop-blur-sm overflow-hidden",
                                                    isActive
                                                        ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-primary shadow-2xl"
                                                        : isHovered || isConnectedToHovered
                                                            ? "bg-gradient-to-br from-primary/30 to-primary/10 border-primary text-primary shadow-lg"
                                                            : "bg-gradient-to-br from-muted/70 to-muted/30 border-border text-muted-foreground hover:bg-muted shadow-md"
                                                )}
                                            >
                                                {/* Icon with enhanced animations */}
                                                <motion.div
                                                    className="relative z-10"
                                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                                >
                                                    <Icon className="w-6 h-6" />
                                                </motion.div>

                                                {/* Sparkle effect for active node */}
                                                {isActive && (
                                                    <>
                                                        {[...Array(3)].map((_, i) => (
                                                            <motion.div
                                                                key={i}
                                                                className="absolute w-1 h-1 bg-white rounded-full"
                                                                style={{
                                                                    top: `${20 + i * 20}%`,
                                                                    left: `${20 + i * 20}%`,
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
                                            </div>

                                            <motion.span
                                                className={cn(
                                                    "mt-2 text-sm font-medium text-center",
                                                    "transition-all duration-300",
                                                    isActive
                                                        ? "text-primary"
                                                        : "text-muted-foreground group-hover:text-foreground"
                                                )}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: (index * 0.1) + 0.2 }}
                                            >
                                                {node.label}
                                            </motion.span>

                                        </motion.div>
                                    </Link>
                                </motion.div>
                            )
                        })}

                        {/* Enhanced Close button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                            onClick={onClose}
                            className="fixed top-6 right-6 w-12 h-12 rounded-full bg-background/50 backdrop-blur-md border border-border/50 hover:bg-destructive/10 hover:border-destructive/30 flex items-center justify-center transition-all duration-300 group shadow-lg"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <motion.span
                                className="text-lg text-muted-foreground group-hover:text-destructive transition-colors"
                                whileHover={{ rotate: 90 }}
                                transition={{ duration: 0.2 }}
                            >
                                ×
                            </motion.span>

                            {/* Close button glow effect */}
                            <motion.div
                                className="absolute inset-0 rounded-full bg-destructive/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.button>

                        {/* Keyboard shortcut hint */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="fixed top-6 right-20 transform -translate-x-1/2 bg-background/30 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border/30 text-xs text-muted-foreground"
                        >
                            Press <kbd className="px-1.5 py-0.5 bg-muted/50 rounded text-xs border border-border/50">ESC</kbd> to close
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default GraphNavigation
