// src/app/donations/page.tsx
'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useQuery, gql } from '@apollo/client';
import { motion, Variants } from 'framer-motion';

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

// Define animation variants for a smoother list reveal
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Slightly less stagger for faster loading of many items
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
      damping: 15, // Slightly more damping for a softer bounce
    },
  },
};

export default function DonationsPage() {
  const { data, loading, error } = useQuery(GET_ALL_DONATIONS);
  const allDonations = data?.getDonations || [];

  return (
    <main className="min-h-screen py-10 bg-gray-50 text-gray-800 font-sans antialiased">
      <Header />

      <section className="py-16 px-4 bg-gradient-to-r from-teal-50 via-white to-amber-50 relative overflow-hidden">
        {/* Subtle background pattern/texture overlay */}
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23a0aec0\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }}></div>

        <motion.div
          className="max-w-4xl mx-auto relative z-10" // Adjusted max-width for better list readability
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-teal-900 drop-shadow-md">
            በቅን ልቦች የተደረገ ድጋፍ ሙሉ ዝርዝር
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-center text-amber-700 font-semibold mb-12">
            A heartfelt thank you to every generous contributor.
          </motion.p>

          {loading ? (
            <p className="text-center text-gray-700 text-xl font-medium py-12 bg-white rounded-lg shadow-md">
              <span className="animate-spin inline-block mr-3 text-teal-600 text-2xl">🔄</span> Loading all contributions...
            </p>
          ) : error ? (
            <p className="text-center text-red-700 text-xl font-medium py-12 bg-red-50 rounded-lg shadow-md border border-red-200">
              <span className="mr-3 text-red-600 text-2xl">⚠️</span> Failed to load contributions. Please try again.
            </p>
          ) : allDonations.length === 0 ? (
            <p className="text-center text-gray-700 text-xl font-medium py-12 px-6 bg-white rounded-lg shadow-md">
              No donations recorded yet. Be the first to make a difference!
            </p>
          ) : (
            // Simplified List Style
            <div className="space-y-4"> {/* Use space-y for vertical spacing between list items */}
              {allDonations.map((donation: any) => (
                <motion.div
                  key={donation.id}
                  variants={itemVariants}
                  className="bg-white rounded-lg px-6 py-4 shadow-sm border border-gray-100 flex justify-between items-center flex-wrap" // Simple background, minimal shadow
                >
                  <div className="flex-grow min-w-[60%]"> {/* Allow name/item to take most space */}
                    <p className="text-lg font-semibold text-teal-800 leading-tight">
                      <span className="text-amber-600 mr-2">✨</span> {/* Simpler icon/size */}
                      <span className="font-bold">{donation.donorName}</span> donated <span className="text-amber-700 font-extrabold">{donation.item}</span>
                    </p>
                    {donation.message && (
                      <p className="text-sm text-gray-600 italic mt-1 leading-relaxed">
                        "{donation.message}"
                      </p>
                    )}
                  </div>
                  <div className="text-right mt-2 sm:mt-0 flex-shrink-0 flex flex-col items-end"> {/* Date and submittedBy aligned right, stacked vertically */}
                    {donation.submittedBy && donation.submittedBy.firstName && ( // Check if submittedBy and its firstName exist
                      <p className="text-xs text-gray-600 mb-1">
                        Added by:{' '}
                        <span className="font-semibold text-teal-700">
                          {donation.submittedBy.role === 'admin'
                            ? `Admin (${donation.submittedBy.firstName})`
                            : donation.submittedBy.firstName}
                        </span>
                      </p>
                    )}
                    <p className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block">
                      {new Date(donation.date).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div variants={itemVariants} className="text-center mt-16">
            <Link
              href="/" // Link back to the home page
              className="inline-flex items-center bg-teal-800 text-white font-bold px-10 py-4 rounded-full shadow-lg hover:bg-teal-700
                         transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1
                         text-lg relative overflow-hidden group"
            >
              <svg className="mr-3 w-5 h-5 transform -translate-x-0 group-hover:-translate-x-1 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
              </svg>
              <span className="relative z-10">Back to Home</span>
              <span className="absolute inset-0 bg-amber-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></span>
            </Link>
          </motion.div>

        </motion.div>
      </section>

      <Footer />
    </main>
  );
}