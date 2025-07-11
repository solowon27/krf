
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function DevelopmentBanner() {
  // State to control the visibility of the banner
  const [isVisible, setIsVisible] = useState(false);

  // Use useEffect to trigger the banner's appearance after a short delay
  // and set a timer to hide it after 30 seconds.
  useEffect(() => {
    // Show the banner shortly after the page loads
    const appearTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1500); // 1.5-second delay before appearing

    // Set a timer to hide the banner after 30 seconds
    const disappearTimer = setTimeout(() => {
      setIsVisible(false);
    }, 31500); // 30 seconds + 1.5-second initial delay

    // Cleanup timers if the component unmounts
    return () => {
      clearTimeout(appearTimer);
      clearTimeout(disappearTimer);
    };
  }, []); // The empty array ensures this effect runs only once on mount

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 p-4 rounded-lg bg-gray-900 text-white shadow-2xl"
        >
          <FaExclamationTriangle className="text-yellow-400 text-2xl" />
          <p className="font-semibold">ይህ ድህረ ገጽ ገና በመሰራት ሂደት ላይ ነው!</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}