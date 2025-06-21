// components/Footer.tsx
import Link from 'next/link';
import { FaEnvelope, FaRegCopyright } from 'react-icons/fa'; // Import the icons you need

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-xl font-bold text-white">Kone Renaissance</h4>
          <h2 className="text-amber-500 text-xl mb-2 underline">ህዳሴ ኮን</h2>
          <p className="text-sm">Dedicated to transforming education and empowering futures in rural Ethiopia.</p>
        </div>
        <div>
          <h4 className="text-xl font-bold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-amber-500 transition-colors duration-300">About Us</Link></li>
            <li><Link href="/impact" className="hover:text-amber-500 transition-colors duration-300">Our Impact</Link></li>
            <li><Link href="/donate" className="hover:text-amber-500 transition-colors duration-300">Donate</Link></li>
            <li><Link href="/contact" className="hover:text-amber-500 transition-colors duration-300">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-bold text-white mb-4">Contact Us</h4>
          {/* Email with Icon */}
          <div className="flex items-center space-x-2 text-sm">
            <FaEnvelope className="text-amber-500" /> {/* Icon for email */}
            <p><a href="mailto:info@konerenaissance.org" className="hover:text-amber-500 transition-colors duration-300">konerenfoundation@gmail.com</a></p>
          </div>

          {/* Copyright with Icon */}
          <p className="text-sm mt-2 flex items-center space-x-1">
            <FaRegCopyright className="text-gray-400" /> {/* Icon for copyright */}
            <span>{currentYear} Kone Renaissance Foundation. All rights reserved.</span>
          </p>

          <p className="text-xs text-blue-300 mt-auto">
            Designed with ❤️ by Commander Wondwossen & <a href ="https://github.com/solowon27" className="text-blue-200 hover:underline" target="_blank" rel="noopener noreferrer">Quadsite</a>
          </p>
        </div>
      </div>
    </footer>
  );
}