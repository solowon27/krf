// src/app/donations/page.tsx
'use client';

import { useMutation, gql } from '@apollo/client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

// Import your Header and Footer components
import Header from '@components/Header';
import Footer from '@components/Footer';

// Framer Motion imports for subtle animations
import { motion, AnimatePresence } from 'framer-motion';

// GraphQL mutation to add a donation
const ADD_DONATION = gql`
  mutation AddDonation($donorName: String!, $item: String!, $message: String) {
    addDonation(donorName: $donorName, item: $item, message: $message) {
      id
      donorName
      item
      message
      date
    }
  }
`;

// Define a type for your decoded JWT data structure
// Make sure this matches what your backend puts in the token's 'data' payload
type DecodedTokenData = {
  _id: string;
  firstName: string;
  email: string;
  role: string;
  exp?: number; // Expiration time (unix timestamp)
};

// Variants for subtle entry animations, consistent with Apple style
const formContainerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: 'tween', ease: 'easeOut', duration: 0.5 } },
};

const formItemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'tween', ease: 'easeOut', duration: 0.3 } },
};

export default function DonatersPage() {
  const router = useRouter();
  const [user, setUser] = useState<DecodedTokenData | null>(null);
  const [form, setForm] = useState({ donorName: '', item: '', message: '' });
  const [submissionMessage, setSubmissionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showAccessDenied, setShowAccessDenied] = useState(false); // State for custom access denied message

  const [addDonation, { loading }] = useMutation(ADD_DONATION, {
    onCompleted: () => {
      setSubmissionMessage({ type: 'success', text: 'Donation recorded successfully!' });
      setForm({ donorName: '', item: '', message: '' }); // Clear form on success
      setTimeout(() => setSubmissionMessage(null), 3000); // Clear message after 3 seconds
    },
    onError: (err) => {
      console.error('Error recording donation:', err);
      setSubmissionMessage({ type: 'error', text: `Failed to record donation: ${err.message}` });
      setTimeout(() => setSubmissionMessage(null), 5000); // Clear message after 5 seconds
    }
  });

  // Memoized function for handling logout/redirects
  const handleAuthRedirect = useCallback((path: string) => {
    localStorage.removeItem('token'); // Always clear token on auth issues
    setUser(null);
    router.push(path);
  }, [router]);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (!token) {
      console.warn('No token found. Redirecting to login.');
      handleAuthRedirect('/login');
      return;
    }

    try {
      const decoded: { data: DecodedTokenData, exp?: number } = jwtDecode(token);

      if (!decoded || !decoded.data || !decoded.data.role) {
        throw new Error('Invalid token structure or missing user data.');
      }

      const currentTime = Date.now() / 1000;
      if (decoded.exp && decoded.exp < currentTime) {
        console.warn('Token expired. Redirecting to login.');
        handleAuthRedirect('/login');
        return;
      }

      if (decoded.data.role !== 'admin') {
        console.warn(`User ${decoded.data.email} (Role: ${decoded.data.role}) attempted to access admin page.`);
        setShowAccessDenied(true); // Show custom access denied message
        setTimeout(() => handleAuthRedirect('/'), 3000); // Redirect non-admins to homepage after delay
        return;
      }

      setUser(decoded.data);

    } catch (err) {
      console.error('Authentication/Authorization failed during token processing:', err);
      handleAuthRedirect('/login');
    }
  }, [handleAuthRedirect]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    addDonation({ variables: form });
  };

  // Render a loading/checking state while authentication is being processed
  if (user === null) {
    if (showAccessDenied) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 font-sans antialiased p-4">
          <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-red-200">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Access Denied!</h2>
            <p className="text-lg text-gray-700 mb-6">You must be an administrator to view this page.</p>
            <p className="text-sm text-gray-500">Redirecting to home page...</p>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900 font-sans antialiased p-4">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center justify-center text-blue-600 text-xl font-medium">
            <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Checking authentication...
          </div>
        </div>
      </div>
    );
  }

  // Once user is confirmed (and is an admin), render the form
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans antialiased overflow-x-hidden">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="max-w-md w-full p-10 bg-white rounded-xl shadow-xl border border-gray-100"
          variants={formContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 variants={formItemVariants} className="mt-2 text-center text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Add New Contribution
          </motion.h2>

          {user && (
            <motion.p variants={formItemVariants} className="text-center text-sm text-gray-600 mb-6">
              Logged in as: <span className="font-semibold">{user.firstName}</span> (Role: <span className="font-semibold">{user.role}</span>)
            </motion.p>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <motion.div variants={formItemVariants}>
              <label htmlFor="donorName" className="block text-gray-700 text-sm font-semibold mb-2">Donor's Name</label>
              <input
                id="donorName"
                type="text"
                placeholder="Full Name of Donor"
                className="block w-full py-3 px-4 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                value={form.donorName}
                onChange={(e) => setForm({ ...form, donorName: e.target.value })}
                required
              />
            </motion.div>

            <motion.div variants={formItemVariants}>
              <label htmlFor="item" className="block text-gray-700 text-sm font-semibold mb-2">Item Donated</label>
              <input
                id="item"
                type="text"
                placeholder="e.g., $100, 50 Books, Laptop"
                className="block w-full py-3 px-4 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                value={form.item}
                onChange={(e) => setForm({ ...form, item: e.target.value })}
                required
              />
            </motion.div>

            <motion.div variants={formItemVariants}>
              <label htmlFor="message" className="block text-gray-700 text-sm font-semibold mb-2">Optional Message (Public)</label>
              <textarea
                id="message"
                placeholder="A brief message from the donor (optional)"
                rows={4}
                className="block w-full py-3 px-4 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-y bg-white"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </motion.div>

            <motion.button
              variants={formItemVariants}
              type="submit"
              className={`w-full flex justify-center py-4 px-4 text-lg font-semibold rounded-full shadow-md transition-all duration-300 transform hover:scale-[1.01]
                ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding Donation...
                </span>
              ) : (
                'Add Donation'
              )}
            </motion.button>
            
            <AnimatePresence>
              {submissionMessage && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`mt-4 text-center font-medium p-3 rounded-md
                    ${submissionMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                  `}
                >
                  {submissionMessage.text}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
