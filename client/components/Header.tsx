// components/Header.tsx
'use client'; // This component will have client-side interactivity (like the hamburger menu)

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mobileLinkVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    closed: {
      y: 50,
      opacity: 0
    }
  };

  return (
    <motion.nav
      className="bg-white shadow-lg fixed w-full top-0 z-50 py-3"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 15 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-extrabold text-teal-800 hover:text-teal-600 transition-colors duration-300 tracking-wide">
            Kone Renaissance
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/about" className="text-gray-700 hover:text-teal-700 transition-colors duration-300 font-medium">
              About Us
            </Link>
            <Link href="/impact" className="text-gray-700 hover:text-teal-700 transition-colors duration-300 font-medium">
              Our Impact
            </Link>
            <Link href="/gallery" className="text-gray-700 hover:text-teal-700 transition-colors duration-300 font-medium">
              Gallery
            </Link>
            <Link href="/library" className="text-gray-700 hover:text-teal-700 transition-colors duration-300 font-medium">
              Library
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-teal-700 transition-colors duration-300 font-medium">
              Connect
            </Link>
            {/* Donate Button for Desktop */}
            <Link
              href="/donate"
              className="bg-amber-500 text-white font-bold px-6 py-2 rounded-full shadow-md hover:bg-amber-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              Donate Now
            </Link>
          </div>

          {/* Hamburger Menu Button for Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-md p-2 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                // Close Icon (X)
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                // Hamburger Icon
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, x: 0 },
          closed: { opacity: 0, x: "100%", transition: { delay: 0.3 } }
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 h-full w-full bg-teal-800 bg-opacity-95 text-white md:hidden z-40 flex flex-col items-center justify-center p-8"
        style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 text-white hover:text-amber-300 focus:outline-none focus:ring-2 focus:ring-white rounded-md p-2 text-2xl"
          aria-label="Close menu"
        >
          &times;
        </button>
        <motion.nav
          className="flex flex-col space-y-8 text-center"
          variants={{
            open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
            closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
          }}
        >
          <motion.div variants={mobileLinkVariants}>
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="block text-3xl font-bold hover:text-amber-400 transition-colors duration-300 py-2">
              Home
            </Link>
          </motion.div>
          <motion.div variants={mobileLinkVariants}>
            <Link href="/about" onClick={() => setIsMenuOpen(false)} className="block text-3xl font-bold hover:text-amber-400 transition-colors duration-300 py-2">
              About Us
            </Link>
          </motion.div>
          <motion.div variants={mobileLinkVariants}>
            <Link href="/impact" onClick={() => setIsMenuOpen(false)} className="block text-3xl font-bold hover:text-amber-400 transition-colors duration-300 py-2">
              Our Impact
            </Link>
          </motion.div>
          <motion.div variants={mobileLinkVariants}>
            <Link href="/gallery" onClick={() => setIsMenuOpen(false)} className="block text-3xl font-bold hover:text-amber-400 transition-colors duration-300 py-2">
              Gallery
            </Link>
          </motion.div>
          <motion.div variants={mobileLinkVariants}>
            <Link href="/library" onClick={() => setIsMenuOpen(false)} className="block text-3xl font-bold hover:text-amber-400 transition-colors duration-300 py-2">
              Library
            </Link>
          </motion.div>
          <motion.div variants={mobileLinkVariants}>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="block text-3xl font-bold hover:text-amber-400 transition-colors duration-300 py-2">
              Connect
            </Link>
          </motion.div>
          <motion.div variants={mobileLinkVariants} className="mt-10">
            <Link
              href="/donate"
              onClick={() => setIsMenuOpen(false)}
              className="inline-block bg-amber-500 text-teal-900 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-amber-400 transition-all duration-300 ease-in-out transform hover:scale-105 text-2xl"
            >
              Donate Today
            </Link>
          </motion.div>
        </motion.nav>
      </motion.div>
    </motion.nav>
  );
}