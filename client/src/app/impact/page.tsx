// app/our-impact/page.tsx
'use client';

import Link from 'next/link';
import Header from '@components/Header';
import Footer from '@components/Footer';
import ImageSlider from '@components/ImageSlider';
import { motion, Variants, Transition } from 'framer-motion';
import TestimonialsGrid from '@components/TestimonialsGrid';

const impactImages = [
  { src: '/impact-image1.jpg', alt: 'Students reading donated books', caption: 'Reference books donated by Ato Solomon Yimer being presented to Kone High School in the presence of students.' },
  { src: '/impact-image2.jpg', alt: 'Students reading donated books', caption: 'Reference books donated by Ato Solomon Yimer being presented to Kone High School in the presence of students.' },
  { src: '/impact-image3.jpg', alt: 'Students reading donated books', caption: 'Reference books donated by Ato Solomon Yimer being presented to Kone High School in the presence of students.' },
  { src: '/impact-image4.jpg', alt: 'Students reading donated books', caption: 'Reference books donated by Ato Solomon Yimer being presented to Kone High School in the presence of students.' },
  { src: '/impact-image5.jpg', alt: 'Students reading donated books', caption: 'Reference books donated by Ato Solomon Yimer being presented to Kone High School in the presence of students.' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'tween', ease: 'easeOut', duration: 0.4 } as Transition,
  },
};

export default function OurImpact() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans overflow-y-auto">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white pt-60 pb-32 px-6 text-left overflow-hidden">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/impacts.jpg" // Update to your image path
            alt="Students Walking Together"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-transparent opacity-90" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl flex flex-col justify-center h-full pl-0" style={{ fontFamily: 'Times New Roman, serif' }}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold Times New Romans italic leading-tight">
            Empowering Students.<br className="hidden md:block" /> Transforming Classrooms.
          </h2>
          <p className="text-xl md:text-2xl font-light leading-snug mb-8 max-w-xl">
            Building brighter futures at Kone High School  <br />
            through access to essential learning materials.
          </p>         
        </div>
      </section> 
     
      {/* Story Section */}
      <section className="py-16 px-6 bg-white text-center" aria-label="Foundation Story">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-10">
            Why We Started
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="bg-gray-100 text-left rounded-2xl shadow-lg p-8 md:p-10"
          >
            <p className="text-base md:text-lg font-light text-gray-700 text-justify">
              Kone High School, like many under-resourced schools in Ethiopia, has long struggled with a severe lack of
              educational materials. The shortage included reference books, laboratory equipment, proper classroom
              infrastructure, and basic learning supplies. Many students came from low-income families and couldn’t
              afford essentials like uniforms, pens, or exercise books. While students remained eager to learn and
              teachers did their best, the gap between ambition and opportunity continued to grow.
            </p>

            <p className="mt-4 text-base md:text-lg font-light text-gray-700 text-justify">
              The Kone High School Foundation was created to close that gap. We believe every student deserves the
              resources to learn, grow, and succeed. Through book donations, classroom support, lab materials, and
              aid for students in need, we are working to build a stronger, more inclusive educational environment
              for all.
            </p>
          </motion.div>
        </motion.div>
      </section>   

      
      {/* Key Stats Section */}
      <section className="bg-gray-100 py-10 px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {[
            { label: 'Books Donated', value: '134' },
            { label: 'Subjects Covered', value: '10+' },
            { label: 'Grades Supported', value: '9–12' },
            { label: 'Students Impacted', value: '1,200+' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="border border-gray-300 bg-white text-center py-5 px-4 shadow-md rounded-lg"
            >
              <p className="text-4xl font-bold text-black-600">{stat.value}</p>
              <p className="text-black-700 mt-2 text-base font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* Image Slider */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <ImageSlider images={impactImages} />
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsGrid />

      {/* Call to Action */}
      <section className="relative bg-gray-900 text-white py-24 sm:py-28 md:py-32 px-4 sm:px-6 text-center overflow-hidden mb-3">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/cta-background.jpg"
            alt="The Gate of Kon Highschool"
            className="w-full h-full object-cover object-top"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>

        {/* CTA Content */}
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Help Build a Future Full of Opportunity
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-light mb-8">
            Your support provides vital books and materials to students who need them most. Join us in transforming lives through education.
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            <Link
              href="/donate"
              className="bg-gray-400 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
