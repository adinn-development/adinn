"use client";
import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad'> {
  lowQualityPlaceholder?: boolean;
  fadeIn?: boolean;
}

const OptimizedImage = ({
  src,
  alt,
  className,
  lowQualityPlaceholder = true,
  fadeIn = true,
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {lowQualityPlaceholder && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ opacity: isLoaded ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }}
        />
      )}
      <Image
        src={src}
        alt={alt || "Image"}
        className={cn(
          fadeIn && "transition-opacity duration-500",
          fadeIn && (isLoaded ? "opacity-100" : "opacity-0"),
          className
        )}
        onLoadingComplete={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage; 