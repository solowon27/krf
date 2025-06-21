// app/library/page.tsx
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect, useState, useMemo } from 'react';

type Book = {
  id: string;
  title: string;
  category: string;
  googleDriveLink: string;
};

// Define the external links data (keeping the full list)
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
    name: "openstax",
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
    name: "አማርኛ ልብ-ወለድ",
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
    name: "Online Books Page",
    url: "https://onlinebooks.library.upenn.edu/",
},

];

// Define how many books to show per page
const BOOKS_PER_PAGE = 15;

export default function LibraryPage() {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(0); // New state for pagination

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

  // Reset page when category or search term changes
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

  // Books to display on the current page
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
      // Optional: Scroll to top of the book grid after changing page
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
    <main className="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-800 to-teal-600 text-white py-24 md:py-32 lg:py-40 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '80px 80px',
            backgroundRepeat: 'repeat',
          }}
        ></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-serif font-extrabold mb-4 leading-tight">
            Kone Digital Library
          </h1>
          <p className="text-lg md:text-xl opacity-95 font-light">
            Explore our comprehensive collection of books by subject or search by title.
          </p>
        </div>
      </section>

      {/* Main Content Section - Responsive Two-Column Layout */}
      <section className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-4 lg:gap-12">

          {/* Left Column: Main Book Content */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="text-center text-teal-700 text-2xl font-semibold py-10">
                Loading library books...
              </div>
            ) : error ? (
              <div className="text-center text-red-600 text-lg py-10">
                Error: {error}
                <p className="text-gray-500 text-sm mt-2">Please check your internet connection or `public/data/books.json`.</p>
              </div>
            ) : (
              <>
                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-10">
                  <input
                    type="text"
                    placeholder={`Search ${selectedCategory !== 'All' ? selectedCategory + ' books' : 'all books'}...`}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500 text-lg text-gray-700 placeholder:text-gray-400"
                  />
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-12 overflow-x-auto pb-2 scrollbar-hide">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      className={`flex-shrink-0 flex items-center px-4 py-2 rounded-md font-medium text-sm
                        ${selectedCategory === cat
                          ? 'bg-teal-700 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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

                {/* Book Grid */}
                {displayedBooks.length === 0 && filteredBooks.length === 0 ? (
                  <div className="text-center text-gray-600 text-xl py-10">
                    <p className="mb-4">No books found matching your criteria.</p>
                    <p className="text-lg">Try a different search term or category.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayedBooks.map(book => (
                      <div
                        key={book.id}
                        className="bg-white rounded-md p-5 border border-gray-200 flex flex-col items-center text-center"
                      >
                        <h2 className="text-xl md:text-xl font-serif font-semibold text-teal-800 mb-2 leading-tight flex-grow">{book.title}</h2>
                        <span className="inline-block bg-teal-100 text-teal-700 text-xs font-medium px-3 py-1 rounded-full mb-4">
                          {book.category}
                        </span>
                        <a
                          href={book.googleDriveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center bg-amber-500 text-white font-medium px-4 py-2 rounded-md hover:bg-amber-600 mt-auto"
                        >
                          View Book
                        </a>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination Controls */}
                {filteredBooks.length > BOOKS_PER_PAGE && (
                   <div className="flex justify-center items-center mt-10 gap-4"> {/* Added items-center for vertical alignment */}
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

                    <span className="text-gray-700 font-medium text-lg"> {/* Styled page info */}
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

          {/* Right Column: External Links Sidebar - Heading fixed, content scrolls */}
          <div className="md:col-span-1 bg-white rounded-lg shadow-sm border border-gray-100
                      md:sticky md:top-24 flex flex-col md:max-h-[calc(100vh-6rem)] overflow-hidden"> {/* Added shadow-sm, rounded-lg, overflow-hidden for a cleaner card look */}
            {/* Header section - remains fixed at the top of the card */}
            <div className="p-6 pb-4 border-b border-gray-200 flex-shrink-0">
              <h3 className="text-xl font-serif font-semibold text-gray-700">
                <span className="mr-2 text-teal-600">🔗</span>External Resources
              </h3>
            </div>

            {/* Scrollable content area - takes remaining space and scrolls */}
            <div className="flex-grow px-6 py-4 md:overflow-y-auto">
              <ul className="space-y-4"> {/* Increased space-y for more vertical separation */}
                {externalLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-3 rounded-md transition-all duration-200
                                 bg-white hover:bg-teal-50 border border-gray-200 hover:border-teal-300">
                      <h4 className="text-base font-serif font-medium text-gray-800 mb-1 group-hover:text-teal-700 transition-colors duration-200">{link.name}</h4>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div> {/* End Right Column */}

        </div> {/* End max-w-7xl mx-auto grid */}
      </section>

      <Footer />
    </main>
  );
}