"use client";

import { useEffect, useState } from "react";
import AIInsights from "../dashboard/components/AIInsights";

export default function Dashboard() {
  const [apiStatus, setApiStatus] = useState<"online" | "offline">("offline");

  useEffect(() => {
    fetch("http://localhost:5000/health")
      .then((res) => res.json())
      .then(() => setApiStatus("online"))
      .catch(() => setApiStatus("offline"));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-3xl font-bold mb-2">Job Application Dashboard</h1>

      {/* API Status */}
      <div className="flex items-center gap-2 text-sm mb-8">
        <span className="text-slate-400">API Status:</span>
        <span
          className={`font-semibold ${
            apiStatus === "online" ? "text-green-500" : "text-red-500"
          }`}
        >
          {apiStatus.toUpperCase()}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h2 className="font-semibold mb-2">Applications</h2>
          <p className="text-slate-400">24 Total</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h2 className="font-semibold mb-2">Interviews</h2>
          <p className="text-slate-400">5 Active</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h2 className="font-semibold mb-2">Offers</h2>
          <p className="text-slate-400">1 Received</p>
        </div>
      </div>

      {/* AI Insights */}
      <div className="mt-10">
        <AIInsights />
      </div>
    </div>
  );
}
