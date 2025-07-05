'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageData {
  src: string;
  alt: string;
  caption: string;
}

interface ImageSliderProps {
  images: ImageData[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change 5000 to adjust autoplay delay (in ms)

    return () => clearInterval(interval);
  }, [images.length, isHovered]);

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        No images to display.
      </div>
    );
  }

  const currentImage = images[currentIndex];

  return (
    <div
      ref={sliderRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full overflow-hidden rounded-lg shadow-xl bg-gray-100 border border-gray-200"
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full flex flex-col items-center justify-center"
        >
          <div className="w-full max-h-[90vh] overflow-hidden">
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full rounded-lg object-contain"
              priority
            />
          </div>

          {/* Caption and Dots Container */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center space-y-2 p-4 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
            <p className="text-white text-lg font-semibold text-center">{currentImage.caption}</p>
            <div className="flex space-x-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full ${
                    idx === currentIndex ? 'bg-white' : 'bg-gray-400'
                  } hover:bg-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  aria-label={`Go to slide ${idx + 1}`}
                ></button>
              ))}
            </div>
          </div>

        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
        aria-label="Previous image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
        aria-label="Next image"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === currentIndex ? 'bg-white' : 'bg-gray-400'
            } hover:bg-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500`}
            aria-label={`Go to slide ${idx + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
