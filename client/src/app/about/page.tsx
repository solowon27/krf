// app/about/page.tsx
'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, Variants, Transition } from 'framer-motion';
import Image from 'next/image';

import samplelogo from '@/images/sample-logo.png'; // Make sure this path is correct relative to your project root/src

export default function AboutUs() {
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

      {/* Hero Section for About Us */}
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
            Our Journey, Our Purpose
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl opacity-95">
            Discover the passion, history, and people behind the Kone Renaissance Foundation.
          </motion.p>
        </motion.div>
      </section>

      {/* About Content Section */}
      <section className="py-20 px-6 bg-white shadow-inner">
        <motion.div
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-extrabold mb-6 text-teal-800">Our Story</h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              The **Kone Renaissance Foundation** was born from a deep-rooted desire to uplift and empower the community of Kone, a small village in rural Ethiopia. Witnessing the immense potential within its youth, coupled with the challenges faced by Kone High School, ignited a spark in our founders. We believe that education is the most powerful tool for change, capable of breaking cycles of poverty and building a brighter future.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              From humble beginnings, our initiative grew into a dedicated foundation, uniting individuals and partners who share our vision. We are not just rebuilding a school; we are rebuilding hope, dignity, and opportunity for generations to come.
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            {/* CORRECTED Image component usage for responsive sizing */}
            <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg shadow-xl overflow-hidden">
              <Image
                src={samplelogo}
                alt="Kone High School students learning"
                fill // Tells the image to fill the parent container
                className="object-cover" // Ensures the image covers the div without distortion
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Helps Next.js optimize image sizes
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 px-6 bg-gray-100">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-extrabold mb-10 text-teal-800">
            Our Core Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-teal-700 mb-3">Empowerment</h3>
              <p className="text-gray-600">Fostering self-reliance and critical thinking in every student and teacher.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-teal-700 mb-3">Community</h3>
              <p className="text-gray-600">Building strong bonds and collaborative spirit within Kone and with our supporters.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-teal-700 mb-3">Sustainability</h3>
              <p className="text-gray-600">Creating lasting change that benefits the community for generations.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Call to Action for Impact/Support */}
      <section className="py-20 px-6 bg-gradient-to-r from-teal-700 to-teal-900 text-white text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h3 variants={itemVariants} className="text-3xl md:text-4xl font-extrabold mb-6 leading-snug">
            Ready to Make a Difference?
          </motion.h3>
          <motion.p variants={itemVariants} className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Your support is the bedrock of our mission. Join us in shaping a brighter future for Kone.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              href="/donate"
              className="inline-block bg-amber-500 text-teal-900 font-bold px-8 py-4 rounded-full shadow-xl hover:bg-amber-400 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Support Our Mission
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}