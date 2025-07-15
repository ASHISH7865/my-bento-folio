'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { MapPin, Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import { MorphingText } from '@/components/ui/morphing-text'
import { Media, Profile } from '@/payload-types'
import Link from 'next/link'


interface InfoCardProps {
    className?: string
    profile: Profile
}

const InfoCard = ({ className, profile }: InfoCardProps) => {
    const { theme, setTheme } = useTheme()
    const [currentTime, setCurrentTime] = useState<Date | null>(null)
    const [isMounted, setIsMounted] = useState(false)

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    useEffect(() => {
        setIsMounted(true)
        setCurrentTime(new Date())
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])


    return (
        <div
            className={cn(
                className,
                'flex flex-col h-full overflow-hidden border rounded-xl size-full relative z-10 p-5 items-start justify-between gap-4  max-sm:gap-4',
            )}
        >
            <div className="w-full flex flex-col justify-between items-start">
                <div className='flex gap-2 w-full justify-between'>

                    <div className="flex gap-3">
                        <Image
                            className="rounded-full size-16 object-cover"
                            src={(profile.image as Media)?.cloudinary?.secure_url as string}
                            alt={`${profile.name}'s profile`}
                            width={64}
                            height={64}
                        />
                        <div className="flex flex-col">
                            <span className="font-bold text-lg">{profile.name}</span>
                            <span className="text-md font-mono dark:text-black/70 text-zinc-400/80">
                                {profile.username}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className='flex gap-2 items-center'>
                            <Button className="rounded-full" variant={'ghost'} onClick={toggleTheme}>
                                {theme === 'dark' ? <Sun /> : <Moon />}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Location and Navigation Links */}
                <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 w-full items-start sm:items-center justify-between'>
                    <div className="flex items-center gap-1 text-sm text-zinc-500">
                        <MapPin className="text-blue-500" size={14} />
                        <span>Noida, India</span>
                        <span className="text-xs">(GMT+5:30)</span>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href="/resume"
                            className="group px-3 py-1.5 text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100"
                        >
                            Resume
                        </Link>
                        <div className="h-4 w-[1px] my-auto bg-zinc-200 dark:bg-zinc-700" />
                        <Link
                            href="/about"
                            className="group px-3 py-1.5 text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100"
                        >
                            About Me
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-1 overflow-hidden w-full">
                <div className="font-bold w-full flex items-center justify-start gap-1">
                    <p className="inline text-lg">I build</p>
                    <div className="min-w-[5.5rem]">
                        <MorphingText texts={profile.specialties?.map((specialty) => specialty?.text || '') || []} />
                    </div>
                    <span>.</span>
                </div>

                <p className="text-xs flex flex-col gap-2 text-md font-mono dark:text-black/90 text-zinc-200/90">
                    {profile.bio?.map((bio, i) => (
                        <span key={i}>{bio?.text}</span>
                    ))}
                </p>
            </div>

            <div className="flex justify-between w-full gap-5 items-end self-end">
                <div className="">
                    <p className="text-xs font-mono dark:text-black/70 text-zinc-400/70  text-black dark:text-black">{profile.tagline}</p>
                </div>

                <div className="right-8 flex flex-col gap-3">
                    <div className="font-mono flex justify-end items-center gap-1 text-sm text-zinc-400 dark:text-black/70">
                        <div
                            className={cn(
                                'h-1.5 w-1.5 rounded-full',
                                profile.availability?.status ? 'bg-green-500' : 'bg-red-500',
                            )}
                        ></div>
                        <p className="text-[11px] text-nowrap">{profile.availability?.text}</p>
                    </div>

                    <div className="flex flex-row-reverse items-end gap-3">
                        {isMounted && currentTime ? (
                            <>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm font-medium">
                                            {currentTime.toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true,
                                            })}
                                        </span>
                                        <span className="text-[10px] text-zinc-400">
                                            {currentTime.toLocaleTimeString('en-US', {
                                                second: '2-digit',
                                            })}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-[10px] text-zinc-400">
                                    {currentTime.toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </div>
                            </>
                        ) : (
                            <div className="h-8 w-32 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-700" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoCard
