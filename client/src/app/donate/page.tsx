// src/app/donate/page.tsx
'use client';

import Link from 'next/link';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { motion, Variants, Transition } from 'framer-motion';
// Added FaBoxOpen for material donations
import { FaClock, FaHandHoldingUsd, FaUniversity, FaBookOpen, FaEnvelope, FaInfoCircle, FaHandHoldingHeart, FaLandmark, FaBoxOpen } from 'react-icons/fa';

export default function DonatePage() {
  // Use a tween-based animation for a smoother, Apple-like feel
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Slightly faster stagger for overall fluidity
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 }, // Increase y for a more deliberate fade-in
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'tween', // Changed from 'spring' to 'tween'
        ease: 'easeOut', // Smooth ease-out curve
        duration: 0.6, // Longer duration for elegance
      } as Transition,
    },
  };

  return (
    <main className="min-h-screen bg-gray-950 text-gray-900 font-sans antialiased overflow-hidden">
      <Header />

      {/* Hero Section - Coming Soon Focus with Apple-like dark sophistication */}
      <section className="bg-gray-950 text-white py-32 px-6 text-center pt-48 relative overflow-hidden">
        {/* Subtle, almost invisible grid pattern in background */}
        <div
          className="absolute inset-0 opacity-[0.03]" // Very low opacity
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 60L60 0H30L0 30M60 60V30L30 60\'/%3E%3C/g%3E%3C/svg%3E")',
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
          <motion.div variants={itemVariants} className="text-7xl text-blue-500 mb-6 drop-shadow-md">
            <FaClock className="mx-auto" />
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-4 leading-tight tracking-tight">
            Donations Opening Soon!
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl font-light opacity-80 max-w-3xl mx-auto">
            We are diligently working to finalize a secure and seamless platform for your generous contributions.
            Get ready to empower students and transform futures at Kone High School.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-10">
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-[1.01] text-lg"
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </section>

      ---

      {/* Banking Information Section - Moved to top and made into responsive cards */}
      <section className="py-20 px-6 bg-gray-50">
        <motion.div
          className="max-w-6xl mx-auto text-center" // Increased max-width for better card display
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight flex items-center justify-center">
            <FaLandmark className="text-5xl text-gray-600 mr-4" /> Direct Bank Transfer Information
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
            For direct contributions, please use the banking details below. Your support is deeply appreciated and vital for Kone High School.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Responsive grid for cards */}
            {/* Bank 1 Card */}
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-xl border border-green-600 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Commercial Bank of Ethiopia</h3>
              <p className="text-gray-700 mb-2"><strong>Account Name:</strong> Kone Renaissance Foundation</p>
              <p className="text-gray-700 mb-2 break-all"><strong>Account Number:</strong> 1234567890123456</p> {/* Added break-all for long numbers */}
              <p className="text-gray-600 text-sm"><strong>Swift Code:</strong> PHILXXXX</p>
            </motion.div>

            {/* Bank 2 Card */}
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-xl border border-yellow-600 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Amhara Bank</h3>
              <p className="text-gray-700 mb-2"><strong>Account Name:</strong> Kone High School Support</p>
              <p className="text-gray-700 mb-2 break-all"><strong>Account Number:</strong> 9876543210987654</p>
              <p className="text-gray-600 text-sm"><strong>Swift Code:</strong> GLBLYYYY</p>
            </motion.div>

            {/* Bank 3 Card */}
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-xl border border-red-600 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Dashen Bank</h3>
              <p className="text-gray-700 mb-2"><strong>Account Name:</strong> Kone Foundation Donations</p>
              <p className="text-gray-700 mb-2 break-all"><strong>Account Number:</strong> 5678123490125678</p>
              <p className="text-gray-600 text-sm"><strong>Swift Code:</strong> COMMZZZZ</p>
            </motion.div>
          </div>

          <motion.p variants={itemVariants} className="text-md text-gray-500 mt-12 max-w-2xl mx-auto">
            Please ensure all details are correct before making a transfer. For any questions or further assistance, please feel free to reach out to our team.
          </motion.p>
        </motion.div>
      </section>

       ---

      {/* Material Donations Section - New Section */}
      <section className="py-20 px-6 bg-gray-100"> {/* Slightly different background for visual separation */}
        <motion.div
          className="max-w-6xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight flex items-center justify-center">
            <FaBoxOpen className="text-5xl text-gray-600 mr-4" /> Donate Materials & Resources
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
            Beyond monetary support, we warmly welcome donations of educational materials, books, and other resources that can directly benefit Kone High School students and teachers. If you are abroad and wish to send items to Ethiopia, you can use the following trusted addresses:
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Responsive grid for addresses */}

            {/* Bahir Dar Address Card */}
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-xl border border-green-600 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Bahir Dar Collection Point</h3>
              <p className="text-gray-700 mb-2"><strong>Bahir Dar DHL</strong></p>
              <p className="text-gray-700 mb-2">Ethiopian Insurance Corporation Building</p>
              <p className="text-gray-700 mb-4">Bahir Dar</p>
              <p className="text-gray-600 text-sm"><strong>Tel:</strong> +251 5 8126 0279</p>
            </motion.div>

            {/* Bole Addis Ababa Address Card */}
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-xl border border-yellow-600 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Addis Ababa - Bole Collection Point</h3>
              <p className="text-gray-700 mb-2"><strong>Bole DHL</strong></p>
              <p className="text-gray-700 mb-2">Near Habesha Restaurant</p>
              <p className="text-gray-700 mb-4">Bole Road, Addis Ababa</p>
              <p className="text-gray-600 text-sm"><strong>Tel:</strong> +251 1 1551 3365 / +251 1 1551 7197</p>
            </motion.div>

            {/* Telco Addis Ababa Address Card */}
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-xl border border-red-600 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Addis Ababa - Telco Collection Point</h3>
              <p className="text-gray-700 mb-2"><strong>DHL Worldwide Express Ethiopia plc</strong></p>
              <p className="text-gray-700 mb-2">Telco Building</p>
              <p className="text-gray-700 mb-2">Off Ring Road on slip road from Megenagna</p>
              <p className="text-gray-700 mb-4">In front of Anbessa Garage, PO Box 1840 Code 1110</p>
              <p className="text-gray-600 text-sm"><strong>Tel:</strong> +251 1 1551 3365 / +251 1 1551 7197</p> {/* Using same general DHL numbers if no specific one is provided */}
            </motion.div>
          </div>

          <motion.p variants={itemVariants} className="text-md text-gray-500 mt-12 max-w-2xl mx-auto">
            Please contact the respective DHL office before sending large shipments to confirm their receiving policies and any potential customs requirements for donations.
          </motion.p>
        </motion.div>
      </section>

      ---

      {/* Mission & Impact Section - Remains the same, but now below banking info */}
      <section className="py-20 px-6 bg-white">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12 leading-tight">
            What Your Future Generosity Will Support
          </motion.h2>

          <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed mb-16 text-center max-w-4xl mx-auto">
            The **Kone Renaissance Foundation** is dedicated to fostering academic excellence and providing essential resources for Kone High School. Your future contributions will be vital in equipping students with the tools they need to succeed and supporting the dedicated teachers who guide them.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> {/* Increased gap for more breathing room */}
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-xl border border-green-600 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
              <FaBookOpen className="text-6xl text-gray-700 mb-6" /> {/* Larger, more subdued icon */}
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Enhanced Learning Resources</h3>
              <p className="text-gray-600 leading-relaxed text-base">Funds will procure modern textbooks, digital learning tools, and supplies, enriching the academic journey for every student.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-xl border border-yellow-600 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
              <FaUniversity className="text-6xl text-gray-700 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Modernized School Facilities</h3>
              <p className="text-gray-600 leading-relaxed text-base">Your support will help upgrade classrooms, science laboratories, and sanitation facilities, fostering a safe and conducive learning environment.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-xl border border-red-600 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
              <FaHandHoldingUsd className="text-6xl text-gray-700 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Teacher Development & Support</h3>
              <p className="text-gray-600 leading-relaxed text-base">Contributions will empower educators with professional training, workshops, and essential resources, ensuring high-quality instruction.</p>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="text-center mt-20">
            <Link
              href="/impact"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-lg group"
            >
              Learn more about our impact
              <svg className="ml-2 w-5 h-5 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </section>

     
      ---

      {/* Stay Updated Section - Call to Action for Information (Clean, Multi-Card) */}
      <section className="py-20 px-6 bg-gray-50"> {/* Subtle light gray background */}
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 leading-tight">
            Be the First to Know
          </motion.h2>

          {/* Learn More & Connect Card */}
          <motion.div variants={itemVariants} className="bg-white p-10 rounded-xl shadow-xl border border-gray-100">
            <h3 className="text-3xl font-semibold text-gray-900 mb-6 flex items-center justify-center">
              <FaInfoCircle className="text-4xl text-gray-600 mr-4" /> Learn More & Connect
            </h3>
            <p className="text-lg text-gray-700 mb-6 max-w-md mx-auto">
              While we prepare our donation system, we encourage you to explore our work and connect with us.
            </p>
            <ul className="list-none text-left text-lg text-gray-700 space-y-4">
              <li className="flex items-start">
                <span className="text-blue-600 text-2xl mr-3 mt-1">●</span>
                <div>
                  <strong className="text-gray-900">About Us:</strong> Understand our mission, vision, and the passion that drives us.{' '}
                  <Link href="/about" className="text-blue-600 hover:text-blue-700 font-semibold underline">
                    Learn more
                  </Link>.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 text-2xl mr-3 mt-1">●</span>
                <div>
                  <strong className="text-gray-900">Contact Us:</strong> Have questions or want to discuss potential partnerships?{' '}
                  <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-semibold underline">
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