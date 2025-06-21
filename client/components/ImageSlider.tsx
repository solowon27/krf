'use client'; // This component needs client-side interactivity for the slideshow

import { useState } from 'react';
import Image from 'next/image'; // For optimized images
import { motion, AnimatePresence } from 'framer-motion'; // For smooth transitions

// Define a type for your image data
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

  if (!images || images.length === 0) {
    return <div className="text-center py-10 text-gray-600">No images to display.</div>;
  }

  const currentImage = images[currentIndex];

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-xl bg-gray-100 border border-gray-200">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex} // Key change ensures re-render and animation on index change
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-96 md:h-[500px] flex items-center justify-center"
        >
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill // Fills the parent div, good for responsive images
            style={{ objectFit: 'cover' }} // Ensures the image covers the area without distortion
            className="rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw" // Image optimization
          />
          <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-50 text-white p-4 text-center rounded-b-lg">
            <p className="text-lg font-semibold">{currentImage.caption}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
        aria-label="Previous image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
        aria-label="Next image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots for navigation */}
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