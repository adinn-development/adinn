"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { IPLLogo, HaierLogo, MalabarLogo, TVSLogo } from "@/components/ReUsableComponents/Icons/Icons";

interface VideoData {
  video: string;
  name: string;
}

interface VideoCardProps {
  video: string;
  name: string;
  index: number;
  priority?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, name, index, priority = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Preload video on component mount for faster loading
  useEffect(() => {
    if (videoRef.current) {
      // Force preload metadata immediately for all videos
      videoRef.current.preload = "metadata";
      videoRef.current.load();
    }
  }, [video]);

  // Handle hover events
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (videoRef.current && !hasError) {
      // Ensure video is loaded before playing
      if (videoRef.current.readyState >= 2) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {
              setIsPlaying(false);
            });
        }
      } else {
        // If not ready, load and then play
        videoRef.current.load();
        videoRef.current.addEventListener('loadeddata', () => {
          const playPromise = videoRef.current?.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
              })
              .catch(() => {
                setIsPlaying(false);
              });
          }
        }, { once: true });
      }
    }
  }, [hasError]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);

  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
  }, []);

  const handleLoadedData = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleCanPlay = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleOpenInNewTab = useCallback(() => {
    window.open(video, '_blank', 'noopener,noreferrer');
  }, [video]);

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <div 
        className="bg-white shadow-lg w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[690px] rounded-2xl md:rounded-3xl overflow-hidden relative group cursor-pointer transition-transform duration-300 hover:shadow-xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        
        {/* Loading State */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-2xl md:rounded-3xl z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-12 w-12 border-3 border-gray-200 border-t-[#CF1E00]"></div>
              <p className="text-sm text-gray-500 font-medium">Loading video...</p>
            </div>
          </div>
        )}
        
        {/* Error State */}
        {hasError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-2xl md:rounded-3xl">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <p className="text-gray-600 mb-4 font-medium">Failed to load video</p>
              <button 
                onClick={handleOpenInNewTab}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#CF1E00] text-white rounded-lg hover:bg-[#b51a00] transition-colors duration-200 font-medium"
              >
                Open Video
                <GoArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full h-full relative overflow-hidden">
            <video
              ref={videoRef}
              src={video}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              muted
              loop
              playsInline
              preload="metadata"
              onLoadStart={handleLoadStart}
              onLoadedData={handleLoadedData}
              onCanPlay={handleCanPlay}
              onError={handleError}
              onPlay={handlePlay}
              onPause={handlePause}
              poster=""
            >
              Your browser does not support the video tag.
            </video>
            
            {/* Play/Pause Overlay - Show when not hovered or not playing */}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              !isHovered || !isPlaying ? 'opacity-100' : 'opacity-0'
            }`}>
              
            </div>

            {/* Gradient overlay for better text readability */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Hover instruction text */}
            {!isHovered && !isLoading && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/80 text-sm font-medium bg-black/40 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Hover to play
              </div>
            )}
          </div>
        )}
      </div>

      {/* Video Title */}
      <div className="flex flex-row items-center justify-between w-full px-2 sm:px-4 md:px-6">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 line-clamp-2 max-w-[270px] leading-tight">
          {name}
        </h3>
        
        {/* External link button */}
        <button
          onClick={handleOpenInNewTab}
          className="ml-auto p-2 text-gray-400 hover:text-[#CF1E00] transition-colors duration-200 opacity-0 group-hover:opacity-100"
          aria-label="Open video in new tab"
        >
          <GoArrowUpRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const LandingProjects: React.FC = () => {
  const videos: VideoData[] = [
    {
      video: '/projects/spr.mp4',
      name: "SPR",
    },
    {
      video: '/projects/dalmia.mp4',
      name: "Dalmia cement",
    },
    {
      video: '/projects/hatsun.mp4',
      name: "Hatsun",
    },
    {
      video: '/projects/havells.mp4',
      name: "Havells",
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 sm:p-6 md:p-8 overflow-hidden mt-[100px]">
      {/* Header Section */}
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 gap-4 md:gap-0 max-w-[1600px]">
        <div className="flex flex-row items-center justify-start space-x-2 md:space-x-3">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[96px] tracking-[-2px] md:tracking-[-4px] font-bold text-gray-900">
            OUR
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[96px] instrument-font text-[#CF1E00] font-serif italic">
            Projects
          </h1>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-x-12 lg:gap-y-16 w-full max-w-[1600px]">
        {videos.map((item, index) => (
          <VideoCard
            key={`${item.name}-${index}`}
            video={item.video}
            name={item.name}
            index={index}
            priority={index < 2} 
          />
        ))}
      </div>
    </div>
  );
};

export default LandingProjects;