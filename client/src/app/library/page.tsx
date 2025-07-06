'use client';

import Header from '@components/Header';
import Footer from '@components/Footer';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';

type Book = {
  id: string;
  title: string;
  category: string;
  googleDriveLink: string;
};

const externalLinks = [
  { name: "Open Library", url: "https://openlibrary.org/" },
  { name: "CK12 Student", url: "https://www.ck12.org/student/" },
  { name: "OpenStax", url: "https://www.openstax.org/" },
  { name: "LibriVox", url: "https://librivox.org/" },
  { name: "ManyBooks", url: "https://manybooks.net/" },
  { name: "አማርኛ ልብ-ወለድ (Goodreads)", url: "https://www.goodreads.com/list/show/89548.Best_Amharic_Books" },
  { name: "Project Gutenberg", url: "https://www.gutenberg.org/" },
  { name: "PDF Drive", url: "https://www.pdfdrive.com/" },
  { name: "Internet Archive", url: "https://archive.org/details/texts" },
  { name: "Google Books", url: "https://books.google.com/" },
  { name: "Standard Ebooks", url: "https://standardebooks.org/" },
  { name: "Wikibooks", url: "https://en.wikibooks.org/wiki/Main_Page" },
  { name: "Bookboon", url: "https://bookboon.com/en" },
  { name: "Online Books Page (UPenn)", url: "https://onlinebooks.library.upenn.edu/" },
  { name: "Scribd (Free section)", url: "https://www.scribd.com/browse-free-books" },
  { name: "The National Academies Press", url: "https://www.nap.edu/topic/free-pdfs" },
  { name: "OAPEN Library", url: "https://www.oapen.org/" },
  { name: "HathiTrust Digital Library", url: "https://www.hathitrust.org/" },
];

const BOOKS_PER_PAGE = 12;

export default function LibraryPage() {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/data/books.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Book[] = await response.json();
        setAllBooks(data);
      } catch (e: any) {
        setError(`Failed to load books: ${e.message}`);
        console.error("Error fetching books:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedCategory, searchTerm]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(allBooks.map(b => b.category));
    return ['All', ...Array.from(uniqueCategories).sort()];
  }, [allBooks]);

  const filteredBooks = useMemo(() => {
    return allBooks.filter(book => {
      const categoryMatch = selectedCategory === 'All' || book.category === selectedCategory;
      const searchMatch = !searchTerm.trim() ||
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [searchTerm, selectedCategory, allBooks]);

  const displayedBooks = useMemo(() => {
    const startIndex = currentPage * BOOKS_PER_PAGE;
    return filteredBooks.slice(startIndex, startIndex + BOOKS_PER_PAGE);
  }, [filteredBooks, currentPage]);

  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  const hasNextPage = currentPage < totalPages - 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categoryEmojis: { [key: string]: string } = {
    'All': '📚', 'Mathematics': '📐', 'Physics': '⚛️', 'Chemistry': '🧪',
    'Biology': '🧬', 'History': '📜', 'Geography': '🌍', 'English': '✍️',
    'Computer Science': '💻', 'Art': '🎨', 'Economics': '📈', 'Business Studies': '💼',
    'Civics': '🏛️', 'Amharic': '🇪🇹', 'Math': '➕', 'Finance': '💰',
    'Astronomy': '🔭', 'Philosophy': '🧠'
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'tween', ease: 'easeOut', duration: 0.4 } },
    exit: { opacity: 0, scale: 0.95, transition: { type: 'tween', ease: 'easeOut', duration: 0.3 } },
  } satisfies Variants;

  const containerVariants = {
    visible: { transition: { staggerChildren: 0.05 } },
  };

  const bookColors = [
    'bg-slate-800',
  ];

  return (
    <main className="w-full min-h-screen bg-gray-50 text-gray-900 font-sans antialiased overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-24 md:py-32 lg:py-40 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 60L60 0H30L0 30M60 60V30L30 60\'/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '120px 120px',
          }}
        ></div>
        <div className="w-full px-6 relative z-10">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-9xl font-bold mb-4 leading-tight tracking-tight flex items-center justify-center gap-4"
          >ኮን ሃይስኩል <br className="hidden sm:inline" /> ዲጂታል ላይብረሪ
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl lg:text-2xl font-light opacity-80 max-w-3xl mx-auto mb-10">
            እውቀት ሃይል ነው፥ እውቀት ተስፋ እና ስንቅ ነው፥ እውቀት የዘመናዊ ስብእና መሰረት ነው!
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/education-resources"
              className="inline-block bg-white text-gray-900 font-semibold px-10 py-5 rounded-full shadow-lg hover:bg-gray-200 transition-colors duration-300 transform hover:scale-[1.01] text-lg whitespace-nowrap"
            >
              ተጨማሪ የትምህርት ምንጮች
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 60L60 0H30L0 30M60 60V30L30 60\'%3E%3C/g%3E%3C/svg%3E")', backgroundSize: '120px 120px' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-10 md:gap-12">

            {/* Left Column: Main Book Content */}
            <div className="md:col-span-3">
              {loading ? (
                <div className="text-center text-gray-700 text-2xl font-semibold py-10 flex justify-center items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading library data...
                </div>
              ) : error ? (
                <div className="text-center text-red-600 text-lg py-10 bg-red-50 rounded-lg p-6 border border-red-200">
                  <p className="font-semibold mb-2">Failed to load books:</p>
                  <p>{error}</p>
                </div>
              ) : (
                <>
                  {/* Search and Filter */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'tween', ease: 'easeOut', duration: 0.5 }}
                    className="space-y-12"
                  >
                    <div className="max-w-3xl mx-auto relative">
                      <input
                        type="text"
                        placeholder={`Search ${selectedCategory !== 'All' ? selectedCategory : 'all'} books...`}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-14 pr-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-gray-900 placeholder:text-gray-400 shadow-sm transition-all duration-200 hover:shadow-md"
                      />
                      <svg className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 pb-2 scrollbar-hide">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          className={`flex-shrink-0 flex items-center px-6 py-3 rounded-full font-medium text-base sm:text-lg transition-colors duration-200 ${selectedCategory === cat ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                          onClick={() => {
                            setSelectedCategory(cat);
                            setSearchTerm('');
                          }}
                        >
                          <span className="text-xl mr-2">{categoryEmojis[cat] || '📚'}</span>
                          {cat}
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  <hr className="border-t border-solid border-gray-200 my-12 max-w-4xl mx-auto" />

                  {/* Book Grid or Messages */}
                  {allBooks.length > 0 && displayedBooks.length === 0 ? (
                    <div className="text-center text-gray-700 text-xl py-10 bg-gray-50 rounded-xl p-8 border border-gray-100 shadow-sm">
                      <p className="mb-4 text-2xl font-semibold text-gray-900">No Books Found</p>
                      <p className="text-lg">Your search or filter returned no results.</p>
                      <p className="text-md text-gray-600 mt-2">Try adjusting your search term or selecting a different category.</p>
                    </div>
                  ) : (
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-4 gap-x-4 gap-y-12"
                    >
                      <AnimatePresence>
                        {displayedBooks.map((book, index) => (
                          <motion.div
                            key={book.id}
                            variants={itemVariants}
                            exit="exit"
                            className="flex flex-col items-center text-center"
                          >
                            <a
                              href={book.googleDriveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group w-full h-72 relative flex flex-col items-center justify-end cursor-pointer transition-transform duration-300 hover:-translate-y-2 focus:outline-none focus:-translate-y-2"
                              title={book.title}
                            >
                              {/* Book Spine */}
                              <div className={`absolute inset-0 rounded-md shadow-lg flex items-end p-2 text-white ${bookColors[index % bookColors.length]}`}>
                                <h3
                                  className="font-bold text-3xl origin-bottom-left"
                                  style={{
                                    writingMode: 'vertical-rl',
                                    textOrientation: 'mixed',
                                    transform: 'rotate(360deg)',
                                  }}
                                >
                                  {book.title}
                                </h3>
                              </div>
                              {/* Shelf bottom */}
                              <div className="absolute -bottom-2 w-[110%] h-2 bg-[#744F3A] rounded-b-lg shadow-inner"></div>
                            </a>
                             {/* Category */}
                             <span className="mt-4 inline-block bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                                {book.category}
                              </span>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {/* Pagination Controls */}
                  {filteredBooks.length > BOOKS_PER_PAGE && (
                    <div className="flex justify-center items-center mt-16 gap-2 md:gap-4">
                      <button
                        disabled={currentPage === 0}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="bg-gray-100 text-gray-700 font-semibold py-2 px-4 md:px-6 rounded-full transition-all duration-200 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <span className="text-gray-600 font-medium">
                        Page {currentPage + 1} of {totalPages}
                      </span>
                      <button
                        disabled={!hasNextPage}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="bg-gray-100 text-gray-700 font-semibold py-2 px-4 md:px-6 rounded-full transition-all duration-200 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Right Column: External Links Sidebar */}
            <div className="md:col-span-1 bg-white rounded-xl shadow-xl border border-gray-100 md:sticky md:top-24 flex flex-col p-6 md:max-h-[calc(100vh-8rem)]">
              {/* Sticky Header */}
              <div className="pb-4 mb-4 border-b border-gray-200 flex-shrink-0">
                <h3 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <span className="mr-3 text-blue-600 text-3xl">🔗</span>ተጨማሪ የቤተ-መጻሕፍት ሊንኮች
                </h3>
              </div>
              {/* Scrollable List */}
              <div className="flex-grow overflow-y-auto pr-2">
                <ul className="space-y-3">
                  {externalLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between p-3 rounded-lg transition-all duration-200 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-200 hover:shadow-sm"
                      >
                        <h4 className="text-base font-medium text-gray-800 group-hover:text-blue-700 transition-colors duration-200">
                          {link.name}
                        </h4>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-700 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}