import React from 'react';
import Image from 'next/image';
import { AdinnLogoBlack } from '../ReUsableComponents/Icons/Icons';
import shape from '@/public/shape.svg';
import HomeIcon from '@/public/HomeAdinn.svg';
import Background from '@/public/image.svg';

const LandingHero = () => {
    return (
        <div className="p-2 md:p-4 lg:p-6">
            <div className="relative flex flex-col border-none items-center justify-start bg-[#121212] h-screen w-full rounded-lg overflow-hidden">
                {/* Video Background */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover"
                >
                    <source src="/LandingBackground.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Wavy Shape Container */}
                <div className="relative w-full max-w-[700px] px-7  md:px-8 flex items-center justify-center z-10 border-none" >
                    {/* Wavy Shape Image */}
                    <div className="w-full relative">
                        <Image
                            src={shape}
                            alt="Wave"
                            layout="responsive"
                            width={700}
                            height={300}
                            className="w-full"
                            priority
                        />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <Image
                                src={AdinnLogoBlack}
                                alt="Adinn Logo"
                                width={150}
                                height={35}
                                className="w-[40%] max-w-[150px] min-w-[80px] h-auto "
                                priority
                            />
                        </div>
                    </div>
                </div>

                <div className="relative h-screen  flex items-center justify-center">
    {/* Background Image */}
    <Image 
        src={Background}
        alt="Landing Background"
        width={600}
        height={150}
        priority
    />

    {/* Home Icon on Top */}
    <div className="absolute z-10 inset-0 flex items-center justify-center"> {/* Center the icon */}
        <Image
            src={HomeIcon}
            alt="Home Icon"
            width={100} 
            height={100}
            className="object-contain w-full h-full" 
            priority
        />
    </div>
</div>

            </div>
        </div>
    );
};

export default LandingHero;
