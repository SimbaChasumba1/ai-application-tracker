"use client";



import { useEffect, useState } from "react";

import EmptyState from "./components/EmptyState";

import StatusBadge from "./components/StatusBadge";

import StatsSkeleton from "./components/StatsSkeleton";



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

    // Health check

    fetch("http://localhost:5000/health")

      .then(() => setApiStatus("online"))

      .catch(() => setApiStatus("offline"));



    // Stats fetch

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

          <h1 className="text-3xl font-bold">

            AI Job Application Tracker

          </h1>

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

      {stats ? (

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">

          <StatCard title="Total" value={stats.total} />

          <StatCard title="Applied" value={stats.applied} />

          <StatCard title="Interviewing" value={stats.interviewing} />

          <StatCard title="Offers" value={stats.offer} />

          <StatCard title="Rejected" value={stats.rejected} />

        </div>

      ) : (

        <StatsSkeleton />

      )}



      {/* AI Insights */}

      <div className="bg-white rounded-xl shadow p-6 mb-8">

        <h2 className="text-xl font-semibold mb-2">

          AI Insights

        </h2>

        <p className="text-gray-600 mb-4">

          Intelligent recommendations based on your application history.

        </p>



        <ul className="list-disc list-inside text-gray-600 space-y-1">

          <li>Follow-up message suggestions</li>

          <li>Resume keyword optimization</li>

          <li>Success vs rejection pattern analysis</li>

          <li>Role targeting recommendations</li>

        </ul>



        <button className="mt-4 bg-black text-white px-4 py-2 rounded hover:opacity-80 transition">

          Generate Insights

        </button>

      </div>



      {/* Applications */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-semibold mb-6">

          Recent Applications

        </h2>



        {/* Preview row */}

        <div className="mb-6 flex items-center justify-between border rounded-lg p-4">

          <div>

            <p className="font-medium">Frontend Developer</p>

            <p className="text-sm text-gray-500">Acme Corp</p>

          </div>

          <StatusBadge status="Interviewing" />

        </div>



        {/* Empty state */}

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







