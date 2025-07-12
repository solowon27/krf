// src/components/Footer.tsx

import Link from 'next/link';
import { FaEnvelope, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = {
    explore: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Impact', href: '/impact' },
    ],
    resources: [
      { name: 'Digital Library', href: '/library' },
      { name: 'Education Resources', href: '/education-resources' },
    ],
    getInvolved: [
      { name: 'Donate', href: '/donate' },
      { name: 'Contact Us', href: '/contact' },
    ]
  };

  return (
    <footer className="bg-white text-gray-600 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* --- Left Column: Logo and Mission --- */}
          <div className="md:col-span-4 lg:col-span-5">
            <h2 className="text-xl font-bold text-gray-900">Kone Renaissance Foundation</h2>
            <p className="text-base text-gray-500 mt-1">የኮን ህዳሴ ፋውንዴሽን</p>
            <p className="mt-4 text-sm leading-relaxed max-w-xs">
              Dedicated to transforming education and empowering futures in Kone Highschool through community-led initiatives.
            </p>
          </div>

          {/* --- Right Columns: Navigation Links --- */}
          <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Explore</h3>
              <ul className="mt-4 space-y-3">
                {navLinks.explore.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-base hover:text-indigo-600 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Resources</h3>
              <ul className="mt-4 space-y-3">
                {navLinks.resources.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-base hover:text-indigo-600 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Get Involved</h3>
              <ul className="mt-4 space-y-3">
                {navLinks.getInvolved.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-base hover:text-indigo-600 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* --- Bottom Bar: Copyright, Legal Links, and Socials --- */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col-reverse md:flex-row justify-between items-center gap-6">
          
          {/* --- Left Side: Copyright & Legal Links --- */}
          <div className="text-sm text-gray-500 text-center md:text-left">
            <p>&copy; {currentYear} Kone High School Renaissance Foundation. All rights reserved.</p>
            
            {/* --- NEW: Privacy and Terms Links --- */}
            <div className="mt-2 space-x-4">
              <Link href="/privacy" className="hover:text-indigo-600 transition-colors font-medium">
                Privacy Policy
              </Link>
              <span className="text-gray-300">&middot;</span>
              <Link href="/terms" className="hover:text-indigo-600 transition-colors font-medium">
                Terms & Conditions
              </Link>
            </div>

             <p className="mt-3 text-xs">
               Designed by{' '}
               <a href="https://github.com/commanderwondwossen" className="hover:text-indigo-600 font-medium transition-colors" target="_blank" rel="noopener noreferrer">Commander Wondwossen</a>
               {' & '}
               <a href="https://github.com/solowon27" className="hover:text-indigo-600 font-medium transition-colors" target="_blank" rel="noopener noreferrer">Quadsite</a>
             </p>

          </div>
          
          {/* --- Right Side: Social Media Icons --- */}
          <div className="flex justify-center space-x-6">
            <a href="https://www.facebook.com/profile.php?id=61578279929495" className="hover:text-indigo-600 transition-colors" aria-label="Facebook">
              <FaFacebookF className="h-6 w-6" />
            </a>
            <a href="mailto:konerenfoundation@gmail.com" className="hover:text-indigo-600 transition-colors" aria-label="Email">
              <FaEnvelope className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}