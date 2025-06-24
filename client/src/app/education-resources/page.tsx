// app/education-resources/page.tsx
import Header from '@components/Header';
import Footer from '@components/Footer';
import Link from 'next/link';

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
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 text-gray-800 font-sans antialiased overflow-hidden">
      <Header />

      {/* Hero Section - Elevated and Immersive */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-indigo-900 to-purple-900 text-white py-28 md:py-36 lg:py-48 px-6 text-center shadow-xl">
        {/* Subtle, abstract background pattern for depth */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '100px 100px',
            backgroundRepeat: 'repeat',
            transform: 'rotate(15deg) scale(1.2)', // Slight rotation and scale for dynamic feel
          }}
        ></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-5 leading-tight tracking-tight drop-shadow-lg">
            Your Gateway to Knowledge
          </h1>
          <p className="text-xl md:text-2xl opacity-90 font-light mb-10 max-w-3xl mx-auto text-blue-100">
            Empower your future with curated free online courses and comprehensive scholarship opportunities.
          </p>
          <div className="mt-8 flex justify-center space-x-5">
            <Link href="/" className="group inline-flex items-center bg-white text-indigo-700 px-8 py-4 rounded-full font-semibold text-lg
                                     hover:bg-indigo-50 hover:text-indigo-800 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl
                                     transform hover:-translate-y-1">
                Home
                <svg className="ml-2 w-5 h-5 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
            <Link href="/library" className="group inline-flex items-center bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg
                                            hover:bg-indigo-700 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl
                                            transform hover:-translate-y-1 border border-indigo-500 hover:border-indigo-700">
                Digital Library
                <svg className="ml-2 w-5 h-5 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Online Learning Platforms Section - Clean & Inviting */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-blue-50 relative z-10">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-800 drop-shadow-sm leading-tight">
            Elevate Your Skills Online
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 font-normal max-w-3xl mx-auto">
            ነፃ እና ከፍተኛ ጥራት ያላቸውን ኮርሶች በሚሰጡ አለም ላይ ስመ-ጥር የሆኑ የትምህርት ዌብሳይቶችን በመጠቀም አሁን ላለው አለም ብቁና ተወዳዳሪ ሆነው ይገኙ።
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {onlineLearningPlatforms.map((platform, index) => (
            <a
              key={index}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-8 bg-white rounded-2xl shadow-xl border border-blue-100
                         hover:shadow-2xl hover:border-blue-200 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                         relative overflow-hidden cursor-pointer"
            >
              {/* Subtle gradient overlay on hover */}
              <span className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></span>

              <div className="text-6xl mb-4 relative z-10 text-blue-500 group-hover:text-indigo-700 transition-colors duration-300">
                {platform.icon}
              </div>
              <h3 className="text-2xl font-bold text-indigo-700 mb-3 relative z-10 group-hover:text-indigo-900 transition-colors duration-300">
                {platform.name}
              </h3>
              <p className="text-gray-600 text-sm mb-5 relative z-10 flex-grow text-center leading-relaxed">
                {platform.description}
              </p>
              <span className="text-blue-600 font-semibold flex items-center relative z-10 group-hover:text-indigo-800 transition-colors duration-300">
                Start Learning
                <svg className="ml-2 w-5 h-5 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Scholarship Opportunities Section - Distinct & Warm */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50 relative z-10">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-purple-800 drop-shadow-sm leading-tight">
            Fully Funded, Legitimate, & Free-Application Scholarships
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 font-normal max-w-3xl mx-auto">
            የከፍተኛ ትምህርት ጉዞዎን በአገር ውስጥ እና በዓለም አቀፍ ደረጃ የገንዘብ ድጋፍ በሚደረግላቸው የስኮላርሽፕ እድሎች ይጠቀሙ።
            <span className="text-red-700 p-2">ማሳሰቢያ፥ ስኮላርሽፕ በሚሞሉበት ጊዜ በመረጡት ሊንክ page ውስጥ ያሉትን መረጃዎች በደንብ ያንብቡ! </span>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {scholarshipResources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-8 bg-white rounded-2xl shadow-xl border border-purple-100
                         hover:shadow-2xl hover:border-purple-200 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                         relative overflow-hidden cursor-pointer"
            >
              {/* Subtle gradient overlay on hover */}
              <span className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></span>

              <div className="text-6xl mb-4 relative z-10 text-purple-500 group-hover:text-pink-700 transition-colors duration-300">
                {resource.icon}
              </div>
              <h3 className="text-2xl font-bold text-purple-700 mb-3 relative z-10 group-hover:text-purple-900 transition-colors duration-300">
                {resource.name}
              </h3>
              <p className="text-gray-600 text-sm mb-5 relative z-10 flex-grow text-center leading-relaxed">
                {resource.description}
              </p>
              <span className="text-purple-600 font-semibold flex items-center relative z-10 group-hover:text-pink-800 transition-colors duration-300">
                Explore Now
                <svg className="ml-2 w-5 h-5 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </span>
            </a>
          ))}
        </div>
        {/* Important: Scholarship Scam Warning - Clear and prominent */}
        <div className="mt-20 bg-red-50 border border-red-200 rounded-xl p-8 shadow-lg text-left max-w-4xl mx-auto transform transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl">
          <h3 className="text-2xl md:text-3xl font-extrabold text-red-700 mb-5 flex items-center">
            <span className="text-5xl mr-4 animate-bounce-slow">⚠️</span> Important: Avoid Scholarship Scams!
          </h3>
          <p className="text-gray-700 mb-5 leading-relaxed text-lg">
            While we strive to provide reliable resources, it's crucial to be vigilant when searching for scholarships. Unfortunately, scams exist. Always remember these key points:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-3 mb-6 pl-4 text-base">
            <li><strong className="text-red-600">Never Pay for a Scholarship:</strong> Legitimate scholarships are *free* to apply for. If you're asked for an "application fee," "processing fee," or any money to "guarantee" a scholarship, it's a scam.</li>
            <li><strong className="text-red-600">No Guarantees of Acceptance:</strong> No legitimate provider can guarantee you'll win a scholarship. The process is always competitive and merit-based. "Guaranteed" refers to the *legitimacy and comprehensive funding* if selected, not guaranteed acceptance.</li>
            <li><strong className="text-red-600">Verify Official Sources:</strong> Always apply directly through the scholarship provider's official website (e.g., university, foundation, government agency).</li>
            <li><strong className="text-red-600">Protect Personal Information:</strong> Be cautious about providing sensitive personal or financial details unless you are absolutely sure of the legitimacy of the provider.</li>
            <li><strong className="text-red-600">Watch for Red Flags:</strong> Poor grammar, unsolicited offers, promises of "easy money," or high-pressure tactics are common signs of scams.</li>
          </ul>
          <p className="text-gray-800 font-semibold leading-relaxed text-lg italic mt-6">
            Your education is invaluable. Be smart, be safe, and good luck with your scholarship search!
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}