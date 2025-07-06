// src/components/Header.tsx
'use client';

import Link from 'next/link';
import { motion, Variants, Transition } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

// --- IMPORTANT: Corrected DecodedTokenPayload type ---
// This type should reflect the actual structure of your JWT payload.
// Standard JWTs have 'exp' (expiration) directly at the root.
// Your backend seems to nest user data under a 'data' property.
type DecodedTokenPayload = {
  exp: number; // Expiration time (unix timestamp), this is always at the root of a standard JWT payload
  iat?: number; // Issued at time (unix timestamp) - optional but common

  // This 'data' property holds your user-specific information
  data: {
    firstName: string;
    email: string;
    role: string;
    _id: string;
  };
  // Add any other root-level properties your JWT might have (e.g., 'sub' for subject)
};

interface HeaderProps {
  className?: string; // Optional className prop for additional styling
}

export default function Header({ className }: HeaderProps) {

  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<{ firstName: string; email: string; role: string } | null>(null);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setLoggedInUser(null);
    router.push('/');
    setIsMenuOpen(false); // Close menu on logout
  }, [router]);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (token) {
      try {
        const decodedToken: DecodedTokenPayload = jwtDecode(token);

        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          console.log('Token expired. Logging out.');
          handleLogout();
        } else {
          setLoggedInUser(decodedToken.data);
        }
      } catch (error) {
        console.error('Failed to decode token or token is invalid:', error);
        handleLogout();
      }
    } else {
      setLoggedInUser(null);
    }
  }, [handleLogout]);

  // Framer Motion Variants for mobile menu items - more direct, less springy
  const mobileLinkVariants: Variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween", // Changed to tween for a smoother, less bouncy feel
        ease: "easeOut",
        duration: 0.3,
      } as Transition,
    },
    closed: {
      y: 20, // Reduced y displacement
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.nav
      // Apple-style headers are often clean white/light gray with no prominent shadow
      className="bg-white border-b border-gray-100 fixed w-full top-0 z-50 py-4 font-sans" // Increased padding for height, subtle border
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'tween', duration: 0.5, ease: "easeOut" }} // Smooth, non-spring intro
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"> {/* Added max-width to align with page content */}
        <div className="flex items-center justify-between h-16">
          {/* Logo/Site Title - Clean, strong font, neutral colors */}
          <Link href="/" className="flex flex-col items-start leading-none group">
            <span className="text-1xl lg:text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300 tracking-tight">
              Kone HIgh School Renaissance Foundation
            </span>
            <span className="text-xl lg:text-1xl font-light text-gray-600 group-hover:text-gray-500 transition-colors duration-300">
              የኮን ሃይስኩል ህዳሴ ፋውንዴሽን
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8"> {/* Increased spacing */}
            <Link href="/about" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 font-medium text-lg">
              ስለ እኛ
            </Link>
            <Link href="/impact" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 font-medium text-lg">
              አስተዋጽኦ
            </Link>
            <Link href="/library" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 font-medium text-lg">
              ቤተ-መጻሕፍት
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 font-medium text-lg">
              ያግኙን
            </Link>

            {/* Conditional Links for Desktop - Clean text links */}
            {loggedInUser ? (
              <>
                {loggedInUser.role === 'admin' && ( // Only show "Add donaters" if admin
                  <Link href="/donaters" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 font-medium text-lg">
                    Add Donators
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-gray-900 transition-colors duration-300 font-medium focus:outline-none text-lg"
                >
                  Logout ({loggedInUser.firstName})
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 font-medium text-lg">
                  Login
                </Link>
                {/* <Link href="/signup" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 font-medium text-lg">
                  Sign Up
                </Link> */}
              </>
            )}

            {/* Donate Button for Desktop - Clean, solid, with subtle hover */}
            <Link
              href="/donate"
              className="bg-gray-900 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-300 hover:bg-gray-700 text-lg"
            >
              ይርዱ
            </Link>
          </div>

          {/* Hamburger Menu Button for Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md p-2 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                // Close Icon (X) - more subtle color on hover
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                // Hamburger Icon - more subtle color on hover
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Clean, full-screen, subtle transition */}
      <motion.div
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, x: 0 },
          closed: { opacity: 0, x: "100%", transition: { delay: 0.3, type: "tween" } } // Smooth exit
        }}
        transition={{ type: "tween", duration: 0.4, ease: "easeOut" }} // Smooth entry
        className="fixed top-0 right-0 h-full w-full bg-gray-900 bg-opacity-95 text-white md:hidden z-40 flex flex-col items-center justify-center p-8"
        style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md p-2 text-3xl"
          aria-label="Close menu"
        >
          &times;
        </button>
        <motion.nav
          className="flex flex-col space-y-8 text-center"
          variants={{
            open: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }, // Slightly faster stagger
            closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
          }}
        >
          {/* Mobile Links */}
          <motion.div variants={mobileLinkVariants}>
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="block text-4xl font-bold text-white hover:text-gray-300 transition-colors duration-300 py-2">
              ዋና ማውጫ
            </Link>
          </motion.div>
          <motion.div variants={mobileLinkVariants}>
            <Link href="/about" onClick={() => setIsMenuOpen(false)} className="block text-4xl font-bold text-white hover:text-gray-300 transition-colors duration-300 py-2">
              ስለ እኛ
            </Link>
          </motion.div>
          <motion.div variants={mobileLinkVariants}>
            <Link href="/impact" onClick={() => setIsMenuOpen(false)} className="block text-4xl font-bold text-white hover:text-gray-300 transition-colors duration-300 py-2">
              አስተዋጽኦ
            </Link>
          </motion.div>
          <motion.div variants={mobileLinkVariants}>
            <Link href="/library" onClick={() => setIsMenuOpen(false)} className="block text-4xl font-bold text-white hover:text-gray-300 transition-colors duration-300 py-2">
              ቤተ-መጻሕፍት
            </Link>
          </motion.div>
          <motion.div variants={mobileLinkVariants}>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="block text-4xl font-bold text-white hover:text-gray-300 transition-colors duration-300 py-2">
              ያግኙን
            </Link>
          </motion.div>

          {/* Conditional Links for Mobile */}
          {loggedInUser ? (
            <>
              {loggedInUser.role === 'admin' && (
                <motion.div variants={mobileLinkVariants}>
                  <Link href="/donaters" onClick={() => setIsMenuOpen(false)} className="block text-4xl font-bold text-white hover:text-gray-300 transition-colors duration-300 py-2">
                    Add Donators
                  </Link>
                </motion.div>
              )}
              <motion.div variants={mobileLinkVariants}>
                <button
                  onClick={handleLogout}
                  className="block text-4xl font-bold text-white hover:text-gray-300 transition-colors duration-300 py-2"
                >
                  Logout ({loggedInUser.firstName})
                </button>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div variants={mobileLinkVariants}>
                <Link href="/login" onClick={() => setIsMenuOpen(false)} className="block text-4xl font-bold text-white hover:text-gray-300 transition-colors duration-300 py-2">
                  
                </Link>
              </motion.div>
              {/* <motion.div variants={mobileLinkVariants}>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="block text-4xl font-bold text-white hover:text-gray-300 transition-colors duration-300 py-2">
                  Sign Up
                </Link>
              </motion.div> */}
            </>
          )}

          <motion.div variants={mobileLinkVariants} className="mt-10">
            <Link
              href="/donate"
              onClick={() => setIsMenuOpen(false)}
              className="inline-block bg-white text-gray-900 font-bold px-10 py-5 rounded-full transition-colors duration-300 hover:bg-gray-200 text-3xl"
            >
              ዛሬውኑ ይርዱ
            </Link>
          </motion.div>
        </motion.nav>
      </motion.div>
    </motion.nav>
  );
}