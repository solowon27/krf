// src/components/Header.tsx
'use client'; // This component uses client-side hooks like useState, useEffect, useRouter

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react'; // Added useCallback
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

// --- IMPORTANT: Updated DecodedTokenData type ---
// This type should reflect the ROOT level properties of the decoded JWT payload
// It should include 'exp' directly, and 'data' if your backend token nests user info
type DecodedTokenPayload = {
  _id: string;
  email: string;
  role: string;
  exp?: number; // Expiration time (unix timestamp), typically at the root
  iat?: number; // Issued at time (unix timestamp)
  // Add other standard JWT claims here if needed (e.g., nbf, aud, iss, sub)

  // If your backend *also* puts user-specific data under a 'data' key, define it:
  data?: { // This 'data' property is *optional* if not always present or relevant
    _id: string; // These would be redundant if _id, email, role are also at root
    email: string;
    role: string;
  }
};


export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);

  // Memoize handleLogout to prevent unnecessary re-creations,
  // which helps with useEffect's dependency array.
  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login'); // Redirect to login page after logout
  }, [router]); // `router` is a dependency here

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (token) {
      try {
        // --- IMPORTANT: Decode and access properties directly from the payload ---
        const decodedToken: DecodedTokenPayload = jwtDecode(token);

        // Check for token expiration
        const currentTime = Date.now() / 1000; // in seconds
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          console.log('Token expired. Logging out.');
          handleLogout(); // Log out if token is expired
        } else {
          // Set user data. Adjust based on where your user info is:
          // If user info is at the root (e.g., _id, email, role directly on decodedToken):
          setUser({ email: decodedToken.email, role: decodedToken.role });
          // If user info is nested under 'data' (like your previous example):
          // if (decodedToken.data) {
          //   setUser({ email: decodedToken.data.email, role: decodedToken.data.role });
          // } else {
          //   console.warn('Decoded token has no "data" field for user info.');
          //   handleLogout();
          // }
        }
      } catch (err) {
        console.error('Failed to decode token or token is invalid:', err);
        handleLogout(); // Log out if token is invalid or decoding fails
      }
    } else {
      // If no token, ensure user state is null
      setUser(null);
    }
  }, [handleLogout]); // Now handleLogout is correctly in the dependency array

  return (
    <header className="bg-teal-800 text-white p-4 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-amber-300 hover:text-amber-200 transition-colors duration-300">
          Kone Foundation
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:text-amber-300 transition-colors duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-amber-300 transition-colors duration-300">
              About
            </Link>
          </li>
          <li>
            <Link href="/donate" className="hover:text-amber-300 transition-colors duration-300">
              Donate
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-amber-300 transition-colors duration-300">
              Contact
            </Link>
          </li>
          {user && user.role === 'admin' && ( // Only show if user is logged in and is admin
            <li>
              <Link href="/donaters" className="hover:text-amber-300 transition-colors duration-300">
                Donaters (Admin)
              </Link>
            </li>
          )}
          {user ? (
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-700 transition-colors duration-300"
              >
                Logout ({user.email})
              </button>
            </li>
          ) : (
            <li>
              <Link href="/login" className="bg-green-600 px-3 py-1 rounded-md text-sm hover:bg-green-700 transition-colors duration-300">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}