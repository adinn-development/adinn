"use client";
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { AdinnLogoBlack } from '../ReUsableComponents/Icons/Icons';
import shape from '@/public/shape.svg';
import Background from '@/public/image.svg';

// Lazy load the video component with no SSR to prevent server-side rendering
const VideoBackground = dynamic(() => import('./VideoBackground'), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#121212]" />
});

const LandingHero = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const animationFrameIdRef = useRef<number | undefined>(undefined);
    const targetProgressRef = useRef<number>(0);
    const currentProgressRef = useRef<number>(0);
    const velocityRef = useRef<number>(0);
    const lastScrollTimeRef = useRef<number>(Date.now());
    const SCROLL_SENSITIVITY = 0.2;
    const SPRING_TENSION = 0.1;
    const DAMPING = 0.85;
    const lastRenderTimeRef = useRef<number>(0);
    const FPS_LIMIT = 30; // Limit animation to 30 FPS for better performance
    const FRAME_MIN_TIME = 1000 / FPS_LIMIT;
    
    // Set isClient to true once component mounts
    useEffect(() => {
        setIsClient(true);
    }, []);
    
    // Memoize the easing function
    const easeOutExpo = useCallback((x: number) => {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    }, []);
    
    // Memoize style objects to prevent unnecessary recalculations
    const videoStyle = useMemo(() => ({ 
        opacity: 1 - (scrollProgress / 100) 
    }), [scrollProgress]);
    
    const backgroundStyle = useMemo(() => ({
        opacity: scrollProgress / 100,
        transform: `scale(${1 + (scrollProgress * 0.005)})`,
    }), [scrollProgress]);
    
    const textStyle = useMemo(() => ({
        backgroundImage: `url(${Background.src})`,
        WebkitBackgroundClip: 'text',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        WebkitTextFillColor: 'transparent',
        transform: `scale(${1 + (scrollProgress * 0.015)})`,
        opacity: scrollProgress < 90 ? 1 : 1 - ((scrollProgress - 90) * 0.1),
    }), [scrollProgress, Background.src]);

    // Debounced scroll progress update to reduce state updates
    const updateScrollProgress = useCallback((value: number) => {
        // Only update if the change is significant (> 0.5%)
        if (Math.abs(value - scrollProgress) > 0.5) {
            // Limit FPS for smoother performance
            const now = performance.now();
            if (now - lastRenderTimeRef.current >= FRAME_MIN_TIME) {
                lastRenderTimeRef.current = now;
                setScrollProgress(value);
            }
        }
    }, [scrollProgress]);

    // Smooth animation function with useCallback to prevent recreation
    const smoothProgress = useCallback(() => {
        const diff = targetProgressRef.current - currentProgressRef.current;
        velocityRef.current += diff * SPRING_TENSION;
        velocityRef.current *= DAMPING;
        
        if (Math.abs(diff) > 0.001 || Math.abs(velocityRef.current) > 0.001) {
            currentProgressRef.current += velocityRef.current;
            currentProgressRef.current = Math.min(100, Math.max(0, currentProgressRef.current));
            const easedProgress = easeOutExpo(currentProgressRef.current / 100) * 100;
            updateScrollProgress(easedProgress);
            animationFrameIdRef.current = requestAnimationFrame(smoothProgress);
        } else {
            currentProgressRef.current = targetProgressRef.current;
            updateScrollProgress(currentProgressRef.current);
        }
    }, [easeOutExpo, updateScrollProgress]);

    // Optimized scroll handler with useCallback and passive event listener where possible
    const handleScroll = useCallback((e: WheelEvent) => {
        const now = Date.now();
        // Throttle scroll events more aggressively
        if (now - lastScrollTimeRef.current < 32) return;
        lastScrollTimeRef.current = now;

        if (!animationComplete) {
            e.preventDefault();
            const scrollDelta = e.deltaY * SCROLL_SENSITIVITY;
            targetProgressRef.current = Math.min(100, Math.max(0, targetProgressRef.current + scrollDelta));
            
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
            animationFrameIdRef.current = requestAnimationFrame(smoothProgress);

            if (targetProgressRef.current >= 100) {
                updateScrollProgress(100);
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
            targetProgressRef.current = 0;
            currentProgressRef.current = 0;
            velocityRef.current = 0;
            updateScrollProgress(0);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [animationComplete, smoothProgress, updateScrollProgress]);

    // Optimized enableScrolling function with useCallback
    const enableScrolling = useCallback(() => {
        if (animationComplete) {
            document.body.style.overflow = 'auto';
        }
    }, [animationComplete]);

    // Main effect for scroll handling - only run on client
    useEffect(() => {
        if (!isClient) return;
        
        // Lock initial scroll
        document.body.style.overflow = 'hidden';
        
        // Handle both wheel and touch events
        window.addEventListener('wheel', handleScroll, { passive: false });
        window.addEventListener('scroll', enableScrolling, { passive: true });

        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('wheel', handleScroll);
            window.removeEventListener('scroll', enableScrolling);
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, [handleScroll, enableScrolling, isClient]);

    // Effect for handling animation completion state - only run on client
    useEffect(() => {
        if (!isClient) return;
        
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
    }, [animationComplete, isClient]);

    return (
        <div className="p-2 md:p-4 lg:p-6" id="landing-hero">
            <div className="relative flex flex-col border-none items-center justify-start bg-[#121212] h-screen w-full rounded-lg overflow-hidden">
                {/* Video Background - lazy loaded */}
                {isClient && (
                    <VideoBackground style={videoStyle} />
                )}

                {/* Full Background Image - with optimized loading */}
                <div 
                    className="absolute inset-0 w-full h-full transition-all duration-700 ease-out"
                    style={backgroundStyle}
                >
                    <Image 
                        src={Background}
                        alt="Background"
                        fill
                        className="object-cover w-full h-full"
                        sizes="100vw"
                        priority
                        loading="eager"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxMjEyMTIiLz48L3N2Zz4="
                    />
                </div>

                {/* Wavy Shape Container - with optimized loading */}
                <div className="relative w-full max-w-[700px] px-7 md:px-8 flex items-center justify-center z-10 border-none">
                    <div className="w-full relative">
                        <Image
                            src={shape}
                            alt="Wave"
                            width={700}
                            height={300}
                            className="w-full"
                            priority
                            loading="eager"
                            placeholder="blur"
                            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCwxNTBTMTc1LDUwLDM1MCwxNTBTNTI1LDI1MCw3MDAsMTUwIiBzdHJva2U9IiNmZmYiIGZpbGw9Im5vbmUiLz48L3N2Zz4="
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Image
                                src={AdinnLogoBlack}
                                alt="Adinn Logo"
                                width={150}
                                height={35}
                                className="w-[40%] max-w-[150px] min-w-[80px] h-auto"
                                priority
                                loading="eager"
                            />
                        </div>
                    </div>
                </div>

                <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                    {/* Text with Image Mask */}
                    <h1 
                        className="font-bold text-[20vw] bg-clip-text text-transparent relative z-10 transition-all duration-[1500ms] ease-out"
                        style={textStyle}
                    >
                        Adinn
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default LandingHero;