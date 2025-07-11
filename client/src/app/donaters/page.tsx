'use client';

import { useMutation, gql } from '@apollo/client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

import Header from '@components/Header';
import Footer from '@components/Footer';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { FaExclamationTriangle, FaSpinner } from 'react-icons/fa';

const ADD_DONATION = gql`
  mutation AddDonation($donorName: String!, $item: String!, $value: Float, $message: String) {
    addDonation(donorName: $donorName, item: $item, value: $value, message: $message) {
      id
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

// --- Consistent Animation Variants ---
const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.1,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
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
            setForm({ donorName: '', item: '', value: '', message: '' });
            setTimeout(() => setSubmissionMessage(null), 4000);
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;
        const valueAsFloat = parseFloat(form.value);
        addDonation({ 
            variables: {
                ...form,
                value: isNaN(valueAsFloat) ? null : valueAsFloat
            } 
        });
    };

    // --- Loading and Access Denied States (Redesigned) ---
    if (!user) {
        if (showAccessDenied) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                    <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-red-200/80">
                        <FaExclamationTriangle className="mx-auto text-4xl text-red-500 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
                        <p className="text-gray-600 mt-2">You do not have permission to view this page.</p>
                        <p className="text-sm text-gray-500 mt-6">Redirecting to homepage...</p>
                    </div>
                </div>
            );
        }
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="flex items-center gap-3 text-lg font-semibold text-gray-600">
                    <FaSpinner className="animate-spin text-indigo-600 text-2xl" />
                    Authenticating...
                </div>
            </div>
        );
    }

    // --- Main Form (Redesigned) ---
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans antialiased">
            <Header />
            <main className="flex-grow flex items-center justify-center px-4 py-16">
                <motion.div
                    className="max-w-lg w-full p-8 md:p-12 bg-white rounded-2xl shadow-xl border border-gray-200/80"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Add New Contribution
                        </h2>
                        <p className="mt-2 text-gray-600">Record a new donation to the foundation.</p>
                    </motion.div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <motion.div variants={itemVariants}>
                            <label htmlFor="donorName" className="block text-sm font-semibold mb-2 text-gray-700">Donor's Name</label>
                            <input
                                id="donorName" type="text" placeholder="Full Name of Donor" required
                                className="block w-full py-3 px-4 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 transition"
                                value={form.donorName}
                                onChange={(e) => setForm({ ...form, donorName: e.target.value })}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <label htmlFor="item" className="block text-sm font-semibold mb-2 text-gray-700">Item Donated</label>
                            <input
                                id="item" type="text" placeholder="e.g., $100, 50 Books, Laptop" required
                                className="block w-full py-3 px-4 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 transition"
                                value={form.item}
                                onChange={(e) => setForm({ ...form, item: e.target.value })}
                            />
                        </motion.div>
                        
                        <motion.div variants={itemVariants}>
                            <label htmlFor="value" className="block text-sm font-semibold mb-2 text-gray-700">Monetary Value (Optional)</label>
                            <input
                                id="value" type="number" step="0.01" placeholder="e.g., 100.00 (Numbers only)"
                                className="block w-full py-3 px-4 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 transition"
                                value={form.value}
                                onChange={(e) => setForm({ ...form, value: e.target.value })}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-700">Optional Message</label>
                            <textarea
                                id="message" placeholder="A brief message from the donor" rows={4}
                                className="block w-full py-3 px-4 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 transition resize-y"
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <button
                                type="submit"
                                className={`w-full flex justify-center py-4 px-4 text-lg font-bold rounded-lg shadow-md transition-colors duration-300 ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                disabled={loading}
                            >
                                {loading ? 'Submitting...' : 'Add Donation'}
                            </button>
                        </motion.div>
                        
                        <AnimatePresence>
                            {submissionMessage && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className={`text-center font-medium p-3 rounded-lg ${submissionMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
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