'use client';

import Header from '@components/Header';
import Footer from '@components/Footer';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { FaUsers, FaHandsHelping } from 'react-icons/fa';

// --- Data from your original code ---
const teamMembers = [
  {
    name: "አቤል ቢሰጠኝ",
    role: "መስራች እና የትምህርት ቤቱ ተጠሪ",
    quote: "በኮን 2ኛ ደረጃ ትም/ቤት ስም የተቋቋመው ፋውንዴሽን መነሻውም መድረሻውም በትምህርት ቤቱ ላሉ ማህበረሰብ (ተማሪዎች፣ መምህራን) አቅም በፈቀደ ላጋጠሙ ችግሮች መፍትሔ በመስጠት ከጊዜው ጋር ተወዳዳሪ ማድረግ ነው!",
    image: "/abel.jpeg"
  },
  {
    name: "ኮማንደር ወንድወሰን",
    role: "መስራች እና ዳታ አናሊስት",
    quote: "ይህ ፋውንዴሽን የኮን 2ኛ ደረጃ ትምህርት ቤት እና ተማሪዎችን ተጠቃሚ እንደሚያደርግ ፅኑ እምነት አለኝ። የዚህ ፋውንዴሽን አካል በመሆኔም ደስተኛ ይሰማኛል።",
    image: "/come.JPEG"
  },
  {
    name: "ሰሎሞን ይመር",
    role: "መስራች እና የውጭ ግንኙነት",
    quote: "በዚህ ፕሮጀክት ውስጤ ትልቅ እምነት አለው ፡ የዚህ በጎ ተግባር አካል መሆኔም በጣም ያኮራኛል።",
    image: "/solo.JPG"
  }
];

const timelineEvents = [
  { year: "KHSRF", title: "የመጀመርያ ምስረታ", description: "ፋውንዴሽናችን ሰኔ 20, 2017 አ.ም ተቋቋመ። " },
  { year: "KHSRF", title: "በ 2018/2025 የተያዘ እቅድ", description: "የመማሪያ ቁሳቁስ ለሚያስፈልጋቸው ተማሪዎች ድጋፍ ማድረግና የዲጂታል ላይብረሪውን ኮምፒውተሮችን በመግዛት በትምህርት ቤቱ ውስጥ ባለው ቤተ-መጻሕፍት ውስጥ ራሱን የቻለ አንድ ሴክሽን ማድረግ ነው።" },
  { year: "KHSRF", title: "በቀጣይ 5 አመት የተያዘ እቅድ", description: "ከፍተኛ ውጤት ላመጡና በትምህርት ቤቱ ውስጥ በመምህርነት ሞያ ለሚያገለግሉ መምህራን የስኮላርሽፕ እድልን ማፈላለግና ማመቻቸት።" },
  { year: "KHSRF", title: "ያሳካናቸው ግቦች", description: "134 አጋዥ መጽሃፍትን የረዳን ሲሆን በዌብ ሳይታችንም የዲጂታል ላይብረሪ እና በአለም አቀፍ ደረጃ የሚሰጡ ነጻ የኦንላይን ትምህርቶችን በማካተት ለማህበረሰባችን አበርክተናል።" },
];

// --- Refined animation variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function AboutUs() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="bg-white py-2 md:py-4 text-center">
        <motion.div
          className="max-w-4xl mx-auto px-4"
          initial="hidden" animate="visible" variants={containerVariants}
        >
          {/* --- NEW: Responsive Logo --- */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 mx-auto">
              <Image
                src="/logo.png"
                alt="Kone Renaissance Foundation Logo"
                fill
                className="object-contain"
                priority // Add priority to the largest visible image for faster loading
              />
            </div>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-9xl font-extrabold text-gray-900 tracking-tight">
            አላማና  <span className="text-indigo-600">ራእይ</span>
          </motion.h1>
        </motion.div>
      </section>

      {/* --- OUR STORY & TIMELINE SECTION --- */}
      <section className="py-16 sm:py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column: Story */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">የፋውንዴሽናችን አላማ</h2>
            <p className="text-lg lg:text-2xl text-justify text-gray-600 leading-relaxed mb-8">
              በዚህ ትልቅ ትምህርት ቤት ውስጥ የሚያልፉትን የነገ ሃገር ተረካቢ ትውልድ ከሌላው አካባቢ ማህበረሰብ እንዲሁም በአለም አቀፍ ደረጃ ተወዳዳሪ እንዲሆኑ በማስቻል የሚመጣው ትውልድ ሃላፊነት የሚሰማውና ብቁ ማድረግ ነው። ይህንንም ማድረግ እንድንችል በሀገር ውስጥና በውጭ ሀገር ያሉ የአካባቢውን ተወላጆች እንዲሁም በትምህርት ቤቱ የተማሩ ቀደምት ተማሪዎችን በማስተባበር በትምህርት ቤቱ ውስጥ ያስፈልጋሉ ተብለው የሚታሰቡትን መሰረታዊ ፍላጎቶች በማቴሪያል መልክ መርዳትና ብሩህ ተስፋ ላላቸው ነገር ግን የአቅም ውስንነት ላለባቸው ተማሪዎችም የተለያየ ድጋፍ ማድረግ ነው።
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">ተልእኮ</h2>
            <p className="text-lg lg:text-2xl text-justify text-gray-600 leading-relaxed mb-4">
              ተልእኳችን ለትምህርት ቤታችን ቀጣይነት ያለው ጠንካራ ድጋፍ ማድረግ ሲሆን በዚህም አቅም ያለው የትምህርት አካባቢ መፍጠር እና ስለ ነገ ተስፋና ራእይ ያለው ትውልድ ማፍራት ነው።
            </p>
          </motion.div>
          
          {/* Right Column: Timeline */}
          <div className="relative">
            <div className="absolute left-6 top-0 w-0.5 h-full bg-gray-200" aria-hidden="true"></div>
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                className="relative flex items-start mb-12"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-lg ring-8 ring-gray-50 z-10">
                  {event.year}
                </div>
                <div className="ml-8">
                  <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                  <p className="mt-1 text:lg lg:text-2xl text-justify text-gray-600">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* --- OUR TEAM SECTION --- */}
      <section className="py-4 sm:py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants}>
            <motion.div variants={itemVariants} className="inline-block text-indigo-600 text-5xl mb-4"><FaUsers/></motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-16">የዚህ ፋውንዴሽን መስራቾች</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div key={index} variants={itemVariants} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200/60 text-center">
                  <div className="relative h-80 bg-gray-100">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-indigo-600 font-semibold mt-1 mb-4">{member.role}</p>
                    <blockquote className="border-l-4 border-gray-200 pl-4 text-left">
                      <p className="text-gray-600 italic">"{member.quote}"</p>
                    </blockquote>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- TEAM MESSAGE SECTION --- */}
      <section className="py-4 sm:py-8 bg-indigo-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="inline-block text-indigo-600 text-5xl mb-4">
              <FaHandsHelping />
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              የመስራቾቹ መልእክት
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg lg:text-2xl text-justify text-gray-700 leading-relaxed">
              እንደ አንድ ቡድን፣ በኮን ሃይስኩል ለሚማሩ ወንድም እህቶቻችን ምቹ ሁኔታ ለመፍጠር እና አስተምሮ እዚህ ደረጃ ያደረሰንን ትምህርት ቤት ለማገዝ ያለን የጋራ ስሜት ይሄንን ስራ እንድንሰራ አነሳስቶናል።
              ዋና ትኩረታችን ተማሪዎችንና ማህበረሰቡን ባለን ሞያ መርዳት ሲሆን ሌሎች ወንድም እህቶቻችን ይሄንን መነሻ በማድረግ ከኛ የተሻለ ነገር ለማህበረሰቡ እንዲሰሩ አርአያ መሆን ነው። እንደ ማጠቃለያ በዚህ ፋውንዴሽን መርህ መሰረት በግልፀኝነትና በትጋት አብረን በመስራት፣ ለሁሉም ማህበረሰብ ዘላቂ የሆኑ እድሎችን መፍጠር ዋና ተግባራችን ነው።
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}