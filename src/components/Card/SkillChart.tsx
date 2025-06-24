'use client'
import React, { useEffect, useRef } from 'react'
import { TrendingUp, Target, Zap, Star, Code, Database } from 'lucide-react'

interface SkillData {
    name: string;
    level: number;
    category: string;
    color: string;
}

interface SkillChartProps {
    skills: SkillData[];
    className?: string;
}

const SkillChart = ({ skills, className = '' }: SkillChartProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const categoryIcons = {
        'frontend': <Code className="w-4 h-4" />,
        'backend': <TrendingUp className="w-4 h-4" />,
        'database': <Database className="w-4 h-4" />,
        'devops': <Zap className="w-4 h-4" />,
        'mobile': <Star className="w-4 h-4" />,
        'design': <Target className="w-4 h-4" />
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || skills.length === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const size = 300;
        canvas.width = size;
        canvas.height = size;

        const centerX = size / 2;
        const centerY = size / 2;
        const radius = size / 3;

        // Clear canvas
        ctx.clearRect(0, 0, size, size);

        // Draw background circles
        ctx.strokeStyle = 'rgba(156, 163, 175, 0.2)';
        ctx.lineWidth = 1;
        for (let i = 1; i <= 5; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, (radius * i) / 5, 0, 2 * Math.PI);
            ctx.stroke();
        }

        // Draw category lines
        const angleStep = (2 * Math.PI) / skills.length;
        ctx.strokeStyle = 'rgba(156, 163, 175, 0.3)';
        ctx.lineWidth = 1;
        skills.forEach((_, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.stroke();
        });

        // Draw skill polygon
        ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();

        skills.forEach((skill, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const skillRadius = (radius * skill.level) / 5;
            const x = centerX + Math.cos(angle) * skillRadius;
            const y = centerY + Math.sin(angle) * skillRadius;

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Draw skill points
        skills.forEach((skill, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const skillRadius = (radius * skill.level) / 5;
            const x = centerX + Math.cos(angle) * skillRadius;
            const y = centerY + Math.sin(angle) * skillRadius;

            ctx.fillStyle = skill.color;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });

    }, [skills]);

    const getLevelText = (level: number) => {
        const texts = ['Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert'];
        return texts[level - 1] || texts[0];
    };

    return (
        <div className={`flex flex-col items-center gap-6 p-6 bg-gradient-to-br from-background via-background to-muted/10 rounded-xl border border-border/50 ${className}`}>
            <div className='text-center'>
                <h3 className='text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2'>
                    Skill Proficiency
                </h3>
                <p className='text-sm text-muted-foreground'>
                    Visual representation of your expertise levels
                </p>
            </div>

            <div className='relative'>
                <canvas
                    ref={canvasRef}
                    className='w-[300px] h-[300px]'
                />

                {/* Center stats */}
                <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='text-center bg-background/80 backdrop-blur-sm rounded-full p-4 border border-border/50'>
                        <div className='text-2xl font-bold text-primary'>
                            {Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length * 20)}%
                        </div>
                        <div className='text-xs text-muted-foreground'>Avg. Proficiency</div>
                    </div>
                </div>
            </div>

            {/* Skill Legend */}
            <div className='grid grid-cols-2 gap-3 w-full max-w-md'>
                {skills.map((skill) => (
                    <div key={skill.name} className='flex items-center gap-2 p-2 rounded-lg bg-card/50 border border-border/30'>
                        <div
                            className='w-3 h-3 rounded-full'
                            style={{ backgroundColor: skill.color }}
                        />
                        <div className='flex-1 min-w-0'>
                            <div className='text-sm font-medium truncate'>{skill.name}</div>
                            <div className='text-xs text-muted-foreground'>{getLevelText(skill.level)}</div>
                        </div>
                        <div className='flex items-center gap-1'>
                            {categoryIcons[skill.category as keyof typeof categoryIcons] || <Code className="w-3 h-3" />}
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary Stats */}
            <div className='flex justify-between w-full max-w-md text-sm'>
                <div className='text-center'>
                    <div className='font-semibold text-primary'>{skills.length}</div>
                    <div className='text-muted-foreground'>Skills</div>
                </div>
                <div className='text-center'>
                    <div className='font-semibold text-primary'>
                        {Math.max(...skills.map(s => s.level))}/5
                    </div>
                    <div className='text-muted-foreground'>Highest</div>
                </div>
                <div className='text-center'>
                    <div className='font-semibold text-primary'>
                        {new Set(skills.map(s => s.category)).size}
                    </div>
                    <div className='text-muted-foreground'>Categories</div>
                </div>
            </div>
        </div>
    );
};

export default SkillChart;
