// src/app/donate/page.tsx
'use client';

import Link from 'next/link';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { motion, Variants, Transition } from 'framer-motion';
import { FaClock, FaHandHoldingUsd, FaUniversity, FaBookOpen, FaEnvelope, FaInfoCircle, FaHandHoldingHeart } from 'react-icons/fa'; // Icons for Coming Soon elements

export default function DonatePage() {
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

      {/* Hero Section - Coming Soon Focus */}
      <section className="bg-gradient-to-br from-teal-950 to-teal-700 text-white py-32 px-6 text-center pt-48 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 60L60 0H30L0 30M60 60V30L30 60\'/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '120px 120px',
            backgroundRepeat: 'repeat',
          }}
        ></div>
        <motion.div
          className="max-w-4xl mx-auto relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="text-6xl text-amber-400 mb-6 drop-shadow-lg">
            <FaClock className="mx-auto" />
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg font-serif">
            Donations Opening Soon!
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl opacity-95 max-w-3xl mx-auto">
            We are diligently working to finalize a secure and seamless donation platform.
            Get ready to empower students and transform futures at Kone High School.
          </motion.p>
        </motion.div>
      </section>

      ---

      {/* Mission & Impact Section - What Donations Will Support */}
      <section className="py-20 px-6 bg-white">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold text-teal-800 text-center mb-12 font-serif">
            What Your Future Generosity Will Support
          </motion.h2>

          <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed mb-12 text-center max-w-4xl mx-auto">
            The Kone Renaissance Foundation is dedicated to fostering academic excellence and providing essential resources for **Kone High School**. Your future contributions will be vital in equipping students with the tools they need to succeed and supporting the dedicated teachers who guide them.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="bg-teal-50 p-8 rounded-lg shadow-lg flex flex-col items-center text-center border-b-4 border-teal-600 hover:shadow-xl transition-shadow duration-300">
              <FaBookOpen className="text-5xl text-teal-700 mb-5" />
              <h3 className="text-2xl font-bold text-teal-800 mb-3 font-serif">Enhanced Learning Resources</h3>
              <p className="text-gray-700">Funds will procure modern textbooks, digital learning tools, and supplies, enriching the academic journey for every student.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-teal-50 p-8 rounded-lg shadow-lg flex flex-col items-center text-center border-b-4 border-amber-600 hover:shadow-xl transition-shadow duration-300">
              <FaUniversity className="text-5xl text-amber-700 mb-5" />
              <h3 className="text-2xl font-bold text-teal-800 mb-3 font-serif">Modernized School Facilities</h3>
              <p className="text-gray-700">Your support will help upgrade classrooms, science laboratories, and sanitation facilities, fostering a safe and conducive learning environment.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-teal-50 p-8 rounded-lg shadow-lg flex flex-col items-center text-center border-b-4 border-teal-600 hover:shadow-xl transition-shadow duration-300">
              <FaHandHoldingUsd className="text-5xl text-teal-700 mb-5" />
              <h3 className="text-2xl font-bold text-teal-800 mb-3 font-serif">Teacher Development & Support</h3>
              <p className="text-gray-700">Contributions will empower educators with professional training, workshops, and essential resources, ensuring high-quality instruction.</p>
            </motion.div>
          </div>

          <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed text-center mt-16">
            To understand the impact we are already making, please visit our{' '}
            <Link href="/impact" className="text-teal-600 hover:text-teal-800 font-semibold underline">
              Our Impact
            </Link>{' '}
            page.
          </motion.p>
        </motion.div>
      </section>

      ---

      {/* Stay Updated Section - Call to Action for Information */}
      <section className="py-20 px-6 bg-gray-100">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold text-teal-800 mb-8 font-serif">
            Be the First to Know
          </motion.h2>

          <motion.div variants={itemVariants} className="bg-white p-10 rounded-xl shadow-2xl border border-gray-200">
            <h3 className="text-3xl font-extrabold text-amber-600 mb-6 font-serif flex items-center justify-center">
              <FaEnvelope className="text-4xl mr-4" /> Get Notified When Donations Open
            </h3>
            <p className="text-lg text-gray-700 mb-8">
              Sign up for our newsletter to receive an alert the moment our secure donation platform goes live. You&apos;ll also get updates on our progress and the difference your support makes.
            </p>

            {/* Placeholder for Newsletter Signup Form */}
            <motion.div variants={itemVariants} className="mb-8">
              {/* In a real scenario, this would be a form with input fields and a submit button */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full sm:w-2/3 p-4 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                />
                <button
                  className="w-full sm:w-1/3 bg-teal-700 text-white font-bold px-8 py-4 rounded-lg shadow-md hover:bg-teal-800 transition-all duration-300 transform hover:scale-105 text-lg"
                >
                  Notify Me
                </button>
              </div>
            </motion.div>

            <p className="text-md text-gray-600">
              We respect your privacy. Your email will only be used for updates from Kone Renaissance Foundation.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-12 bg-white p-10 rounded-xl shadow-2xl border border-gray-200">
            <h3 className="text-3xl font-extrabold text-teal-700 mb-6 font-serif flex items-center justify-center">
              <FaInfoCircle className="text-4xl mr-4" /> Learn More & Connect
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              While we prepare our donation system, we encourage you to explore our work and connect with us.
            </p>
            <ul className="list-none text-left text-lg text-gray-700 space-y-4">
              <li className="flex items-start">
                <span className="text-teal-600 text-2xl mr-3 mt-1">●</span>
                <div>
                  <strong className="text-teal-800">About Us:</strong> Understand our mission, vision, and the passion that drives us. {' '}
                  <Link href="/about" className="text-teal-600 hover:text-teal-800 font-semibold underline">
                    Learn more
                  </Link>.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-teal-600 text-2xl mr-3 mt-1">●</span>
                <div>
                  <strong className="text-teal-800">Contact Us:</strong> Have questions or want to discuss potential partnerships?{' '}
                  <Link href="/contact" className="text-teal-600 hover:text-teal-800 font-semibold underline">
                    Reach out to our team
                  </Link>.
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}