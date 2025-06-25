// app/our-impact/page.tsx
'use client';

import Link from 'next/link';
import Header from '@components/Header';
import Footer from '@components/Footer';
import ImageSlider from '@components/ImageSlider'; // Import the new slider
import { motion, Variants, Transition } from 'framer-motion';

// Sample image data for the slider
// IMPORTANT: Replace these with paths to your actual images in the `public` folder
// For example, if you have `public/images/impact1.jpg`, the src would be `/images/impact1.jpg`
const impactImages = [
  { src: '/impact1.jpg', alt: 'Community project in action', caption: 'Volunteers building a new community center.' },
  { src: '/impact2.jpg', alt: 'Children learning in a new school', caption: 'Providing quality education to rural communities.' },
  { src: '/impact3.jpg', alt: 'Healthcare outreach program', caption: 'Mobile clinics reaching underserved areas.' },
  { src: '/impact4.jpg', alt: 'Sustainable agriculture initiative', caption: 'Empowering farmers with modern techniques.' },
];

export default function OurImpact() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Subtle stagger for a smoother reveal
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'tween', // Consistent tween transition
        ease: 'easeOut',
        duration: 0.4, // Smooth duration
      } as Transition,
    },
  };

  return (
    // **FIX:** Changed overflow-x-hidden to overflow-y-auto to ensure vertical scrolling.
    // Ensure min-h-screen allows content to exceed viewport height and be scrollable.
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased overflow-y-auto"> 
      {/* **FIX:** Added z-index to Header. If your Header component is fixed/sticky, this helps prevent it from overlapping content. */}
      <Header className="relative z-20" />

      {/* Hero Section - Dark, impactful, clean */}
      {/* **FIX:** Adjusted vertical padding for smaller screens (`pt-` and `py-`). */}
      <section className="bg-gray-900 text-white py-24 sm:py-32 lg:py-48 px-6 text-center pt-40 sm:pt-48 relative overflow-hidden"> 
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E")',
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
          {/* **FIX:** Slightly reduced font sizes for mobile for better fit */}
          <motion.h1 variants={itemVariants} className="text-3xl md:text-6xl lg:text-7xl font-bold mb-3 leading-tight">
            Our Impact: Making a Difference
          </motion.h1>
          <motion.p variants={itemVariants} className="text-base md:text-xl lg:text-2xl font-light opacity-90 max-w-3xl mx-auto">
            See how Kone Renaissance Foundation is transforming lives and communities.
          </motion.p>
        </motion.div>
      </section>

      {/* Impact Overview Section - Clean, content-focused */}
      {/* **FIX:** Adjusted vertical padding for smaller screens (`py-`). */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white"> {/* Use consistent px padding for all screens */}
        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* **FIX:** Slightly reduced font sizes for mobile for better fit */}
          <motion.h2 variants={itemVariants} className="text-3xl lg:text-5xl font-bold text-gray-900 text-center mb-10 sm:mb-16">
            Our Journey of Change
          </motion.h2>

          {/* **FIX:** Slightly reduced font sizes and margins for mobile */}
          <motion.p variants={itemVariants} className="text-base md:text-xl text-gray-800 leading-relaxed max-w-4xl mx-auto mb-10 sm:mb-16 font-light">
            Since our inception, Kone Renaissance Foundation has been dedicated to fostering sustainable development and empowering communities. Our work spans across education, healthcare, infrastructure, and livelihood programs, directly impacting thousands of lives. We believe in a holistic approach, ensuring that our initiatives create lasting positive change.
          </motion.p>

          {/* **FIX:** Adjusted margin-bottom for ImageSlider */}
          <motion.div variants={itemVariants} className="mb-10 sm:mb-16 rounded-xl shadow-lg border border-gray-100 overflow-hidden"> 
            <ImageSlider images={impactImages} />
          </motion.div>

          {/* **FIX:** Slightly reduced font sizes and margins for mobile */}
          <motion.h3 variants={itemVariants} className="text-2xl md:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
            Key Areas of Impact
          </motion.h3>

          {/* **FIX:** Reduced gap for better mobile spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10"> 
            {/* **FIX:** Reduced padding for cards on mobile */}
            <motion.div variants={itemVariants} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100"> 
              {/* **FIX:** Slightly reduced font sizes for card headings */}
              <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Education Initiatives</h4>
              {/* **FIX:** Slightly reduced font sizes and margins for card paragraphs */}
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                We have established and supported over 15 schools in remote areas, providing access to quality education for more than 5,000 children. Our programs include teacher training, provision of learning materials, and scholarship opportunities for deserving students.
              </p>
              {/* **FIX:** Slightly reduced font sizes for list items */}
              <ul className="list-disc list-inside text-gray-700 space-y-1.5 sm:space-y-2 text-sm sm:text-base"> 
                <li>Built 5 new primary schools.</li>
                <li>Provided scholarships to 200 high school students.</li>
                <li>Distributed 10,000 textbooks annually.</li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
              <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Healthcare & Wellness Programs</h4>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                Our mobile clinics reach underserved villages, offering free medical check-ups, vaccinations, and health education. We focus on maternal and child health, and preventing common diseases through awareness campaigns.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1.5 sm:space-y-2 text-sm sm:text-base">
                <li>Conducted 100+ health camps.</li>
                <li>Vaccinated 3,000+ children.</li>
                <li>Distributed essential medicines to 1,500 families.</li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
              <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Livelihood & Empowerment</h4>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                We empower local communities through vocational training, micro-finance initiatives, and sustainable agriculture projects. Our aim is to create economic independence and reduce poverty.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1.5 sm:space-y-2 text-sm sm:text-base">
                <li>Trained 500 women in various trades.</li>
                <li>Supported 150 small businesses with micro-loans.</li>
                <li>Implemented drought-resistant farming techniques in 10 villages.</li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100">
              <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Infrastructure Development</h4>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                Improving basic infrastructure is vital. We have invested in clean water projects, building accessible roads, and providing sustainable energy solutions to remote areas.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1.5 sm:space-y-2 text-sm sm:text-base">
                <li>Installed 20 new boreholes for clean water.</li>
                <li>Constructed 50km of access roads.</li>
                <li>Provided solar power solutions to 3 villages.</li>
              </ul>
            </motion.div>
          </div>

          {/* Final Call to Action Section - Consistent dark background, Apple-like button */}
          {/* **FIX:** Adjusted margin-top and vertical padding for mobile, reduced font sizes */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} 
                      className="text-center mt-16 sm:mt-20 pt-10 sm:pt-16 pb-8 sm:pb-12 bg-gray-900 text-white rounded-xl shadow-xl"> 
            <motion.h3 variants={itemVariants} className="text-2xl md:text-4xl font-bold mb-4 sm:mb-6 leading-snug">
              Join Us in Making a Greater Impact
            </motion.h3>
            <motion.p variants={itemVariants} className="text-base sm:text-lg opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto font-light">
              Your support is crucial to extending our reach and deepening our impact. Every contribution helps us build a brighter future for the communities we serve.
            </motion.p>
            <motion.div variants={itemVariants}>
              {/* **FIX:** Slightly reduced button padding for mobile */}
              <Link
                href="/donate"
                className="inline-block bg-blue-600 text-white font-semibold px-8 py-4 sm:px-10 sm:py-5 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105" 
              >
                Donate Now and Support Our Mission
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}