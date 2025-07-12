'use client';

import Link from 'next/link';
// Make sure useState is imported from React
import { motion, useScroll, useTransform, useSpring, useInView, Variants, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaDonate, FaUserFriends, FaShareAlt, FaGraduationCap, FaHandsHelping, FaLightbulb, FaRegHeart, FaSpinner, FaBookOpen, FaBullhorn } from 'react-icons/fa';
import { useQuery, gql } from '@apollo/client';
import Image from 'next/image';
// Make sure useState is imported
import { useEffect, useRef, useMemo, useState } from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';

// --- GraphQL Query & Existing Data ---
const GET_DONATIONS = gql`
  query GetDonations {
    getDonations {
      id
      donorName
      item
      value
    }
  }
`;

const impactAreas = [
    { icon: <FaGraduationCap className="w-8 h-8"/>, title: "የትምህርት ግብአቶች", description: "በቂ የትምህርት ግብአቶችን በማቅረብ የተማሪዎችን የመማር ሂደት እናግዛለን።" },
    { icon: <FaBookOpen className="w-8 h-8"/>, title: "ዘመናዊ ዲጂታል ቤተ-መጻሕፍት", description: "ተማሪዎችን ከዘመኑ የትምህርት ስርአት ጋር ጎን ለጎን እንዲሄዱ በዲጂታል የታገዘ የላይብረሪና ተጨማሪ ነፃ የኦንላይን ኮርሶችን እንዲያገኙ እንሰራለን።" },
    { icon: <FaHandsHelping className="w-8 h-8"/>, title: "ለተማሪዎች ድጋፍ", description: "የአቅም ውስንነት ያለባቸውን ተማሪዎችን በመደገፍ የትምህርት ህልማቸው እውን እንዲሆን እናደርጋለን።" },
];

const impactMetrics = {
    studentsImpacted: 1200,
    librariesEstablished: 1,
    donors: 134,
    communityMembers: 500,
};

// --- NEW PLACEHOLDER DATA FOR REDESIGN ---
const educationResource = [
    { 
        icon: <FaBullhorn className="w-full h-full" />, 
        title: "ነፃ የኦንላይን ትምህርቶች", 
        description: "በአሁኑ ጊዜ ተመራጭ በሆኑና እንደ ሃርቫርድ ባሉ ታላላቅ በሚባሉ ዩኒቨርስቲዎች የሚሰጡ ማንኛውንም ነፃ የኦንላይን የትምህርት እድል እንድታገኙ ፋውንዴሽናችን አመቻችቷል። ",
        link: "/education-resources"
    },
    { 
        icon: <FaUserFriends className="w-full h-full" />, 
        title: "ዲጂታል ላይብራሪ",
        description: "ከ ሃይስኩል እስከ ዩኒቨርስቲ ደረጃ ድረስ የሚያገለግሉ መጻሕፍት አሰባስበን በዲጂታል ላይብረሪ ገጽ ውስጥ አካተንላችኋል። ",
        link: "/library"
    },
    { 
        icon: <FaBookOpen className="w-full h-full" />, 
        title: "በቅርብ የሚጀምር",
        description: "በሃገር ውስጥ እንዲሁም በውጭ ለምትገኙ የዋድላ ተወላጆች ትምህርት ቤታችሁን በተለያየ መንገድ የምትረዱበትን የዶኔሽን ገጽ እየሰራን ሲሆን ሙሉ በሙኡ ህጋዊነት ስናገኝበት የባንክ ቁጥር ወይንም የ ፖስታ አድራሻ በመጠቀም የማቴርያል እንዲሁም የገንዘብ እርዳታ ማድረግ እንድትችሉ እየሰራን እንገኛለን። ",
        link: "/donate"
    },
];

const testimonials = [
    { name: "ፍሬዘር እንትና", role: "የ11ኛ ክፍል ተማሪ", quote: "The new digital library has completely changed how I study. I can now access information I only dreamed of before.", image: "/logo.png" },
    { name: "አቤል ቢሰጠኝ", role: "የ አካውንቲንግ እና ፋይናንስ መምህር", quote: "Thanks to the foundation's support, our classrooms have the resources we need to provide a quality education.", image: "/logo.png" },
    { name: "ኮማንደር ወንደሰን", role: "የወረዳው ከፍተኛ IT ባለሞያ", quote: "Partnering with the Kone Renaissance Foundation has amplified our collective ability to create lasting change.", image: "/logo.png" },
];

const newsItems = [
    { 
        title: "በሰሜን ወሎ ዞን በዋድላ ወረዳ ለኮን 2ኛና መሰናዶ ትምህርት ቤት ከ65ሺህ ብር በላይ የሚያወጡ መጽሀፍት ድጋፍ ተደረገ።", 
        date: "June 15, 2025", 
        excerpt: "ድጋፉ የተደረገው የቀድሞ የትምህርት ቤቱ ተማሪና መምህር በነበሩት በአቶ ሰለሞን ይመር ነዋሪነታቸው በአሜሪካን ሀገር ሲሆን በዛሬው ዕለት ለኮን 2ኛና መሰናዶ ትምህርት ቤት 1መቶ 34 መጽሀፍት ከ65ሺህ ብር በላይ ወጭ በማድረግ ገዝተው በቀድሞ ጓደኛቸውና በትምህርት ቤቱ መምህር አቤል ቢሰጠኝ በኩል በሚመለከታቸው አካላት አማካኝነት ርክክብ ተደርጓል።", 
        image: "/impact-image3.JPG",
        link: "https://m.facebook.com/story.php?story_fbid=pfbid0fkA2LV1f2J1NR3qEL4PZvR7NwjjY3ZPRZmfAteQ968JsC825N6ZiKWCDGqxhnUYTl&id=100064442271486&mibextid=wwXIfr"
    },
    // { 
    //     title: "Volunteer Spotlight: The Tutors Making a Difference", 
    //     date: "May 28, 2025", 
    //     excerpt: "Meet the incredible volunteers who are dedicating their time to help our students succeed...", 
    //     image: "/impact-image2.jpg",
    //     link: "http://googleusercontent.com/facebook.com/YourPage/posts/456" // <-- Add the Facebook post link here
    // },
    // { 
    //     title: "Foundation Announces New STEM Initiative", 
    //     date: "April 12, 2025", 
    //     excerpt: "We are thrilled to launch a new program focused on Science, Technology, Engineering, and Math...", 
    //     image: "/impact-image5.jpg",
    //     link: "http://googleusercontent.com/facebook.com/YourPage/posts/789" // <-- Add the Facebook post link here
    // },     
];


// --- Animation Variants ---
const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

// --- Main Component ---
export default function Home() {
    const { data, loading, error } = useQuery(GET_DONATIONS);
    const allDonations = useMemo(() => data?.getDonations || [], [data]);
    const fundraisingGoal = { goal: 1000000 };
    const totalRaised = useMemo(() => allDonations.reduce((acc: number, donation: { value?: number }) => acc + (donation.value || 0), 0), [allDonations]);
    const progress = useMemo(() => Math.min(Math.round((totalRaised / fundraisingGoal.goal) * 100), 100), [totalRaised, fundraisingGoal.goal]);

    // **FIX:** Moved the useState hook to the top level of the component
    const [activeEventIndex, setActiveEventIndex] = useState(0);

    const AnimatedNumber = ({ value }: { value: number }) => {
        const ref = useRef<HTMLSpanElement>(null);
        const isInView = useInView(ref, { once: true, amount: 0.5 });
        const spring = useSpring(0, { damping: 25, stiffness: 100 });
        useEffect(() => { if (isInView) spring.set(value); }, [spring, isInView, value]);
        useEffect(() => {
            const unsubscribe = spring.on("change", (latest: number) => {
                if (ref.current) ref.current.textContent = new Intl.NumberFormat('en-US').format(Math.round(latest));
            });
            return unsubscribe;
        }, [spring]);
        return <span ref={ref} />;
    };

    return (
        <div className="bg-gray-200 text-gray-800 font-sans antialiased">
            <Header />

            <main>
                {/* --- 1. DYNAMIC HERO SECTION --- */}
                <section className="relative h-screen flex items-center justify-center text-gray-900 text-center overflow-hidden">
                    
                    <motion.div
                        className="relative z-10 px-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-9xl font-extrabold leading-tight">
                            ለወደፊቱ ትውልድ <br />
                            <span className="text-indigo-400"> ብሩህ ተስፋን እንገንባ</span>
                        </h1>
                        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-200">
                            የኮን ሃይስኩል ህዳሴ ፋውንዴሽን የቀድሞ ተማሪዎችንና ማህበረሰቡን በማስተባበር ለተማሪዎች የተሻለ የትምህርት середовище ለመፍጠር ይሰራል።
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/donate" className="inline-flex items-center justify-center bg-indigo-600 text-white font-bold px-8 py-4 rounded-full text-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
                                <FaDonate className="mr-3" /> አሁኑኑ ይለግሱ
                            </Link>
                            <Link href="/about" className="inline-flex items-center justify-center bg-transparent border-2 border-white text-gray-900 font-bold px-8 py-4 rounded-full text-lg shadow-lg hover:bg-white hover:text-gray-900 transition-all duration-300">
                                ስለ እኛ ይወቁ <FaArrowRight className="ml-3" />
                            </Link>
                        </div>
                    </motion.div>
                </section>

                {/* --- 3. VISUAL PROOF SECTION --- */}
                <section className="py-20 sm:py-28 bg-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                         <motion.div
                            className="grid grid-cols-2 gap-4"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                         >
                            <div className="relative h-48 md:h-64 rounded-xl overflow-hidden shadow-lg col-span-2">
                                <Image src="/aigen1.png" alt="Group of students" fill className="object-cover" />
                            </div>
                            <div className="relative h-48 md:h-64 rounded-xl overflow-hidden shadow-lg">
                                <Image src="/aigen2.png" alt="Inside the new library" fill className="object-cover" />
                            </div>
                            <div className="relative h-48 md:h-64 rounded-xl overflow-hidden shadow-lg">
                                <Image src="/aigen3.png" alt="Classroom learning" fill className="object-cover" />
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">የትምህርት ቤታችን አጭር ታሪክ</h2>
                            <p className="mt-6 text-justify text-lg lg:text-2xl text-gray-600 leading-relaxed">
                                የኮን አጠቃላይ ሁለተኛ ደረጃ ትምህርት ቤት በአማራ ክልል ሰሜን ወሎ ወረዳ የሚገኝ ትምህርት ቤት ነው። ትምህርት ቤቱ በ 1945 አ.ም ተቋቋሞ እስከ አሁን ድረስ ተማሪዎችን እየተቀበለ ለትልቅ ደረጃ ሲያደረስ የቆየ እድሜ ጠገብ አንጋፋ ትምህርት ቤት ነው። 
                                ላለፉት 73 አመታት በቁጥር ይህ ነው ተብሎ ሊጠቀስ የማይችል በትምህርታቸው ሃገራቸውንና ወገኖቻቸውን የረዱና እየረዱ ያሉ ታላላቅ ሰዎችን ማፍራት የቻለ በክልሉ ከሚጠቀሱ ዝነኛ ትምህርት ቤቶች አንዱ ነው። ይህን ትምህርት ቤት ከሌሎች መሰል ትምህርት ቤቶች ለየት የሚያደርገው ከተመሰረተበት ጊዜ አንስቶ ከተለያዩ ወረዳዎች እንዲሁም በወረዳው ውስጥ ካሉ ከ25 የሚበልጡ ቀበሌዎች የሚመጡ ተማሪዎችን
                                እየተቀበለ ያስተማረና እያስተማረ የሚገኝ መሆኑ ነው። ነገር ግን ከጊዜ በኋላ በተለያዩ የሃገሪቱ ችግሮች ምክንያት እና ሌሎች ተጨማሪ ችግሮች ምክንያት ትውልድን በበቂ ሁኔታ እያነጸ አይደለም፣ ይሄንንም በመገንዘብ ፋውንዴሽናችን ከአካባቢው ማህበረሰብ ጋር በመሆን የበኩሉን ኣሻራ ለማሳረፍ በትልቅ ራእይ ስራውን ጀምሯል።
                            </p>
                             <Link href="/gallery" className="mt-8 inline-flex items-center font-semibold text-indigo-600 hover:text-indigo-700 group">
                                ተጨማሪ ፎቶዎችን ይመልከቱ <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1"/>
                            </Link>
                        </motion.div>
                    </div>
                </section>


                {/* --- 2. OUR CORE PROGRAMS --- */}
                <section className="py-20 sm:py-28 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="text-center"
                            variants={fadeIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">የኛ ዋና የትኩረት መስኮች</h2>
                            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">በእነዚህ ቁልፍ መስኮች ላይ በማተኮር ዘላቂና አዎንታዊ ለውጥ ለማምጣት እንጥራለን።</p>
                        </motion.div>
                        <motion.div
                            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            {impactAreas.map(area => (
                                <motion.div key={area.title} variants={fadeIn} className="bg-gray-50 p-8 rounded-2xl border border-gray-200/80 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-6 transition-colors duration-300 group-hover:bg-indigo-600 group-hover:text-white">
                                        {area.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{area.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{area.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>                
                
                {/* --- 4. FUNDRAISING & IMPACT METRICS (WITH DONATORS LIST) --- */}
                <section className="py-20 sm:py-28 bg-gray-900 text-white">
                     <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                         <h2 className="text-4xl md:text-5xl font-bold tracking-tight">የተጀመረውን እንቅስቃሴውን ይቀላቀሉ</h2>
                         <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">የእርስዎ ድጋፍ በቀጥታ የተማሪዎችን ህይወት ይለውጣል። ምን ያህል እንደተጓዝን እና ግባችንን ለመምታት ምን ያህል እንደቀረን ይመልከቱ።</p>
                         
                         <motion.div
                            className="mt-12"
                            variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
                         >
                            <div className="flex justify-between items-end mb-2 font-bold text-xl">
                                <span>$<AnimatedNumber value={totalRaised} /> <span className="text-gray-400 font-medium text-base">ተሰብስቧል</span></span>
                                <span>${fundraisingGoal.goal.toLocaleString()} <span className="text-gray-400 font-medium text-base">ግብ</span></span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                                <motion.div
                                    className="bg-indigo-600 h-4 rounded-full"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${progress}%` }}
                                    transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                                    viewport={{ once: true }}
                                />
                            </div>
                         </motion.div>
                         
                         <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="text-5xl font-bold text-indigo-400 tracking-tighter"><AnimatedNumber value={impactMetrics.studentsImpacted} />+</div>
                                <p className="text-gray-300 font-medium mt-1">ተማሪዎች በጥቅሉ ተጠቃሚ ሆነዋል</p>
                            </div>
                             <div className="text-center">
                                <div className="text-5xl font-bold text-indigo-400 tracking-tighter"><AnimatedNumber value={impactMetrics.librariesEstablished} /></div>
                                <p className="text-gray-300 font-medium mt-1">ቤተ-መጻሕፍት የርዳታው ተጠቃሚ ሆንዋል </p>
                            </div>
                             <div className="text-center">
                                <div className="text-5xl font-bold text-indigo-400 tracking-tighter"><AnimatedNumber value={impactMetrics.donors} />+</div>
                                <p className="text-gray-300 font-medium mt-1">በላይ መጻሕፍት ገቢ ተደርጓል</p>
                            </div>
                             <div className="text-center">
                                <div className="text-5xl font-bold text-indigo-400 tracking-tighter"><AnimatedNumber value={impactMetrics.communityMembers} />+</div>
                                <p className="text-gray-300 font-medium mt-1">የማህበረሰብ አባላት</p>
                            </div>
                         </div>
                     </div>
                     
                     {/* --- SCROLLING DONATORS LIST --- */}
                     <div className="mt-20">
                        <h3 className="text-2xl font-bold text-center mb-8">ድጋፍ ያደረጉ ሰዎች</h3>
                        <div className="relative w-full overflow-hidden">
                            <motion.div
                                className="flex"
                                animate={{ x: ['0%', '50%'] }}
                                transition={{ ease: 'linear', duration: 40, repeat: Infinity }}
                            >
                                {[...allDonations, ...allDonations].map((donation: any, index: number) => (
                                    <div key={`${donation.id}-${index}`} className="flex-shrink-0 flex items-center bg-gray-800/50 border border-gray-700 rounded-full py-2 px-5 mx-4 whitespace-nowrap">
                                        <FaRegHeart className="text-indigo-400 mr-3"/>
                                        <p className="font-bold text-gray-200">{donation.donorName || 'Anonymous'}</p>
                                    </div>
                                ))}
                            </motion.div>
                             <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-gray-900"></div>
                        </div>
                     </div>
                </section>
                
                {/* --- 5. INTERACTIVE  SECTION --- */}
                <section className="py-20 sm:py-28 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="text-center"
                            variants={fadeIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">የምስራች</h2>
                            <p className="mt-4 text-lg lg:text-2xl text-gray-600 max-w-3xl mx-auto">
                                በዌብሳይታችን ያካተትናቸው ትልቅ ፍሬ የምንጠብቅባቸውን ገጽኦች እናስተዋውቃችሁ፡
                            </p>
                        </motion.div>
                        
                        {/* **FIX:** Removed the self-invoking function wrapper */}
                        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                            {/* Left Column: Event List */}
                            <motion.div
                                className="col-span-1 flex flex-col gap-2"
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                            >
                                {educationResource.map((event, index) => (
                                    <motion.div
                                        key={event.title}
                                        variants={fadeIn}
                                        onMouseEnter={() => setActiveEventIndex(index)}
                                        className={`p-6 rounded-lg cursor-pointer transition-all duration-300 border-2 ${
                                            activeEventIndex === index
                                                ? 'bg-indigo-50 border-indigo-500 shadow-lg'
                                                : 'bg-gray-100 border-transparent hover:bg-gray-200'
                                        }`}
                                    >
                                        <h3 className={`text-xl font-bold ${
                                             activeEventIndex === index ? 'text-indigo-600' : 'text-gray-900'
                                        }`}>{event.title}</h3>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Right Column: Event Preview Pane */}
                            <div className="col-span-1 lg:col-span-2 bg-gray-100 p-8 md:p-12 rounded-2xl min-h-[20rem] flex flex-col justify-center">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeEventIndex}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="flex flex-col h-full"
                                    >
                                        <div className="flex-grow">
                                            <div className="w-16 h-16 text-indigo-600 mb-6">
                                                {educationResource[activeEventIndex].icon}
                                            </div>
                                            <h3 className="text-3xl font-bold text-gray-900 mb-4">{educationResource[activeEventIndex].title}</h3>
                                            <p className="text-lg text-gray-600 leading-relaxed">
                                                {educationResource[activeEventIndex].description}
                                            </p>
                                        </div>
                                        <div className="mt-8">
                                            <Link href={educationResource[activeEventIndex].link} className="inline-flex items-center font-bold text-indigo-600 hover:text-indigo-700 group text-lg">
                                                ለመግባት ይሄን ይጫኑ
                                                <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1"/>
                                            </Link>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 6. VOICES OF IMPACT (TESTIMONIALS) --- */}
                <section className="py-20 sm:py-28 bg-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <div className="text-center mb-16">
                             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">የለውጡ ድምፆች</h2>
                             <p className="mt-4 text-lg lg:text-2xl text-gray-600 max-w-3xl mx-auto">የእኛ ስራ በሰዎች ህይወት ላይ ያመጣውን ለውጥ ከራሳቸው አንደበት ይስሙ።</p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white p-8 rounded-2xl shadow-lg"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.6, delay: index * 0.15 }}
                                >
                                    <p className="text-gray-600 italic leading-relaxed mb-6">"{testimonial.quote}"</p>
                                    <div className="flex items-center">
                                        <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4">
                                             <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{testimonial.name}</p>
                                            <p className="text-sm text-indigo-600 font-medium">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
                
               <section className="py-20 sm:py-28 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">የቅርብ ጊዜ ዜናዎች</h2>
            <p className="mt-4 text-lg lg:text-2xl text-gray-600 max-w-3xl mx-auto">ከፋውንዴሽናችን ጋር የተያያዙ ወቅታዊ መረጃዎችን እና ዝግጅቶችን ይከታተሉ።</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item, index) => (
                <motion.div
                    key={index}
                    className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg group"
                    variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <div className="relative h-56 w-full">
                        <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-6">
                        <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">{item.title}</h3>
                        <p className="text-gray-600 mb-4">{item.excerpt}</p>
                        
                        {/* --- THIS IS THE UPDATED LINK --- */}
                        <Link 
                            href={item.link} // Use the dynamic link from your data
                            target="_blank"   // Opens the link in a new tab
                            rel="noopener noreferrer" // Recommended for security with target="_blank"
                            className="font-semibold text-indigo-600 group-hover:text-indigo-700"
                        >
                            Read on Facebook <FaArrowRight className="inline ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
</section>

                {/* --- 8. GET INVOLVED SECTION --- */}
                <section className="py-20 sm:py-28 bg-gray-100">
                     <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                         <FaBullhorn className="mx-auto text-5xl text-indigo-600 mb-4" />
                         <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">ለውጡን ዛሬውኑ ይቀላቀሉ!</h2>
                         <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                             የእርስዎ ተሳትፎ፣ በየትኛውም መልኩ ቢሆን፣ ትልቅ ለውጥ ያመጣል። የኮን ሃይስኩል ተማሪዎችን ህልም እውን ለማድረግ አብረን እንስራ።
                         </p>
                         <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center">
                            <motion.div whileHover={{ scale: 1.05 }} className="w-full">
                                <Link href="/donate" className="block text-center bg-indigo-600 text-white p-8 rounded-xl shadow-lg hover:bg-indigo-700 transition-colors">
                                    <h3 className="text-2xl font-bold">ይለግሱ</h3>
                                    <p className="mt-2">የገንዘብ ድጋፍዎ የመማሪያ ቁሳቁሶችን እና ሌሎችንም ይሸፍናል።</p>
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} className="w-full">
                                <Link href="/contact" className="block text-center bg-white text-gray-900 p-8 rounded-xl shadow-lg hover:bg-gray-200 transition-colors">
                                    <h3 className="text-2xl font-bold">በበጎ ፈቃደኝነት ይሳተፉ</h3>
                                    <p className="mt-2">ጊዜዎን እና ችሎታዎን በመስጠት ትምህርት ቤታችሁን ደግፉ።</p>
                                </Link>
                            </motion.div>
                         </div>
                     </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}