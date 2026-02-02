"use client";



import { useEffect, useState } from "react";

import EmptyState from "./components/EmptyState";



type Stats = {

  total: number;

  applied: number;

  interviewing: number;

  offer: number;

  rejected: number;

};



export default function Dashboard() {

  const [apiStatus, setApiStatus] = useState<"online" | "offline">("offline");

  const [stats, setStats] = useState<Stats | null>(null);



  useEffect(() => {

    fetch("http://localhost:5000/health")

      .then(() => setApiStatus("online"))

      .catch(() => setApiStatus("offline"));



    fetch("http://localhost:5000/stats/summary")

      .then(res => res.json())

      .then(setStats)

      .catch(() => setStats(null));

  }, []);



  return (

    <div className="min-h-screen bg-gray-50 p-10">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">AI Job Application Tracker</h1>

          <p className="text-gray-500">

            Track, analyze, and optimize your job search with AI

          </p>

        </div>



        <div className="text-sm">

          API Status:{" "}

          <span

            className={`font-semibold ${

              apiStatus === "online"

                ? "text-green-600"

                : "text-red-600"

            }`}

          >

            {apiStatus.toUpperCase()}

          </span>

        </div>

      </div>



      {/* Stats */}

      {stats && (

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">

          <StatCard title="Total" value={stats.total} />

          <StatCard title="Applied" value={stats.applied} />

          <StatCard title="Interviewing" value={stats.interviewing} />

          <StatCard title="Offers" value={stats.offer} />

          <StatCard title="Rejected" value={stats.rejected} />

        </div>

      )}



      {/* AI Insights Preview */}

      <div className="bg-white rounded-xl shadow p-6 mb-8">

        <h2 className="text-xl font-semibold mb-2">AI Insights</h2>

        <p className="text-gray-600 mb-4">

          Get intelligent recommendations based on your application history.

        </p>



        <ul className="list-disc list-inside text-gray-600">

          <li>Follow-up message suggestions</li>

          <li>Resume keyword optimization</li>

          <li>Success vs rejection pattern analysis</li>

          <li>Role targeting recommendations</li>

        </ul>



        <button className="mt-4 bg-black text-white px-4 py-2 rounded hover:opacity-80">

          Generate Insights

        </button>

      </div>



      {/* Applications Section */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-4">

          Recent Applications

        </h2>



        {/* Empty state for now */}

        <EmptyState />

      </div>

    </div>

  );

}



function StatCard({ title, value }: { title: string; value: number }) {

  return (

    <div className="bg-white rounded-xl shadow p-4 text-center">

      <p className="text-sm text-gray-500 uppercase">{title}</p>

      <p className="text-2xl font-bold mt-1">{value}</p>

    </div>

  );

}

