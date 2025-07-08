// app/login/page.tsx
'use client';

import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for client-side navigation

// Import your Header and Footer components
import Header from '@components/Header';
import Footer from '@components/Footer';

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        role
      }
    }
  }
`;

export default function LoginPage() {
  const router = useRouter(); // Initialize router
  const [form, setForm] = useState({ email: '', password: '' });
  const [login, { loading, error }] = useMutation(LOGIN, { // Destructure 'loading' state
    onCompleted: ({ login }) => {
      localStorage.setItem('token', login.token);
      
      // Use router.push for Next.js client-side navigation
      router.push('/donaters'); 
    },
    onError: (err) => {
      console.error("Login error:", err);
      // You can add more specific error handling here if desired
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions while loading
    login({ variables: form });
  };

  return (
    // Outer container for the entire page layout: header, main content, footer
    // Uses flex-col to stack header, main, footer vertically.
    // min-h-screen ensures it takes full viewport height.
    // bg-gray-50 for a very subtle off-white background, typical of Apple's clean aesthetic.
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans antialiased">
      <Header /> {/* Ensure Header can accept className */}

      {/* Main content area, uses flex-grow to take up available space and push footer down */}
      {/* Centered flex container for the login card */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Login Card Container */}
        <div className="max-w-sm w-full p-8 md:p-10 bg-white rounded-xl shadow-xl border border-gray-100 space-y-6 md:space-y-8"> 
          <div>
            {/* Main Heading - Clean, dark text, similar to Apple's headings */}
            <h2 className="mt-2 text-center text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Sign In
            </h2>
            {/* Sub-text - Lighter gray for secondary information */}
            <p className="mt-2 text-center text-sm text-gray-500">
              Manage your Kone Renaissance Foundation content.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4"> {/* Increased space between input fields */}
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  // Apple-like input styling: full rounded, subtle border, clean focus state
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 sm:text-base"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password" 
                  required
                  // Consistent input styling
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 sm:text-base"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                // Apple-like button styling: primary blue, rounded, subtle shadow, smooth hover
                className={`w-full flex justify-center py-3 px-4 border border-transparent text-base font-semibold rounded-lg shadow-sm
                  ${loading 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800' // Added active state for click feedback
                  } 
                  text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.005]`}
                disabled={loading} // Disable button while loading
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging In...
                  </span>
                ) : (
                  'Sign In' // Changed button text to "Sign In"
                )}
              </button>
            </div>

            {error && (
              <p className="mt-3 text-center text-sm text-red-600">
                Error: {error.message.includes("Incorrect credentials") ? "Invalid email or password." : error.message}
              </p>
            )}
          </form>
        </div>
      </main>

      <Footer /> {/* Footer remains as is, assumed to be part of the full page layout */}
    </div>
  );
}
