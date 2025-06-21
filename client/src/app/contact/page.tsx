// app/contact/page.tsx
'use client';

// Removed 'Link' as it's not used in the component's JSX
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, Variants, Transition } from 'framer-motion';
import React, { useState } from 'react'; // Added React import for types, though often implicit

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

  // Framer Motion variants, already correctly typed with Variants and Transition
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      } as Transition,
    },
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased">
      <Header />

      {/* Hero Section for Contact Us */}
      <section className="bg-gradient-to-br from-teal-800 to-teal-600 text-white py-32 px-6 text-center pt-48 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E")',
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
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg">
            Get in Touch
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl opacity-95">
            We would love to hear from you. Reach out with any questions, ideas, or to learn how you can help.
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Form and Information Section */}
      <section className="py-20 px-6 bg-white shadow-inner">
        <motion.div
          className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Contact Form */}
          <motion.div variants={itemVariants} className="bg-gray-50 p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-extrabold mb-6 text-teal-800">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 resize-y"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-amber-500 text-teal-900 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-amber-400 transition-all duration-300 ease-in-out transform hover:scale-105 w-full text-lg"
                disabled={isSubmitting} // Disable button while submitting
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitStatus === 'success' && <p className="text-green-600 mt-2">Thank you for your message! We will get back to you soon.</p>}
              {submitStatus === 'error' && <p className="text-red-600 mt-2">Failed to send message. Please try again.</p>}
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-xl flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold mb-6 text-teal-800">Our Details</h2>
            <div className="space-y-6 text-lg text-gray-700">
              <div className="flex items-center space-x-4">
                <span className="text-teal-600 text-2xl">📧</span>
                <div>
                  <h3 className="font-bold text-gray-800">Email Us</h3>
                  <a href="mailto:konerenfoundation@gmail.com" className="text-gray-700 hover:text-teal-600 transition-colors duration-300">konerenfoundation@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-teal-600 text-2xl">📍</span>
                <div>
                  <h3 className="font-bold text-gray-800">Our Office</h3>
                  <p>Kone Renaissance Foundation</p>
                  <p>Kone, Ethiopia</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-teal-600 text-2xl">📞</span>
                <div>
                  <h3 className="font-bold text-gray-800">Call Us</h3>
                  {/* Note: This is a placeholder number. Replace with a real one. */}
                  <a href="tel:+251-11-234-5678" className="text-gray-700 hover:text-teal-600 transition-colors duration-300">+251 00 00 00 00</a>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4 text-teal-800">Connect with us on Social Media:</h3>
              <div className="flex space-x-4 justify-center md:justify-start">
                {/* Note: These are placeholder links. Replace with your actual social media URLs. */}
                <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-300" aria-label="Facebook">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-8 h-8" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-300" aria-label="Twitter">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-8 h-8" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors duration-300" aria-label="Instagram">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-8 h-8" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}