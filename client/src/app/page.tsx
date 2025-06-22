// src/app/page.tsx
'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, Variants, Transition } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa'; // Import the spinner icon

import { useQuery, gql } from '@apollo/client';

const GET_DONATIONS = gql`
  query GetDonations {
    getDonations {
      id
      donorName
      item
      message
      date
      submittedBy {
        firstName
        role
      }
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(GET_DONATIONS);
  const donations = data?.getDonations || [];

  // Limit to showing the latest 6 donations, as requested
  const latestDonations = donations.slice(0, 6);

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

      {/* Hero Section - Bold, inspiring, with a unique background */}
      <section className="bg-gradient-to-br from-teal-800 to-teal-600 text-white py-40 px-6 text-center relative overflow-hidden pt-24">
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

      {/* Recent Donations Section - Clean, Widely Accepted List Style */}
      <section className="py-16 px-4 bg-gradient-to-r from-teal-50 via-white to-amber-50 relative overflow-hidden">
        {/* Subtle background pattern/texture overlay */}
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23a0aec0\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>

        <motion.div
          className="max-w-6xl mx-auto relative z-10" // Wider container, ensure it's above pattern
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl font-extrabold mb-4 text-center text-teal-900 drop-shadow-md">
            Our Heartfelt Gratitude
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-center text-amber-700 font-semibold mb-4">
            በቅርብ ጊዜ በቅን ልቦች የተደረገ ድጋፍ ዝርዝር
          </motion.p>

          {loading ? (
            <p className="text-center text-gray-700 text-2xl font-medium py-16 bg-white rounded-lg shadow-xl">
              <span className="animate-spin inline-block mr-4 text-teal-600 text-3xl">
                <FaSpinner className="inline-block" /> {/* Use FaSpinner here */}
              </span> Fetching the latest kindness...
            </p>
          ) : error ? (
            <p className="text-center text-red-700 text-2xl font-medium py-16 bg-red-50 rounded-lg shadow-xl border border-red-200">
              <span className="mr-4 text-red-600 text-3xl">⚠️</span> Failed to load contributions. Please try again.
            </p>
          ) : latestDonations.length === 0 ? (
            <p className="text-center text-gray-700 text-2xl font-medium py-16 px-6 bg-white rounded-lg shadow-xl">
              Be the first to make a monumental difference! No donations recorded yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Responsive grid with 3 columns on large screens */}
              {latestDonations.map((donation: any) => (
                <motion.div
                  key={donation.id}
                  variants={itemVariants}
                  className="group bg-gradient-to-br from-white to-teal-50 rounded-2xl p-7 shadow-xl border border-teal-100
                             hover:from-white hover:to-amber-50 hover:shadow-2xl transition-all duration-500
                             transform hover:-translate-y-2 hover:rotate-1 focus:rotate-1" // More dynamic hover
                >
                  <div className="flex items-center mb-4">
                    <span className="text-4xl text-amber-600 mr-4">🌟</span> {/* Star icon for donation */}
                    <p className="text-xl font-bold text-teal-800 leading-tight">
                      {donation.donorName}
                    </p>
                  </div>

                  <p className="text-3xl font-extrabold text-amber-700 mb-4 leading-tight">
                    Donated: {donation.item}
                  </p>

                  {donation.message && (
                    <div className="bg-teal-50 rounded-lg p-4 mb-4 border border-teal-100 shadow-inner">
                      <p className="text-base text-gray-700 italic leading-relaxed">
                        "{donation.message}"
                      </p>
                    </div>
                  )}

                  {/* COMBINED FLEX CONTAINER FOR SUBMITTED BY AND DATE */}
                  <div className="text-right mt-auto flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm">
                    {donation.submittedBy && ( // Check if submittedBy exists
                      <p className="text-gray-600 font-medium italic mb-2 sm:mb-0"> {/* Added margin for stacking on small screens */}
                        Added by:{' '}
                        <span className="text-teal-700 font-semibold">
                          {donation.submittedBy.role === 'admin'
                            ? `Admin (${donation.submittedBy.firstName})`
                            : donation.submittedBy.firstName}
                        </span>
                      </p>
                    )}

                    <p className="inline-block bg-teal-200 text-teal-800 text-sm font-semibold px-4 py-2 rounded-full tracking-wide">
                      {new Date(donation.date).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {donations.length > 6 && (
            <motion.div variants={itemVariants} className="text-center mt-20">
              <Link
                href="/AllDonations" // Changed to /donations, as per the previous suggestion for the dedicated page
                className="inline-flex items-center bg-teal-800 text-white font-bold px-12 py-5 rounded-full shadow-2xl hover:bg-teal-700
                           transition-all duration-500 ease-in-out transform hover:scale-105 hover:translate-y-[-3px]
                           text-xl relative overflow-hidden group" // More premium button
              >
                <span className="relative z-10">Explore All Contributions</span>
                <svg className="ml-4 w-6 h-6 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
                {/* Subtle hover effect */}
                <span className="absolute inset-0 bg-amber-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></span>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Introduction/Mission Section - Clean and impactful */}
      <section className="py-20 px-6 bg-gray-50 shadow-inner">
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
      <section className="py-20 px-6 bg-white">
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

      <Footer />
    </main>
  );
}