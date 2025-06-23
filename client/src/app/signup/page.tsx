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
    <div className="min-h-screen py-16 flex flex-col bg-gray-100">
      <Header /> {/* Add Header here */}

      {/* Main content area, uses flex-grow to take up available space and push footer down */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full space-y-8 mb-20 p-10 bg-white rounded-xl shadow-lg"> {/* Enhanced shadow and rounded */}
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-teal-800"> {/* Teal heading */}
              Admin Account Setup
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Create your primary administrator account.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="first-name" className="sr-only">First Name</label>
                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
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
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
              {/* Hidden field for role if it's always 'admin' for this form */}
              <input type="hidden" name="role" value="admin" />
            </div>

            <div>
              <button
                type="submit"
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  loading ? 'bg-teal-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-300`}
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Create Admin Account'}
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

      <Footer /> {/* Add Footer here */}
    </div>
  );
}