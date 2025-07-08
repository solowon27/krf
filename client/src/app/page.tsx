'use client';

import Link from 'next/link';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { motion, Variants, useSpring, useInView } from 'framer-motion';
import { FaGraduationCap, FaUsers, FaHandsHelping, FaLightbulb, FaNewspaper, FaCommentAlt, FaArrowRight, FaSpinner } from 'react-icons/fa';
import { useQuery, gql } from '@apollo/client';
import Image from 'next/image';
import { useEffect, useRef, useMemo } from 'react';

// --- GraphQL Query ---
const GET_DONATIONS = gql`
  query GetDonations {
    getDonations {
      id
      donorName
      item
      value
      message
      date
      submittedBy {
        firstName
        role
      }
    }
  }
`;

// --- Data (centralized within the file) ---
const impactMetrics = {
  studentsImpacted: 1200,
  librariesEstablished: 1,
  donors: 134,
  communityMembers: 500,
};

const impactAreas = [
    { icon: <FaGraduationCap/>, title: "Learning Resources", description: "Providing every student with textbooks, digital tools, and a fully-stocked library."},
    { icon: <FaLightbulb/>, title: "Modern Facilities", description: "Creating a safe and inspiring learning environment by renovating classrooms and labs."},
    { icon: <FaHandsHelping/>, title: "Teacher Empowerment", description: "Supporting educators with training and resources to deliver the highest quality education."}
];


const newsUpdates = [
  { id: 1, title: "በአቶ ሰለሞን ረጅነት የመጀመሪያ ዙር የመጻሕፍ ርክክብ ሲደረግ", date: "2025-06-15", image: "/impact-image3.jpg", href: "/news/phase-1-complete" },
  { id: 2, title: "ለመምህራን የተደረገ የምስጋናና የሽልማት ፕሮገራም ሲካሄድ", date: "2025-05-20", image: "/impact-image3.jpg", href: "/news/new-partnership" },
  { id: 3, title: "ተማሪዎች በአዲሱ የዲጂታል ላይብረሪ ተጠቃሚ ሲሆኑ", date: "2025-04-30", image: "/impact-image3.jpg", href: "/news/digital-literacy" },
];

const testimonials = [
  { id: 1, name: "Abebe T.", role: "Grade 11 Student", quote: "The new library has opened up a world of knowledge for me. I can finally study in a quiet and resourceful environment. Thank you!", image: "/abel.jpeg" },
  { id: 2, name: "W/ro Almaz K.", role: "Science Teacher", quote: "With the new lab equipment, our science classes have become interactive and exciting. The students are more engaged than ever.", image: "/come.jpeg" },
];

// --- Main Component ---
export default function Home() {
  const { data, loading, error } = useQuery(GET_DONATIONS);
  
  const allDonations = useMemo(() => data?.getDonations || [], [data]);
  const latestDonations = useMemo(() => allDonations.slice(0, 6), [allDonations]);
  const fundraisingGoal = { goal: 100000 }; // The goal can still be static or come from an API
  
  // Calculate the total raised from the fetched data
 const totalRaised = useMemo(() => {
    if (!allDonations.length) return 0;
    return allDonations.reduce((acc: number, donation: { value?: number }) => acc + (donation.value || 0), 0);
}, [allDonations]);

  // Calculate the progress percentage based on the new total
  const progress = useMemo(() => {
      if (fundraisingGoal.goal === 0) return 0;
      return Math.round((totalRaised / fundraisingGoal.goal) * 100);
  }, [totalRaised, fundraisingGoal.goal]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  function AnimatedNumber({ value }: { value: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const spring = useSpring(0, { damping: 25, stiffness: 100 });

    useEffect(() => {
        if (isInView) {
            spring.set(value);
        }
    }, [spring, isInView, value]);

    useEffect(() => {
        const unsubscribe = spring.on("change", (latest: number) => {
  if (ref.current) {
   ref.current.textContent = new Intl.NumberFormat('en-US').format(Math.round(latest));
          }
          });

        return unsubscribe;
    }, [spring]);

    return <span ref={ref} />;
  }

  return (
    <main className="w-full min-h-screen bg-white text-gray-900 font-sans antialiased">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full flex items-center justify-center text-center overflow-hidden py-28 md:py-40">
        <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
            
            <div className="absolute inset-0 bg-gray-900 text-white"></div>
            <div
                      className="absolute inset-0 opacity-[0.03]"
                      style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 60L60 0H30L0 30M60 60V30L30 60\'/%3E%3C/g%3E%3C/svg%3E")',
                        backgroundSize: '120px 120px',
                        backgroundRepeat: 'repeat',
                      }}
                    ></div>
        </motion.div>
        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-4 text-white"
          initial="hidden" animate="visible" variants={containerVariants}
        >
          <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight drop-shadow-2xl">
            የአስተሳሰብ ለውጥ በማምጣት፣ <br />ትልቅ ልዩነት እንፈጥራለን።
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-2xl mb-10 text-slate-200/90 max-w-3xl mx-auto font-light drop-shadow-lg">
            ትውልድን በእውቀት እናነፃለን። በኮን ሁለተኛ ደረጃ ትምህርት ቤት ዘላቂ ለውጥ ለማምጣት ማህበረሰባችንን እና በአለም ዙሪያ ያሉ ደጋፊዎቻችንን እናስተባብራለን።
          </motion.p>
           <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6"
          >
            {/* Apple-style buttons: subtle, clean, often a solid fill and a ghost button */}
            <Link
              href="/donate"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-gray-900 font-semibold px-8 py-4 rounded-full transition-colors duration-300 hover:bg-gray-200 text-lg sm:text-xl"
            >
              ድጋፍ ያድርጉ
            </Link>
            <Link
              href="/library"
              className="w-full sm:w-auto inline-block border-2 border-white text-white font-semibold px-8 py-4 rounded-full transition-colors duration-300 hover:bg-white hover:text-gray-900 text-lg sm:text-xl"
            >
             ዲጂታል ቤተ መጻሕፍት
            </Link>
            <Link
              href="/education-resources"
              className="w-full sm:w-auto inline-block border-2 border-white text-white font-semibold px-8 py-4 rounded-full transition-colors duration-300 hover:bg-white hover:text-gray-900 text-lg sm:text-xl"
            >
              ነፃ የትምህርት እድሎች
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* --- WHO WE ARE SECTION --- */}
      <section className="py-20 md:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: "easeOut" }}>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">ከአንድ ድርጅት በላይ።<br/>የጋራ ራዕይ።</h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    የኮን ህዳሴ ፋውንዴሽን በኮን ተወላጆች የተመሰረተ ነው። እኛ ከድርጅት በላይ ነን፤ ትምህርት ብሩህ ተስፋን ለመክፈት ቁልፍ እንደሆነ እናምናለን። ተልዕኳችን ግልፅ ነው፥ የመማሪያ ግብዓቶችን በማሻሻል、 ዘመናዊ መገልገያዎችን በመገንባት、 እንዲሁም ተማሪዎችን እና መምህራንን በማብቃት የትውልዱን የወደፊት እጣ ፈንታ መለወጥ ነው።
                  </p>
                  <Link href="/about" className="inline-flex items-center text-blue-600 font-bold text-lg group">
                      Discover Our Story <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1"/>
                  </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: "easeOut" }} className="relative w-full h-80 md:h-96 rounded-2xl shadow-2xl overflow-hidden">
                   <Image src="/logo.png" alt="A group of students at Kone High School" fill className="object-cover"/>
              </motion.div>
          </div>
      </section>

      {/* --- OUR IMPACT SECTION --- */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants}>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">የእኛ እድገት፣ የእርስዎ አስተዋጽኦ</motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">በእርስዎ ድጋፍ፣ ተጨባጭ እና ዘላቂ ለውጥ እያመጣን ነው።</motion.p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                <motion.div variants={itemVariants} className="text-center">
                    <div className="text-5xl md:text-6xl font-bold text-blue-600 tracking-tighter"><AnimatedNumber value={impactMetrics.studentsImpacted} />+</div>
                    <p className="text-gray-700 text-base md:text-lg font-medium mt-2">ተማሪዎች ተጠቃሚ ሆነዋል</p>
                </motion.div>
                <motion.div variants={itemVariants} className="text-center">
                    <div className="text-5xl md:text-6xl font-bold text-blue-600 tracking-tighter"><AnimatedNumber value={impactMetrics.librariesEstablished} /></div>
                    <p className="text-gray-700 text-base md:text-lg font-medium mt-2">ቤተ-መጽሐፍት የርዳታው ተጠቃሚ ሆንዋል</p>
                </motion.div>
                <motion.div variants={itemVariants} className="text-center">
                     <div className="text-5xl md:text-6xl font-bold text-blue-600 tracking-tighter"><AnimatedNumber value={impactMetrics.donors} />+</div>
                    <p className="text-gray-700 text-base md:text-lg font-medium mt-2">መጽሐፍት ድጋፍ ተደርጓል</p>
                </motion.div>
                <motion.div variants={itemVariants} className="text-center">
                    <div className="text-5xl md:text-6xl font-bold text-blue-600 tracking-tighter"><AnimatedNumber value={impactMetrics.communityMembers} />+</div>
                    <p className="text-gray-700 text-base md:text-lg font-medium mt-2">የማህበረሰብ አባላት ተሳትፈዋል</p>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {impactAreas.map(area => (
                <motion.div key={area.title} variants={itemVariants} className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm">
                  <div className="text-3xl text-blue-600 mb-4">{area.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{area.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{area.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

     {/* --- DONATION SECTION WITH DYNAMIC PROGRESS BAR --- */}
      <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4 text-center text-gray-900">
            Join the Movement
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-center text-gray-600 font-light mb-12 max-w-3xl mx-auto">
            Your contribution brings us closer to our goal. See the incredible impact of our community.
          </motion.p>
          
          {/* --- DYNAMIC PROGRESS BAR --- */}
          {/* It now calculates the total from your API data */}
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto mb-16">
            <div className="flex justify-between items-end mb-2 text-gray-800 font-bold">
              {/* UPDATED: Displays the calculated total */}
              <span>${totalRaised.toLocaleString()} <span className="text-gray-600 font-medium">Raised</span></span>
              
              <span className="text-lg">${fundraisingGoal.goal.toLocaleString()} <span className="text-base text-gray-600 font-medium">Goal</span></span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
              <motion.div 
                className="bg-blue-600 h-4 rounded-full" 
                initial={{ width: 0 }}
                // UPDATED: Uses the new dynamic progress percentage
                whileInView={{ width: `${progress}%` }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              />
            </div>
          </motion.div>

          <motion.h3 variants={itemVariants} className="text-3xl font-bold mb-8 text-center text-gray-800">ልባዊ ምስጋና</motion.h3>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <FaSpinner className="animate-spin text-gray-500 text-4xl" />
            </div>
          ) : error ? (
            <p className="text-center text-red-600">⚠️ Failed to load contributions.</p>
          ) : latestDonations.length === 0 ? (
            <p className="text-center text-gray-600">Be the first to contribute!</p>
          ) : (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {latestDonations.map((donation: any) => (
                <motion.div
                  key={donation.id}
                  variants={itemVariants}
                  className="bg-slate-50/70 p-8 rounded-2xl border border-gray-200/80 transition-shadow duration-300 hover:shadow-xl hover:border-blue-300 flex flex-col"
                >
                  <div className="flex items-center mb-4">
                    <span className="text-3xl text-blue-500 mr-4">✨</span>
                    <p className="text-2xl font-bold text-gray-900">{donation.donorName || 'Anonymous'}</p>
                  </div>

                  <p className="text-lg font-semibold text-gray-800 mb-2">
                    Donated: <span className="text-gray-600 font-medium">{donation.item}</span>
                  </p>

                  {/* Displays the value if it exists */}
                  {donation.value && (
                    <p className="text-sm font-semibold text-gray-800 mb-4">
                      Monetary Value: <span className="text-green-600 font-bold">${donation.value.toLocaleString()}</span>
                    </p>
                  )}
                  
                  {donation.message && (
                    <div className="bg-white rounded-lg p-3 my-2 border border-gray-200 flex-grow">
                      <p className="text-base text-gray-700 italic">"{donation.message}"</p>
                    </div>
                  )}

                  <div className="text-right mt-6 flex justify-between items-center text-sm">
                    {donation.submittedBy && (
                      <p className="text-gray-500">Submitted By: <span className="font-semibold text-gray-700">{donation.submittedBy.firstName}</span></p>
                    )}
                    <p className="font-semibold text-gray-700 ml-auto">{new Date(donation.date).toLocaleDateString()}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {allDonations.length > 6 && (
            <motion.div variants={itemVariants} className="text-center mt-20">
              <Link href="/AllDonations" className="inline-flex items-center bg-gray-900 text-white font-bold px-8 py-4 rounded-full transition-colors duration-300 hover:bg-gray-700 text-lg group">
                Explore All Contributions
                <FaArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* --- NEWS & UPDATES SECTION --- */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants}>
                 <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">ወቅታዊ መረጃ</motion.h2>
                 <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 text-center border rounded-lg ">የቅርብ ጊዜ የፕሮጀክቻችን ዜናዎች ፣ክስተቶች እና ወሳኝ ክንውኖች መረጃ ያግኙ።</motion.p>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {newsUpdates.map(update => (
                         <motion.div key={update.id} variants={itemVariants} className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200/80 transform hover:-translate-y-2 transition-transform duration-300">
                             <div className="relative w-full h-56">
                                 <Image src={update.image} alt={update.title} fill className="object-cover"/>
                             </div>
                             <div className="p-6">
                                 <p className="text-sm text-gray-500 font-medium mb-2">{new Date(update.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                 <h3 className="text-xl font-bold text-gray-800 mb-4 h-14">{update.title}</h3>
                                 <Link href={update.href} className="inline-flex items-center text-blue-600 font-bold group-hover:text-blue-500">
                                     Read More <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1"/>
                                 </Link>
                             </div>
                         </motion.div>
                     ))}
                 </div>
            </motion.div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
       <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants}>
                 <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">የማህበረሰባችን አስተያየት ባጭሩ</motion.h2>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     {testimonials.map(t => (
                         <motion.div key={t.id} variants={itemVariants} className="bg-slate-50 p-8 rounded-2xl border border-gray-200/60 shadow-lg">
                             <FaCommentAlt className="text-3xl text-blue-300 mb-4"/>
                             <p className="text-lg text-gray-800 italic leading-relaxed mb-6">"{t.quote}"</p>
                             <div className="flex items-center">
                                 <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-white shadow-md">
                                     <Image src={t.image} alt={t.name} fill className="object-cover"/>
                                 </div>
                                 <div>
                                     <p className="font-bold text-gray-900">{t.name}</p>
                                     <p className="text-gray-600">{t.role}</p>
                                 </div>
                             </div>
                         </motion.div>
                     ))}
                 </div>
            </motion.div>
        </div>
       </section>
      
      <Footer />
    </main>
  );
}