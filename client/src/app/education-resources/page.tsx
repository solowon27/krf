// app/education-resources/page.tsx
'use client';

import Header from '@components/Header';
import Footer from '@components/Footer';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

// Define online learning platforms (data remains unchanged as requested)
const onlineLearningPlatforms = [
  {
    name: "Khan Academy",
    url: "https://www.khanacademy.org/",
    description: "Free, world-class education. Learn math, science, history, economics, and more with videos, exercises, and personalized dashboards.",
    icon: "🎓"
  },
  {
    name: "National Geographic Education",
    url: "https://education.nationalgeographic.org/",
    description: "Explore free resources, lesson plans, and activities related to science, geography, and social studies.",
    icon: "🌍"
  },
  {
    name: "Coursera (Free Courses)",
    url: "https://www.coursera.org/courses?query=free",
    description: "Access a wide range of free courses from top universities and companies for advanced topics and specialized skills.",
    icon: "💡"
  },
  {
    name: "edX (Free Courses)",
    url: "https://www.edx.org/free-online-courses",
    description: "Discover free courses from leading academic institutions worldwide, covering diverse subjects.",
    icon: "🏫"
  },
  {
    name: "Duolingo",
    url: "https://www.duolingo.com/",
    description: "Learn a new language for free with fun, bite-sized lessons. Perfect for expanding your linguistic skills.",
    icon: "🗣️"
  },
  {
    name: "Codecademy (Free Courses)",
    url: "https://www.codecademy.com/catalog/free",
    description: "Start your coding journey with free interactive lessons in programming languages like Python, JavaScript, and HTML/CSS.",
    icon: "💻"
  }
];

// Define *only fully funded, legitimate, and free-application* scholarship resources for Ethiopian students
const scholarshipResources = [
  {
    name: "Mastercard Foundation Scholars Program",
    url: "https://mastercardfdn.org/our-work/scholars-program/where-to-apply/",
    description: "A highly prestigious program offering **fully funded** scholarships (tuition, accommodation, living stipends, travel, etc.) for bright, young Africans to access quality secondary and higher education at partner institutions globally. **No application fee for the scholarship itself.** Apply directly through partner universities listed on their site.",
    icon: "🌟"
  },
  {
    name: "Joint Japan/World Bank Graduate Scholarship Program (JJ/WBGSP)",
    url: "https://www.worldbank.org/en/programs/scholarships",
    description: "Provides **fully funded** scholarships for graduate studies in development-related fields at participating universities worldwide for mid-career professionals from developing countries (including Ethiopia). Covers tuition, living expenses, health insurance, and travel. **No application fee.**",
    icon: "🏦"
  },
  {
    name: "Fulbright Foreign Student Program (Ethiopia)",
    url: "https://et.usembassy.gov/educational-cultural-exchanges/", // Leads to U.S. Embassy in Ethiopia, where Fulbright details for Ethiopians are usually announced
    description: "A **fully funded** U.S. government program for graduate-level study and academic research in the United States. Covers tuition, living costs, travel, and health insurance. **No application fee.** Highly competitive.",
    icon: "🇺🇸"
  },
  {
    name: "Japanese Government (MEXT) Scholarships",
    url: "https://www.studyjapan.go.jp/en/smap_stopj-e/index.html", // Official general MEXT link
    description: "Offers various **fully funded** scholarships (undergraduate, master's, PhD, research) for international students, including Ethiopians, to study in Japan. Covers tuition, monthly stipend, and travel. Applications are generally free and processed through Japanese embassies in the applicant's home country.",
    icon: "🇯🇵"
  },
  {
    name: "Turkish Government Scholarships (Türkiye Bursları)",
    url: "https://turkiyeburslari.gov.tr/en/for-applicants/application-criteria",
    description: "A comprehensive **fully funded** scholarship program by the Turkish government for undergraduate, master's, and PhD studies in Turkey. Covers tuition, monthly stipend, accommodation, health insurance, Turkish language course, and flight tickets. **Application is entirely free.**",
    icon: "🇹🇷"
  },
  {
    name: "Erasmus Mundus Joint Master Degrees (EMJMDs)",
    url: "https://ec.europa.eu/programmes/erasmus-plus/opportunities/overview_en", // Link to Erasmus+ overview, EMJMDs are under "Study abroad" for students.
    description: "Part of the Erasmus+ program, these offer **fully funded** scholarships for integrated Master's programs delivered by international consortia of universities. Covers tuition fees, travel costs, installation costs, and a monthly living allowance. **No application fees for the scholarship itself.**",
    icon: "🇪🇺"
  },
  {
    name: "Czech Government Scholarships",
    url: "https://www.mzv.gov.cz/addisababa/en/development_cooperation_and_humanitarian/scholarships/index.html", // Czech Embassy in Addis Ababa scholarship page
    description: "Provides **fully funded** development scholarships for students from eligible developing countries (including Ethiopia) for Master's and Doctoral programs in the Czech Republic. Covers tuition, health insurance, and a monthly living allowance. **No application fees.**",
    icon: "🇨🇿"
  },
  {
    name: "International Community School (ICS) Addis Ababa Scholarships",
    url: "https://www.icsaddis.org/learn/scholarship",
    description: "Offers **fully funded**, merit-based, and need-blind scholarships for high-achieving Ethiopian Grade 9 students to attend ICS throughout high school in Addis Ababa. This is for secondary education, but is a significant, legitimate, and **free** opportunity for local students.",
    icon: "🏫"
  },
  {
    name: "Ethiopian Education Fund (EEF)",
    url: "https://www.ethiopianeducationfund.org/",
    description: "A legitimate non-profit providing **fully funded** scholarships (covering school fees, supplies, uniforms, and sometimes living stipends) to disadvantaged, academically talented youth in rural Ethiopia for primary, secondary, and post-secondary education. Focuses on keeping students in school. **No application fees.**",
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
    // Ensured main can scroll, removed potential horizontal overflow issues
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased overflow-y-auto"> 
      {/* Explicitly add z-index to Header if it's a fixed/sticky element */}
      <Header /> 

      {/* Hero Section - Bold, Clean, Dark Background */}
      {/* Reduced overall height for hero on small screens to allow more content above fold */}
      <section className="bg-gray-900 text-white py-28 md:py-36 lg:py-48 px-6 text-center pt-32 sm:pt-40 relative overflow-hidden"> 
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
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight tracking-tight">
            Your Gateway to Knowledge
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl lg:text-2xl font-light opacity-80 mb-10 max-w-3xl mx-auto">
            Empower your future with curated free online courses and comprehensive scholarship opportunities.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap justify-center gap-4"> {/* Use flex-wrap and gap for better mobile button layout */}
            <Link href="/" className="inline-block bg-blue-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-[1.01]"> {/* Slightly smaller padding for mobile */}
              Home
            </Link>
            <Link href="/library" className="inline-block bg-blue-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-[1.01]"> {/* Slightly smaller padding for mobile */}
              Digital Library
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Online Learning Platforms Section - Clean & Inviting */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white"> {/* Reduced padding a bit for mobile */}
        <motion.div
          className="max-w-7xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight"> {/* Slightly smaller font for h2 on mobile */}
            Elevate Your Skills Online
          </motion.h2>
          <motion.p variants={itemVariants} className="text-base md:text-xl font-light text-gray-700 max-w-3xl mx-auto mb-12 md:mb-16"> {/* Reduced padding for p, smaller text */}
            ነፃ እና ከፍተኛ ጥራት ያላቸውን ኮርሶች በሚሰጡ አለም ላይ ስመ-ጥር የሆኑ የትምህርት ዌብሳይቶችን በመጠቀም አሁን ላለው አለም ብቁና ተወዳዳሪ ሆነው ይገኙ።
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"> {/* Slightly smaller gap for mobile */}
            {onlineLearningPlatforms.map((platform, index) => (
              <motion.a
                key={index}
                variants={itemVariants}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-6 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100 
                               hover:shadow-xl transition-all duration-300 ease-in-out relative overflow-hidden cursor-pointer" // Smaller padding for card on mobile
              >
                {/* Subtle gradient overlay on hover (blue tint) */}
                <span className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-xl"></span>

                <div className="text-5xl md:text-6xl mb-4 relative z-10 text-gray-600 group-hover:text-blue-600 transition-colors duration-300"> {/* Smaller icon size for mobile */}
                  {platform.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 relative z-10 group-hover:text-blue-600 transition-colors duration-300"> {/* Smaller font for h3 on mobile */}
                  {platform.name}
                </h3>
                <p className="text-sm md:text-base mb-5 relative z-10 flex-grow text-center leading-relaxed"> {/* Smaller font for p on mobile */}
                  {platform.description}
                </p>
                <span className="text-blue-600 font-semibold flex items-center relative z-10 group-hover:text-blue-700 transition-colors duration-300 text-sm md:text-base"> {/* Smaller text for button link */}
                  Start Learning
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
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"> {/* Reduced padding a bit for mobile */}
        <motion.div
          className="max-w-7xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold border rounded-lg p-2 mb-4 text-gray-900 leading-tight"> {/* Slightly smaller font for h2 on mobile */}
            Fully Funded, Legitimate, & Free-Application Scholarships
          </motion.h2>
          <motion.p variants={itemVariants} className="text-base md:text-xl font-light text-gray-700 max-w-3xl mx-auto mb-12 md:mb-16"> {/* Reduced padding for p, smaller text */}
            የከፍተኛ ትምህርት ጉዞዎን በአገር ውስጥ እና በዓለም አቀፍ ደረጃ የገንዘብ ድጋፍ በሚደረግላቸው የስኮላርሽፕ እድሎች ይጠቀሙ።
            <span className="text-red-600 font-medium ml-2 block sm:inline-block text-sm md:text-base">ማሳሰቢያ፥ ስኮላርሽፕ በሚሞሉበት ጊዜ በመረጡት ሊንክ page ውስጥ ያሉትን መረጃዎች በደንብ ያንብቡ! </span> {/* Smaller text for warning */}
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"> {/* Slightly smaller gap for mobile */}
            {scholarshipResources.map((resource, index) => (
              <motion.a
                key={index}
                variants={itemVariants}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-6 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100 
                               hover:shadow-xl transition-all duration-300 ease-in-out relative overflow-hidden cursor-pointer" // Smaller padding for card on mobile
              >
                {/* Subtle gradient overlay on hover (blue tint for consistency) */}
                <span className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-xl"></span>

                <div className="text-5xl md:text-6xl mb-4 relative z-10 text-gray-600 group-hover:text-blue-600 transition-colors duration-300"> {/* Smaller icon size for mobile */}
                  {resource.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 relative z-10 group-hover:text-blue-600 transition-colors duration-300"> {/* Smaller font for h3 on mobile */}
                  {resource.name}
                </h3>
                <p className="text-sm md:text-base mb-5 relative z-10 flex-grow text-center leading-relaxed"> {/* Smaller font for p on mobile */}
                  {resource.description}
                </p>
                <span className="text-blue-600 font-semibold flex items-center relative z-10 group-hover:text-blue-700 transition-colors duration-300 text-sm md:text-base"> {/* Smaller text for button link */}
                  Explore Now
                  <svg className="ml-2 w-4 h-4 md:w-5 md:h-5 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </span>
              </motion.a>
            ))}
          </div>
          {/* Important: Scholarship Scam Warning - Clear and prominent */}
          <motion.div
            variants={itemVariants}
            className="mt-16 md:mt-20 bg-white border border-gray-100 rounded-xl p-6 md:p-8 shadow-xl text-left max-w-4xl mx-auto transform transition-transform duration-300 hover:scale-[1.005] hover:shadow-2xl" // Smaller padding and margin top for mobile
          >
            <h3 className="text-xl md:text-3xl font-bold text-red-700 mb-4 md:mb-5 flex items-center"> {/* Smaller font and margin for h3 */}
              <span className="text-3xl md:text-4xl mr-2 animate-bounce-slow">⚠️</span> Important: Avoid Scholarship Scams!
            </h3>
            <p className="text-sm md:text-lg text-gray-700 mb-4 md:mb-5 leading-relaxed"> {/* Smaller text and margin for p */}
              While we strive to provide reliable resources, it's crucial to be vigilant when searching for scholarships. Unfortunately, scams exist. Always remember these key points:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 md:space-y-3 mb-5 md:mb-6 pl-4 text-sm md:text-base"> {/* Smaller text and spacing for list */}
              <li><strong className="text-gray-900">Never Pay for a Scholarship:</strong> Legitimate scholarships are *free* to apply for. If you're asked for an "application fee," "processing fee," or any money to "guarantee" a scholarship, it's a scam.</li>
              <li><strong className="text-gray-900">No Guarantees of Acceptance:</strong> No legitimate provider can guarantee you'll win a scholarship. The process is always competitive and merit-based.</li>
              <li><strong className="text-gray-900">Verify Official Sources:</strong> Always apply directly through the scholarship provider's official website (e.g., university, foundation, government agency).</li>
              <li><strong className="text-gray-900">Protect Personal Information:</strong> Be cautious about providing sensitive personal or financial details unless you are absolutely sure of the legitimacy of the provider.</li>
              <li><strong className="text-gray-900">Watch for Red Flags:</strong> Poor grammar, unsolicited offers, promises of "easy money," or high-pressure tactics are common signs of scams.</li>
            </ul>
            <p className="text-sm md:text-lg text-gray-800 font-semibold leading-relaxed italic mt-5 md:mt-6"> {/* Smaller text and margin for p */}
              Your education is invaluable. Be smart, be safe, and good luck with your scholarship search!
            </p>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}