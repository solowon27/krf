// app/about/page.tsx
'use client';

import Link from 'next/link';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { motion, Variants, Transition } from 'framer-motion';
import Image from 'next/image';

export default function AboutUs() {
  // Framer Motion Variants - Adjusted for smoother, less springy transitions
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Slightly faster stagger
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'tween', // Changed to tween for a smoother, less bouncy feel
        ease: 'easeOut',
        duration: 0.4, // Increased duration slightly for a more deliberate feel
      } as Transition,
    },
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased overflow-x-hidden"> {/* Changed text color to gray-900 for stronger contrast */}
      <Header />

      {/* Hero Section for About Us - Clean, impactful, dark background */}
      <section className="bg-gray-900 text-white py-32 px-6 text-center pt-48 relative overflow-hidden"> {/* Solid dark background */}
        {/* Subtle background pattern (optional, removed if too busy) */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '80px 80px',
            backgroundRepeat: 'repeat',
          }}
        ></div>
        <motion.div
          className="max-w-4xl mx-auto relative z-10" // Added max-width for better control
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"> {/* Stronger font-bold */}
            Our Journey, Our Purpose
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl lg:text-2xl font-light opacity-90 max-w-3xl mx-auto"> {/* Lighter font for description */}
            Discover the passion, history, and people behind the Kone Renaissance Foundation.
          </motion.p>
        </motion.div>
      </section>

      {/* Our Story Section - First content block, typically narrative */}
      <section className="py-20 px-6 bg-white">
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl font-bold mb-6 text-gray-900 leading-tight">Our Story: From Vision to Impact</h2> {/* Stronger heading */}
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              The **Kone Renaissance Foundation** was born from a deep-rooted desire to uplift and empower the community of Kone, a small village in rural Ethiopia. Witnessing the immense potential within its youth, coupled with the challenges faced by Kone High School, ignited a spark in our founders. We believe that **education is the most powerful tool for change**, capable of breaking cycles of poverty and building a brighter future.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              From humble beginnings, our initiative grew into a dedicated foundation, uniting individuals and partners who share our vision. We are not just rebuilding a school; we are rebuilding hope, dignity, and opportunity for generations to come. Our journey is a testament to the power of collective action and unwavering commitment to human potential.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl"> {/* Enhanced image styling */}
            <Image
              src="/placeholder-school.jpg" // Placeholder: Use a high-quality image of Kone High School or students
              alt="Kone High School students learning or school building"
              fill
              className="object-cover object-center" // Ensure image covers well
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Our Core Values Section - Clean layout, subtle icons */}
      <section className="py-20 px-6 bg-gray-50"> {/* Light gray background for contrast */}
        <motion.div
          className="max-w-6xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-12 text-gray-900"> {/* Stronger heading, more bottom margin */}
            Our Guiding Principles
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"> {/* Increased gap */}
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"> {/* Sharper corners, border */}
              <div className="text-5xl mb-4 text-blue-600">💡</div> {/* Use a consistent accent color for icons/emoji */}
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Empowerment</h3> {/* Stronger font for sub-headings */}
              <p className="text-gray-700 leading-relaxed">We foster self-reliance and critical thinking, equipping every student and teacher with the tools to shape their own futures.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4 text-blue-600">🤝</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-700 leading-relaxed">We build strong bonds and a collaborative spirit within Kone, extending to our global network of passionate supporters.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4 text-blue-600">🌱</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Sustainability</h3>
              <p className="text-gray-700 leading-relaxed">Our efforts are designed for lasting impact, creating a legacy of positive change that benefits the community for generations.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Meet the Founders Section - Updated for clean, professional look */}
      <section className="py-20 px-6 bg-white">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-12 text-gray-900">
            Meet Our Visionary Founders
          </motion.h2>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-12 lg:gap-16"> {/* items-stretch for equal height cards */}
            {/* Founder 1 */}
            <motion.div variants={itemVariants} className="w-full max-w-xs flex flex-col items-center p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 w-48 rounded-full overflow-hidden mb-6 border-2 border-gray-200"> {/* Smaller, consistent image size, subtle border */}
                <Image
                  src="/abel.jpeg"
                  alt="Abel Bisetegn"
                  fill
                  className="object-cover object-top" // Adjust object-position if needed
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Abel Bisetegn</h3>
              <p className="text-md text-gray-600 italic mb-3">Co-Founder, Executive Director</p> {/* Professional role */}
              <p className="text-gray-700 text-center leading-relaxed">"Every child deserves the opportunity to learn and thrive. We are building that future, brick by brick, dream by dream."</p>
            </motion.div>

            {/* Founder 2 */}
            <motion.div variants={itemVariants} className="w-full max-w-xs flex flex-col items-center p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 w-48 rounded-full overflow-hidden mb-6 border-2 border-gray-200">
                <Image
                  src="/come.JPEG"
                  alt="Commander Wondowosen"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Commander Wondwossen</h3>
              <p className="text-md text-gray-600 italic mb-3">Co-Founder, Technology Lead</p>
              <p className="text-gray-700 text-center leading-relaxed">"Leveraging technology, we can bridge educational gaps and connect passionate learners with boundless knowledge."</p>
            </motion.div>

            {/* Founder 3 */}
            <motion.div variants={itemVariants} className="w-full max-w-xs flex flex-col items-center p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 w-48 rounded-full overflow-hidden mb-6 border-2 border-gray-200"> {/* Consistent border styling */}
                <Image
                  src="/solo.JPG"
                  alt="Solomon Yimer"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Solomon Yimer</h3>
              <p className="text-md text-gray-600 italic mb-3">Co-Founder, Foreign Relations</p>
              <p className="text-gray-700 text-center leading-relaxed">"Our vision extends beyond borders. Together, we can create a global community dedicated to empowering Kone's future."</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Our Goals & Achievements Section - Unified clean cards with subtle accents */}
      <section className="py-20 px-6 bg-gray-50"> {/* Consistent light gray background */}
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left Side: Our Goals - Styled as a clean card */}
          <motion.div
            variants={itemVariants}
            className="bg-white p-8 rounded-xl shadow-xl border border-gray-100 h-full flex flex-col hover:shadow-2xl transition-all duration-300 ease-in-out" // Added h-full and flex-col for consistent height
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">Our Goals for 2025/2026 GC (2017 E.C.)</h2> {/* Stronger heading, subtle border */}
            <p className="text-lg leading-relaxed text-gray-700 mb-6 flex-grow"> {/* flex-grow to push content down */}
              For the upcoming academic year, the Kone Renaissance Foundation is committed to achieving the following key objectives to further empower the Kone community:
            </p>
            <ul className="list-disc pl-6 space-y-4 text-lg text-gray-700">
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
            className="bg-white p-8 rounded-xl shadow-xl border border-gray-100 h-full flex flex-col hover:shadow-2xl transition-all duration-300 ease-in-out" // Consistent styling
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-4">Our Achievements (Previous Year)</h2> {/* Consistent heading, subtle border */}
            <p className="text-lg leading-relaxed text-gray-700 mb-6 flex-grow">
              Building on the momentum of the past year, we are proud to highlight some of our key accomplishments from 2024/2025 GC (2016 E.C.):
            </p>
            <ul className="list-disc pl-6 space-y-4 text-lg text-gray-700">
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
      <section className="py-20 px-6 bg-gray-900 text-white text-center"> {/* Dark background, like the hero */}
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h3 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6 leading-snug">
            Ready to Make a Difference?
          </motion.h3>
          <motion.p variants={itemVariants} className="text-lg opacity-90 mb-8 max-w-2xl mx-auto font-light"> {/* Lighter font for description */}
            Your support is the bedrock of our mission. Join us in shaping a brighter future for Kone.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              href="/donate"
              className="inline-block bg-blue-600 text-white font-semibold px-10 py-5 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105" // Apple-like blue button
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