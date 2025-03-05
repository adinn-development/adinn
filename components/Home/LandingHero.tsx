"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AdinnLogoBlack } from '../ReUsableComponents/Icons/Icons';
import shape from '@/public/shape.svg';
import Background from '@/public/image.svg';

const LandingHero = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        // Lock initial scroll
        document.body.style.overflow = 'hidden';
        let lastScrollTime = Date.now();
        let animationFrameId: number;
        let targetProgress = 0;
        let currentProgress = 0;
        let velocity = 0;
        const SCROLL_SENSITIVITY = 0.2; // Increased sensitivity
        const SPRING_TENSION = 0.1;  // More responsive spring
        const DAMPING = 0.85; // Smooth damping
        
        const easeOutExpo = (x: number) => {
            return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
        };

        const smoothProgress = () => {
            const diff = targetProgress - currentProgress;
            velocity += diff * SPRING_TENSION;
            velocity *= DAMPING;
            
            if (Math.abs(diff) > 0.001 || Math.abs(velocity) > 0.001) {
                currentProgress += velocity;
                currentProgress = Math.min(100, Math.max(0, currentProgress));
                const easedProgress = easeOutExpo(currentProgress / 100) * 100;
                setScrollProgress(easedProgress);
                animationFrameId = requestAnimationFrame(smoothProgress);
            } else {
                currentProgress = targetProgress;
                setScrollProgress(currentProgress);
            }
        };

        const handleScroll = (e: WheelEvent) => {
            const now = Date.now();
            if (now - lastScrollTime < 16) return;
            lastScrollTime = now;

            if (!animationComplete) {
                e.preventDefault();
                const scrollDelta = e.deltaY * SCROLL_SENSITIVITY;
                targetProgress = Math.min(100, Math.max(0, targetProgress + scrollDelta));
                
                cancelAnimationFrame(animationFrameId);
                animationFrameId = requestAnimationFrame(smoothProgress);

                if (targetProgress >= 100) {
                    setScrollProgress(100);
                    setAnimationComplete(true);
                    document.body.style.overflow = 'auto';
                    window.scrollTo({
                        top: window.innerHeight,
                        behavior: 'smooth'
                    });
                }
            } else if (window.scrollY <= 0 && e.deltaY < 0) {
                e.preventDefault();
                setAnimationComplete(false);
                document.body.style.overflow = 'hidden';
                targetProgress = 0;      // Reset target
                currentProgress = 0;     // Reset current position
                velocity = 0;           // Reset momentum
                setScrollProgress(0);    // Reset state
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        };

        const enableScrolling = () => {
            if (animationComplete) {
                document.body.style.overflow = 'auto';
            }
        };

        // Handle both wheel and touch events
        window.addEventListener('wheel', handleScroll, { passive: false });
        window.addEventListener('scroll', enableScrolling);

        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('wheel', handleScroll);
            window.removeEventListener('scroll', enableScrolling);
            cancelAnimationFrame(animationFrameId);
        };
    }, [animationComplete]);

    useEffect(() => {
        if (animationComplete) {
            document.body.style.overflow = 'auto';
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        } else {
            document.body.style.overflow = 'hidden';
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [animationComplete]);

    return (
        <div className="p-2 md:p-4 lg:p-6" id="landing-hero">
            <div className="relative flex flex-col border-none items-center justify-start bg-[#121212] h-screen w-full rounded-lg overflow-hidden">
                {/* Video Background */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-700 ease-out"
                    style={{ opacity: 1 - (scrollProgress / 100) }}
                >
                    <source src="/LandingBackground.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Full Background Image */}
                <div 
                    className="absolute inset-0 w-full h-full transition-all duration-700 ease-out"
                    style={{
                        opacity: scrollProgress / 100,
                        transform: `scale(${1 + (scrollProgress * 0.005)})`,
                    }}
                >
                    <Image 
                        src={Background}
                        alt="Background"
                        fill
                        className="object-cover w-full h-full"
                        sizes="100vw"
                        priority
                    />
                </div>

                {/* Wavy Shape Container */}
                <div className="relative w-full max-w-[700px] px-7 md:px-8 flex items-center justify-center z-10 border-none">
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
                                className="w-[40%] max-w-[150px] min-w-[80px] h-auto"
                                priority
                            />
                        </div>
                    </div>
                </div>

                <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                    {/* Text with Image Mask */}
                    <h1 
                        className="font-bold text-[20vw] bg-clip-text text-transparent relative z-10 transition-all duration-[1500ms] ease-out"
                        style={{
                            backgroundImage: `url(${Background.src})`,
                            WebkitBackgroundClip: 'text',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            WebkitTextFillColor: 'transparent',
                            transform: `scale(${1 + (scrollProgress * 0.015)})`,
                            opacity: scrollProgress < 90 ? 1 : 1 - ((scrollProgress - 90) * 0.1),
                        }}
                    >
                        Adinn
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default LandingHero;