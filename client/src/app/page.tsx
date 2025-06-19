'use client';

import Link from 'next/link'; // Still needed for internal page links
import Header from '@/components/Header'; // Import your new Header component
import Footer from '@/components/Footer'; // Import your new Footer component
import { motion } from 'framer-motion';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased">
      {/* Plug in your Header component */}
      <Header />

      {/* Hero Section - Bold, inspiring, with a unique background */}
      {/* Note: Added pt-24 to main content to account for fixed header height */}
      <section className="bg-gradient-to-br from-teal-800 to-teal-600 text-white py-40 px-6 text-center relative overflow-hidden pt-24">
        {/* Subtle background graphic for modern feel */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '80px 80px',
            backgroundRepeat: 'repeat',
          }}
        ></div>
        <motion.div
          className="max-w-5xl mx-auto mt-10 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            Empowering Minds, Building Futures
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl lg:text-2xl mb-10 opacity-95 max-w-3xl mx-auto">
            Join the **Kone Renaissance Foundation** in transforming lives through education, revitalizing communities, and igniting dreams in rural Ethiopia.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              href="/donate"
              className="inline-block bg-amber-500 text-teal-900 font-bold px-10 py-5 rounded-full shadow-2xl hover:bg-amber-400 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg text-lg"
            >
              Support the Renaissance
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Introduction/Mission Section - Clean and impactful */}
      <section className="py-20 px-6 bg-white shadow-inner">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-extrabold mb-8 text-teal-800">
            Our Vision: A Brighter Tomorrow
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg leading-relaxed text-gray-700 max-w-3xl mx-auto">
            The Kone Renaissance Foundation is dedicated to the profound transformation of Kone High School. By fostering a vibrant learning environment through **essential infrastructure improvements, comprehensive resource provision, and dedicated support for both students and educators**, we are laying the groundwork for a sustainable, empowered future.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-12">
            <Link
              href="/about"
              className="inline-block text-teal-700 border-2 border-teal-700 font-semibold px-8 py-4 rounded-full hover:bg-teal-700 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
            >
              Learn More About Our Journey
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Impact Areas Section - Visual and engaging */}
      <section className="py-20 px-6 bg-gray-100">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-teal-800">
            Where Your Support Makes a Difference
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center group">
              <div className="bg-teal-100 text-teal-700 p-4 rounded-full mb-6 text-4xl group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors duration-300">
                📚
              </div>
              <h3 className="text-xl font-bold mb-3 text-teal-700 group-hover:text-amber-600 transition-colors duration-300">Learning Resources</h3>
              <p className="text-gray-600">Providing textbooks, digital tools, and a well-stocked library for every student.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center group">
              <div className="bg-teal-100 text-teal-700 p-4 rounded-full mb-6 text-4xl group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors duration-300">
                🏫
              </div>
              <h3 className="text-xl font-bold mb-3 text-teal-700 group-hover:text-amber-600 transition-colors duration-300">Modern Facilities</h3>
              <p className="text-gray-600">Upgrading classrooms, laboratories, and sanitation for a conducive learning environment.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center group">
              <div className="bg-teal-100 text-teal-700 p-4 rounded-full mb-6 text-4xl group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors duration-300">
                👩‍🏫
              </div>
              <h3 className="text-xl font-bold mb-3 text-teal-700 group-hover:text-amber-600 transition-colors duration-300">Teacher Empowerment</h3>
              <p className="text-gray-600">Supporting educators with training and resources to deliver high-quality instruction.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Call to Action Section - Urgent and inspiring */}
      <section className="py-24 px-6 bg-gradient-to-r from-teal-700 to-teal-900 text-white text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h3 variants={itemVariants} className="text-3xl md:text-5xl font-extrabold mb-6 leading-snug">
            Your Contribution Shapes a Legacy.
          </motion.h3>
          <motion.p variants={itemVariants} className="text-lg md:text-xl mb-10 opacity-90 max-w-3xl mx-auto">
            Every act of generosity fuels the future for Kone High School students. Whether you donate, volunteer, or spread our message, your impact is profound and lasting.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link
              href="/donate"
              className="inline-block bg-amber-500 text-teal-900 font-bold px-10 py-5 rounded-full shadow-xl hover:bg-amber-400 transition-all duration-300 ease-in-out transform hover:scale-105 text-lg"
            >
              Donate Today
            </Link>
            <Link
              href="/contact"
              className="inline-block border-2 border-white text-white font-semibold px-10 py-5 rounded-full hover:bg-white hover:text-teal-800 transition-all duration-300 transform hover:-translate-y-1 text-lg"
            >
              Get Involved
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Plug in your Footer component */}
      <Footer />
    </main>
  );
}