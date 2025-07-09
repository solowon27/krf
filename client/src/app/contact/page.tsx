// app/contact/page.tsx
'use client';

import Header from '@components/Header';
import Footer from '@components/Footer';
import { motion, Variants, Transition } from 'framer-motion';
import React, { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Keep these icons, styling them neutrally
import Link from 'next/link';

// Define an interface for the form data structure for better type safety
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactUs() {
  // Explicitly type the formData state using the FormData interface
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(''); // 'success', 'error', ''

  // Add type annotation for the event parameter 'e'
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Add type annotation for the event parameter 'e' for form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // --- IMPORTANT: Update this URL to your backend's URL ---
      // If running locally, it's typically http://localhost:4000
      // If deployed, use your deployed backend URL (e.g., https://api.yourdomain.com)
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000'; // Define this env var
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
      } else {
        const errorData = await response.json();
        setSubmitStatus('error');
        console.error('Server error:', errorData.message);
      }
    } catch (error: unknown) { // Type 'error' in catch block as 'unknown'
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Framer Motion variants, adjusted for consistent Apple-like smooth transitions
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Subtle stagger
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'tween', // Consistent tween transition
        ease: 'easeOut',
        duration: 0.4,
      } as Transition,
    },
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased overflow-x-hidden"> {/* Consistent background and text color */}
      <Header />

      {/* Hero Section for Contact Us - Dark, impactful, clean */}
      <section className="bg-gray-900 text-white py-32 px-6 text-center pt-48 relative overflow-hidden"> {/* Solid dark background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '80px 80px',
            backgroundRepeat: 'repeat',
          }}
        ></div>
        <motion.div
          className="max-w-4xl mx-auto relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
            የመልእክት ገጽ
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl lg:text-2xl font-light opacity-90 max-w-3xl mx-auto">
            አስተያየታችሁንና ጥያቄያችሁን በመልእክት ሳጥኑ በመጠቀም ወይንም በስልክ በመደውል ያሳውቁን። 
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Form and Information Section - Clean, grid-based layout */}
      <section className="py-20 px-6 bg-white"> {/* Clean white background for the section */}
        <div
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12" // Increased max-width for better spacing
        >
          {/* Contact Form Card */}
          <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-100"> {/* Light gray background for form card, subtle shadow/border */}
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Send Us a Message / መልእክት ይላኩልን</h2> {/* Stronger heading, neutral color */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2"> {/* Font-semibold for labels */}
                  Name / ስም
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="block w-full py-3 px-4 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white" // Clean borders, blue focus ring
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                  Email / ኢሜይል
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full py-3 px-4 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-gray-700 text-sm font-semibold mb-2">
                  Subject / ርእስ
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="block w-full py-3 px-4 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 text-sm font-semibold mb-2">
                  Message / ሙሉ መልእክት
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                  className="block w-full py-3 px-4 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-y bg-white"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold px-8 py-4 rounded-full shadow-md hover:bg-blue-700 transition-colors duration-300 w-full text-lg" // Apple-like blue button
                disabled={isSubmitting} // Disable button while submitting
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitStatus === 'success' && <p className="text-green-600 mt-4 text-center font-medium">Thank you for your message! We will get back to you soon.</p>}
              {submitStatus === 'error' && <p className="text-red-600 mt-4 text-center font-medium">Failed to send message. Please try again.</p>}
            </form>
          </motion.div>

          {/* Contact Information Card */}
          <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col justify-between"> {/* Light gray background for info card, subtle shadow/border, justify-between for sticky content */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Reach Out to Us</h2> {/* Stronger heading, neutral color */}
              <div className="space-y-8 text-lg text-gray-700"> {/* Increased space between items */}
                <div className="flex items-start space-x-4"> {/* Align icon to top of text */}
                  <FaEnvelope className="text-gray-600 text-3xl mt-1" /> {/* Neutral icon color, larger icon */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email Us Directly</h3>
                    <a href="mailto:konerenfoundation@gmail.com" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 text-base">konerenfoundation@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <FaMapMarkerAlt className="text-gray-600 text-3xl mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Our Office Location</h3>
                    <p className="text-base">Kone Renaissance Foundation</p>
                    <p className="text-base">የኮን ህዳሴ ፋውንዴሽን</p>
                    <p className="text-base">Kone, North Wollo, Ethiopia</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <FaPhoneAlt className="text-gray-600 text-3xl mt-1" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Call Our Support Team</h3>
                    <a href="tel:+251-11-234-5678" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 text-base">+251 00 00 00 00</a> {/* Placeholder number */}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Section - Clean, subtle */}
            <div className="mt-12 pt-8 border-t border-gray-200"> {/* Border top for separation */}
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">Connect with Us</h3>
              <div className="flex space-x-6 justify-center"> {/* Centered social icons */}
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300" aria-label="Facebook">
                  <FaFacebook className="w-8 h-8" />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300" aria-label="Twitter">
                  <FaTwitter className="w-8 h-8" />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300" aria-label="Instagram">
                  <FaInstagram className="w-8 h-8" />
                </a>
                {/* Add other social icons as needed, maintaining consistent style */}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section - Consistent dark background, Apple-like button */}
      <section className="py-20 px-6 bg-gray-900 text-white text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h3 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6 leading-snug">
            Ready to Make a Difference?
          </motion.h3>
          <motion.p variants={itemVariants} className="text-lg opacity-90 mb-8 max-w-2xl mx-auto font-light">
            Your support is the bedrock of our mission. Join us in shaping a brighter future for Kone.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              href="/donate"
              className="inline-block bg-blue-600 text-white font-semibold px-10 py-5 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105" // Apple-like blue button
            >
              Support Our Mission
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}