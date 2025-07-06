// app/education-resources/page.tsx
'use client';

import Header from '@components/Header';
import Footer from '@components/Footer';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa'; // Importing an icon for the scam alert section

// Define online learning platforms (data remains unchanged as requested)
const onlineLearningPlatforms = [
  {
    name: "Khan Academy",
    url: "https://www.khanacademy.org/",
    description: "ነፃ እና ዓለም አቀፍ ደረጃ ትምህርት በቪዲዮ እንዲሁም በተለያዩ ፕላትፎርሞች በመጠቀም ሂሳብ፣ ፊዚክስ፣ ኬሚስትሪ፣ ሳይንስ፣ ታሪክ፣ ኢኮኖሚክስ እና ሌሎችንም ይማሩ።",
    icon: "🎓"
  },
  {
    name: "National Geographic Education",
    url: "https://education.nationalgeographic.org/",
    description: "ከሳይንስ፣ ጂኦግራፊ እና ማህበራዊ ጥናቶች ጋር የተያያዙ ትምህርቶችን፣ እና ሌሎችንም እዚህ ያግኙ።",
    icon: "🌍"
  },
  {
    name: "Coursera (Free Courses)",
    url: "https://www.coursera.org/courses?query=free",
    description: "ከከፍተኛ ዩኒቨርሲቲዎች እና ድርጅቶች በሚሰጥ ሰፊ የነፃ ኮርሶችን በዚህ ሊንክ ስር ያግኙ.",
    icon: "💡"
  },
  {
    name: "edX (Free Courses)",
    url: "https://www.edx.org/free-online-courses",
    description: "በዓለም ዙሪያ ካሉ እንደ ሃርቫርድ አይነት ትልልቅ የአካዳሚክ ተቋማት ነፃ ኮርሶችን ያግኙ ።",
    icon: "🏫"
  },
  {
    name: "Duolingo",
    url: "https://www.duolingo.com/",
    description: "አዲስ ቋንቋ ይማሩ። የቋንቋ ችሎታዎን ለማዳበር እና ለማሻሻል በዚህ ሊንክ ውስጥ በአጭር ጊዜ የፈልጉትን ቋንቋ አቀላጥፈው ይናገሩ ።",
    icon: "🗣️"
  },
  {
    name: "Codecademy (Free Courses)",
    url: "https://www.codecademy.com/catalog/free",
    description: "የኮምፒውተር ኮዲንግ እንዲሁም ተመሳሳይ ኮርሶችን እዚህ ሊንክ በመግባት በነፃ ይማሩ",
    icon: "💻"
  }
];

// Define *only fully funded, legitimate, and free-application* scholarship resources for Ethiopian students
const scholarshipResources = [
  {
    name: "Mastercard Foundation Scholars Program",
    url: "https://mastercardfdn.org/en/what-we-do/our-programs/mastercard-foundation-scholars-program/where-to-apply/",
    icon: "🌟"
  },
  {
    name: "Joint Japan/World Bank Graduate Scholarship Program (JJ/WBGSP)",
    url: "https://www.worldbank.org/en/programs/scholarships",
    icon: "🏦"
  },
  {
    name: "Fulbright Foreign Student Program (Ethiopia)",
    url: "https://et.usembassy.gov/educational-cultural-exchanges/", // Leads to U.S. Embassy in Ethiopia, where Fulbright details for Ethiopians are usually announced
    icon: "🇺🇸"
  },
  {
    name: "Japanese Government (MEXT) Scholarships",
    url: "https://www.studyjapan.go.jp/en/smap_stopj-e/index.html", // Official general MEXT link
    icon: "🇯🇵"
  },
  {
    name: "Turkish Government Scholarships (Türkiye Bursları)",
    url: "https://turkiyeburslari.gov.tr/en/for-applicants/application-criteria",
    icon: "🇹🇷"
  },
  {
    name: "Erasmus Mundus Joint Master Degrees (EMJMDs)",
    url: "https://ec.europa.eu/programmes/erasmus-plus/opportunities/overview_en", // Link to Erasmus+ overview, EMJMDs are under "Study abroad" for students.
    icon: "🇪🇺"
  },
  {
    name: "Czech Government Scholarships",
    url: "https://www.mzv.gov.cz/addisababa/en/development_cooperation_and_humanitarian/scholarships/index.html", // Czech Embassy in Addis Ababa scholarship page
    icon: "🇨🇿"
  },
  {
    name: "International Community School (ICS) Addis Ababa Scholarships",
    url: "https://www.icsaddis.org/learn/scholarship",
    icon: "🏫"
  },
  {
    name: "Ethiopian Education Fund (EEF)",
    url: "https://www.ethiopianeducationfund.org/",
    icon: "📚"
  }
];

export default function EducationResourcesPage() {
  // Framer Motion variants for subtle entry animations
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Subtle stagger for fluid entry
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 }, // Slightly larger Y displacement for more impact
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'tween', // Consistent tween transition
        ease: 'easeOut',
        duration: 0.5, // Slightly longer duration for smoothness
      },
    },
  };

  return (
    // Ensure main can scroll, remove potential horizontal overflow issues
    <main className="w-full min-h-screen bg-gray-50 text-gray-900 font-sans antialiased overflow-x-hidden">
      {/* Explicitly add z-index to Header. This is crucial if Header is fixed/sticky and could overlap content. */}
      <Header className="relative z-20" /> 

      {/* Hero Section - Bold, Clean, Dark Background */}
      {/* Reduced vertical padding for hero on small screens to allow more content above fold */}
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
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-9xl font-bold mb-4 leading-tight tracking-tight">
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

      {/* Online Learning Platforms Section - Clean & Inviting */}
      {/* Adjusted vertical padding for mobile */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white"> 
        <motion.div
          className="max-w-7xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Slightly smaller font for h2 on mobile, adjusted margin-bottom */}
          <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-8 bg-slate-900 text-white leading-tight"> 
            ነፃ የኦንላይን ትምህርት መድረኮች
          </motion.h2>
          {/* Adjusted vertical padding for p, smaller text */}
          <motion.p variants={itemVariants} className="text-base md:text-xl font-light text-gray-700 max-w-3xl mx-auto mb-10 md:mb-16"> 
            ነፃ እና ከፍተኛ ጥራት ያላቸውን ኮርሶች በሚሰጡ አለም ላይ ስመ-ጥር የሆኑ የትምህርት ዌብሳይቶችን በመጠቀም አሁን ላለው አለም ብቁና ተወዳዳሪ ሆነው ይገኙ።
          </motion.p>
          {/* Slightly smaller gap for mobile cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10"> 
            {onlineLearningPlatforms.map((platform, index) => (
              <motion.a
                key={index}
                variants={itemVariants}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-6 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100 
                               hover:shadow-xl transition-all duration-300 ease-in-out relative overflow-hidden cursor-pointer"
              >
                {/* Subtle gradient overlay on hover (red tint) */}
                <span className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-xl"></span>

                {/* Smaller icon size for mobile */}
                <div className="text-4xl md:text-6xl mb-4 relative z-10 text-gray-600 group-hover:text-blue-600 transition-colors duration-300"> 
                  {platform.icon}
                </div>
                {/* Smaller font for h3 on mobile */}
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 relative z-10 group-hover:text-blue-600 transition-colors duration-300"> 
                  {platform.name}
                </h3>
                {/* Smaller font for p on mobile */}
                <p className="text-sm md:text-base mb-5 relative z-10 flex-grow text-center leading-relaxed"> 
                  {platform.description}
                </p>
                {/* Smaller text for button link */}
                <span className="text-blue-600 font-semibold flex items-center relative z-10 group-hover:text-blue-700 transition-colors duration-300 text-sm md:text-base"> 
                  መማር ይጀምሩ
                  <svg className="ml-2 w-4 h-4 md:w-5 md:h-5 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>
      

      {/* Scholarship Opportunities Section - Distinct but unified background */}
      {/* Adjusted vertical padding for mobile */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"> 
        <motion.div
          className="max-w-7xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden" // Ensure initial is hidden for animation to play
          whileInView="visible"
          viewport={{ once: true, amount: 0.05}}
        >
          {/* Slightly smaller font for h2 on mobile, adjusted margin-bottom */}
          <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold border rounded-lg p-2 mb-8 bg-slate-900 text-white leading-tight"> 
            የስኮላርሽፕ እድሎች
          </motion.h2>
          {/* Adjusted vertical padding for p, smaller text */}
          <motion.p variants={itemVariants} className="text-base md:text-xl font-light text-gray-700 max-w-3xl mx-auto mb-10 md:mb-16"> 
            የከፍተኛ ትምህርት ጉዞዎን በአገር ውስጥ እና በዓለም አቀፍ ደረጃ የገንዘብ ድጋፍ በሚደረግላቸው የስኮላርሽፕ እድሎች ይጠቀሙ።
            <span className="text-red-600 font-medium ml-2 block sm:inline-block text-sm md:text-base">ማሳሰቢያ፥ ስኮላርሽፕ በሚሞሉበት ጊዜ በመረጡት ሊንክ page ውስጥ ያሉትን መረጃዎች በደንብ ያንብቡ! </span>
          </motion.p>
          {/* Slightly smaller gap for mobile cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10"> 
            {scholarshipResources.map((resource, index) => (
              <motion.a
                key={index}
                variants={itemVariants}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-6 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100 
                               hover:shadow-xl transition-all duration-300 ease-in-out relative overflow-hidden cursor-pointer"
              >
                {/* Subtle gradient overlay on hover (blue tint for consistency) */}
                <span className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-xl"></span>

                {/* Smaller icon size for mobile */}
                <div className="text-4xl md:text-6xl mb-4 relative z-10 text-gray-600 group-hover:text-blue-600 transition-colors duration-300"> 
                  {resource.icon}
                </div>
                {/* Smaller font for h3 on mobile */}
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 relative z-10 group-hover:text-blue-600 transition-colors duration-300"> 
                  {resource.name}
                </h3>
                {/* Smaller text for button link */}
                <span className="text-blue-600 font-semibold flex items-center relative z-10 group-hover:text-blue-700 transition-colors duration-300 text-sm md:text-base"> 
                  Explore Now
                  <svg className="ml-2 w-4 h-4 md:w-5 md:h-5 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </span>
              </motion.a>
            ))}
          </div>
          {/* --- SCAM ALERT SECTION --- */}
      {/* Design: Fits the clean theme. Uses a soft, cautionary color palette. */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-red-100/70 border-l-4 border-red-500 text-red-800 rounded-r-lg p-6 md:p-8">
                <div className="flex items-start">
                    <FaExclamationTriangle className="text-2xl text-red-600 mr-4 mt-1"/>
                    <div>
                        <h3 className="text-2xl font-bold text-red-900 mb-3">Avoid Scholarship Scams!</h3>
                        <p className="mb-4">
                            Legitimate scholarships are always free. Never pay an application or processing fee. Be cautious and remember these key points:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                            <li><strong className="font-semibold">Verify Official Sources:</strong> Always apply directly through the provider's official website.</li>
                            <li><strong className="font-semibold">Protect Personal Information:</strong> Be wary of sharing sensitive data with unverified sources.</li>
                            <li><strong className="font-semibold">Watch for Red Flags:</strong> Unsolicited offers or promises of guaranteed acceptance are major warning signs.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </section>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}