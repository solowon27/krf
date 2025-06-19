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

export default function LibraryPage() {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/data/books.json'); // Make sure path is correct: public/data/books.json
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
    'Amharic': '🇪🇹',
    'Math': '➕',
    'Finance': '💰'
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-800 to-teal-600 text-white py-32 px-6 text-center pt-48 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '80px 80px',
            backgroundRepeat: 'repeat',
          }}
        ></div>
        {/* Simplified for no framer-motion */}
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg">
            Kone Digital Library
          </h1>
          <p className="text-lg md:text-xl opacity-95">
            Explore our collection of books by subject or search by title.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 px-6 bg-gray-100">
        {/* Simplified for no framer-motion */}
        <div className="max-w-7xl mx-auto">
          {/* Conditional Rendering for Loading, Error, Empty, or Content */}
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
                  className="w-full p-4 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-300 text-lg text-gray-700 shadow-md"
                />
              </div>

              {/* Category Tabs */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`flex items-center px-5 py-2 rounded-full font-medium transition-all duration-300 shadow-md
                      ${selectedCategory === cat
                        ? 'bg-teal-700 text-white transform scale-105 shadow-lg'
                        : 'bg-gray-200 text-gray-700 hover:bg-teal-100 hover:text-teal-800'
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
              {filteredBooks.length === 0 ? (
                <div className="text-center text-gray-600 text-xl py-10">
                  <p className="mb-4">No books found matching your criteria.</p>
                  <p className="text-lg">Try a different search term or category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                  {filteredBooks.map(book => (
                    <div
                      key={book.id}
                      className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col min-h-[180px] p-5 border-b-4 border-amber-500 justify-between items-center text-center"
                    >
                      <h2 className="text-xl font-bold text-teal-800 mb-2 leading-tight">{book.title}</h2>
                      <span className="inline-block bg-teal-100 text-teal-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                        {book.category}
                      </span>
                      <a
                        href={book.googleDriveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-amber-500 text-teal-900 font-bold px-4 py-2 rounded-full shadow-md hover:bg-amber-400 transition-all duration-300 ease-in-out transform hover:scale-105 mt-auto"
                      >
                        View Book
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}