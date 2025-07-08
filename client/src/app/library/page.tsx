'use client';

import Header from '@components/Header';
import Footer from '@components/Footer';
import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Link from 'next/link';

// --- DATA (NO CHANGES) ---
type Book = {
  id: string;
  title: string;
  category: string;
  googleDriveLink: string;
  description: string;
};

const externalLinks = [
  { name: "Open Library", url: "https://openlibrary.org/" },
  { name: "CK12 Student", url: "https://www.ck12.org/student/", description: "Interactive learning with customizable textbooks, videos, and exercises." },
  { name: "OpenStax", url: "https://www.openstax.org/", description: "Peer-reviewed, openly licensed textbooks for college and high school." },
  { name: "LibriVox", url: "https://librivox.org/" },
  { name: "ManyBooks", url: "https://manybooks.net/" },
  { name: "Project Gutenberg", url: "https://www.gutenberg.org/" },
  { name: "Internet Archive", url: "https://archive.org/details/texts" },
  { name: "Google Books", url: "https://books.google.com/", description: "Search the full text of books and discover new ones across a vast index." },
];

const featuredResourceNames = ["CK12 Student", "OpenStax", "Google Books"];
const featuredResources = externalLinks.filter(link => featuredResourceNames.includes(link.name));

const BOOKS_PER_PAGE = 12;

export default function LibraryPage() {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  
  // --- NEW: State for mobile filter visibility ---
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
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
    const filtered = allBooks.filter(book => {
      const categoryMatch = selectedCategory === 'All' || book.category === selectedCategory;
      const searchMatch = !searchTerm.trim() || book.title.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });

    filtered.sort((a, b) => sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));
    return filtered;
  }, [searchTerm, selectedCategory, allBooks, sortOrder]);

  const displayedBooks = useMemo(() => {
    const startIndex = currentPage * BOOKS_PER_PAGE;
    return filteredAndSortedBooks.slice(startIndex, startIndex + BOOKS_PER_PAGE);
  }, [filteredAndSortedBooks, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedBooks.length / BOOKS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // --- NEW: Reusable sidebar content for mobile and desktop ---
  const sidebarContent = (
    <div className="space-y-10">
      {/* Featured Resources Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-200 mb-4">Featured Resources</h3>
        <div className="space-y-4">
          {featuredResources.map(resource => (
            <a 
              key={resource.name}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-gray-900/50 border border-gray-800 rounded-lg transition-all duration-300 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1"
            >
              <h4 className="font-bold text-cyan-400">{resource.name}</h4>
              <p className="text-sm text-gray-400 mt-1">{resource.description}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div>
        <h3 className="text-xl font-bold text-gray-200 mb-4">Search & Filter</h3>
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
             <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
          </div>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="w-full py-3 px-4 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="w-full py-3 px-4 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="asc">Sort: A-Z</option>
            <option value="desc">Sort: Z-A</option>
          </select>
        </div>
      </div>

      {/* All External Links */}
      <div>
        <h3 className="text-xl font-bold text-gray-200 mb-4">All Archives</h3>
        <ul className="space-y-2">
          {externalLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded-md transition-colors duration-200 hover:bg-gray-900/80"
              >
                <span className="text-gray-400 group-hover:text-cyan-400">{link.name}</span>
                <svg className="w-4 h-4 text-gray-600 group-hover:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <>
      <main className="w-full min-h-screen bg-[#111111] text-gray-200 font-sans antialiased">
        <Header />

        <section className="relative text-white py-28 md:py-40 px-6 text-center overflow-hidden">
           <div className="absolute inset-0 bg-[#0A0A0A] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
           <div className="relative z-10">
             <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tighter"
            >
              ኮን ሃይስኩል <span className="text-cyan-400">ዲጂታል ላይብረሪ</span>
            </motion.h1>
             <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl mb-12 text-gray-400 max-w-2xl mx-auto"
            >
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
        
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-12">

            {/* --- DESKTOP SIDEBAR --- */}
            <aside className="hidden lg:block lg:col-span-1 lg:sticky lg:top-24 h-fit">
              {sidebarContent}
            </aside>

            {/* --- MAIN CONTENT (BOOKS) --- */}
            <main className="lg:col-span-3">
              {/* --- NEW: MOBILE FILTER CONTROLS --- */}
              <div className="lg:hidden mb-8">
                <button 
                  onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg font-semibold"
                >
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 4.75a.75.75 0 00-1.5 0v10.5a.75.75 0 001.5 0V4.75zM8 10a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 018 10zM12 4.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5A.75.75 0 0112 4.75zM12 15.25a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z" />
                  </svg>
                  Filter & Sort
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

              {loading ? (
                <div className="text-center text-gray-400 py-16">Loading digital assets...</div>
              ) : error ? (
                <div className="text-center text-red-400 py-16">{error}</div>
              ) : displayedBooks.length > 0 ? (
                <>
                  <motion.div
                    variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                  >
                    {displayedBooks.map((book) => (
                      <motion.div
                        key={book.id}
                        variants={itemVariants}
                        className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1"
                      >
                        <div className="p-5 flex-grow">
                          <h3 className="font-bold text-lg text-gray-100 truncate mb-1">{book.title}</h3>
                          <p className="text-sm text-cyan-400 mb-4">{book.category}</p>
                          <p className="text-gray-400 text-sm h-12 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                            {book.description || "No description available."}
                          </p>
                        </div>
                        <div className="px-5 pb-5 mt-auto">
                          <button
                            onClick={() => setSelectedBook(book)}
                            className="w-full text-center bg-gray-800 text-gray-200 font-semibold py-2 rounded-md hover:bg-cyan-500 hover:text-white transition-colors duration-200"
                          >
                            View Details
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <div className="flex justify-center items-center mt-12 gap-4">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0} className="px-4 py-2 bg-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-500 transition-colors">Previous</button>
                    <span className="text-gray-400">Page {currentPage + 1} of {totalPages}</span>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages - 1} className="px-4 py-2 bg-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-500 transition-colors">Next</button>
                  </div>
                </>
              ) : (
                <div className="text-center py-16 text-gray-500 border border-dashed border-gray-700 rounded-lg">
                  <p className="text-2xl font-semibold">No Matching Assets</p>
                  <p>Adjust your search query or filters.</p>
                </div>
              )}
            </main>
          </div>
        </div>
        <Footer />
      </main>

      <AnimatePresence>
        {selectedBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBook(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col"
            >
              <div className="p-8 flex-grow">
                <div className="text-center">
                  <span className="inline-block bg-cyan-900/50 text-cyan-300 text-sm font-medium mb-4 px-3 py-1 rounded-full border border-cyan-800">{selectedBook.category}</span>
                  <h2 className="text-3xl font-bold text-white mb-4">{selectedBook.title}</h2>
                  <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                    {selectedBook.description || "No description available."}
                  </p>
                </div>
              </div>
              <div className="p-6 bg-black/30 border-t border-gray-700 text-center">
                <a
                  href={selectedBook.googleDriveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-cyan-500 text-white font-semibold px-10 py-3 rounded-lg shadow-lg hover:bg-cyan-600 transition-colors duration-300 transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  View or Download Book
                </a>
              </div>
              <button onClick={() => setSelectedBook(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}