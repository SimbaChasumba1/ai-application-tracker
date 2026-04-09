"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ✅ stops reload
    setLoading(true);
    setError(null);

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log("SIGNUP RESPONSE:", data); // ✅ debug

    setLoading(false);

    if (signupError) {
      setError(signupError.message);
    } else {
      // ✅ handle Supabase email confirmation case
      if (!data.session) {
        router.push("/login"); // user must log in manually
      } else {
        router.push("/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6">
      <form
        onSubmit={handleSignup} // ✅ CRITICAL FIX
        className="bg-white/5 backdrop-blur-md border border-slate-700 p-8 rounded-xl shadow-xl w-full max-w-md space-y-5 text-white"
      >
        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-slate-400 text-sm mt-1">
            Start tracking your applications
          </p>
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
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        {/* SWITCH */}
        <p className="text-sm text-slate-400 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}