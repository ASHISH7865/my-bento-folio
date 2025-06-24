import React from 'react';
import { BentoGrid } from '@/components/ui/BentoGrid';
import InfoCard from '@/components/Card/InfoCard';
import TechStackComponent from '@/components/Card/TechStack';
import ContactLinks from '@/components/Contact/ContactLinks';
import BlogCardCompact from '@/components/Blog/BlogCardCompact';
import ProjectsCard from '@/components/Projects/ProjectsCard';
import { getPayload } from 'payload';
import payloadConfig from '@/payload.config';


export default async function HomePage() {
    const payload = await getPayload({ config: payloadConfig });

    const [profileData, techStackData, blogData, projectsData] = await Promise.all([
        payload.find({
            collection: 'profiles',
            limit: 1,
        }),
        payload.find({
            collection: 'tech-stack',
        }),
        payload.find({
            collection: 'blogs',
            where: {
                status: {
                    equals: 'published'
                }
            },
            sort: '-publishedAt',
            limit: 10,
        }),
        payload.find({
            collection: 'projects',
            depth: 2,
            sort: '-publishedAt',
            limit: 10,
        }).catch(() => ({ docs: [] })) // Fallback if collection doesn't exist
    ]);

    const cardClasses = "relative flex w-full h-full rounded-xl border dark:border-dark-5 border-dark-3 transform-gpu bg-dark-1 [box-shadow:0_0px_60px_-20px_#ffffff1f_inset] cursor-grab dark:bg-white ";

    return (
        <div className="flex items-center justify-center max-md:flex-col md:flex-row bg-transparent">
            <BentoGrid className="grid gap-3 grid-cols-1 md:grid-cols-8 md:grid-rows-5 p-5 max-md:p-4 md:h-[770px] relative w-full max-w-7xl max-md:gap-3 max-md:min-h-screen">
                <div className={`${cardClasses} h-full md:col-start-3 md:col-end-7 md:row-start-1 md:row-end-3 z-10`}>
                    <InfoCard profile={profileData.docs[0]} />
                </div>

                <div className={`${cardClasses} md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-5 z-10`}>
                    <TechStackComponent techStack={techStackData.docs} />
                </div>

                {/* Projects Card */}
                <div className={`${cardClasses} md:col-start-7 md:col-end-9 md:row-start-1 md:row-end-3 z-10`}>
                    <ContactLinks profile={profileData.docs[0]} />

                </div>

                {/* Contact Links Card */}
                <div className={`${cardClasses} md:col-start-3 md:col-end-6 md:row-start-3 md:row-end-5 z-10`}>
                    <ProjectsCard projects={projectsData.docs as any[]} />
                </div>

                {/* Blog Card */}
                <div className={`${cardClasses} md:col-start-6 md:col-end-9 md:row-start-3 md:row-end-5 z-10`}>
                    <BlogCardCompact blogs={blogData.docs} />
                </div>

                {/* Tools Card */}
                {/* <div className={`${cardClasses} sm:col-start-3 sm:col-end-5 sm:row-start-6 sm:row-end-5 z-10`}>
                </div>

                <div className={`${cardClasses} sm:col-start-6 sm:col-end-7 sm:row-start-1 sm:row-end-8 z-10`}>
                </div>

                <div className={`${cardClasses} sm:col-start-3 sm:col-end-5 sm:row-start-9 sm:row-end-8 z-10`}>
                </div>

                <div className={`${cardClasses} sm:col-start-5 sm:col-end-5 sm:row-start-6 sm:row-end-8 z-10`}>
                </div> */}


            </BentoGrid>
        </div>
    );
}
