'use client';

import Header from '@components/Header';
import Footer from '@components/Footer';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState, useMemo } from 'react';
import { FaExclamationTriangle, FaBookOpen, FaUserGraduate, FaTools, FaBriefcase } from 'react-icons/fa';
import Link from 'next/link';

// Data structure remains the same
const resources = [
  // Online Learning
  {
    name: "Khan Academy",
    url: "https://www.khanacademy.org/",
    description: "ነፃ እና ዓለም አቀፍ ደረጃ ትምህርት በቪዲዮ። ሂሳብ፣ ፊዚክስ፣ ኬሚስትሪ፣ እና ሌሎችንም ይማሩ።",
    category: "Online Learning",
    type: "Free Courses",
    targetAudience: "All Students",
    icon: <FaBookOpen />,
  },
  {
    name: "Coursera (Free Courses)",
    url: "https://www.coursera.org/courses?query=free",
    description: "ከከፍተኛ ዩኒቨርሲቲዎች እና ድርጅቶች በሚሰጥ ሰፊ የነፃ ኮርሶችን በዚህ ሊንክ ስር ያግኙ።",
    category: "Online Learning",
    type: "University Level",
    targetAudience: "All Students",
    icon: <FaBookOpen />,
  },
  {
    name: "edX (Free Courses)",
    url: "https://www.edx.org/free-online-courses",
    description: "በዓለም ዙሪያ ካሉ እንደ ሃርቫርድ አይነት ትልልቅ የአካዳሚክ ተቋማት ነፃ ኮርሶችን ያግኙ።",
    category: "Online Learning",
    type: "University Level",
    targetAudience: "All Students",
    icon: <FaBookOpen />,
  },
  {
    name: "Duolingo",
    url: "https://www.duolingo.com/",
    description: "አዲስ ቋንቋ ይማሩ። የቋንቋ ችሎታዎን ለማዳበር እና ለማሻሻል በዚህ ሊንክ ውስጥ የፈለጉትን ቋንቋ ይማሩ።",
    category: "Online Learning",
    type: "Language",
    targetAudience: "All Students",
    icon: <FaBookOpen />,
  },
  {
    name: "Codecademy",
    url: "https://www.codecademy.com/",
    description: "የኮድ ቋንቋዎችን ለመማር እና ለመሻሻል የነፃ መማሪያ መድረክ።",
    category: "Online Learning",
    type: "Programming",
    targetAudience: "All Students",
    icon: <FaBookOpen />,
  },
  {
    name: "National Geographic Education",
    url: "https://www.nationalgeographic.org/education/",
    description: "የተለያዩ በርካታ የትምህርት ምንጮችን ያገኙ። የጂኦግራፊ፣ የታሪክ፣ የስነ-ምግባር እና ሌሎች ጥናቶች።",
    category: "Online Learning",
    type: "Educational Resources",
    targetAudience: "All Students",
    icon: <FaBookOpen />,
  },
  // Scholarships
  {
    name: "Mastercard Foundation Scholars Program",
    url: "https://mastercardfdn.org/en/what-we-do/our-programs/mastercard-foundation-scholars-program/where-to-apply/",
    description: "Comprehensive scholarship and leadership development for African students.",
    category: "Scholarships",
    type: "Fully Funded",
    targetAudience: "Undergraduate & Graduate",
    icon: <FaUserGraduate />,
  },
  {
    name: "Fulbright Foreign Student Program",
    url: "https://et.usembassy.gov/educational-cultural-exchanges/",
    description: "Prestigious program for graduate study and research in the United States.",
    category: "Scholarships",
    type: "Fully Funded",
    targetAudience: "Postgraduate",
    icon: <FaUserGraduate />,
  },
    {
    name: "Erasmus Mundus Joint Masters",
    url: "https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en",
    description: "Study in multiple European countries with a fully-funded master's scholarship.",
    category: "Scholarships",
    type: "Fully Funded",
    targetAudience: "Postgraduate",
    icon: <FaUserGraduate />,
  },
  {
     name: "Japanese Government (MEXT) Scholarships",
      url: "https://www.studyjapan.go.jp/en/smap_stopj-e/index.html",
      description: "Fully funded scholarships for international students to study in Japan.",
      category: "Scholarships",
      type: "Fully Funded",
      targetAudience: "Undergraduate & Postgraduate",
      icon: <FaUserGraduate />,
  },
  {
    name: "Turkish Government Scholarships (Türkiye Bursları)",
    url: "https://turkiyeburslari.gov.tr/en/for-applicants/application-criteria",
    description: "Fully funded scholarships for international students to study in Turkey.",
    category: "Scholarships",
    type: "Fully Funded",
    targetAudience: "Undergraduate & Postgraduate",
    icon: <FaUserGraduate />,
  },
  {
    name: "Czech Government Scholarships",
    url: "https://www.mzv.gov.cz/addisababa/en/development_cooperation_and_humanitarian/scholarships/index.html", // Czech Embassy in Addis Ababa scholarship page
    description: "Fully funded scholarships for Ethiopian students to study in the Czech Republic.",
    category: "Scholarships",
    type: "Fully Funded",
    targetAudience: "Undergraduate & Postgraduate",
    icon: <FaUserGraduate />, 
  },
  {
    name: "International Community School (ICS) Addis Ababa Scholarships",
    url: "https://www.icsaddis.org/learn/scholarship",
    description: "Scholarships for Ethiopian students to attend ICS, a leading international school in Addis Ababa.",
    category: "Scholarships",
    type: "Fully Funded",
    targetAudience: "Undergraduate & Postgraduate",
    icon: <FaUserGraduate />, 
  },
  {
    name: "Ethiopian Education Fund (EEF)",
    url: "https://www.ethiopianeducationfund.org/",
    description: "Provides scholarships and educational support to Ethiopian students in need.",
    category: "Scholarships",
    type: "Fully Funded",
    targetAudience: "Undergraduate & Postgraduate",
    icon: <FaUserGraduate />, 
  },
 
  // NEW: Study Tools
  {
    name: "Grammarly",
    url: "https://www.grammarly.com/",
    description: "Improve your writing with this AI-powered grammar checker and style editor.",
    category: "Study Tools",
    type: "Writing Aid",
    targetAudience: "All Students",
    icon: <FaTools />,
  },
  {
    name: "Zotero",
    url: "https://www.zotero.org/",
    description: "A free, easy-to-use tool to help you collect, organize, cite, and share research.",
    category: "Study Tools",
    type: "Research Tool",
    targetAudience: "Researchers & University Students",
    icon: <FaTools />,
  },
  // NEW: Career Guidance
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/",
    description: "Build your professional network, find jobs and internships, and access career advice.",
    category: "Career Guidance",
    type: "Networking",
    targetAudience: "All Students & Professionals",
    icon: <FaBriefcase />,
  },
];

const categories = [
    { name: "All Resources", icon: "🌟" },
    { name: "Online Learning", icon: <FaBookOpen /> },
    { name: "Scholarships", icon: <FaUserGraduate /> },
    { name: "Study Tools", icon: <FaTools /> },
    { name: "Career Guidance", icon: <FaBriefcase /> }
];

export default function EducationResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("All Resources");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const filteredResources = useMemo(() => {
    if (activeCategory === "All Resources") {
      return resources;
    }
    return resources.filter(r => r.category === activeCategory);
  }, [activeCategory]);
  
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const sidebarContent = (
      <div>
        <h3 className="text-xl font-bold text-gray-200 mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <button
              key={category.name}
              onClick={() => {
                setActiveCategory(category.name);
                setIsMobileFiltersOpen(false);
              }}
              className={`w-full flex items-center text-left p-3 rounded-lg transition-all duration-200 text-base font-medium ${
                activeCategory === category.name 
                  ? 'bg-cyan-500 text-white shadow-lg' 
                  : 'text-gray-400 hover:bg-gray-900/80 hover:text-cyan-400'
              }`}
            >
              <span className="mr-3 text-lg">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>
  );

  return (
    <main className="w-full min-h-screen bg-[#111111] text-gray-200 font-sans antialiased">
      <Header /> 

       <section className="relative text-white py-28 md:py-40 px-6 text-center overflow-hidden">
         <div className="absolute inset-0 bg-[#0A0A0A] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
         <div className="relative z-10 max-w-6xl mx-auto">
           <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'tween', ease: 'easeOut', duration: 0.6 }} className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">
             ኦንላይን ትምህርት እና <span className="text-cyan-400">ስኮላርሽፕ</span>
           </motion.h1>
           <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'tween', ease: 'easeOut', duration: 0.6, delay: 0.1 }} className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            የተመረጡ ነፃ ኦንላይን ኮርሶች እና ሙሉ በሙሉ የገንዘብ ድጋፍ ያላቸውን ስኮላርሽፕ እድሎች ተጠቃሚ ይሁኑ።
           </motion.p>
           <motion.div variants={itemVariants} className="mt-8 flex flex-wrap justify-center gap-4">
             <Link href="/" className="w-full sm:w-auto inline-block border-2 border-white text-white font-semibold px-8 py-4 rounded-full transition-colors duration-300 hover:bg-white hover:text-gray-900 text-lg sm:text-xl">
               ዋና ገጽ
             </Link>
             <Link href="/library" className="w-full sm:w-auto inline-block border-2 border-white text-white font-semibold px-8 py-4 rounded-full transition-colors duration-300 hover:bg-white hover:text-gray-900 text-lg sm:text-xl">
               ዲጂታል ቤተ መጻሕፍት
             </Link>
           </motion.div>
         </div>
       </section>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-12">
          
          {/* --- DESKTOP SIDEBAR --- */}
          <aside className="hidden lg:block lg:col-span-1 lg:sticky lg:top-24 h-fit">
            {sidebarContent}
          </aside>

          {/* --- MAIN CONTENT --- */}
          <main className="lg:col-span-3">
            {/* --- MOBILE FILTER CONTROLS --- */}
            <div className="lg:hidden mb-8">
              <button 
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg font-semibold"
              >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4.75a.75.75 0 00-1.5 0v10.5a.75.75 0 001.5 0V4.75zM8 10a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 018 10zM12 4.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5A.75.75 0 0112 4.75zM12 15.25a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z" />
                </svg>
                Filter by Category
              </button>
              <AnimatePresence>
                {isMobileFiltersOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: 'tween', duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-8">{sidebarContent}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* --- Resource Grid --- */}
            <motion.div 
              key={activeCategory} // Re-triggers animation when category changes
              variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
              initial="hidden" 
              animate="visible" 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredResources.map((resource) => (
                <motion.a
                  key={resource.name}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  className="flex flex-col h-full p-6 bg-gray-900/50 border border-gray-800 rounded-lg transition-all duration-300 hover:border-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl text-cyan-400">{resource.icon}</div>
                     <span className="text-xs font-semibold bg-gray-800 text-gray-300 px-3 py-1 rounded-full">{resource.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-100 mb-2">{resource.name}</h3>
                  <p className="text-sm text-gray-400 flex-grow">{resource.description}</p>
                </motion.a>
              ))}
            </motion.div>
          </main>
        </div>
        
        {/* --- Scam Alert Section --- */}
        <section className="mt-24 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="max-w-4xl mx-auto">
             <div className="bg-red-900/20 border-l-4 border-red-500 text-red-300 rounded-r-lg p-6">
               <div className="flex items-start">
                 <FaExclamationTriangle className="text-2xl text-red-500 mr-4 mt-1 flex-shrink-0"/>
                 <div>
                   <h3 className="text-xl font-bold text-red-400 mb-2">Avoid Scholarship Scams!</h3>
                   <p className="mb-1 text-sm">
                     Legitimate scholarships are always free. Never pay an application or processing fee. Be cautious and verify all information.
                   </p>
                 </div>
               </div>
             </div>
           </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}