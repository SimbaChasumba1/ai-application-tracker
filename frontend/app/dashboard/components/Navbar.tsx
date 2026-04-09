"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Get the current session
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    // Listen for authentication state changes (LOGIN / LOGOUT)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    getSession(); // Call to get initial session state

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null); // Clear session state
    router.push("/"); // Redirect to the homepage or login page
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-sm">
      <Link href="/" className="flex items-center gap-3">
        <div className="w-9 h-9 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
          AI
        </div>
        <span className="font-semibold text-lg text-gray-900">
          AIApplicationTracker
        </span>
      </Link>

      <div className="flex gap-6 text-sm font-medium text-gray-700">
        <Link href="/" className="hover:text-indigo-600">
          Home
        </Link>
        <Link href="/dashboard" className="hover:text-indigo-600">
          Dashboard
        </Link>

        {!session ? (
          <>
            <Link href="/login" className="hover:text-indigo-600">
              Login
            </Link>
            <Link href="/signup" className="hover:text-indigo-600">
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}