'use client';

import Header from '@components/Header';
import Footer from '@components/Footer';
import { motion, Variants } from 'framer-motion';
import React, { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaBullhorn, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

// --- Interface for form data ---
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// --- Data for new sections (like on the homepage) ---
const faqItems = [
    {
        q: "እንዴት መርዳት እችላለሁ?",
        a: "በሃገር ውጭ እንዲሁም በሃገር ውስጥ ላሉ ማህበረሰባችን በቀጥታ በዌብሳይታችን በኩል መርዳት እንዲችሉ በመጀመሪያ ህጋዊ ፈቃድ ያለውና ሙሉ ኮሚቴ ያለው ፋውንዴሽን እንዲሆን እየሰራን እንገኛለን ነገር ግን ማንኛውንም እርዳታ ለጊዜውም ቢሆን በቀጥታ ማስተላለፍ እንፈልጋለን ለሚሉ በስልክ ወይንም በኢሚል በመነጋገር መርዳት የምትችሉ ሲሆንእኛም የረዱትን ነገር ዌብሳስይቱ የፊት ገጽ ላይ ከምስል ጋር እንለጥፈዋለን።",
    },
    {
        q: "በጎ ፈቃድ ላይ እንዴት መሳተፍ እችላለሁ?",
        a: "የበጎ ፈቃድ ፕሮግራሞች የተወሰኑ አይደሉም ስለዚህም በማንኛውም መንገድ ትምህርት ቤቴን አግዛለው ለሚሉ ቅን ልቦች በራችን ክፍት ነው፡ እውቅናውንም በ ዌብሳይታችን የፊት ገጽ ዜና ክፍል ላይ ከምስል ጋር እንለጥፈዋለን ለሌሎችም አርአያንትዎን እንመሰክራለን።",
        },
    {
        q: "የረዳሁት ነገር ምን ላይ እንደዋለ በምን አረጋግጣለሁ?",
        a: "ልገሳዎ 100% በቀጥታ ለትምህርት ግብዓቶች፣ ለዲጂታል ቤተ-መጻሕፍት እና ለተማሪ ድጋፍ ፕሮግራሞች የሚውል ነው። ሙሉ በሙሉ ግልጽነት የሰፈነበት ፕላትፎርም ነው የፈጠርነው ስለዚህ ትንሽ ትልቅ ሳይባል የተደረጉትን ነገሮች በዜና ክፍል፥ በፌስ ቦክ ገጽ እንዲሁም ድጋፍ ያደረጉ ሰዎች ሲክሽን ላይ እንዲካተቱ ይደረጋል በዚህም ሁሉም ነገር ለህዝብ ክፍት የሆነ እንደሆነ እናስመሰክራለን።",
    },
];

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


  // --- Animation Variants from Homepage ---
  const fadeIn: Variants = {
     hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const staggerContainer: Variants = {
     hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="bg-gray-100 text-gray-800 font-sans antialiased">
      <Header />

      <main>
        {/* --- 1. DYNAMIC HERO SECTION (Homepage Style) --- */}
        <section className="relative h-[40vh] flex items-center justify-center text-indigo-600 text-center overflow-hidden">
              <motion.div
                className="relative z-20 px-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
                <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
                    መልእክት
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-600">
                   ያላችሁን አስተያየት ወይንም ጥያቄ በስልክ ወይንም ፎርሙ ላይ መልእክታችሁን በማስገባት መላክ ትችላላችሁ! 
                </p>
            </motion.div>
        </section>

        {/* --- 2. CONTACT FORM & INFO SECTION --- */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* --- Left Column: Form --- */}
            <motion.div
                className="bg-gray-50 p-8 md:p-12 rounded-2xl border border-gray-200/80 shadow-lg"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">የጽሑፍ ሳጥን</h2>
              <p className="text-gray-600 mb-8">እባክዎ መልእክትዎን ከዚህ በታች ባለው ፎርም ይላኩልን</p>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* --- Form fields styled like homepage inputs --- */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-700">ስም</label>
                  <input type="text" placeholder="Full Name" id="name" name="name" value={formData.name} onChange={handleChange} required className="block w-full py-3 px-4 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white transition" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700">ኢሜይል</label>
                  <input type="email" placeholder="email address" id="email" name="email" value={formData.email} onChange={handleChange} required className="block w-full py-3 px-4 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white transition" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold mb-2 text-gray-700">ርእስ</label>
                  <input type="text" placeholder="Ex. want to be a volunteer" id="subject" name="subject" value={formData.subject} onChange={handleChange} className="block w-full py-3 px-4 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white transition" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-700">ሙሉ መልእክት</label>
                  <textarea id="message" placeholder="write your message here" name="message" value={formData.message} onChange={handleChange} rows={5} required className="block w-full py-3 px-4 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white transition resize-y"></textarea>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100 text-lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'መልእክቱን ላክ'}
                </button>
                {submitStatus === 'success' && <p className="text-green-600 mt-4 text-center font-medium">Thank you! Your message has been sent.</p>}
                {submitStatus === 'error' && <p className="text-red-600 mt-4 text-center font-medium">Failed to send message. Please try again.</p>}
              </form>
            </motion.div>

            {/* --- Right Column: Info & Map --- */}
            <motion.div
                className="space-y-8"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200/80">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">አድራሻችን</h3>
                    <div className="space-y-6">
                         <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 text-xl"><FaEnvelope /></div>
                            <div>
                                <h4 className="font-bold text-lg text-gray-900">ኢሜል አድራሻ</h4>
                                <a href="mailto:konerenfoundation@gmail.com" className="text-gray-600 hover:text-indigo-600 transition-colors">konerenfoundation@gmail.com</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 text-xl"><FaPhoneAlt /></div>
                            <div>
                                <h4 className="font-bold text-lg text-gray-900">ስልክ ቁጥር</h4>
                                <a href="tel:+25100000000" className="text-gray-600 hover:text-indigo-600 transition-colors">+251 00 00 00 00</a>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 text-xl"><FaMapMarkerAlt /></div>
                            <div>
                                <h4 className="font-bold text-lg text-gray-900">የቢሮ አድራሻ</h4>
                                <p className="text-gray-600">አማራ ክልል በሰሜን ወሎ ዞን ዋድላ ወረዳ-ኮን ከተማ</p>
                            </div>
                        </div>
                    </div>
                </div>
                 <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200/80">
                    <iframe
                        src="https://maps.google.com/maps?q=11.609722,38.933889&t=k&z=17&output=embed"
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </motion.div>
          </div>
        </section>

        {/* --- 3. INTERACTIVE FAQ SECTION (Homepage Style) --- */}
        <section className="py-20 sm:py-28 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center"
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">በተደጋግሚ የሚነሱ ጥያቄዎች</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">ጥያቄ አለዎት?</p>
                </motion.div>

                <motion.div
                    className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {faqItems.map(item => (
                        <motion.div key={item.q} variants={fadeIn} className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.q}</h3>
                            <p className="text-gray-600 leading-relaxed mb-6">{item.a}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
           </main>

      <Footer />
    </div>
  );
}