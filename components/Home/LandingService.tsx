"use client"
import React from "react";
import Image from "next/image";
import { Service1, Service2, Service3, Service4 } from "../ReUsableComponents/Icons/Icons";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const LandingService = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    React.useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    const contents = [
        {
            title: 'OOH & Outdoor Media Solutions',
            description: 'Redefining luxury in audio with advanced technology and exquisite design.',
            image: Service1
        },
        {
            title: 'Media Buying & Planning™',
            description: 'Redefining luxury in audio with advanced technology and exquisite design.',
            image: Service2
        },
        {
            title: 'Exhibition Services™',
            description: 'Redefining luxury in audio with advanced technology and exquisite design.',
            image: Service3
        },
        {
            title: 'Digital Marketing',
            description: 'Redefining luxury in audio with advanced technology and exquisite design.',
            image: Service4
        },
    ];

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <div className="h-screen items-center justify-center">
            <div className="flex flex-row items-center justify-between p-4">
                <div className="flex flex-row items-center justify-start space-x-3">
                    <div className="text-[96px] tracking-[-4px] font-bold">OUR</div>
                    <div className="text-[96px] instrument-font text-[#CF1E00] font-serif italic">
                        SERVICES
                    </div>
                </div>

                <div className="text-[24px]">
                    We create impactful and high-performing <br /> ads that drive your
                    business growth.
                </div>
            </div>

            {/* photos */}
            <div ref={ref} className="flex flex-row
            flex-nowrap overflow-hidden gap-6 mt-10">
                {contents.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center text-center space-y-4 "
                        variants={itemVariants}
                        initial="hidden"
                        animate={controls}
                    >
                        <Image src={item.image} alt={item.title}  className="object-contain w-full h-full" />
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <p className="text-gray-600 text-sm max-w-xs">{item.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default LandingService;