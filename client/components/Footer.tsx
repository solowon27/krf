// src/components/Footer.tsx
import Link from 'next/link';
import { FaEnvelope, FaFacebookF, FaRegCopyright } from 'react-icons/fa'; // Import the icons you need

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // Main footer container: dark background, ample vertical padding, sans-serif font
    <footer className="bg-gray-950 text-gray-400 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Top section with main logo-like text */}
        <div className="pb-10 mb-10 border-b border-gray-800"> {/* Subtle divider line */}
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Kone Renaissance</h2>
          <p className="text-xl font-light text-gray-500">የኮን ህዳሴ ፋውንዴሽ</p> {/* Subtitle, lighter weight */}
          <p className="text-sm text-gray-500 mt-4 max-w-sm"> {/* Concise mission snippet */}
            Dedicated to transforming education and empowering futures in Kone.
          </p>
        </div>

        {/* Main navigation columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-10 md:gap-x-8 lg:gap-x-12">
          {/* Column 1: Explore */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">Explore</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors duration-200">About Us</Link></li>
              <li><Link href="/impact" className="hover:text-white transition-colors duration-200">Our Impact</Link></li>
              <li><Link href="/news" className="hover:text-white transition-colors duration-200">News & Updates</Link></li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/library" className="hover:text-white transition-colors duration-200">Digital Library</Link></li>
              <li><Link href="/education-resources" className="hover:text-white transition-colors duration-200">Education Resources</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors duration-200">Photo Gallery</Link></li>
            </ul>
          </div>

          {/* Column 3: Get Involved */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">Get Involved</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/donate" className="hover:text-white transition-colors duration-200">Donate</Link></li>
              <li><Link href="/volunteer" className="hover:text-white transition-colors duration-200">Volunteer</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors duration-200">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 4: Account & Legal */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">Account & Legal</h3>
            <ul className="space-y-3 text-sm">
              {/* Note: Dynamic login state is generally handled in Header for Apple-like sites.
                   These are simplified placeholder links. */}
              <li><Link href="/login" className="hover:text-white transition-colors duration-200">Login</Link></li>
              <li><Link href="/signup" className="hover:text-white transition-colors duration-200">Sign Up</Link></li>
              {/* For admin-specific links, it's typically better to put them in a dashboard or accessible via auth */}
              {/* <li><Link href="/donaters" className="hover:text-white transition-colors duration-200">Admin: Add Donators</Link></li> */}
              <li><Link href="/terms" className="hover:text-white transition-colors duration-200">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 5 (can be combined with other columns on smaller screens) */}
          {/* Re-purposing the last column for general contact / social */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-5">Connect</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-gray-500" /> {/* Neutral icon color */}
                <a href="mailto:konerenfoundation@gmail.com" className="hover:text-white transition-colors duration-200">konerenfoundation@gmail.com</a>
              </li>
              
              <li className="flex items-center space-x-2">
                <FaFacebookF className="text-gray-500" />
                <a href="#" className="hover:text-white transition-colors duration-200" target="_blank" rel="noopener noreferrer">Facebook</a>
              </li>
              
              <li><Link href="/contact" className="hover:text-white transition-colors duration-200">Get Support</Link></li> {/* New: Specific support link */}
            </ul>
          </div>
        </div>

        {/* Bottom copyright and legal line */}
        <div className="border-t border-gray-800 pt-8 mt-10 text-xs text-gray-500 flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0">
          <div className="flex items-center space-x-1">
            <FaRegCopyright className="text-gray-600" /> {/* Subtle icon color */}
            <span>{currentYear} Kone Renaissance Foundation. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 md:order-first"> {/* Move legal links to center on desktop */}
            <Link href="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-200">Terms of Use</Link>
          </div>
          {/* Developer Credits - Very subtle, same color as copyright text */}
          <p className="text-gray-500">
            Designed with ❤️ by {' '}
            <a href="https://github.com/commanderwondwossen" className="hover:text-white transition-colors duration-200" target="_blank" rel="noopener noreferrer">Commander Wondwossen</a>
            {' '} & {' '}
            <a href="https://github.com/solowon27" className="hover:text-white transition-colors duration-200" target="_blank" rel="noopener noreferrer">Quadsite</a>
          </p>
        </div>
      </div>
    </footer>
  );
}