'use client';

import Header from '@components/Header';
import Footer from '@components/Footer';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// Updated Book type to include a description
type Book = {
  id: string;
  title: string;
  category: string;
  googleDriveLink: string;
  description: string; // New field for the modal
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
];

const BOOKS_PER_PAGE = 10;

export default function LibraryPage() {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(0);
  
  // State for the new features
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/data/books.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data: Book[] = await response.json();
        setAllBooks(data);
      } catch (e: any) {
        setError(`Failed to load books: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedCategory, searchTerm, sortOrder]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(allBooks.map(b => b.category));
    return ['All', ...Array.from(uniqueCategories).sort()];
  }, [allBooks]);

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = allBooks.filter(book => {
      const categoryMatch = selectedCategory === 'All' || book.category === selectedCategory;
      const searchMatch = !searchTerm.trim() || book.title.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, allBooks, sortOrder]);

  const displayedBooks = useMemo(() => {
    const startIndex = currentPage * BOOKS_PER_PAGE;
    return filteredAndSortedBooks.slice(startIndex, startIndex + BOOKS_PER_PAGE);
  }, [filteredAndSortedBooks, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedBooks.length / BOOKS_PER_PAGE);
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

  const containerVariants = { visible: { transition: { staggerChildren: 0.05 } } };

  const bookColors = [
    'bg-sky-800'];

  return (
    <>
      <main className="w-full min-h-screen bg-gray-50 text-gray-900 font-sans antialiased overflow-x-hidden">
        <Header />

        {/* Hero Section (No Changes) */}
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
             className="w-full sm:w-auto inline-block border-2 border-white text-white font-semibold px-8 py-4 rounded-full transition-colors duration-300 hover:bg-white hover:text-gray-900 text-lg sm:text-xl"
            >
              ተጨማሪ የትምህርት ምንጮች
            </Link>
          </motion.div>
        </div>
        </section>

        {/* Main Content Section */}
        <section className="py-16 md:py-20 lg:py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-10 md:gap-12">
              <div className="md:col-span-3">
                {loading ? (
                  <div>Loading...</div>
                ) : error ? (
                  <div>{error}</div>
                ) : (
                  <>
                    {/* --- NEW: Controls Panel --- */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ type: 'tween', ease: 'easeOut', duration: 0.5 }}
                      className="bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-md border border-gray-200/80 mb-12"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div className="md:col-span-2 relative">
                          <input
                            type="text"
                            placeholder="Search by title..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                          />
                          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <div className="relative">
                          <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-base"
                          >
                            <option value="asc">Sort A-Z</option>
                            <option value="desc">Sort Z-A</option>
                          </select>
                           <svg className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path></svg>
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-center gap-3 pt-6 scrollbar-hide">
                        {categories.map(cat => (
                          <button key={cat} onClick={() => setSelectedCategory(cat)} className={`flex-shrink-0 flex items-center px-4 py-2 rounded-full font-medium text-sm transition-colors duration-200 ${selectedCategory === cat ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                            <span className="text-lg mr-2">{categoryEmojis[cat] || '📚'}</span>
                            {cat}
                          </button>
                        ))}
                      </div>
                    </motion.div>

                    {/* --- UPDATED: Book Grid --- */}
                    {displayedBooks.length > 0 ? (
                      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-12">
                        <AnimatePresence>
                          {displayedBooks.map((book, index) => (
                            <motion.div key={book.id} variants={itemVariants} exit="exit" className="flex flex-col items-center text-center">
                              <button
                                onClick={() => setSelectedBook(book)}
                                className="group w-full h-64 sm:h-72 relative flex flex-col items-center justify-end cursor-pointer transition-transform duration-300 hover:-translate-y-2 focus:outline-none focus:-translate-y-2"
                                title={book.title}
                              >
                                <div className={`absolute inset-0 rounded-md shadow-lg flex items-end p-2 text-white ${bookColors[index % bookColors.length]}`}>
                                  <h3 className="font-bold text-4xl origin-bottom-left" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(360deg)' }}>
                                    {book.title}
                                  </h3>
                                </div>
                                <div className="absolute -bottom-2 w-[110%] h-2 bg-[#744F3A] rounded-b-lg shadow-inner"></div>
                              </button>
                              <span className="mt-4 inline-block bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                                {book.category}
                              </span>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    ) : (
                      <div className="text-center py-16">
                        <p className="text-2xl font-semibold text-gray-800">No Books Found</p>
                        <p className="text-gray-500 mt-2">Try adjusting your search or filter.</p>
                      </div>
                    )}

                    {/* Pagination Controls */}
                  {filteredAndSortedBooks.length > BOOKS_PER_PAGE && (
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
              
              {/* Right Sidebar (No Changes) */}
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

      {/* --- NEW: Book Detail Modal --- */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBook(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8"
            >
              <button
                onClick={() => setSelectedBook(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              
              <div className="flex flex-col items-center text-center">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium mb-4 px-3 py-1 rounded-full">{selectedBook.category}</span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedBook.title}</h2>
                <p className="text-gray-600 mb-8 max-w-md">
                  {selectedBook.description || "No description available."}
                </p>
                <a
                  href={selectedBook.googleDriveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  View or Download Book
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}