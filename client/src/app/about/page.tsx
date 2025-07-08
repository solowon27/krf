'use client';

import Header from '@components/Header';
import Footer from '@components/Footer';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaHandsHelping, FaBullseye, FaHeart, FaLightbulb } from 'react-icons/fa';

// --- NEW: Data structure for team members for easier updates ---
const teamMembers = [
  {
    name: "አቤል ቢሰጠኝ",
    role: "መስራች እና የትምህርት ቤቱ ተጠሪ",
    quote: "Every child deserves the opportunity to learn and thrive. We are building that future, brick by brick, dream by dream.",
    image: "/abel.jpeg"
  },
  {
    name: "ኮማንደር ወንድወሰን",
    role: "መስራች እና ዳታ አናሊስት",
    quote: "Leveraging technology, we can bridge educational gaps and connect passionate learners with boundless knowledge.",
    image: "/come.JPEG"
  },
  {
    name: "ሰሎሞን ይመር",
    role: "መስራች እና የውጭ ግንኙነት",
    quote: "በዚህ ፕሮጀክት ውስጤ ትልቅ እምነት አለው።",
    image: "/solo.JPG"
  }
];

// --- NEW: Data for the timeline section ---
const timelineEvents = [
  { year: "2016 E.C.", title: "Foundation & Initial Funding", description: "The Kone Renaissance Foundation was established, securing initial partnerships and funding to begin the renovation of Kone High School." },
  { year: "2016 E.C.", title: "Launch of Mentorship Program", description: "Successfully connected the first cohort of 20 high school students with local professionals for career guidance and inspiration." },
  { year: "2017 E.C.", title: "Phase 1 Construction Begins", description: "Broke ground on new classrooms and a modern library, marking a major step in our infrastructure goals." },
  { year: "Future", title: "Digital Learning Hub Launch", description: "Our next major milestone is to equip the library with computers and internet, opening a window to the world for our students." },
];

export default function AboutUs() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative bg-slate-900 text-white py-32 md:py-48 px-6 text-center overflow-hidden">
        <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
                    
       <div className="absolute inset-0 bg-gray-900 text-white"></div>
           <div className="absolute inset-0 opacity-[0.03]"
                style={{
                 backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 60L60 0H30L0 30M60 60V30L30 60\'/%3E%3C/g%3E%3C/svg%3E")',
                 backgroundSize: '120px 120px',
                 backgroundRepeat: 'repeat',
                  }}>
                    
                  </div>
                </motion.div>
        <motion.div
          className="max-w-4xl mx-auto relative z-10"
          initial="hidden" animate="visible" variants={containerVariants}
        >
          <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl font-extrabold mb-4 tracking-tight">
            ስለ እኛ
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-blue-100/80 max-w-2xl mx-auto">
            The story, mission, and dedicated individuals driving the Kone Renaissance Foundation forward.
          </motion.p>
        </motion.div>
      </section>

      {/* --- OUR STORY & TIMELINE SECTION --- */}
      <section className="py-20 md:py-28 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">From a Shared Vision to Lasting Impact</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The **Kone Renaissance Foundation** was born from a collective desire to empower the community of Kone, Ethiopia. We believe that **education is the most powerful catalyst for change**, capable of unlocking potential and building a brighter, self-sufficient future.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our journey is a testament to community action. We are not just rebuilding a school; we are fostering hope, dignity, and opportunity for generations.
            </p>
          </motion.div>
          {/* --- NEW: Interactive Timeline --- */}
          <div>
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                className="flex items-start mb-8 last:mb-0"
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: { opacity: 1, x: 0, transition: { delay: index * 0.2, duration: 0.6 } }
                }}
              >
                <div className="flex flex-col items-center mr-6">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">{event.year}</div>
                  {index !== timelineEvents.length - 1 && <div className="w-0.5 h-16 bg-gray-300 mt-2"></div>}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      

      {/* --- GUIDING PRINCIPLES / CORE VALUES --- */}
      <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.h2 variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl md:text-4xl font-bold mb-12">Our Guiding Principles</motion.h2>
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" initial="hidden" whileInView="visible" variants={containerVariants} viewport={{ once: true, amount: 0.2 }}>
                {[
                    { icon: <FaLightbulb/>, title: "Empowerment", text: "Fostering self-reliance by equipping students and teachers with the tools for their own success." },
                    { icon: <FaHeart/>, title: "Community", text: "Building strong, collaborative bonds within Kone and with our global network of supporters." },
                    { icon: <FaBullseye/>, title: "Sustainability", text: "Creating lasting, positive change that benefits the community for generations to come." }
                ].map((value, index) => (
                    <motion.div key={index} variants={itemVariants} className="p-8 bg-gray-50/50 rounded-2xl border border-gray-200/80 hover:shadow-xl hover:border-blue-300 transition-all duration-300">
                        <div className="text-4xl mb-4 text-blue-600">{value.icon}</div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{value.text}</p>
                    </motion.div>
                ))}
            </motion.div>
          </div>
      </section>

      {/* --- OUR TEAM SECTION --- */}
      <section className="py-20 md:py-28 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
            <motion.div variants={itemVariants} className="inline-block text-blue-600 text-5xl mb-4"><FaUsers/></motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-12">Meet Our Visionary Team</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div key={index} variants={itemVariants} className="bg-white rounded-2xl shadow-lg overflow-hidden text-center group transform hover:-translate-y-2 transition-transform duration-300">
                  <div className="relative h-80 bg-gray-200">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-blue-600 font-semibold mt-1 mb-4">{member.role}</p>
                    <p className="text-gray-600 italic">"{member.quote}"</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="bg-blue-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={containerVariants}>
                <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">Ready to Make a Difference?</motion.h2>
                <motion.p variants={itemVariants} className="text-lg text-blue-100/80 max-w-2xl mx-auto mb-8">
                    Your support is the bedrock of our mission. Join us in shaping a brighter future for Kone.
                </motion.p>
                <motion.div variants={itemVariants}>
                    <Link href="/donate" className="inline-block bg-white text-blue-700 font-bold px-10 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-transform duration-300">
                        Support Our Mission
                    </Link>
                </motion.div>
            </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}