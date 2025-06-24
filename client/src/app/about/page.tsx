// app/about/page.tsx
'use client';

import Link from 'next/link';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { motion, Variants, Transition } from 'framer-motion';
import Image from 'next/image';

// No direct image imports needed if images are in the public folder

export default function AboutUs() {
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
          className="w-full mx-auto relative z-10"
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
        {/* Founders Section */}
      <section className="py-20 w-full bg-white">
        <motion.div
          className="w-full mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-extrabold mb-10 text-teal-800">
            Meet the Founders
          </motion.h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12">
            {/* Founder 1 */}
            <motion.div variants={itemVariants} className="w-full max-w-sm">
              <div className="relative h-64 w-64 rounded-full overflow-hidden mx-auto mb-4">
                <Image
                  src="/abel.jpeg" // Use public path for image
                  alt="Founder 1"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-teal-700 mb-2">Abel Bisetegn</h3>
              <p className="text-yellow-600 italic mb-2">Job Description</p>
              <p className="text-gray-700">"Short inspirational message or quote."</p>
            </motion.div>

            {/* Founder 2 */}
            <motion.div variants={itemVariants} className="w-full max-w-sm">
              <div className="relative h-64 w-64 rounded-full overflow-hidden mx-auto mb-4">
                <Image
                  src="/come.JPEG" // Use public path for image
                  alt="Founder 2"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-teal-700 mb-2">Commander Wondowosen</h3>
              <p className="text-yellow-600 italic mb-2">Job Description</p>
              <p className="text-gray-700">"Short inspirational message or quote."</p>
            </motion.div>

            {/* Founder 3 */}
            <motion.div variants={itemVariants} className="w-full max-w-sm">
              <div className="relative h-64 w-64 rounded-full overflow-hidden mx-auto mb-4 border-2 border-teal-700">
                <Image
                  src="/solo.JPG" // Ensure solo.JPG is in the public folder
                  alt="Founder 3"
                  fill
                  className="object-cover"
                  priority // Tells Next.js to load this image eagerly
                />
              </div>
              <h3 className="text-xl font-bold text-teal-700 mb-2">Solomon Yimer</h3>
              <p className="text-yellow-600 italic mb-2">Founder and Foreign Relations</p>
              <p className="text-gray-700">"let's do something great together!"</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* About Content Section */}
      <section className="py-20 px-16 bg-white shadow-inner">
        <motion.div
          className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-extrabold mb-6 text-teal-800">Our Story</h2>
            <p className="text-lg font-semibold text-gray-800 text-justify leading-relaxed text-gray-700 mb-4">
              The **Kone Renaissance Foundation** was born from a deep-rooted desire to uplift and empower the community of Kone, a small village in rural Ethiopia. Witnessing the immense potential within its youth, coupled with the challenges faced by Kone High School, ignited a spark in our founders. We believe that education is the most powerful tool for change, capable of breaking cycles of poverty and building a brighter future.
            </p>
            <p className="text-lg font-semibold text-gray-800 text-justify leading-relaxed text-gray-700">
              From humble beginnings, our initiative grew into a dedicated foundation, uniting individuals and partners who share our vision. We are not just rebuilding a school; we are rebuilding hope, dignity, and opportunity for generations to come.
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            {/* CORRECTED Image component usage for responsive sizing */}
            <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg shadow-xl overflow-hidden">
              <Image
                src="/sample-logo.png" // Use public path for image. You might want to use a relevant school image here.
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

      {/* Our Goals & Achievements Section - Enhanced Styling */}
      <section className="py-20 px-6 bg-gray-100"> {/* Changed background to gray-100 for better contrast with white cards */}
        <motion.div
          className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start" // Added max-w-7xl and mx-auto for better centering of the grid
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left Side: Our Goals - Styled as a card */}
          <motion.div
            variants={itemVariants}
            className="bg-white p-8 rounded-xl shadow-2xl border border-teal-200 hover:shadow-3xl transition-all duration-300 ease-in-out transform hover:-translate-y-1" // Added padding, border, shadow, hover effects
          >
            <h2 className="text-3xl font-extrabold mb-6 text-teal-800 border-b-2 border-teal-300 pb-3">Our Goals for 2025/2026 GC (2017 E.C.)</h2> {/* Added border-bottom */}
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              For the upcoming academic year, the Kone Renaissance Foundation is committed to achieving the following key objectives to further empower the Kone community:
            </p>
            <ul className="list-disc pl-6 space-y-4 text-lg text-gray-700"> {/* Increased pl and space-y for better readability */}
              <motion.li variants={itemVariants} className="font-semibold text-gray-800">
                **Complete Phase 1 School Infrastructure:** Finalize the construction and furnishing of the new classrooms and library at Kone High School, ensuring a conducive learning environment.
              </motion.li>
              <motion.li variants={itemVariants} className="font-semibold text-gray-800">
                **Establish a Sustainable Water Supply:** Implement a reliable and clean water source for the school and surrounding community, improving hygiene and health.
              </motion.li>
              <motion.li variants={itemVariants} className="font-semibold text-gray-800">
                **Launch Digital Learning Hub:** Equip the new library with computers and internet access, providing students with essential digital literacy skills.
              </motion.li>
              <motion.li variants={itemVariants} className="font-semibold text-gray-800">
                **Teacher Training Program:** Initiate a professional development program for Kone High School teachers, focusing on modern pedagogical methods and subject matter expertise.
              </motion.li>
            </ul>
          </motion.div>

          {/* Right Side: Previous Year's Achievements - Styled as a card */}
          <motion.div
            variants={itemVariants}
            className="bg-white p-8 rounded-xl shadow-2xl border border-amber-200 hover:shadow-3xl transition-all duration-300 ease-in-out transform hover:-translate-y-1" // Added padding, border, shadow, hover effects (using amber for a slight contrast)
          >
            <h2 className="text-3xl font-extrabold mb-6 text-teal-800 border-b-2 border-amber-300 pb-3">Our Achievements (Previous Year)</h2> {/* Added border-bottom */}
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              Building on the momentum of the past year, we are proud to highlight some of our key accomplishments from 2024/2025 GC (2016 E.C.):
            </p>
            <ul className="list-disc pl-6 space-y-4 text-lg text-gray-700"> {/* Increased pl and space-y for better readability */}
              <motion.li variants={itemVariants} className="font-semibold text-gray-800">
                **Initiated School Building Renovation:** Successfully secured funding and commenced initial renovations for Kone High School classrooms, improving learning conditions.
              </motion.li>
              <motion.li variants={itemVariants} className="font-semibold text-gray-800">
                **Provided Educational Supplies:** Distributed essential textbooks, notebooks, and writing materials to over 500 students, ensuring they had the necessary tools for learning.
              </motion.li>
              <motion.li variants={itemVariants} className="font-semibold text-gray-800">
                **Launched Mentorship Program:** Connected 20 high school students with local professionals for guidance and career inspiration.
              </motion.li>
              <motion.li variants={itemVariants} className="font-semibold text-gray-800">
                **Secured Partnership Agreements:** Forged new alliances with two international NGOs, expanding our reach and resource mobilization capacity.
              </motion.li>
            </ul>
          </motion.div>
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