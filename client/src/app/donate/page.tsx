'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, Variants, Transition } from 'framer-motion';

export default function DonatePage() {
 const containerVariants: Variants = { // Add ': Variants' here
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = { // Add ': Variants' here
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    } as Transition, // Add 'as Transition' here
  },
};

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-600 to-amber-400 text-white py-32 px-6 text-center pt-48 relative overflow-hidden">
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
            Support Education at Kone High School
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl opacity-95">
            Every donation directly empowers students and teachers, transforming lives through learning.
          </motion.p>
        </motion.div>
      </section>

      {/* Why Donate Section - Focused on Kone High School */}
      <section className="py-20 px-6 bg-white">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-extrabold text-teal-800 text-center mb-12">
            Why Your Donation Matters to Kone High School
          </motion.h2>

          <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed mb-8">
            Kone Renaissance Foundation is deeply committed to fostering academic excellence and providing essential resources for **Kone High School**. Your generous contributions are vital to equipping students with the tools they need to succeed and supporting the dedicated teachers who guide them.
          </motion.p>

          <div className="mb-12">
            <motion.div variants={itemVariants} className="bg-teal-50 p-6 rounded-lg shadow-md text-center mb-6">
              <h3 className="text-2xl font-bold text-teal-700 mb-3">Empowering Students</h3>
              <p className="text-gray-700">Your donation directly funds scholarships for deserving students, provides modern textbooks and learning materials, and supports vital extracurricular programs.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-teal-50 p-6 rounded-lg shadow-md text-center mb-6">
              <h3 className="text-2xl font-bold text-teal-700 mb-3">Supporting Teachers</h3>
              <p className="text-gray-700">Contributions enable us to organize professional development workshops for teachers, ensuring they have the latest pedagogical skills and resources.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-teal-50 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-bold text-teal-700 mb-3">Improving Facilities</h3>
              <p className="text-gray-700">Funds help maintain and upgrade classrooms, science labs, libraries, and other essential facilities at Kone High School, creating a better learning environment.</p>
            </motion.div>
          </div>

          <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed text-center">
            To see the direct impact of our work at Kone High School, please visit our{' '}
            <Link href="/impact" className="text-teal-600 hover:text-teal-800 font-semibold underline">
              Our Impact
            </Link>{' '}
            page.
          </motion.p>
        </motion.div>
      </section>

      {/* Donation Options Section */}
      <section className="py-20 px-6 bg-gray-100">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-extrabold text-teal-800 mb-8">
            How You Can Support Kone High School
          </motion.h2>

          <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
            <h3 className="text-3xl font-bold text-amber-600 mb-6">Online Donation</h3>
            <p className="text-lg text-gray-700 mb-8">
              The fastest and easiest way to contribute to Kone High School is through our secure online portal. Your generosity immediately supports our educational programs.
            </p>

            {/*
              IMPORTANT: Placeholder for your actual donation button/widget.
              Replace the Link below with your actual payment solution.
              Common options include:
              1. A direct link to your PayPal.me, Stripe Checkout link, or a page on a dedicated donation platform (e.g., Donorbox, GiveCampus).
              2. An embeddable widget provided by your payment processor (e.g., Donorbox widget, Stripe Elements custom form).
            */}
            <motion.div variants={itemVariants}>
              <Link
                href="YOUR_SECURE_DONATION_LINK_HERE" // <-- REPLACE THIS WITH YOUR ACTUAL DONATION LINK
                target="_blank" // Opens in a new tab
                rel="noopener noreferrer" // Security best practice for target="_blank"
                className="inline-block bg-amber-500 text-white font-bold px-10 py-4 rounded-full shadow-lg hover:bg-amber-600 transition-all duration-300 ease-in-out transform hover:scale-105 text-xl"
              >
                Donate Securely Online for Kone High School
              </Link>
            </motion.div>

            <p className="text-md text-gray-600 mt-8">
              All donations are tax-deductible to the fullest extent allowed by law. We ensure 100% transparency in the utilization of your funds for Kone High School's benefit.*
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-12 bg-white p-8 rounded-lg shadow-xl border border-gray-200">
            <h3 className="text-3xl font-bold text-teal-700 mb-6">Other Ways to Support Kone High School</h3>
            <p className="text-lg text-gray-700 mb-4">
              If you prefer alternative methods to contribute to Kone High School, please explore the options below:
            </p>
            <ul className="list-disc list-inside text-left text-lg text-gray-700 space-y-3 pl-4">
              <li>
                Bank Transfer: For larger donations directly to Kone High School&apos;s initiatives, please{' '}
                <Link href="/contact" className="text-teal-600 hover:text-teal-800 font-semibold underline">
                  contact us
                </Link>{' '}
                for our bank details.
              </li>
              <li>
                Mail a Check: Send your check payable to &quot;Kone Renaissance Foundation&quot; (with a memo for Kone High School) to:<br />
                <address className="lg bg-red-600 mt-2 text-gray-600">
                  coming soon<br />
                </address>
              </li>
              <li>
                In-Kind Donations: Interested in donating educational materials, technology, or services directly to Kone High School?{' '}
                <Link href="/contact" className="text-teal-600 hover:text-teal-800 font-semibold underline">
                  Reach out
                </Link>{' '}
                to discuss how your contribution can help.
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-12 text-center text-lg">
            <p className="mb-4">Have questions about your donation or how funds benefit Kone High School?</p>
            <Link
              href="/contact"
              className="inline-block bg-teal-700 text-white font-bold px-8 py-3 rounded-full shadow-md hover:bg-teal-800 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Contact Our Team
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}