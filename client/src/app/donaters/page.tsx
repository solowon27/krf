'use client';

import { useMutation, gql } from '@apollo/client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode'; // ✅ Reverted to using jwtDecode

// Import your Header and Footer components
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ADD_DONATION = gql`
  mutation AddDonation($donorName: String!, $item: String!, $message: String) {
    addDonation(donorName: $donorName, item: $item, message: $message) {
      id
      donorName
      item
      message
      date
    }
  }
`;

// Define a type for your decoded JWT data structure
// Make sure this matches what your backend puts in the token's 'data' payload
type DecodedTokenData = {
  _id: string;
  firstName: string;
  email: string;
  role: string;
  exp?: number; // Expiration time (unix timestamp)
};

export default function DonatersPage() {
  const router = useRouter();
  const [user, setUser] = useState<DecodedTokenData | null>(null);
  const [form, setForm] = useState({ donorName: '', item: '', message: '' });
  const [addDonation, { loading, error }] = useMutation(ADD_DONATION, {
    onCompleted: () => {
      alert('Donation recorded successfully!');
      setForm({ donorName: '', item: '', message: '' }); // Clear form on success
    },
    onError: (err) => {
      console.error('Error recording donation:', err);
      // Provide more specific error messages if applicable (e.g., from network, server)
      alert(`Failed to record donation: ${err.message}`);
    }
  });

  // Memoized function for handling logout/redirects
  const handleAuthRedirect = useCallback((path: string) => {
    localStorage.removeItem('token'); // Always clear token on auth issues
    setUser(null);
    router.push(path);
  }, [router]);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    // 1. Check if token exists
    if (!token) {
      console.warn('No token found. Redirecting to login.');
      handleAuthRedirect('/login');
      return;
    }

    try {
      // 2. Decode the token using jwtDecode
      const decoded: { data: DecodedTokenData, exp?: number } = jwtDecode(token); // jwtDecode's return type might vary; ensure 'exp' is directly on the top-level.

      // Ensure the 'data' field exists and contains expected properties
      if (!decoded || !decoded.data || !decoded.data.role) {
        throw new Error('Invalid token structure or missing user data.');
      }

      // 3. Check for token expiration
      const currentTime = Date.now() / 1000; // Current time in seconds
      if (decoded.exp && decoded.exp < currentTime) {
        console.warn('Token expired. Redirecting to login.');
        handleAuthRedirect('/login');
        return;
      }
      
      // 4. Check user role for authorization
      if (decoded.data.role !== 'admin') {
        alert('Access denied: You must be an administrator to access this page.');
        console.warn(`User ${decoded.data.email} (Role: ${decoded.data.role}) attempted to access admin page.`);
        handleAuthRedirect('/'); // Redirect non-admins to homepage
        return;
      }

      // If all checks pass, set the user
      setUser(decoded.data);

    } catch (err) {
      console.error('Authentication/Authorization failed during token processing:', err);
      // For any decoding or structural errors, assume invalid token and redirect
      handleAuthRedirect('/login');
    }
  }, [handleAuthRedirect]); // Dependency on handleAuthRedirect ensures useEffect runs if it changes

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Prevent double submission while mutation is in flight
    addDonation({ variables: form });
  };

  // Render a loading/checking state while authentication is being processed
  // This prevents the form from briefly flashing before redirect or rendering
  if (user === null) {
    // If token exists but user is still null, it means we're in the process of validating
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      return (
        <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
          Checking authentication...
        </div>
      );
    }
    // If no token and user is null, the redirect will have already happened
    // Or, if SSR, this won't be hit directly.
    return null;
  }

  // Once user is confirmed (and is an admin), render the form
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header /> {/* Add Header here */}

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-teal-800">
            📜 Add New Donation
          </h2>
          {user && <p className="text-center text-sm text-gray-600 mb-6">Logged in as: {user.firstName} {user.email} (Role: {user.role})</p>}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="donorName" className="sr-only">Donor's Name</label>
                <input
                  id="donorName"
                  type="text"
                  placeholder="Donor's Name"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                  value={form.donorName}
                  onChange={(e) => setForm({ ...form, donorName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="item" className="sr-only">Item Donated</label>
                <input
                  id="item"
                  type="text"
                  placeholder="Item Donated (e.g., $100, books)"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                  value={form.item}
                  onChange={(e) => setForm({ ...form, item: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Optional message</label>
                <textarea
                  id="message"
                  placeholder="Optional message"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
            </div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading ? 'bg-amber-400 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-300`}
              disabled={loading}
            >
              {loading ? 'Adding Donation...' : 'Add Donation'}
            </button>
            {error && <p className="mt-3 text-center text-sm text-red-600">Error: {error.message}</p>}
          </form>
        </div>
      </main>

      <Footer /> {/* Add Footer here */}
    </div>
  );
}