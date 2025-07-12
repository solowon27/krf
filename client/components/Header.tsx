// src/components/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image'; // 1. Import the Image component
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
    <>
      <motion.nav
        className="fixed w-full top-0 z-50 flex items-center bg-white/80 backdrop-blur-md border-b border-gray-200 h-20 font-sans"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'tween', duration: 0.5, ease: "easeOut" }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            
            {/* --- MODIFIED: Logo Section --- */}
            <Link href="/" className="flex items-center gap-3 group">
              {/* Logo Image */}
              <Image
                src="/logo.png"
                alt="Kone Renaissance Foundation Logo"
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              {/* Logo Text */}
              <div className="flex flex-col leading-none">
                <span className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight">
                  Kone Renaissance Foundation
                </span>
                <span className="text-sm lg:text-base font-light text-gray-500">
                  የኮን ሃይስኩል ህዳሴ ፋውንዴሽን
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link href="/impact" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 font-medium text-base">
                አስተዋጽኦ
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 font-medium text-base">
                ስለ እኛ
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 font-medium text-base">
                መልእክት
              </Link>
              <Link href="/library" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 font-medium text-base">
                ቤተ-መጻሕፍት
              </Link>

              {loggedInUser ? (
                <>
                  {loggedInUser.role === 'admin' && (
                    <Link href="/donaters" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 font-medium text-base">
                      Add Contribution
                    </Link>
                  )}
                  <button onClick={handleLogout} className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 font-medium focus:outline-none text-base">
                    Logout ({loggedInUser.firstName})
                  </button>
                </>
              ) : (
                <Link href="/login" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 font-medium text-base">
                  Login
                </Link>
              )}

              {/* Donate Button */}
              <Link
                href="/donate"
                className="bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:bg-indigo-700 hover:scale-105 text-base"
              >
                ይርዱ
              </Link>
            </div>

            {/* Hamburger Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md p-2"
                aria-label="Toggle menu"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path></svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Spacer Div */}
      <div className="h-20" aria-hidden="true"></div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, x: 0 },
          closed: { opacity: 0, x: "100%", transition: { delay: 0.3, type: "tween" } }
        }}
        transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
        className="fixed top-0 right-0 h-full w-full bg-white text-gray-900 md:hidden z-50 flex flex-col items-center justify-center p-8"
        style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 text-gray-700 hover:text-indigo-600 p-2 text-4xl"
          aria-label="Close menu"
        >
          &times;
        </button>
        <motion.nav
          className="flex flex-col space-y-6 text-center"
          variants={{
            open: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
            closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
          }}
        >
          <motion.div variants={mobileLinkVariants}>
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-bold hover:text-indigo-600 py-2">ዋና ገጽ</Link>
          </motion.div>
          <motion.div variants={mobileLinkVariants}>
            <Link href="/impact" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-bold hover:text-indigo-600 py-2">አስተዋጽኦ</Link>
          </motion.div>
          <motion.div variants={mobileLinkVariants}>
            <Link href="/about" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-bold hover:text-indigo-600 py-2">ስለ እኛ</Link>
          </motion.div>
          <motion.div variants={mobileLinkVariants}>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-bold hover:text-indigo-600 py-2">መልእክት</Link>
          </motion.div>
          <motion.div variants={mobileLinkVariants}>
            <Link href="/library" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-bold hover:text-indigo-600 py-2">ቤተ-መጻሕፍት</Link>
          </motion.div>

          {loggedInUser ? (
            <>
              {loggedInUser.role === 'admin' && (
                <motion.div variants={mobileLinkVariants}>
                  <Link href="/donaters" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-bold hover:text-indigo-600 py-2">Add Contribution</Link>
                </motion.div>
              )}
              <motion.div variants={mobileLinkVariants}>
                <button onClick={handleLogout} className="block w-full text-2xl font-bold hover:text-indigo-600 py-2">Logout</button>
              </motion.div>
            </>
          ) : (
            <motion.div variants={mobileLinkVariants}>
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-bold text-indigo-600 hover:text-indigo-500 py-2">Login</Link>
            </motion.div>
          )}

          <motion.div variants={mobileLinkVariants} className="mt-6">
            <Link href="/donate" onClick={() => setIsMenuOpen(false)} className="inline-block bg-indigo-600 text-white font-bold px-8 py-4 rounded-full transition-colors duration-300 hover:bg-indigo-700 text-2xl">
              ዛሬውኑ ይርዱ
            </Link>
          </motion.div>
        </motion.nav>
      </motion.div>
    </>
  );
}