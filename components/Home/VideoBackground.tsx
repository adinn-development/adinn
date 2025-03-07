"use client";
import React, { useRef, useEffect, useState } from 'react';

interface VideoBackgroundProps {
  style: {
    opacity: number;
  };
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ style }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [deviceType, setDeviceType] = useState<'mobile'|'tablet'|'desktop'>('desktop');

  // Detect device type for responsive video
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1280) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    // Initial detection
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Load video only when component is mounted and visible
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set video attributes programmatically for better control
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    
    // Add event listeners for video loading
    const handleCanPlay = () => {
      setIsVideoLoaded(true);
    };
    
    video.addEventListener('canplay', handleCanPlay);
    
    // Only autoplay when the component is visible (opacity > 0.1)
    if (style.opacity > 0.1 && isVideoLoaded) {
      // Use play() promise with catch to handle autoplay restrictions gracefully
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented, don't show error to user
        });
      }
    } else if (video.played && style.opacity <= 0.1) {
      video.pause();
    }
    
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [style.opacity, isVideoLoaded]);

  // Get the appropriate video source based on device type
  const getVideoSource = () => {
    // If you've created optimized versions as suggested in the script
    // You can use them here - otherwise fallback to the original
    switch(deviceType) {
      case 'mobile':
        return "/LandingBackground.mp4"; // Replace with "/LandingBackground-mobile.mp4" when available
      case 'tablet':
        return "/LandingBackground.mp4"; // Replace with "/LandingBackground-tablet.mp4" when available
      case 'desktop':
      default:
        return "/LandingBackground.mp4"; // Replace with "/LandingBackground-desktop.mp4" when available
    }
  };

  return (
    <>
      {/* Placeholder while video is loading */}
      {!isVideoLoaded && (
        <div className="absolute top-0 left-0 w-full h-full bg-[#121212]" />
      )}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-700 ease-out"
        style={{...style, display: isVideoLoaded ? 'block' : 'none'}}
        preload="metadata"
      >
        <source src={getVideoSource()} type="video/mp4" />
        {/* Add WebM source for better performance in supported browsers */}
        {/* <source src="/LandingBackground.webm" type="video/webm" /> */}
        Your browser does not support the video tag.
      </video>
    </>
  );
};

export default VideoBackground; 