'use client';

import Link from 'next/link';
import Header from '@components/Header';
import Footer from '@components/Footer';
import ImageSlider from '@components/ImageSlider'; // Import the new slider
import { motion, Variants, Transition } from 'framer-motion';

// Sample image data for the slider
// IMPORTANT: Replace these with paths to your actual images in the `public` folder
// For example, if you have `public1.jpg`, the src would be `/images/impact1.jpg`
const impactImages = [
  { src: '/impact1.jpg', alt: 'Community project in action', caption: 'Volunteers building a new community center.' },
  { src: '/impact2.jpg', alt: 'Children learning in a new school', caption: 'Providing quality education to rural communities.' },
  { src: '/impact3.jpg', alt: 'Healthcare outreach program', caption: 'Mobile clinics reaching underserved areas.' },
  { src: '/impact4.jpg', alt: 'Sustainable agriculture initiative', caption: 'Empowering farmers with modern techniques.' },
];

export default function OurImpact() {
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
      <section className="bg-gradient-to-br from-teal-800 to-teal-600 text-white py-32 px-6 text-center pt-48 relative overflow-hidden">
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
            Our Impact: Making a Difference
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl opacity-95">
            See how Kone Renaissance Foundation is transforming lives and communities.
          </motion.p>
        </motion.div>
      </section>

      {/* Impact Overview Section */}
      <section className="py-20 px-6 bg-white">
        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-extrabold text-teal-800 text-center mb-12">
            Our Journey of Change
          </motion.h2>

          <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed mb-8">
            Since our inception, Kone Renaissance Foundation has been dedicated to fostering sustainable development and empowering communities. Our work spans across education, healthcare, infrastructure, and livelihood programs, directly impacting thousands of lives. We believe in a holistic approach, ensuring that our initiatives create lasting positive change.
          </motion.p>

          <motion.div variants={itemVariants} className="mb-12">
            <ImageSlider images={impactImages} />
          </motion.div>

          <motion.h3 variants={itemVariants} className="text-3xl font-bold text-teal-700 mb-6">
            Key Areas of Impact
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div variants={itemVariants} className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h4 className="text-2xl font-semibold text-teal-800 mb-3">Education Initiatives</h4>
              <p className="text-gray-700 mb-4">
                We have established and supported over 15 schools in remote areas, providing access to quality education for more than 5,000 children. Our programs include teacher training, provision of learning materials, and scholarship opportunities for deserving students.
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Built 5 new primary schools.</li>
                <li>Provided scholarships to 200 high school students.</li>
                <li>Distributed 10,000 textbooks annually.</li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h4 className="text-2xl font-semibold text-teal-800 mb-3">Healthcare & Wellness Programs</h4>
              <p className="text-gray-700 mb-4">
                Our mobile clinics reach underserved villages, offering free medical check-ups, vaccinations, and health education. We focus on maternal and child health, and preventing common diseases through awareness campaigns.
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Conducted 100+ health camps.</li>
                <li>Vaccinated 3,000+ children.</li>
                <li>Distributed essential medicines to 1,500 families.</li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h4 className="text-2xl font-semibold text-teal-800 mb-3">Livelihood & Empowerment</h4>
              <p className="text-gray-700 mb-4">
                We empower local communities through vocational training, micro-finance initiatives, and sustainable agriculture projects. Our aim is to create economic independence and reduce poverty.
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Trained 500 women in various trades.</li>
                <li>Supported 150 small businesses with micro-loans.</li>
                <li>Implemented drought-resistant farming techniques in 10 villages.</li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h4 className="text-2xl font-semibold text-teal-800 mb-3">Infrastructure Development</h4>
              <p className="text-gray-700 mb-4">
                Improving basic infrastructure is vital. We have invested in clean water projects, building accessible roads, and providing sustainable energy solutions to remote areas.
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Installed 20 new boreholes for clean water.</li>
                <li>Constructed 50km of access roads.</li>
                <li>Provided solar power solutions to 3 villages.</li>
              </ul>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="text-center mt-16">
            <h3 className="text-3xl font-bold text-teal-800 mb-6">Join Us in Making a Greater Impact</h3>
            <p className="text-lg text-gray-700 mb-8">
              Your support is crucial to extending our reach and deepening our impact. Every contribution helps us build a brighter future for the communities we serve.
            </p>
            <Link
              href="/donate"
              className="inline-block bg-amber-500 text-teal-900 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-amber-400 transition-all duration-300 ease-in-out transform hover:scale-105 text-lg"
            >
              Donate Now and Support Our Mission
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}