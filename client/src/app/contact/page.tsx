'use client';

import Header from '@components/Header';
import Footer from '@components/Footer';
import { motion, Variants, Transition } from 'framer-motion';
import React, { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

// --- Interface for form data ---
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactUs() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(''); // 'success', 'error', ''

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const errorData = await response.json();
        setSubmitStatus('error');
        console.error('Server error:', errorData.message);
      }
    } catch (error: unknown) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Consistent Animation Variants ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    // THEME: Main background is light gray
    <div className="bg-gray-50 text-gray-800 font-sans antialiased">
      <Header />

      <main>
        {/* --- HERO SECTION --- */}
        {/* THEME: Replaced old hero with the new clean, light version */}
        <section className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
                <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    <motion.h1 
                        variants={itemVariants} 
                        className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight"
                    >
                        የመልእክት ገጽ
                    </motion.h1>
                    <motion.p 
                        variants={itemVariants} 
                        className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-600"
                    >
                        አስተያየታችሁንና ጥያቄያችሁን በመልእክት ሳጥኑ በመጠቀም ወይንም በስልክ በመደወል ያሳውቁን።
                    </motion.p>
                </motion.div>
            </div>
        </section>

        {/* --- CONTACT FORM & INFO SECTION --- */}
        <section className="py-24 sm:py-32">
          {/* BUG FIX: This container now animates in on load, ensuring its children are always visible */}
          <motion.div 
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* --- Contact Form (Left Column) --- */}
            <motion.div variants={itemVariants} className="lg:col-span-3 bg-white p-8 md:p-12 rounded-2xl shadow-md border border-gray-200/80">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Send Us a Message / መልእክት ይላኩልን</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-700">Name / ስም</label>
                  <input
                    type="text" id="name" name="name"
                    value={formData.name} onChange={handleChange} required
                    // THEME: Updated input styles
                    className="block w-full py-3 px-4 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 transition"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700">Email / ኢሜይል</label>
                  <input
                    type="email" id="email" name="email"
                    value={formData.email} onChange={handleChange} required
                    className="block w-full py-3 px-4 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 transition"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold mb-2 text-gray-700">Subject / ርእስ</label>
                  <input
                    type="text" id="subject" name="subject"
                    value={formData.subject} onChange={handleChange}
                    className="block w-full py-3 px-4 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 transition"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-700">Message / ሙሉ መልእክት</label>
                  <textarea
                    id="message" name="message"
                    value={formData.message} onChange={handleChange} rows={6} required
                    className="block w-full py-3 px-4 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 transition resize-y"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  // THEME: Updated button styles
                  className="w-full bg-indigo-600 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300 disabled:bg-gray-400 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                {submitStatus === 'success' && <p className="text-green-600 mt-4 text-center font-medium">Thank you! Your message has been sent successfully.</p>}
                {submitStatus === 'error' && <p className="text-red-600 mt-4 text-center font-medium">Failed to send message. Please try again later.</p>}
              </form>
            </motion.div>

            {/* --- Contact Info (Right Column) --- */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
                {/* THEME: Info blocks redesigned for consistency */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 text-xl"><FaEnvelope /></div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">Email</h3>
                    <a href="mailto:konerenfoundation@gmail.com" className="text-gray-600 hover:text-indigo-600 transition-colors">konerenfoundation@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 text-xl"><FaPhoneAlt /></div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">Phone</h3>
                    <a href="tel:+25100000000" className="text-gray-600 hover:text-indigo-600 transition-colors">+251 00 00 00 00</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 text-xl"><FaMapMarkerAlt /></div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">Office</h3>
                    <p className="text-gray-600">Kone, North Wollo, Ethiopia</p>
                  </div>
                </div>
                <div className="pt-8 mt-8 border-t border-gray-200">
                    <h3 className="font-bold text-lg text-gray-900 mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors"><FaFacebook size={24} /></a>
                      <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors"><FaTwitter size={24} /></a>
                      <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors"><FaInstagram size={24} /></a>
                    </div>
                </div>
            </motion.div>

          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}