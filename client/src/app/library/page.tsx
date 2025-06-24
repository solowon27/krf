// app/library/page.tsx
'use client';

import Header from '@components/Header';
import Footer from '@components/Footer';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';

type Book = {
  id: string;
  title: string;
  category: string;
  googleDriveLink: string;
};

const externalLinks = [
  {
    name: "Open Library",
    url: "https://openlibrary.org/",
  },
  {
    name: "CK12 Student",
    url: "https://www.ck12.org/student/",
  },
  {
    name: "OpenStax",
    url: "https://www.openstax.org/",
  },
  {
    name: "LibriVox",
    url: "https://librivox.org/",
  },
  {
    name: "ManyBooks",
    url: "https://manybooks.net/",
  },
  {
    name: "አማርኛ ልብ-ወለድ (Goodreads)",
    url: "https://www.goodreads.com/list/show/89548.Best_Amharic_Books",
  },
  {
    name: "Project Gutenberg",
    url: "https://www.gutenberg.org/",
  },
  {
    name: "PDF Drive",
    url: "https://www.pdfdrive.com/",
  },
  {
    name: "Internet Archive",
    url: "https://archive.org/details/texts",
  },
  {
    name: "Google Books",
    url: "https://books.google.com/",
  },
  {
    name: "Standard Ebooks",
    url: "https://standardebooks.org/",
  },
  {
    name: "Wikibooks",
    url: "https://en.wikibooks.org/wiki/Main_Page",
  },
  {
    name: "Bookboon",
    url: "https://bookboon.com/en",
  },
  {
    name: "Online Books Page (UPenn)",
    url: "https://onlinebooks.library.upenn.edu/",
  },
  {
    name: "Scribd (Free section)",
    url: "https://www.scribd.com/browse-free-books",
  },
  {
    name: "The National Academies Press",
    url: "https://www.nap.edu/topic/free-pdfs",
  },
  {
    name: "OAPEN Library",
    url: "https://www.oapen.org/",
  },
  {
    name: "HathiTrust Digital Library",
    url: "https://www.hathitrust.org/",
  },
];

const BOOKS_PER_PAGE = 16;

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
    const uniqueCategories = Array.from(new Set(allBooks.map(b => b.category)));
    return ['All', ...uniqueCategories.sort()];
  }, [allBooks]);

  const filteredBooks = useMemo(() => {
    let result = [...allBooks];

    if (selectedCategory !== 'All') {
      result = result.filter(book => book.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(book =>
        book.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        book.category.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    return result;
  }, [searchTerm, selectedCategory, allBooks]);

  const displayedBooks = useMemo(() => {
    const startIndex = currentPage * BOOKS_PER_PAGE;
    const endIndex = startIndex + BOOKS_PER_PAGE;
    return filteredBooks.slice(startIndex, endIndex);
  }, [filteredBooks, currentPage]);

  const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE);
  const hasNextPage = currentPage < totalPages - 1;

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(prevPage => prevPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const categoryEmojis: { [key: string]: string } = {
    'All': '📚',
    'Mathematics': '📐',
    'Physics': '⚛️',
    'Chemistry': '🧪',
    'Biology': '🧬',
    'History': '📜',
    'Geography': '🌍',
    'English': '✍️',
    'Computer Science': '💻',
    'Art': '🎨',
    'Economics': '📈',
    'Business Studies': '💼',
    'Civics': '🏛️',
    'Amharic': 'አማ',
    'Math': '➕',
    'Finance': '💰',
    'Astronomy': '🔭'
  };

  return (
      <main className="w-full min-h-screen bg-gray-50 text-gray-800 font-sans antialiased overflow-x-hidden">
      <Header />

      <section className="bg-gradient-to-br from-teal-900 to-teal-700 text-white py-24 md:py-32 lg:py-40 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 60L60 0H30L0 30M60 60V30L30 60\'/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '120px 120px',
            backgroundRepeat: 'repeat',
          }}
        ></div>
        <div className="w-full px-6 relative z-10">
          <h1 className="text-5xl md:text-7xl font-serif font-extrabold mb-4 leading-tight flex items-center justify-center gap-4">
            <span className="text-amber-300 text-6xl md:text-8xl">📖</span> Kone Digital Library
          </h1>
          <p className="text-lg md:text-xl opacity-95 font-light m-4 max-w-2xl mx-auto">
            Unlock knowledge and discovery. Explore our comprehensive collection of books by subject or search by title.
          </p>
          <Link   href="/education-resources"
                className="inline-block border-2 border-white text-white font-semibold px-10 py-5 rounded-full hover:bg-white hover:text-teal-800 transition-all duration-300 transform hover:-translate-y-1 text-lg whitespace-nowrap">
                Education Resources
          </Link>
        </div>
        
      </section>

      <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23e2e8f0\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 60L60 0H30L0 30M60 60V30L30 60\'%3E%3C/g%3E%3C/svg%3E")', backgroundSize: '120px 120px', backgroundRepeat: 'repeat' }}></div>

        <div className="w-full px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-4 lg:gap-12">

            {/* Left Column: Main Book Content */}
            <div className="md:col-span-3">
              {loading ? (
                <div className="text-center text-teal-700 text-2xl font-semibold py-10">
                  Loading library data...
                </div>
              ) : error ? (
                <div className="text-center text-red-600 text-lg py-10">
                  Error: {error}
                  <p className="text-gray-500 text-sm mt-2">Please check your internet connection or `public/data/books.json`.</p>
                </div>
              ) : (
                <>
                  {/* Search Bar */}
                  <div className="max-w-3xl mx-auto mb-12 relative">
                    <input
                      type="text"
                      placeholder={`Search ${selectedCategory !== 'All' ? selectedCategory + ' books' : 'all books'}...`}
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="w-full pl-14 pr-6 py-4 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg text-gray-800 placeholder:text-gray-400 shadow-md transition-all duration-200"
                    />
                    <svg className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>

                  {/* Category Tabs */}
                  <div className="flex flex-wrap justify-center gap-3 mb-12 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        className={`flex-shrink-0 flex items-center px-6 py-3 rounded-full font-semibold text-lg
                          ${selectedCategory === cat
                              ? 'bg-teal-600 text-white shadow-lg transform scale-105'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-teal-800 transition-all duration-300 shadow-sm'
                          }`}
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

                  <hr className="border-t-2 border-dashed border-teal-200 mb-12 max-w-4xl mx-auto" />

                  {/* Conditional Book Grid or Welcome Message */}
                  {(searchTerm.trim() === '' && selectedCategory === 'All' && displayedBooks.length === 0 && !loading && !error) ? (
                    <div className="text-center text-gray-600 text-xl py-10">
                      <p className="mb-4 text-2xl font-semibold text-teal-800">Ready to Explore?</p>
                      <p className="mb-6 max-w-xl mx-auto">
                        Discover thousands of educational resources. Enter a keyword in the search bar above, or select a category to begin your learning journey!
                      </p>
                      <p className="text-lg text-gray-500">
                        Looking for something specific? Our library is here to help you find it.
                      </p>
                    </div>
                  ) : displayedBooks.length === 0 && filteredBooks.length === 0 && !loading && !error ? (
                    <div className="text-center text-gray-600 text-xl py-10">
                      <p className="mb-4">No books found matching your criteria.</p>
                      <p className="text-lg">Try a different search term or category.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                      {displayedBooks.map(book => (
                        <div
                          key={book.id}
                          className="group bg-white rounded-lg p-5 border border-gray-200 flex flex-col items-center text-center shadow-md
                                     hover:shadow-2xl hover:border-teal-400 transform hover:-translate-y-2 transition-all duration-300 ease-in-out"
                        >
                            {/* Simulated Book Cover */}
                            <div className="w-full relative bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg shadow-inner overflow-hidden mb-4 aspect-[3/4] flex items-center justify-center">
                                <h3 className="text-gray-900 text-xl font-bold p-3 leading-tight overflow-hidden text-ellipsis line-clamp-4 font-serif">
                                    {book.title}
                                </h3>
                                {/* Simple design element for cover texture/detail */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                                <div className="absolute inset-y-0 left-0 w-2 bg-black/5"></div> {/* Spine effect */}
                            </div>

                          <span className="inline-block bg-amber-100 text-teal-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                            {book.category}
                          </span>
                          <a
                            href={book.googleDriveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center bg-teal-600 text-white font-medium px-4 py-3 rounded-lg hover:bg-amber-600 mt-auto transition-colors duration-200 text-lg shadow-sm"
                          >
                            View Book
                          </a>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pagination Controls (only if there are filtered results to paginate) */}
                  {displayedBooks.length > 0 && filteredBooks.length > BOOKS_PER_PAGE && (
                               <div className="flex justify-center items-center mt-12 gap-4">
                               <button
                                 disabled={currentPage === 0}
                                 onClick={() => setCurrentPage(currentPage - 1)}
                                 className="bg-teal-700 text-white font-semibold py-2 px-6 rounded-md
                                           transition-colors duration-200 ease-in-out
                                           hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                                           disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                               >
                                 Previous
                               </button>

                               <span className="text-gray-700 font-medium text-lg">
                                 Page {currentPage + 1} of {totalPages}
                               </span>

                               <button
                                 disabled={!hasNextPage}
                                 onClick={handleNextPage}
                                 className="bg-teal-700 text-white font-semibold py-2 px-6 rounded-md
                                           transition-colors duration-200 ease-in-out
                                           hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                                           disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                               >
                                 Next
                               </button>
                             </div>
                  )}
                </>
              )}
            </div> {/* End Left Column */}

            {/* Right Column: External Links Sidebar */}
            {/* Removed md:max-h-[calc(100vh-6rem)] and md:overflow-y-auto */}
            <div className="md:col-span-1 bg-teal-50 rounded-lg shadow-lg border border-teal-200
                             md:sticky md:top-24 flex flex-col overflow-hidden"> 
              {/* Header section */}
              <div className="p-6 pb-4 border-b border-teal-200 flex-shrink-0">
                <h3 className="text-xl font-serif font-semibold text-teal-800">
                  <span className="mr-2 text-amber-500">🔗</span>External Resources
                </h3>
              </div>

              {/* No longer a separate scrollable div here. Content will expand naturally. */}
              <div className="flex-grow px-6 py-4">
                <ul className="space-y-3">
                  {externalLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between p-3 rounded-md transition-all duration-200
                                   bg-white hover:bg-teal-100 border border-teal-100 hover:border-teal-300 hover:shadow-sm"
                      >
                        <h4 className="text-base font-serif font-medium text-gray-800 group-hover:text-teal-700 transition-colors duration-200">
                            {link.name}
                        </h4>
                        <svg className="w-5 h-5 text-teal-500 group-hover:text-teal-700 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div> {/* End Right Column */}

          </div> {/* End grid wrapper */}
        </div>
      </section>

      <Footer />
    </main>
  );
}