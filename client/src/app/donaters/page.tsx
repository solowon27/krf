'use client';

import { useMutation, gql } from '@apollo/client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

import Header from '@components/Header';
import Footer from '@components/Footer';

import { motion, AnimatePresence, Variants } from 'framer-motion';

const ADD_DONATION = gql`
  mutation AddDonation($donorName: String!, $item: String!, $value: Float, $message: String) {
    addDonation(donorName: $donorName, item: $item, value: $value, message: $message) {
      id
      donorName
      item
      value
      message
      date
    }
  }
`;

type DecodedTokenData = {
  _id: string;
  firstName: string;
  email: string;
  role: string;
  exp?: number;
};

const formContainerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { ease: 'easeOut', duration: 0.5 } },
};

const formItemVariants: Variants = {
  hidden: { y: 15, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { ease: 'easeOut', duration: 0.3 } },
};

export default function DonatersPage() {
  const router = useRouter();
  const [user, setUser] = useState<DecodedTokenData | null>(null);
  const [form, setForm] = useState({ donorName: '', item: '', value: '', message: '' });
  const [submissionMessage, setSubmissionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showAccessDenied, setShowAccessDenied] = useState(false);

  const [addDonation, { loading }] = useMutation(ADD_DONATION, {
    onCompleted: () => {
      setSubmissionMessage({ type: 'success', text: 'Donation recorded successfully!' });
      setForm({ donorName: '', item: '', value: '', message: '' }); // Clear form
      setTimeout(() => setSubmissionMessage(null), 3000);
    },
    onError: (err) => {
      console.error('Error recording donation:', err);
      setSubmissionMessage({ type: 'error', text: `Failed to record donation: ${err.message}` });
      setTimeout(() => setSubmissionMessage(null), 5000);
    }
  });

  const handleAuthRedirect = useCallback((path: string) => {
    localStorage.removeItem('token');
    setUser(null);
    router.push(path);
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      handleAuthRedirect('/login');
      return;
    }
    try {
      const decoded: { data: DecodedTokenData, exp?: number } = jwtDecode(token);
      if (!decoded?.data?.role) throw new Error('Invalid token structure.');
      if (decoded.exp && (decoded.exp * 1000) < Date.now()) {
        handleAuthRedirect('/login');
        return;
      }
      if (decoded.data.role !== 'admin') {
        setShowAccessDenied(true);
        setTimeout(() => handleAuthRedirect('/'), 3000);
        return;
      }
      setUser(decoded.data);
    } catch (err) {
      console.error('Authentication error:', err);
      handleAuthRedirect('/login');
    }
  }, [handleAuthRedirect]);

  // FIXED: This function now correctly handles the `value` data type.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    // Convert string value to a float, or null if it's empty/invalid
    const valueAsFloat = parseFloat(form.value);
    
    addDonation({ 
      variables: {
        ...form,
        value: isNaN(valueAsFloat) ? null : valueAsFloat
      } 
    });
  };

  if (!user) {
    if (showAccessDenied) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-red-200">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h2>
            <p className="text-lg text-gray-700">You must be an administrator to view this page.</p>
            <p className="text-sm text-gray-500 mt-6">Redirecting to homepage...</p>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <motion.div
          className="max-w-md w-full p-10 bg-white rounded-xl shadow-xl border border-gray-100"
          variants={formContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 variants={formItemVariants} className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Add New Contribution
          </motion.h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <motion.div variants={formItemVariants}>
              <label htmlFor="donorName" className="block text-gray-700 text-sm font-semibold mb-2">Donor's Name</label>
              <input
                id="donorName"
                type="text"
                placeholder="Full Name of Donor"
                className="block w-full py-3 px-4 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="block w-full py-3 px-4 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.item}
                onChange={(e) => setForm({ ...form, item: e.target.value })}
                required
              />
            </motion.div>
            
            <motion.div variants={formItemVariants}>
              <label htmlFor="value" className="block text-gray-700 text-sm font-semibold mb-2">Monetary Value (Optional)</label>
              {/* FIXED: Changed type to "number" and removed "required" */}
              <input
                id="value"
                type="number"
                step="0.01"
                placeholder="e.g., 100.00 (Numbers only)"
                className="block w-full py-3 px-4 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
              />
            </motion.div>

            <motion.div variants={formItemVariants}>
              <label htmlFor="message" className="block text-gray-700 text-sm font-semibold mb-2">Optional Message</label>
              <textarea
                id="message"
                placeholder="A brief message from the donor"
                rows={4}
                className="block w-full py-3 px-4 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </motion.div>

            <motion.button
              variants={formItemVariants}
              type="submit"
              className={`w-full flex justify-center py-4 px-4 text-lg font-semibold rounded-full shadow-md transition-all duration-300 transform hover:scale-[1.01] ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Add Donation'}
            </motion.button>
            
            <AnimatePresence>
              {submissionMessage && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mt-4 text-center font-medium p-3 rounded-md ${submissionMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
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