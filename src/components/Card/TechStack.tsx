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
    const groupedTechStack = techStack.reduce((acc , item) => {
        return {
            ...acc,
            [item.category]: item.skills?.map(skill => skill.name).filter(Boolean) || []
        }
    }, {} as Record<string, string[]>);

    return (
        <div className='flex flex-col gap-4 p-4 group'>
            <div className='flex flex-col gap-2'>
                <Code className='w-12 h-12' />
                <div className='flex flex-col gap-2'>
                    <span className='text-5xl font-bold'>Tech</span>
                    <span className='text-5xl font-bold'>Stack</span>
                    <div className='h-1 bg-gray-200 rounded-full w-0 group-hover:w-full transition-all duration-500 ease-in-out'></div>
                </div>
            </div>
            <div className='h-[400px] overflow-y-auto pr-4 scrollbar-custom'>
                {Object.entries(groupedTechStack).map(([category, skills]) => (
                    <div key={category} className='space-y-2 mb-4'>
                        <p className='capitalize'>{category} :</p>
                        <div className='flex flex-wrap gap-2'>
                            {skills.map((skill: string) => (
                                <Badge variant="outline" className='rounded-full' key={skill}>{skill}</Badge>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TechStack
