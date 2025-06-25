// src/app/page.tsx
'use client';

import Link from 'next/link';
import Header from '@components/Header'; // Assuming Header is already minimalist
import Footer from '@components/Footer'; // Assuming Footer is already minimalist
import { motion, Variants, Transition } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';
// Keeping these icons for now, but in a true Apple style, they might be custom SVGs or even less prominent.
import { FaGraduationCap, FaUsers, FaHandsHelping, FaLightbulb } from 'react-icons/fa';

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

  const impactMetrics = {
    studentsImpacted: 1200,
    librariesEstablished: 3,
    educationalPrograms: 7,
    communitiesReached: 5,
  };

  // Framer Motion Variants - Simplified for direct, elegant entry
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07, // Subtle stagger
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'tween', // Simpler, direct transition
        ease: 'easeOut',
        duration: 0.5,
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

  const AnimatedNumber = ({ value }: { value: number }) => (
    <motion.span
      key={value}
      initial="hidden"
      animate="visible"
      variants={numberCountVariants}
      className="text-5xl md:text-6xl font-extrabold text-gray-900" // Darker, impactful text
    >
      {value.toLocaleString()}
    </motion.span>
  );

  return (
    <main className="w-full min-h-screen bg-white text-gray-900 font-sans antialiased overflow-x-hidden">
      <Header />

      {/* Hero Section - Bold, Clean, Image-focused (Placeholder) */}
      <section className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
        {/* Placeholder for a stunning, full-bleed hero image/video */}
        {/* In a real Apple-style site, this would be a high-res image or video */}
        {/* For now, a clean dark background to simulate that visual impact */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
            {/* If you had a hero image, you'd place it here: */}
            {/* <img src="/path/to/your/hero-image.jpg" alt="Empowering Minds" className="w-full h-full object-cover opacity-80" /> */}
        </div>

        <motion.div
          className="relative z-10 max-w-6xl mx-auto px-4 text-white"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold leading-tight mb-6 tracking-tight font-sans" // Very large, bold sans-serif
          >
            Empowering Minds, <br className="hidden sm:inline" />Building Futures.
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-10 opacity-90 max-w-4xl mx-auto font-light" // Lighter weight, generous size
          >
            ትውልድን በእውቀት ለመለወጥ፣ አካባቢው ላይ ያለውን ማህበረሰባችን ብሎም በተለያዩ ሃገራት ነዋሪ የሆኑ ተወላጆችን ባሉበት በማነቃቃት ለዋድላ ወረዳ በተለይም ለኮን አጠቃላይ ሁለተኛ ደረጃ ትምህርት ቤት ትልቅ ስራ እንስራ፤
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6"
          >
            {/* Apple-style buttons: subtle, clean, often a solid fill and a ghost button */}
            <Link
              href="/donate"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-gray-900 font-semibold px-8 py-4 rounded-full transition-colors duration-300 hover:bg-gray-200 text-lg sm:text-xl"
            >
              ድጋፍ አድርግ/ጊ
              <svg className="ml-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7s-8-3.134-8-7 3.582-7 8-7 8 3.134 8 7zm-8 4a4 4 0 100-8 4 4 0 000 8zM9.293 8.293a1 1 0 011.414 0l2 2a1 1 0 01-1.414 1.414L10 10.414l-.293.293a1 1 0 01-1.414-1.414l.293-.293z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              href="/library"
              className="w-full sm:w-auto inline-block border-2 border-white text-white font-semibold px-8 py-4 rounded-full transition-colors duration-300 hover:bg-white hover:text-gray-900 text-lg sm:text-xl"
            >
              Digital Library / ዲጂታል ቤተ መጻሕፍት
            </Link>
            <Link
              href="/education-resources"
              className="w-full sm:w-auto inline-block border-2 border-white text-white font-semibold px-8 py-4 rounded-full transition-colors duration-300 hover:bg-white hover:text-gray-900 text-lg sm:text-xl"
            >
              Free Educational Resources / ነፃ የትምህርት እድሎች
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section - Minimalist with ample white space */}
      <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 font-sans leading-tight">
            Who We Are: <br className="hidden sm:inline" />Architects of Change
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg leading-relaxed text-gray-700 max-w-3xl mx-auto md:text-xl mb-12">
            ፋውንዴሽናችን ከድርጅት በላይ ነው፤ ትምህርት ለወደፊት ትውልድ ጠንካራ መሰረት ነው ብለን በማመን የተጀመረ የ ዋድላ ልጆች የጋራ ሃብት ነው። የኛ ተልእኮ በኮን አጠቃላይ ሁለተኛ ደረጃ ትምህርት ቤት በትምህርት መሠረተ ልማት፣ ሁሉን አቀፍ ግብአቶች ላይ ኢንቨስት በማድረግ እና ተማሪዎችንና አስተማሪዎችን በማብቃት ትራንስፎርሜሽን ማስፈን ነው።
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              href="/about"
              className="inline-block border-2 border-gray-900 text-gray-900 font-semibold px-8 py-4 rounded-full hover:bg-gray-900 hover:text-white transition-colors duration-300 text-lg"
            >
              Discover Our Story / እንተዋወቅ
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Recent Donations Section - Clean, grid-based, no complex shadows */}
      <section className="py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4 text-center text-gray-900 font-sans leading-tight">
            ልባዊ ምስጋና
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-center text-gray-600 font-light mb-16">
            በቅርብ ጊዜ በቅን ልቦች የተደረገ ድጋፍ ዝርዝር
          </motion.p>

          {loading ? (
            <p className="text-center text-gray-600 text-xl font-medium py-12 flex items-center justify-center">
              <span className="animate-spin inline-block mr-3 text-gray-500 text-2xl">
                <FaSpinner />
              </span> Loading contributions...
            </p>
          ) : error ? (
            <p className="text-center text-red-600 text-xl font-medium py-12 px-6 flex items-center justify-center">
              <span className="mr-3 text-red-500 text-2xl">⚠️</span> Failed to load contributions. Please try again.
            </p>
          ) : latestDonations.length === 0 ? (
            <p className="text-center text-gray-600 text-xl font-medium py-12 px-6">
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
                  className="bg-white p-8 rounded-lg border border-gray-200 transition-shadow duration-300 hover:shadow-lg" // Clean border, subtle shadow on hover
                >
                  <div className="flex items-center mb-4">
                    <span className="text-3xl text-gray-600 mr-4">✨</span> {/* More neutral icon color */}
                    <p className="text-2xl font-semibold text-gray-900 leading-tight font-sans">
                      {donation.donorName || 'Anonymous'}
                    </p>
                  </div>

                  <p className="text-xl font-semibold text-gray-700 mb-4 leading-tight">
                    Donated: {donation.item}
                  </p>

                  {donation.message && (
                    <div className="bg-gray-50 rounded-md p-4 mb-4 border border-gray-100">
                      <p className="text-base text-gray-700 italic leading-relaxed">
                        "{donation.message}"
                      </p>
                    </div>
                  )}

                  <div className="text-right mt-auto flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm">
                    {donation.submittedBy && (
                      <p className="text-gray-600 font-medium italic mb-2 sm:mb-0">
                        submitted by:{' '}
                        <span className="text-gray-800 font-semibold">
                          {donation.submittedBy.role === 'admin'
                            ? `Admin (${donation.submittedBy.firstName})`
                            : donation.submittedBy.firstName}
                        </span>
                      </p>
                    )}

                    <p className="inline-block bg-gray-200 text-gray-800 text-sm font-semibold px-4 py-2 rounded-full tracking-wide">
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
                className="inline-flex items-center bg-gray-900 text-white font-semibold px-10 py-4 rounded-full transition-colors duration-300 hover:bg-gray-700 text-lg"
              >
                Explore All Contributions
                <svg className="ml-4 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Impact Metrics Section - Large numbers, clean text, minimal styling */}
      <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-16 text-gray-900 font-sans leading-tight">
            የእኛ እድገት፣ የእርስዎ ተጽእኖ
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"> {/* Increased gap */}
            <motion.div
              className="flex flex-col items-center" // No background, no border, just content
              variants={numberCountVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.7 }}
            >
              <FaGraduationCap className="text-6xl text-gray-600 mb-4" /> {/* Neutral icon color */}
              <AnimatedNumber value={impactMetrics.studentsImpacted} />
              <p className="text-gray-700 text-lg font-medium mt-4">ያክል ተማሪዎች የድጋፋችሁ ተጠቃሚ ሆነዋል</p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center"
              variants={numberCountVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.7 }}
            >
              <FaLightbulb className="text-6xl text-gray-600 mb-4" />
              <AnimatedNumber value={impactMetrics.librariesEstablished} />
              <p className="text-gray-700 text-lg font-medium mt-4">ቤተ መጻሕፍት ፥ የመጽሐፍት እና ትምህርታዊ ቁሳቁሶች አግኝተዋል </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center"
              variants={numberCountVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.7 }}
            >
              <FaHandsHelping className="text-6xl text-gray-600 mb-4" />
              <AnimatedNumber value={impactMetrics.educationalPrograms} />
              <p className="text-gray-700 text-lg font-medium mt-4">ሰዎች እስካሁን በኛ በኩል እርዳታቸውን አስገብተዋል</p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center"
              variants={numberCountVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.7 }}
            >
              <FaUsers className="text-6xl text-gray-600 mb-4" />
              <AnimatedNumber value={impactMetrics.communitiesReached} />
              <p className="text-gray-700 text-lg font-medium mt-4">ልዩ እርዳታ የሚሹ ልጆች ተጠቃሚ ሆነዋል</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Impact Areas Section - Clean cards, focus on icons/text */}
      <section className="py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 font-sans leading-tight">
            የእርስዎ ድጋፍ ለውጥ የሚያመጣበት ቦታ
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Impact Area Card - Clean design */}
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg border border-gray-200 flex flex-col items-center text-center transition-shadow duration-300 hover:shadow-lg">
              <div className="text-6xl mb-6">📚</div> {/* Emoji for simplicity, or custom SVG */}
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Learning Resources</h3>
              <p className="text-gray-700 text-base leading-relaxed">ለእያንዳንዱ ተማሪ የመማሪያ መገልገያዎችን፣ ዲጂታል መሳሪያዎችን እና በደንብ የተሞላ ቤተ-መጽሐፍትን መስጠት።</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg border border-gray-200 flex flex-col items-center text-center transition-shadow duration-300 hover:shadow-lg">
              <div className="text-6xl mb-6">🏫</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Modern Facilities</h3>
              <p className="text-gray-700 text-base leading-relaxed">የመማሪያ ክፍሎችን፣ የላቦራቶሪዎችን እና የንፅህና አጠባበቅን በማሻሻል የተመቻቸ የትምህርት አካባቢ መፍጠር።</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg border border-gray-200 flex flex-col items-center text-center transition-shadow duration-300 hover:shadow-lg">
              <div className="text-6xl mb-6">👩‍🏫</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Teacher Empowerment</h3>
              <p className="text-gray-700 text-base leading-relaxed">ከፍተኛ ጥራት ያለው ትምህርት ለማድረስ አስተማሪዎች በስልጠና እና ግብዓቶች መደገፍ።</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Call to Action Section - Clean, impactful, focused on central message */}
      <section className="py-24 bg-gray-900 text-white text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h3 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-8 leading-snug font-sans">
            Your Contribution Shapes a Legacy.
          </motion.h3>
          <motion.p variants={itemVariants} className="text-lg md:text-xl mb-12 opacity-80 max-w-3xl mx-auto font-light">
            Every act of generosity fuels the future for Kone High School students. Whether you donate, volunteer, or spread our message, your impact is profound and lasting.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link
              href="/donate"
              className="inline-flex items-center bg-white text-gray-900 font-semibold px-10 py-4 rounded-full transition-colors duration-300 hover:bg-gray-200 text-lg"
            >
              Donate Today
            </Link>
            <Link
              href="/contact"
              className="inline-block border-2 border-white text-white font-semibold px-10 py-4 rounded-full hover:bg-white hover:text-gray-900 transition-colors duration-300 text-lg"
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