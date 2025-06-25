// app/about/page.tsx
'use client';

import Link from 'next/link';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { motion, Variants, Transition } from 'framer-motion';
import Image from 'next/image';

export default function AboutUs() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        ease: 'easeOut',
        duration: 0.4,
      } as Transition,
    },
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased overflow-y-auto">
      <Header className="relative z-20" />

      {/* Hero Section for About Us - Clean, impactful, dark background */}
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
          <motion.h1 variants={itemVariants} className="text-3xl md:text-6xl lg:text-7xl font-bold mb-3 leading-tight">
            Our Journey, Our Purpose
          </motion.h1>
          <motion.p variants={itemVariants} className="text-base md:text-xl lg:text-2xl font-light opacity-90 max-w-3xl mx-auto">
            Discover the passion, history, and people behind the Kone Renaissance Foundation.
          </motion.p>
        </motion.div>
      </section>

      {/* Our Story Section - First content block, typically narrative */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-gray-900 leading-tight">Our Story: From Vision to Impact</h2>
            <p className="text-base sm:text-lg leading-relaxed text-gray-700 mb-4 sm:mb-6">
              The **Kone Renaissance Foundation** was born from a deep-rooted desire to uplift and empower the community of Kone, a small village in rural Ethiopia. Witnessing the immense potential within its youth, coupled with the challenges faced by Kone High School, ignited a spark in our founders. We believe that **education is the most powerful tool for change**, capable of breaking cycles of poverty and building a brighter future.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-gray-700">
              From humble beginnings, our initiative grew into a dedicated foundation, uniting individuals and partners who share our vision. We are not just rebuilding a school; we are rebuilding hope, dignity, and opportunity for generations to come. Our journey is a testament to the power of collective action and unwavering commitment to human potential.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/sample-logo.png"
              alt="Kone High School students learning or school building"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Meet the Founders Section - Updated for clean, professional look */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold mb-10 sm:mb-12 text-gray-900">
            Meet Our Visionary Founders
          </motion.h2>
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 lg:gap-16"> {/* Changed items-stretch to items-start for md and up, kept items-center for flex-col */}
            {/* Founder 1 */}
            <motion.div variants={itemVariants} className="w-full max-w-xs flex flex-col items-center p-5 sm:p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-40 w-40 sm:h-48 sm:w-48 rounded-full overflow-hidden mb-5 sm:mb-6 border-2 border-gray-200 flex items-center justify-center">
                <Image
                  src="/abel.jpeg"
                  alt="Abel Bisetegn"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2">Abel Bisetegn</h3>
              <p className="text-sm sm:text-md text-gray-600 italic mb-2 sm:mb-3">Co-Founder, Executive Director</p>
              <p className="text-sm sm:text-base text-gray-700 text-center leading-relaxed">"Every child deserves the opportunity to learn and thrive. We are building that future, brick by brick, dream by dream."</p>
            </motion.div>

            {/* Founder 2 */}
            <motion.div variants={itemVariants} className="w-full max-w-xs flex flex-col items-center p-5 sm:p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-40 w-40 sm:h-48 sm:w-48 rounded-full overflow-hidden mb-5 sm:mb-6 border-2 border-gray-200 flex items-center justify-center">
                <Image
                  src="/come.JPEG"
                  alt="Commander Wondowosen"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2">Commander Wondwossen</h3>
              <p className="text-sm sm:text-md text-gray-600 italic mb-2 sm:mb-3">Co-Founder, Technology Lead</p>
              <p className="text-sm sm:text-base text-gray-700 text-center leading-relaxed">"Leveraging technology, we can bridge educational gaps and connect passionate learners with boundless knowledge."</p>
            </motion.div>

            {/* Founder 3 */}
            <motion.div variants={itemVariants} className="w-full max-w-xs flex flex-col items-center p-5 sm:p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-40 w-40 sm:h-48 sm:w-48 rounded-full overflow-hidden mb-5 sm:mb-6 border-2 border-gray-200 flex items-center justify-center">
                <Image
                  src="/solo.JPG"
                  alt="Solomon Yimer"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  priority
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2">Solomon Yimer</h3>
              <p className="text-sm sm:text-md text-gray-600 italic mb-2 sm:mb-3">Co-Founder, Foreign Relations</p>
              <p className="text-sm sm:text-base text-gray-700 text-center leading-relaxed">"Our vision extends beyond borders. Together, we can create a global community dedicated to empowering Kone's future."</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Our Core Values Section - Clean layout, subtle icons */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold mb-10 sm:mb-12 text-gray-900">
            Our Guiding Principles
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
            <motion.div variants={itemVariants} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 text-blue-600">💡</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">Empowerment</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">We foster self-reliance and critical thinking, equipping every student and teacher with the tools to shape their own futures.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 text-blue-600">🤝</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">Community</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">We build strong bonds and a collaborative spirit within Kone, extending to our global network of passionate supporters.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 text-blue-600">🌱</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">Sustainability</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">Our efforts are designed for lasting impact, creating a legacy of positive change that benefits the community for generations.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Our Goals & Achievements Section - Unified clean cards with subtle accents */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left Side: Our Goals - Styled as a clean card */}
          <motion.div
            variants={itemVariants}
            className="bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-100 h-full flex flex-col hover:shadow-2xl transition-all duration-300 ease-in-out"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 border-b border-gray-200 pb-3 sm:pb-4">Our Goals for 2025/2026 GC (2017 E.C.)</h2>
            <p className="text-base sm:text-lg leading-relaxed text-gray-700 mb-4 sm:mb-6 flex-grow">
              For the upcoming academic year, the Kone Renaissance Foundation is committed to achieving the following key objectives to further empower the Kone community:
            </p>
            <ul className="list-disc pl-5 space-y-3 text-base sm:text-lg text-gray-700">
              <motion.li variants={itemVariants} className="font-medium text-gray-800">
                **Complete Phase 1 School Infrastructure:** Finalize the construction and furnishing of new classrooms and library, ensuring a conducive learning environment.
              </motion.li>
              <motion.li variants={itemVariants} className="font-medium text-gray-800">
                **Establish a Sustainable Water Supply:** Implement a reliable and clean water source for the school and surrounding community, improving hygiene and health.
              </motion.li>
              <motion.li variants={itemVariants} className="font-medium text-gray-800">
                **Launch Digital Learning Hub:** Equip the new library with computers and internet access, providing students with essential digital literacy skills.
              </motion.li>
              <motion.li variants={itemVariants} className="font-medium text-gray-800">
                **Teacher Training Program:** Initiate a professional development program for Kone High School teachers, focusing on modern pedagogical methods and subject matter expertise.
              </motion.li>
            </ul>
          </motion.div>

          {/* Right Side: Previous Year's Achievements - Styled as a clean card */}
          <motion.div
            variants={itemVariants}
            className="bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-100 h-full flex flex-col hover:shadow-2xl transition-all duration-300 ease-in-out"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 border-b border-gray-200 pb-3 sm:pb-4">Our Achievements (Previous Year)</h2>
            <p className="text-base sm:text-lg leading-relaxed text-gray-700 mb-4 sm:mb-6 flex-grow">
              Building on the momentum of the past year, we are proud to highlight some of our key accomplishments from 2024/2025 GC (2016 E.C.):
            </p>
            <ul className="list-disc pl-5 space-y-3 text-base sm:text-lg text-gray-700">
              <motion.li variants={itemVariants} className="font-medium text-gray-800">
                **Initiated School Building Renovation:** Successfully secured funding and commenced initial renovations for Kone High School classrooms, improving learning conditions.
              </motion.li>
              <motion.li variants={itemVariants} className="font-medium text-gray-800">
                **Provided Educational Supplies:** Distributed essential textbooks, notebooks, and writing materials to over 500 students, ensuring they had the necessary tools for learning.
              </motion.li>
              <motion.li variants={itemVariants} className="font-medium text-gray-800">
                **Launched Mentorship Program:** Connected 20 high school students with local professionals for guidance and career inspiration.
              </motion.li>
              <motion.li variants={itemVariants} className="font-medium text-gray-800">
                **Secured Partnership Agreements:** Forged new alliances with two international NGOs, expanding our reach and resource mobilization capacity.
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>
      </section>

      {/* Call to Action for Impact/Support - Unified Apple-like button */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h3 variants={itemVariants} className="text-2xl md:text-4xl font-bold mb-4 sm:mb-6 leading-snug">
            Ready to Make a Difference?
          </motion.h3>
          <motion.p variants={itemVariants} className="text-base sm:text-lg opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto font-light">
            Your support is the bedrock of our mission. Join us in shaping a brighter future for Kone.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              href="/donate"
              className="inline-block bg-blue-600 text-white font-semibold px-8 py-4 sm:px-10 sm:py-5 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
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