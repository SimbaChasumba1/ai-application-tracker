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

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    router.push("/");
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-4 md:px-8 py-4 shadow-sm">
      
      <div className="flex flex-wrap items-center justify-between gap-4">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-9 h-9 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
            AI
          </div>
          <span className="font-semibold text-sm sm:text-lg text-gray-900 break-words">
            AIApplicationTracker
          </span>
        </Link>

        {/* LINKS */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-medium text-gray-700">
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
      </div>
    </nav>
  );
}