// src/app/donations/page.tsx
'use client';

import Link from 'next/link';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { useQuery, gql } from '@apollo/client';
import { motion, Variants } from 'framer-motion';
import { FaHeart, FaGift, FaUserCircle } from 'react-icons/fa'; // More expressive icons

// Define your GraphQL query for all donations
const GET_ALL_DONATIONS = gql`
  query GetAllDonations {
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

// Define animation variants for a smoother list reveal, consistent with other pages
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07, // Subtle stagger for fluid entry
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 }, // Slightly larger Y displacement for more impact
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween', // Consistent tween transition
      ease: 'easeOut',
      duration: 0.5, // Slightly longer duration for smoothness
    },
  },
};

export default function DonationsPage() {
  const { data, loading, error } = useQuery(GET_ALL_DONATIONS);
  // Sort donations by date in descending order (latest first)
  const allDonations = [...(data?.getDonations || [])].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased overflow-x-hidden">
      <Header />

      {/* Hero Section - Bold, Clean, Dark Background */}
      <section className="bg-gray-900 text-white py-24 md:py-32 lg:py-40 px-6 text-center pt-48 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5" // Very subtle background pattern
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 60L60 0H30L0 30M60 60V30L30 60\'/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '120px 120px',
            backgroundRepeat: 'repeat',
          }}
        ></div>

        <motion.div
          className="max-w-4xl mx-auto relative z-10" // Adjusted max-width for better list readability
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-center leading-tight">
            በቅን ልቦች የተደረገ ድጋፍ ሙሉ ዝርዝር
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl lg:text-2xl text-center font-light opacity-90 max-w-3xl mx-auto mb-10">
            A heartfelt thank you to every generous contributor. Your support transforms lives.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              href="/donate"
              className="inline-block bg-blue-600 text-white font-semibold px-10 py-5 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 text-lg"
            >
              Make a New Donation
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* All Donations List Section - Clean, Card-based, with Ample Space */}
      <section className="py-20 px-6 bg-gray-50"> {/* Light gray background for contrast */}
        <motion.div
          className="max-w-4xl mx-auto" // Centralize content on wide screens
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {loading ? (
            <p className="text-center text-gray-700 text-xl font-medium py-12 bg-white rounded-xl shadow-md border border-gray-100 flex items-center justify-center">
              <span className="animate-spin inline-block mr-3 text-gray-500 text-2xl">🔄</span> Loading all contributions...
            </p>
          ) : error ? (
            <p className="text-center text-red-600 text-xl font-medium py-12 bg-red-50 rounded-xl shadow-md border border-red-200 flex items-center justify-center">
              <span className="mr-3 text-red-500 text-2xl">⚠️</span> Failed to load contributions. Please try again.
            </p>
          ) : allDonations.length === 0 ? (
            <div className="text-center text-gray-700 text-xl font-medium py-12 px-6 bg-white rounded-xl shadow-md border border-gray-100">
              <p className="mb-4 text-2xl font-semibold text-gray-900">No donations recorded yet.</p>
              <p className="mb-6 max-w-xl mx-auto">
                Be the first to make a monumental difference and see your name on this list! Your contribution empowers minds and builds futures.
              </p>
              <Link
                href="/donate"
                className="inline-block bg-blue-600 text-white font-semibold px-8 py-4 rounded-full shadow-md hover:bg-blue-700 transition-colors duration-300 text-lg"
              >
                Donate Now
              </Link>
            </div>
          ) : (
            // Grid layout for donation cards - better visual flow for many items
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Increased gap */}
              {allDonations.map((donation: any) => (
                <motion.div
                  key={donation.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl p-6 border border-gray-200 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow duration-300" // Clean, subtle card style
                >
                  <div>
                    {/* Donor Name and Item - Prominent and clear */}
                    <p className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-3 flex items-center">
                      <FaHeart className="text-blue-500 mr-3 text-2xl flex-shrink-0" /> {/* Accent icon */}
                      <span className="truncate">{donation.donorName || 'Anonymous'}</span> donated
                      <span className="font-extrabold text-blue-600 ml-2 truncate">{donation.item}</span>
                    </p>

                    {/* Optional Message */}
                    {donation.message && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-100">
                        <p className="text-base text-gray-700 italic leading-relaxed">
                          "{donation.message}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Date and SubmittedBy - Aligned, subtle */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100"> {/* Top border for separation */}
                    {donation.submittedBy && donation.submittedBy.firstName && (
                      <p className="text-sm text-gray-600 flex items-center">
                        <FaUserCircle className="text-gray-400 mr-2" /> {/* Subtle icon */}
                        Added by:{' '}
                        <span className="font-semibold text-gray-800 ml-1">
                          {donation.submittedBy.role === 'admin'
                            ? `Admin (${donation.submittedBy.firstName})`
                            : donation.submittedBy.firstName}
                        </span>
                      </p>
                    )}
                    <p className="text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full inline-block font-medium">
                      {new Date(donation.date).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Back to Home Link - Prominent button style */}
          <motion.div variants={itemVariants} className="text-center mt-20">
            <Link
              href="/" // Link back to the home page
              className="inline-flex items-center bg-gray-900 text-white font-semibold px-10 py-5 rounded-full shadow-lg hover:bg-gray-700 transition-colors duration-300 text-lg"
            >
              <svg className="mr-3 w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
              </svg>
              Back to Home
            </Link>
          </motion.div>

        </motion.div>
      </section>

      <Footer />
    </main>
  );
}