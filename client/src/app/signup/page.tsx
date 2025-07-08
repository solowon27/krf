// app/admin-signup/page.tsx
'use client';

import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

// Import your Header and Footer components
import Header from '@components/Header';
import Footer from '@components/Footer';
import React from 'react'; // Ensure React is imported for JSX and types

const REGISTER = gql`
  mutation Register($firstName: String!, $email: String!, $password: String!, $role: String) {
    register(firstName: $firstName, email: $email, password: $password, role: $role) {
      token
      user {
      firstName
        email
        role
      }
    }
  }
`;

export default function AdminSignup() {
  const router = useRouter(); // Initialize useRouter
  const [form, setForm] = useState({ firstName: '', email: '', password: '', role: 'admin' });
  const [register, { loading, error }] = useMutation(REGISTER, {
    onCompleted: ({ register }) => {
      localStorage.setItem('token', register.token);
      
      router.push('/donaters'); // Use router.push for Next.js client-side navigation
    },
    onError: (err) => {
      console.error("Signup error:", err);
      // More user-friendly error message if needed
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions
    register({ variables: form });
  };

  return (
    // Outer container for the entire page layout: header, main content, footer
    // Uses flex-col to stack header, main, footer vertically.
    // min-h-screen ensures it takes full viewport height.
    // bg-gray-50 for a very subtle off-white background, typical of Apple's clean aesthetic.
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans antialiased">
      <Header /> {/* Ensure Header can accept className */}

      {/* Main content area, uses flex-grow to take up available space and push footer down */}
      {/* Centered flex container for the signup card */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Signup Card Container */}
        {/* max-w-sm for max width, p- for padding, bg-white for card background, shadow-xl for subtle shadow,
            border for clean edge, space-y for vertical spacing between elements inside the card. */}
        <div className="max-w-sm w-full p-8 md:p-10 bg-white rounded-xl shadow-xl border border-gray-100 space-y-6 md:space-y-8"> 
          <div>
            {/* Main Heading - Clean, dark text, similar to Apple's headings */}
            <h2 className="mt-2 text-center text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Create Admin Account
            </h2>
            {/* Sub-text - Lighter gray for secondary information */}
            <p className="mt-2 text-center text-sm text-gray-500">
              Set up your primary administrator credentials.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4"> {/* Increased space between input fields */}
              <div>
                <label htmlFor="first-name" className="sr-only">First Name</label>
                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  // Apple-like input styling: full rounded, subtle border, clean focus state
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 sm:text-base"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  // Consistent input styling
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 sm:text-base"
                  placeholder="Email Address"
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
                  autoComplete="new-password"
                  required
                  // Consistent input styling
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 sm:text-base"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
              {/* Hidden field for role if it's always 'admin' for this form */}
              {/* This input type is not visibly rendered, so styling is not applied here */}
              <input type="hidden" name="role" value="admin" />
            </div>

            <div>
              <button
                type="submit"
                // Apple-like button styling: primary blue, rounded, subtle shadow, smooth hover
                className={`w-full flex justify-center py-3 px-4 border border-transparent text-base font-semibold rounded-lg shadow-sm
                  ${loading 
                    ? 'bg-blue-400 cursor-not-allowed' // Lighter blue for loading state
                    : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800' // Added active state for click feedback
                  } 
                  text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.005]`}
                disabled={loading} // Disable button while loading
              >
                {loading ? (
                  <span className="flex items-center">
                    {/* Inline SVG for loading spinner for consistency and no external dependencies */}
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering...
                  </span>
                ) : (
                  'Create Account' // Changed button text to "Create Account"
                )}
              </button>
            </div>

            {error && (
              <p className="mt-3 text-center text-sm text-red-600">
                Error: {error.message.includes("E11000 duplicate key error") ? "This email is already registered." : error.message}
              </p>
            )}
          </form>
        </div>
      </main>

      <Footer /> {/* Footer remains as is, assumed to be part of the full page layout */}
    </div>
  );
}
