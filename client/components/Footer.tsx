// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-xl font-bold text-white mb-4">Kone Renaissance</h4>
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
          <p className="text-sm">info@konerenaissance.org</p>
          <p className="text-sm mt-2">&copy; {new Date().getFullYear()} Kone Renaissance Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}