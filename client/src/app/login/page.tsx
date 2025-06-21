'use client';

import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for client-side navigation

// Import your Header and Footer components
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header /> {/* Add Header here */}

      {/* Main content area, uses flex-grow to take up available space and push footer down */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl mb-20 shadow-lg"> {/* Enhanced shadow and rounded */}
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-teal-800"> {/* Teal heading */}
              Admin Login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sign in to manage content.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
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
                  autoComplete="current-password" // Important for password managers
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  loading ? 'bg-teal-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-300`}
                disabled={loading} // Disable button while loading
              >
                {loading ? 'Logging In...' : 'Log In'} {/* Change text based on loading state */}
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

      <Footer /> {/* Add Footer here */}
    </div>
  );
}