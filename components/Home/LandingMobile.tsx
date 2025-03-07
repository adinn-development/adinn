"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MobileLogo } from '../ReUsableComponents/Icons/Icons';
import Image from 'next/image';

const LandingMobile = () => {
  // State to track rotation angles and animation properties
  const [rotationY, setRotationY] = useState<number>(0);
  const [rotationX, setRotationX] = useState<number>(0); // Slight tilt for 3D effect
  const [scale, setScale] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [autoSpin, setAutoSpin] = useState<boolean>(true);
  const [, setSpinSpeed] = useState<number>(1);
  const [videoPlaying, setVideoPlaying] = useState<boolean>(false);
  const phoneRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Enhanced auto spin animation on component mount
  useEffect(() => {
    let animationId: number;
    const startTime = Date.now();
    
    const animate = () => {
      if (!autoSpin) return;
      
      const elapsed = Date.now() - startTime;
      
      // Dynamic speed - starts slow, accelerates, then decelerates
      const progress = elapsed / 3000;
      let speedFactor;
      
      if (progress < 0.3) {
        // Ease in - start slow, accelerate
        speedFactor = 0.5 + (progress / 0.3) * 1.5;
      } else if (progress > 0.7) {
        // Ease out - slow down towards the end
        speedFactor = 2 - ((progress - 0.7) / 0.3) * 1.5;
      } else {
        // Middle section - full speed
        speedFactor = 2;
      }
      
      setSpinSpeed(speedFactor);
      
      // Calculate rotation with dynamic speed
      const newRotation = (elapsed / 3000) * 360 * speedFactor;
      
      // Add slight wobble effect for more natural movement
      const wobble = Math.sin(elapsed / 300) * 2;
      
      // Update rotations and scale
      setRotationY(newRotation % 360);
      setRotationX(wobble);
      
      // Subtle scale pulsing
      const scalePulse = 1 + Math.sin(elapsed / 500) * 0.03;
      setScale(scalePulse);
      
      animationId = requestAnimationFrame(animate);
      
      // Stop auto-spin after one complete rotation
      if (elapsed > 3000) {
        setAutoSpin(false);
        // Reset to neutral position
        setTimeout(() => {
          setRotationX(0);
          setScale(1);
          // Start playing video when animation stops
          if (videoRef.current) {
            videoRef.current.play().catch(err => console.log('Video autoplay prevented:', err));
            setVideoPlaying(true);
          }
        }, 500);
      }
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [autoSpin]);
  
  // Enhanced mouse/touch events for interactive spinning
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
    setAutoSpin(false); // Stop auto-spin when user interacts
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
    setAutoSpin(false); // Stop auto-spin when user interacts
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    // Enhanced sensitivity based on speed of movement
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    const movementMagnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const sensitivity = 0.3 + (movementMagnitude / 100) * 0.3; // Dynamic sensitivity
    
    // Primary horizontal rotation
    setRotationY((prev) => (prev + deltaX * sensitivity) % 360);
    
    // Subtle tilt based on vertical movement
    const maxTilt = 10;
    const newTiltX = Math.max(Math.min(deltaY * 0.1, maxTilt), -maxTilt);
    setRotationX(newTiltX);
    
    // Subtle scale effect based on movement speed
    const speedScale = 1 + (movementMagnitude / 500);
    setScale(Math.min(speedScale, 1.1));
    
    setStartX(e.clientX);
    setStartY(e.clientY);
  };
  
  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.touches[0].clientX - startX;
    const deltaY = e.touches[0].clientY - startY;
    const movementMagnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const sensitivity = 0.3 + (movementMagnitude / 100) * 0.3; // Dynamic sensitivity
    
    // Primary horizontal rotation
    setRotationY((prev) => (prev + deltaX * sensitivity) % 360);
    
    // Subtle tilt based on vertical movement
    const maxTilt = 10;
    const newTiltX = Math.max(Math.min(deltaY * 0.1, maxTilt), -maxTilt);
    setRotationX(newTiltX);
    
    // Subtle scale effect based on movement speed
    const speedScale = 1 + (movementMagnitude / 500);
    setScale(Math.min(speedScale, 1.1));
    
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
    
    // Smooth return to neutral tilt and scale
    setTimeout(() => {
      setRotationX(0);
      setScale(1);
    }, 300);
  };
  
  // Add event listeners to document for better drag experience
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleDragEnd);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, startX, startY]);

  // Handle video play/pause when user interacts with the phone
  useEffect(() => {
    if (isDragging && videoPlaying && videoRef.current) {
      videoRef.current.pause();
    } else if (!isDragging && videoPlaying && videoRef.current) {
      videoRef.current.play().catch(err => console.log('Video play prevented:', err));
    }
  }, [isDragging, videoPlaying]);

  return (
    <div className='relative h-screen w-full overflow-hidden'>
      {/* WHAT text positioned outside */}
      <div className='absolute top-10 md:top-30 left-4 md:left-45 z-10'>
        <div className='text-[72px] md:text-[120px] font-bold tracking-tighter'>
          WHAT
        </div>
      </div>

      {/* Main content container */}
      <div className='absolute inset-0 flex items-center justify-center'>
        {/* Mobile with enhanced 3D animation */}
        <div className="relative perspective-[1200px]">
          <div 
            ref={phoneRef}
            className={`
              cursor-grab active:cursor-grabbing 
              transition-transform duration-300 ease-out
              ${isDragging ? 'transition-none' : ''}
              transform-style-3d
            `}
            style={{ 
              transform: `
                rotateY(${rotationY}deg) 
                rotateX(${rotationX}deg) 
                scale(${scale})
              `,
              transformStyle: 'preserve-3d',
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div className="relative">
              {/* Shadow effect that moves with rotation */}
              <div 
                className="absolute inset-0 rounded-full opacity-20 blur-xl"
                style={{
                  background: 'radial-gradient(circle, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 70%)',
                  transform: `translateX(${Math.sin(rotationY * Math.PI / 180) * 20}px)`,
                }}
              ></div>
              
              
              <div 
  className="absolute top-[1%] left-[9.5%] w-[80%] h-[78%] blur-md"
  style={{
    background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%)',
    transform: `rotateY(-5deg) translateX(${(-Math.sin(rotationY * Math.PI / 180) * 10)}px) translateY(${(-Math.sin(rotationX * Math.PI / 180) * 10)}px)`,
    boxShadow: 'inset 0 0 50px rgba(255, 255, 255, 0.3)',
  }}
></div>


             
              
              {/* Phone image */}
              <div className="relative">
                <Image
                  src={MobileLogo}
                  alt="Mobile Logo"
                  className='w-[300px] h-[300px] md:w-[634px] md:h-[634px] object-contain relative z-10'
                  priority
                  draggable="false"
                />
                
  
                <div 
                   className="absolute top-[13%] left-[38%] w-[30%] h-[75.5%] z-20 flex items-center rounded-2xl justify-center md:rotate-[-9deg] rounded-tr-sm"
                >
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover z-10 rounded-2xl"
                    loop
                    muted
                    playsInline
                    autoPlay
                    onEnded={() => {
                      if (videoRef.current) {
                        videoRef.current.play().catch(err => console.log('Video replay prevented:', err));
                      }
                    }}
                  >
                    <source src="/LandingBackground.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
    
                  <div 
                    className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer z-20"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (videoRef.current) {
                        if (videoRef.current.paused) {
                          videoRef.current.play();
                          setVideoPlaying(true);
                        } else {
                          videoRef.current.pause();
                          setVideoPlaying(false);
                        }
                      }
                    }}
                  >
                    {!videoPlaying && (
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/80 flex items-center justify-center">
                        <div className="w-0 h-0 border-t-[6px] md:border-t-[8px] border-t-transparent border-l-[12px] md:border-l-[16px] border-l-black border-b-[6px] md:border-b-[8px] border-b-transparent ml-1"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* WE DO and buttons positioned on bottom right */}
          <div className='absolute bottom-0 md:bottom-25 -right-10 transform translate-x-1/3 md:translate-x-1/2'>
            <div className='text-[48px] md:text-[92px] font-bold leading-none mb-4 md:mb-6'>
              WE DO
            </div>
            <div className='flex flex-row gap-3 md:gap-4 items-center justify-end'>
              <button className='bg-[#EC2B45] px-4 md:px-10 py-2 md:py-3 text-white text-[14px] md:text-[16px] rounded-full hover:bg-[#d41c34] duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform whitespace-nowrap'>
                More About Us
              </button>
              <button className='bg-[#EAEAEA] px-4 md:px-10 py-2 md:py-3 text-gray-700 text-[14px] md:text-[16px] rounded-full hover:bg-gray-200 duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform whitespace-nowrap'>
                Our Projects
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingMobile;