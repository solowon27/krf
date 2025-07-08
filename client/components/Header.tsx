// src/components/Header.tsx
'use client';

import Link from 'next/link';
import { motion, Variants, Transition } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

// JWT Payload type
type DecodedTokenPayload = {
  exp: number;
  data: {
    firstName: string;
    email: string;
    role: string;
    _id: string;
  };
};

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<DecodedTokenPayload['data'] | null>(null);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setLoggedInUser(null);
    router.push('/');
    setIsMenuOpen(false);
  }, [router]);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      try {
        const decodedToken: DecodedTokenPayload = jwtDecode(token);
        if (decodedToken.exp < Date.now() / 1000) {
          handleLogout();
        } else {
          setLoggedInUser(decodedToken.data);
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
        handleLogout();
      }
    }
  }, [handleLogout]);

  const mobileLinkVariants: Variants = {
    open: { y: 0, opacity: 1, transition: { type: "tween", ease: "easeOut", duration: 0.3 } as Transition },
    closed: { y: 20, opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    // Key Change 1: Wrapped in a Fragment to include the spacer div below
    <>
      <motion.nav
        // Key Change 2: Updated styles for dark theme and a single, consistent height (h-20)
        className="fixed w-full top-0 z-50 flex items-center bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 h-20 font-sans"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'tween', duration: 0.5, ease: "easeOut" }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-8xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo - Updated text colors for dark theme */}
            <Link href="/" className="flex flex-col items-start leading-none group">
              <span className="text-xl lg:text-2xl font-bold text-gray-100 group-hover:text-white transition-colors duration-300 tracking-tight">
                Kone High School Renaissance Foundation
              </span>
              <span className="text-lg lg:text-base font-light text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                የኮን ሃይስኩል ህዳሴ ፋውንዴሽን
              </span>
            </Link>

            {/* Desktop Navigation Links - Updated text colors */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link href="/impact" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium text-lg">
                አስተዋጽኦ
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium text-lg">
                ስለ እኛ
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium text-lg">
                መልእክት
              </Link>              
              <Link href="/library" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium text-lg">
                ቤተ-መጻሕፍት
              </Link>

              {loggedInUser ? (
                <>
                  {loggedInUser.role === 'admin' && (
                    <Link href="/donaters" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium text-lg">
                      Add Donators
                    </Link>
                  )}
                  <button onClick={handleLogout} className="text-gray-300 hover:text-white transition-colors duration-300 font-medium focus:outline-none text-lg">
                    Logout ({loggedInUser.firstName})
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium text-lg">
                    Login
                  </Link>
                </>
              )}

              {/* Donate Button - Updated with cyan accent color */}
              <Link
                href="/donate"
                className="bg-cyan-500 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:bg-cyan-600 hover:scale-105 text-lg"
              >
                ይርዱ
              </Link>
            </div>

            {/* Hamburger Menu Button - Updated colors */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md p-2"
                aria-label="Toggle menu"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path></svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Key Change 3: The Spacer Div.
        This div is exactly the same height as the fixed header (h-20).
        It sits in the normal document flow, pushing all content below it down.
        This prevents the header from ever overlapping your page content.
        You can now safely remove the `pt-16` or `pt-20` classes from your <main> tags on every page.
      */}
      <div className="h-20" aria-hidden="true"></div>

      {/* Mobile Menu Overlay - No major changes needed as it was already dark-themed */}
      <motion.div
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, x: 0 },
          closed: { opacity: 0, x: "100%", transition: { delay: 0.3, type: "tween" } }
        }}
        transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
        className="fixed top-0 right-0 h-full w-full bg-gray-900 bg-opacity-95 text-white md:hidden z-50 flex flex-col items-center justify-center p-8"
        style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 text-white hover:text-gray-300 p-2 text-3xl"
          aria-label="Close menu"
        >
          &times;
        </button>
        <motion.nav
          className="flex flex-col space-y-8 text-center"
          variants={{
            open: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
            closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
          }}
        >
            {/* Mobile links and buttons... */}
            <motion.div variants={mobileLinkVariants}>
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="block text-xl font-bold text-white hover:text-cyan-300 py-2">ዋና ገጽ</Link>
            </motion.div>
            <motion.div variants={mobileLinkVariants}>
              <Link href="/impact" onClick={() => setIsMenuOpen(false)} className="block text-xl font-bold text-white hover:text-cyan-300 py-2">አስተዋጽኦ</Link>
            </motion.div>
            <motion.div variants={mobileLinkVariants}>
              <Link href="/about" onClick={() => setIsMenuOpen(false)} className="block text-xl font-bold text-white hover:text-cyan-300 py-2">ስለ እኛ</Link>
            </motion.div>
            <motion.div variants={mobileLinkVariants}>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="block text-xl font-bold text-white hover:text-cyan-300 py-2">መልእክት</Link>
            </motion.div>            
            <motion.div variants={mobileLinkVariants}>
              <Link href="/library" onClick={() => setIsMenuOpen(false)} className="block text-xl font-bold text-white hover:text-cyan-300 py-2">ቤተ-መጻሕፍት</Link>
            </motion.div>

            {loggedInUser ? (
              <>
                {loggedInUser.role === 'admin' && (
                  <motion.div variants={mobileLinkVariants}>
                    <Link href="/donaters" onClick={() => setIsMenuOpen(false)} className="block text-xl font-bold text-white hover:text-cyan-300 py-2">Add Donators</Link>
                  </motion.div>
                )}
                <motion.div variants={mobileLinkVariants}>
                  <button onClick={handleLogout} className="block w-full text-3xl font-bold text-white hover:text-cyan-300 py-2">Logout</button>
                </motion.div>
              </>
            ) : (
              <motion.div variants={mobileLinkVariants}>
                <Link href="/login" onClick={() => setIsMenuOpen(false)} className="block text-xl font-bold text-yellow-500 hover:text-cyan-300 py-2">Login</Link>
              </motion.div>
            )}

            <motion.div variants={mobileLinkVariants} className="mt-8">
              <Link href="/donate" onClick={() => setIsMenuOpen(false)} className="inline-block bg-cyan-500 text-white font-bold px-8 py-4 rounded-full transition-colors duration-300 hover:bg-cyan-600 text-2xl">
                ዛሬውኑ ይርዱ
              </Link>
            </motion.div>
        </motion.nav>
      </motion.div>
    </>
  );
}