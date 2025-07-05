'use client'
import { Code } from 'lucide-react'
import React from 'react'
import { Badge } from '../ui/badge'
import { TechStack as TechStackType } from '@/payload-types'

interface TechStackProps {
    techStack: TechStackType[]
}

const TechStack = ({ techStack }: TechStackProps) => {
    // Convert array of tech stack items into an object grouped by category
    const groupedTechStack = techStack.reduce((acc: Record<string, string[]>, item) => {
        return {
            ...acc,
            [item.category]: item.skills?.map(skill => skill?.name).filter((name): name is string => Boolean(name)) || []
        }
    }, {} as Record<string, string[]>);

    return (
        <div className='flex flex-col gap-4 p-4 group border rounded-xl'>
            <div className='flex md:flex-col items-center md:items-start gap-2'>
                <Code className='w-8 h-8 md:w-16 md:h-16' />
                <div className='flex md:flex-col gap-2'>
                    <span className='text-2xl md:text-5xl font-bold'>Tech</span>
                    <span className='text-2xl md:text-5xl font-bold'>Stack</span>
                    <div className='md:block hidden h-1 bg-primary rounded-full w-0 group-hover:w-full transition-all duration-500 ease-in-out'></div>
                </div>
            </div>
            <div className='h-[400px] overflow-y-auto pr-4 scrollbar-custom'>
                {Object.entries(groupedTechStack).map(([category, skills]) => (
                    <div key={category} className='space-y-2 mb-4'>
                        <p className='capitalize'>{category}</p>
                        <div className='flex flex-wrap gap-2'>
                            {skills.map((skill: string) => (
                                <Badge variant="outline" className='rounded-none px-0.5' key={skill}>
                                    <Badge variant="outline" className='rounded-none' key={skill}>{skill}</Badge>
                                </Badge>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TechStack
