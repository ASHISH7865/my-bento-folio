import React from 'react';
import { BentoGrid } from '@/components/ui/BentoGrid';
import InfoCard from '@/components/Card/InfoCard';
import { Profile, TechStack } from '@/payload-types';
import TechStackComponent from '@/components/Card/TechStack';
import { getPayload } from 'payload';
import payloadConfig from '@/payload.config';


export default async function HomePage() {
    const payload = await getPayload({ config: payloadConfig });

    const [profileData, techStackData] = await Promise.all([
        payload.find({
            collection: 'profiles',
            limit: 1,
        }),
        payload.find({
            collection: 'tech-stack',
        })
    ]);

    const cardClasses = "relative flex w-full rounded-xl border dark:border-dark-5 border-dark-3 transform-gpu bg-dark-1 [box-shadow:0_0px_60px_-20px_#ffffff1f_inset] cursor-grab dark:bg-white max-sm:h-max";

    return (
            <BentoGrid className="grid gap-3 grid-cols-1 sm:grid-cols-8 sm:grid-rows-5 p-5 max-sm:p-4 sm:h-[770px] relative w-full max-sm:gap-3 max-sm:min-h-screen">
                <div className={`${cardClasses} sm:col-start-3 sm:col-end-7 sm:row-start-1 sm:row-end-3 z-10`}>
                    <InfoCard profile={profileData.docs[0]} />
                </div>

                <div className={`${cardClasses} sm:col-start-1 sm:col-end-3 sm:row-start-1 sm:row-end-5 z-10`}>
                    <TechStackComponent techStack={techStackData.docs} />
                </div>



                {/* Tools Card */}
                {/* <div className={`${cardClasses} sm:col-start-3 sm:col-end-5 sm:row-start-6 sm:row-end-6 z-10`}>
                </div>

                <div className={`${cardClasses} sm:col-start-6 sm:col-end-7 sm:row-start-1 sm:row-end-8 z-10`}>
                </div>

                <div className={`${cardClasses} sm:col-start-3 sm:col-end-5 sm:row-start-9 sm:row-end-8 z-10`}>
                </div>

                <div className={`${cardClasses} sm:col-start-5 sm:col-end-5 sm:row-start-6 sm:row-end-8 z-10`}>
                </div> */}


            </BentoGrid>

    );
}
