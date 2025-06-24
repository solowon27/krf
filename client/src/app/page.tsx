// src/app/page.tsx
'use client';

import Link from 'next/link';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { motion, Variants, Transition } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa'; // Keep FaSpinner for loading state
import { FaGraduationCap, FaUsers, FaHandsHelping, FaLightbulb } from 'react-icons/fa'; // More evocative icons for impact areas

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

  // Limit to showing the latest 6 donations
  const latestDonations = donations.slice(0, 6);

  // --- Placeholder for actual impact metrics ---
  // In a real application, these would come from your backend or a CMS
  const impactMetrics = {
    studentsImpacted: 1200,
    librariesEstablished: 3, // Example metric
    educationalPrograms: 7,  // Example metric
    communitiesReached: 5,   // Example metric
  };

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

  const numberCountVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // Simple counter component for demonstration (could be more complex with react-countup)
  const AnimatedNumber = ({ value }: { value: number }) => (
    <motion.span
      key={value} // Key is important for re-animating if value changes
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-5xl md:text-6xl font-extrabold text-teal-800"
    >
      {value.toLocaleString()}
    </motion.span>
  );

  return (
    <main className="w-full min-h-screen bg-gray-100 text-gray-800 font-sans antialiased overflow-x-hidden">
      <Header />

      {/* Hero Section - Already full-width and "outstanding" */}
      <section className="bg-gradient-to-br from-teal-950 to-teal-700 text-white py-40 px-6 text-center relative overflow-hidden pt-24 md:py-48 lg:py-56">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 60L60 0H30L0 30M60 60V30L30 60\'/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '120px 120px',
            backgroundRepeat: 'repeat',
          }}
        ></div>
        <motion.div
          className="w-full px-4 mt-10 relative z-10 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight drop-shadow-lg font-serif">
            Empowering Minds, Building Futures
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl lg:text-2xl mb-12 opacity-95 max-w-4xl mx-auto font-light">
            ህይወትን በትምህርት በመለወጥ፣ ማህበረሰባችን ብሎም በተለያዩ ሃገራት ነዋሪ የሆኑ ተወላጆችን ባሉበት በማነቃቃት ለዋድላ ወረዳ በተለይም ለኮን አጠቃላይ ሁለተኛ ደረጃ ትምህርት ቤት ትልቅ ስራ እንስራ፤
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6">
            <Link
              href="/donate"
              className="inline-flex items-center bg-amber-500 text-teal-900 font-bold px-10 py-5 rounded-full shadow-2xl hover:bg-amber-400 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg text-lg whitespace-nowrap"
            >
              ድጋፍ አድርግ/ጊ
              <FaHandsHelping className="ml-3 text-2xl" />
            </Link>
            <Link
              href="/library"
              className="inline-block border-2 border-white text-white font-semibold px-10 py-5 rounded-full hover:bg-white hover:text-teal-800 transition-all duration-300 transform hover:-translate-y-1 text-lg whitespace-nowrap"
            >
              Digital Library / ዲጂታል ቤተ መጻሕፍት
            </Link>
            <Link
              href="/education-resources"
              className="inline-block border-2 border-white text-white font-semibold px-10 py-5 rounded-full hover:bg-white hover:text-teal-800 transition-all duration-300 transform hover:-translate-y-1 text-lg whitespace-nowrap"
            >
              Free Education Resources / ነጻ የትምህርት እድሎች
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section - Wrapped in a shadow box for an outstanding look */}
      <section className="py-4 bg-gray-100 flex justify-center">
        <motion.div
          className="w-full max-w-7xl p-10 bg-white rounded-3xl shadow-2xl border border-gray-200" // Outstanding shadow box
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold mb-8 text-teal-800 font-serif text-center">
            Who We Are: Architects of Change
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg leading-relaxed text-gray-700 max-w-3xl mx-auto md:text-xl text-center">
            ፋውንዴሽናችን ከድርጅት በላይ ነው፤ ትምህርት ለወደፊት ትውልድ ጠንካራ መሰረት ነው ብለን በማመን የተጀመረ የ ዋድላ ልጆች የጋራ ሃብት ነው። የኛ ተልእኮ በኮን አጠቃላይ ሁለተኛ ደረጃ ትምህርት ቤት በትምህርት መሠረተ ልማት፣ ሁሉን አቀፍ ግብአቶች ላይ ኢንቨስት በማድረግ እና ተማሪዎችንና አስተማሪዎችን በማብቃት ትራንስፎርሜሽን ማስፈን ነው።
          </motion.p>
          <motion.div variants={itemVariants} className="mt-12 text-center">
            <Link
              href="/about"
              className="inline-block text-teal-700 border-2 border-teal-700 font-semibold px-8 py-4 rounded-full hover:bg-teal-700 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
            >
              Discover Our Story / እንተዋወቅ
            </Link>
          </motion.div>
        </motion.div>
      </section>


      {/* Recent Donations Section - Outstanding Shadow Box */}
      <section className="py-4 bg-gray-100 flex justify-center"> {/* Outer section for full width */}
        <motion.div
          className="w-full max-w-7xl p-10 bg-white rounded-3xl shadow-2xl border border-gray-200" // Inner shadow box
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl font-extrabold mb-4 text-center text-teal-900 drop-shadow-md font-serif">
            ልባዊ ምስጋና
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-center text-amber-700 font-semibold mb-12">
            በቅርብ ጊዜ በቅን ልቦች የተደረገ ድጋፍ ዝርዝር
          </motion.p>

          {loading ? (
            <p className="text-center text-gray-700 text-2xl font-medium py-16 bg-blue-50 rounded-lg shadow-inner">
              <span className="animate-spin inline-block mr-4 text-teal-600 text-3xl">
                <FaSpinner />
              </span> loading...
            </p>
          ) : error ? (
            <p className="text-center text-red-700 text-2xl font-medium py-16 px-6 bg-red-50 rounded-lg shadow-inner border border-red-200">
              <span className="mr-4 text-red-600 text-3xl">⚠️</span> Failed to load contributions. Please try again.
            </p>
          ) : latestDonations.length === 0 ? (
            <p className="text-center text-gray-700 text-2xl font-medium py-16 px-6 bg-gray-50 rounded-lg shadow-inner">
              Be the first to make a monumental difference! No donations recorded yet.
            </p>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {latestDonations.map((donation: any) => (
                <motion.div
                  key={donation.id}
                  variants={itemVariants}
                  className="group bg-gradient-to-br from-white to-teal-50 rounded-2xl p-7 shadow-xl border border-teal-100
                                 hover:from-white hover:to-amber-50 hover:shadow-2xl transition-all duration-500
                                 transform hover:-translate-y-2 hover:rotate-1 focus:rotate-1"
                >
                  <div className="flex items-center mb-4">
                    <span className="text-4xl text-amber-600 mr-4">🌟</span>
                    <p className="text-2xl font-bold text-teal-800 leading-tight font-serif">
                      {donation.donorName || 'Anonymous'}
                    </p>
                  </div>

                  <p className="text-xl font-extrabold text-amber-700 mb-4 leading-tight">
                    Donated: {donation.item}
                  </p>

                  {donation.message && (
                    <div className="bg-teal-50 rounded-lg p-4 mb-4 border border-teal-100 shadow-inner">
                      <p className="text-base text-gray-700 italic leading-relaxed">
                        "{donation.message}"
                      </p>
                    </div>
                  )}

                  <div className="text-right mt-auto flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm">
                    {donation.submittedBy && (
                      <p className="text-gray-600 font-medium italic mb-2 sm:mb-0">
                        submitted by:{' '}
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
            </motion.div>
          )}

          {donations.length > 6 && (
            <motion.div variants={itemVariants} initial="hidden" animate="visible" className="text-center mt-20">
              <Link
                href="/AllDonations"
                className="inline-flex items-center bg-teal-800 text-white font-bold px-12 py-5 rounded-full shadow-2xl hover:bg-teal-700
                                 transition-all duration-500 ease-in-out transform hover:scale-105 hover:translate-y-[-3px]
                                 text-xl relative overflow-hidden group"
              >
                <span className="relative z-10">Explore All Contributions</span>
                <svg className="ml-4 w-6 h-6 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
                <span className="absolute inset-0 bg-amber-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></span>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </section>


      {/* Impact Metrics Section - Outstanding Shadow Box */}
      <section className="py-4 bg-gray-100 flex justify-center">
        <motion.div
          className="w-full max-w-7xl p-10 bg-white rounded-3xl shadow-2xl border border-gray-200" // Inner shadow box
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2 variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} className="text-4xl md:text-5xl font-extrabold mb-12 text-teal-900 font-serif text-center">
            የእኛ እድገት፣ የእርስዎ ተጽእኖ
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              className="bg-teal-50 p-8 rounded-lg shadow-xl border-b-4 border-teal-500 flex flex-col items-center text-center"
              variants={numberCountVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.7 }}
            >
              <FaGraduationCap className="text-6xl text-teal-600 mb-4" />
              <AnimatedNumber value={impactMetrics.studentsImpacted} />
              <p className="text-gray-600 text-lg font-medium mt-2">ያክል ተማሪዎች የድጋፋችሁ ተጠቃሚ ሆነዋል</p>
            </motion.div>
            <motion.div
              className="bg-amber-50 p-8 rounded-lg shadow-xl border-b-4 border-amber-500 flex flex-col items-center text-center"
              variants={numberCountVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.7 }}
            >
              <FaLightbulb className="text-6xl text-amber-600 mb-4" />
              <AnimatedNumber value={impactMetrics.librariesEstablished} />
              <p className="text-gray-600 text-lg font-medium mt-2">ቤተ መጻሕፍት ፥ የመጽሐፍት እና ትምህርታዊ ቁሳቁሶች አግኝተዋል </p>
            </motion.div>
            <motion.div
              className="bg-teal-50 p-8 rounded-lg shadow-xl border-b-4 border-teal-500 flex flex-col items-center text-center"
              variants={numberCountVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.7 }}
            >
              <FaHandsHelping className="text-6xl text-teal-600 mb-4" />
              <AnimatedNumber value={impactMetrics.educationalPrograms} />
              <p className="text-gray-600 text-lg font-medium mt-2">ሰዎች እስካሁን በኛ በኩል እርዳታቸውን አስገብተዋል</p>
            </motion.div>
            <motion.div
              className="bg-amber-50 p-8 rounded-lg shadow-xl border-b-4 border-amber-500 flex flex-col items-center text-center"
              variants={numberCountVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.7 }}
            >
              <FaUsers className="text-6xl text-amber-600 mb-4" />
              <AnimatedNumber value={impactMetrics.communitiesReached} />
              <p className="text-gray-600 text-lg font-medium mt-2">ልዩ እርዳታ የሚሹ ልጆች ተጠቃሚ ሆነዋል</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Impact Areas Section - Outstanding Shadow Box */}
      <section className="py-4 bg-gray-100 flex justify-center">
        <motion.div
          className="w-full max-w-7xl p-10 bg-white rounded-3xl shadow-2xl border border-gray-200" // Inner shadow box
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-teal-800 font-serif">
            የእርስዎ ድጋፍ ለውጥ የሚያመጣበት ቦታ
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div variants={itemVariants} className="bg-teal-50 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center group border border-teal-100">
              <div className="bg-teal-100 text-teal-700 p-5 rounded-full mb-6 text-5xl group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors duration-300">
                📚
              </div>
              <h3 className="text-xl font-bold mb-3 text-teal-700 group-hover:text-amber-600 transition-colors duration-300">Learning Resources</h3>
              <p className="text-gray-600">ለእያንዳንዱ ተማሪ የመማሪያ መገልገያዎችን፣ ዲጂታል መሳሪያዎችን እና በደንብ የተሞላ ቤተ-መጽሐፍትን መስጠት።</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-amber-50 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center group border border-amber-100">
              <div className="bg-teal-100 text-teal-700 p-5 rounded-full mb-6 text-5xl group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors duration-300">
                🏫
              </div>
              <h3 className="text-xl font-bold mb-3 text-teal-700 group-hover:text-amber-600 transition-colors duration-300">Modern Facilities</h3>
              <p className="text-gray-600">የመማሪያ ክፍሎችን፣ የላቦራቶሪዎችን እና የንፅህና አጠባበቅን በማሻሻል የተመቻቸ የትምህርት አካባቢ መፍጠር።</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-teal-50 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center group border border-teal-100">
              <div className="bg-teal-100 text-teal-700 p-5 rounded-full mb-6 text-5xl group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors duration-300">
                👩‍🏫
              </div>
              <h3 className="text-xl font-bold mb-3 text-teal-700 group-hover:text-amber-600 transition-colors duration-300">Teacher Empowerment</h3>
              <p className="text-gray-600">ከፍተኛ ጥራት ያለው ትምህርት ለማድረስ አስተማሪዎች በስልጠና እና ግብዓቶች መደገፍ።</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Call to Action Section - Already full-width and "outstanding" */}
      <section className="py-4 bg-gradient-to-r from-teal-700 to-teal-900 text-white text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h3 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold mb-8 leading-snug font-serif">
            Your Contribution Shapes a Legacy.
          </motion.h3>
          <motion.p variants={itemVariants} className="text-lg md:text-xl mb-12 opacity-90 max-w-3xl mx-auto">
            Every act of generosity fuels the future for Kone High School students. Whether you donate, volunteer, or spread our message, your impact is profound and lasting.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link
              href="/donate"
              className="inline-flex items-center bg-amber-500 text-teal-900 font-bold px-10 py-5 rounded-full shadow-xl hover:bg-amber-400 transition-all duration-300 ease-in-out transform hover:scale-105 text-lg"
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