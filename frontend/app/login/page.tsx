"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);

  // Check if user is already logged in
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session) {
        router.replace("/dashboard"); // redirect immediately if already logged in
      }
    };

    fetchSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Attempt to sign in
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (loginError) {
      if (loginError.message.includes("Email not confirmed")) {
        setError("Please confirm your email before logging in. Check your inbox!");
      } else {
        setError(loginError.message);
      }
    } else if (data.session) {
      // Update session state so navbar changes
      setSession(data.session);

      // Redirect to dashboard
      router.replace("/dashboard"); // use replace to avoid back navigation to login
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6">
      <form
        onSubmit={handleLogin}
        className="bg-white/5 backdrop-blur-md border border-slate-700 p-8 rounded-xl shadow-xl w-full max-w-md space-y-5 text-white"
      >
        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-slate-400 text-sm mt-1">Login to your account</p>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-slate-900 border border-slate-700 p-3 w-full rounded-lg focus:outline-none focus:border-indigo-500"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-slate-900 border border-slate-700 p-3 w-full rounded-lg focus:outline-none focus:border-indigo-500"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white p-3 w-full rounded-lg hover:bg-indigo-500 transition font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* SWITCH */}
        <p className="text-sm text-slate-400 text-center">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-indigo-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}