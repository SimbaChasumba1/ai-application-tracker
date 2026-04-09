"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    getSession();

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    router.push("/");
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-4 md:px-8 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">
            AI
          </div>
          <span className="font-semibold text-sm sm:text-lg text-gray-900 truncate">
            AIApplicationTracker
          </span>
        </Link>

        {/* LINKS */}
        <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-indigo-600 whitespace-nowrap">
            Home
          </Link>
          <Link href="/dashboard" className="hover:text-indigo-600 whitespace-nowrap">
            Dashboard
          </Link>

          {!session ? (
            <>
              <Link href="/login" className="hover:text-indigo-600 whitespace-nowrap">
                Login
              </Link>
              <Link href="/signup" className="hover:text-indigo-600 whitespace-nowrap">
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-600 whitespace-nowrap"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}