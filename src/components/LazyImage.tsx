
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderColor?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  placeholderColor = '#1e293b'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
  }, [src]);

  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: placeholderColor }}>
      <img
        src={imageSrc}
        alt={alt}
        className={cn(
          'w-full h-full object-cover lazy-image transition-all duration-500 ease-in-out',
          isLoaded ? 'loaded blur-none' : 'blur-md',
          className
        )}
      />
    </div>
  );
};

export default LazyImage;
