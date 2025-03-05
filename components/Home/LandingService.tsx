"use client"
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Service1, Service2, Service3, Service4, ServiceLogo } from "../ReUsableComponents/Icons/Icons";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const LandingService = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

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

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    const handleWheel = (e: WheelEvent) => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        const currentScroll = container.scrollLeft;
        const isAtStart = currentScroll <= 0;
        const isAtEnd = currentScroll >= maxScroll - 10; // Adding small threshold
        
        // If at start and scrolling up, or at end and scrolling down, don't prevent default
        if ((isAtStart && e.deltaY < 0) || (isAtEnd && e.deltaY > 0)) {
            return;
        }

        // For horizontal scrolling
        e.preventDefault();
        if (isScrolling) return;

        const scrollAmount = 600; // Width of one image
        const newScrollPosition = scrollPosition + (e.deltaY > 0 ? scrollAmount : -scrollAmount);
        
        // Constrain scroll position
        const constrainedPosition = Math.max(0, Math.min(newScrollPosition, maxScroll));
        
        setIsScrolling(true);
        setScrollPosition(constrainedPosition);
        
        container.scrollTo({
            left: constrainedPosition,
            behavior: 'smooth'
        });

        // Reset scrolling flag after animation
        setTimeout(() => setIsScrolling(false), 500);
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, [scrollPosition, isScrolling]);

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <div className="h-screen flex flex-col items-center justify-start p-8 overflow-hidden">
            <div className="w-full flex flex-row items-center justify-between mb-8">
                <div className="flex flex-row items-center justify-start space-x-3">
                    <div className="text-[96px] tracking-[-4px] font-bold">OUR</div>
                    <div className="text-[96px] instrument-font text-[#CF1E00] font-serif italic">
                        SERVICES
                    </div>
                </div>

                <div className="text-[17px]">
                    We create impactful and high-performing <br /> ads that drive your
                    business growth.
                </div>
            </div>

            {/* Scroll Container */}
            <div 
                ref={scrollContainerRef}
                className="w-full overflow-x-hidden h-[500px] flex items-center"
            >
                <motion.div
                    ref={ref}
                    className="flex gap-6 h-full"
                >
                    {contents.map((item, index) => (
                        <motion.div
                            key={index}
                            className="relative min-w-[600px] h-full"
                            variants={itemVariants}
                            initial="hidden"
                            animate={controls}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="w-full h-full relative">
                                <Image 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="object-cover rounded-lg"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 600px"
                                    priority={index < 2}
                                />
                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white rounded-b-lg">
                                    <div className="flex justify-between items-end">
                                        <h3 className="text-2xl font-bold max-w-[250px]">{item.title}</h3>
                                        <p className="text-sm max-w-[250px] text-right">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
<div className="w-full">
    <Image src={ServiceLogo} alt="Service 5" className="mt-10" />
</div>
        </div>
    );
};

export default LandingService;