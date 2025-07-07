'use client';

import Header from '@components/Header';
import Footer from '@components/Footer';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState, useMemo } from 'react';
import { FaExclamationTriangle, FaUniversity, FaBriefcase, FaBookOpen, FaUserGraduate, FaTools } from 'react-icons/fa';

// NEW: Enhanced data structure with categories
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

  const filteredResources = useMemo(() => {
    if (activeCategory === "All Resources") {
      return resources;
    }
    return resources.filter(r => r.category === activeCategory);
  }, [activeCategory]);
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  const featuredResource = resources.find(r => r.name === "Khan Academy");

  return (
    <main className="w-full min-h-screen bg-gray-100 text-gray-900 font-sans antialiased">
      <Header className="relative z-20" /> 

       <section className="bg-gray-900 text-white py-24 md:py-36 lg:py-48 px-6 text-center pt-32 sm:pt-40 relative overflow-visible">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 60L60 0H30L0 30M60 60V30L30 60\'/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '120px 120px',
            backgroundRepeat: 'repeat',
          }}
        ></div>
        <motion.div
          className="max-w-6xl mx-auto relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight">
            ኦንላይን ትምህርት እና ስኮላርሽፕ
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl lg:text-2xl font-light opacity-80 mb-10 max-w-3xl mx-auto">
            የተመረጡ ነፃ ኦንላይን ኮርሶች እና ሙሉ በሙሉ የገንዘብ ድጋፍ ያላቸውን ስኮላርሽፕ እድሎች ተጠቃሚ ይሁኑ።
          </motion.p>
          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap justify-center gap-4"> {/* Use flex-wrap and gap for better mobile button layout */}
            <Link href="/" className="w-full sm:w-auto inline-block border-2 border-white text-white font-semibold px-8 py-4 rounded-full transition-colors duration-300 hover:bg-white hover:text-gray-900 text-lg sm:text-xl">
              ዋና ገጽ
            </Link>
            <Link href="/library" className="w-full sm:w-auto inline-block border-2 border-white text-white font-semibold px-8 py-4 rounded-full transition-colors duration-300 hover:bg-white hover:text-gray-900 text-lg sm:text-xl">
              ዲጂታል ቤተ መጻሕፍት
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
          
          {/* --- Sticky Sidebar --- */}
          <aside className="lg:col-span-1 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Categories</h2>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`w-full flex items-center text-left p-3 rounded-lg transition-all duration-200 text-base font-medium ${
                    activeCategory === category.name 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-gray-200/70 hover:text-gray-900'
                  }`}
                >
                  <span className="mr-3 text-lg">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </aside>

          {/* --- Main Content --- */}
          <main className="lg:col-span-3">
            
            {/* --- Featured Resource --- */}
            {featuredResource && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-r from-slate-800 to-gray-900 rounded-2xl shadow-2xl p-8 mb-12 border border-blue-500/20"
                >
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        <div className="text-blue-400 text-5xl flex-shrink-0">{featuredResource.icon}</div>
                        <div className="text-white">
                            <span className="text-sm font-bold uppercase text-blue-400 tracking-wider">Featured Resource</span>
                            <h3 className="text-3xl font-bold mt-1 mb-3">{featuredResource.name}</h3>
                            <p className="text-gray-300/80 mb-6 max-w-2xl">{featuredResource.description}</p>
                            <a href={featuredResource.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-500 transition-colors duration-300 transform hover:scale-105">
                                Visit Khan Academy
                                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </a>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* --- Resource Grid --- */}
            <motion.div 
              key={activeCategory} // Re-triggers animation when category changes
              variants={containerVariants} 
              initial="hidden" 
              animate="visible" 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <AnimatePresence>
                {filteredResources.map((resource) => (
                  <motion.div key={resource.name} variants={itemVariants} layout>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col h-full bg-white rounded-xl shadow-lg border border-gray-200/80 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 ease-in-out p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-3xl text-blue-600">{resource.icon}</div>
                        <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{resource.type}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 flex-grow">{resource.name}</h3>
                      <p className="text-sm text-gray-600 mb-5">{resource.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                        <span>{resource.targetAudience}</span>
                        <span className="flex items-center text-blue-600 group-hover:text-blue-500">
                          Explore
                          <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </span>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </main>
        </div>
        
        {/* --- Scam Alert Section --- */}
        <section className="mt-24">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-100/60 border-l-4 border-red-500 text-red-800 rounded-r-lg p-6 md:p-8 shadow-sm">
              <div className="flex items-start">
                <FaExclamationTriangle className="text-2xl text-red-600 mr-4 mt-1 flex-shrink-0"/>
                <div>
                  <h3 className="text-xl font-bold text-red-900 mb-2">Avoid Scholarship Scams!</h3>
                  <p className="mb-3 text-sm">
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