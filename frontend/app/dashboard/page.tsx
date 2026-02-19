"use client";

import { useEffect, useState } from "react";
import EmptyState from "./components/EmptyState";
import StatusBadge from "./components/StatusBadge";
import StatsSkeleton from "./components/StatsSkeleton";
import StatusFilter from "./components/StatusFilter";
import Modal from "./components/Modal";
import StatusChart from "./components/StatusChart"; 

type Stats = {
  total: number;
  applied: number;
  interviewing: number;
  offer: number;
  rejected: number;
};

type Status = "All" | "Applied" | "Interviewing" | "Offer" | "Rejected";

export default function Dashboard() {
  const [apiStatus, setApiStatus] = useState<"online" | "offline">("offline");
  const [stats, setStats] = useState<Stats | null>(null);
  const [statusFilter, setStatusFilter] = useState<Status>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // API health check
    fetch("http://localhost:5000/health")
      .then(() => setApiStatus("online"))
      .catch(() => setApiStatus("offline"));

    // Stats fetch
    fetch("http://localhost:5000/stats/summary")
      .then((res) => res.json())
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            AI Job Application Tracker
          </h1>
          <p className="text-gray-500 mt-1">
            Track, analyze, and optimize your job search with AI
          </p>
        </div>

        <div className="mt-4 md:mt-0 text-sm">
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
        <>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
            <StatCard title="Total" value={stats.total} />
            <StatCard title="Applied" value={stats.applied} />
            <StatCard title="Interviewing" value={stats.interviewing} />
            <StatCard title="Offers" value={stats.offer} />
            <StatCard title="Rejected" value={stats.rejected} />
          </div>

          {/*  Status Chart Section */}
          <div className="bg-white rounded-xl shadow p-6 mb-10">
            <h2 className="text-xl font-semibold mb-4">
              Application Status Breakdown
            </h2>
            <div className="w-full max-w-md mx-auto">
              <StatusChart stats={stats} />
            </div>
          </div>
        </>
      ) : (
        <StatsSkeleton />
      )}

      {/* AI Insights */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">AI Insights</h2>
            <p className="text-gray-600 max-w-xl">
              Intelligent recommendations generated from your resume and
              application history to improve response rates.
            </p>
          </div>

          <button
            className="mt-4 md:mt-0 bg-black text-white px-4 py-2 rounded hover:opacity-80 transition"
            onClick={() => setIsModalOpen(true)}
          >
            Generate Insights
          </button>
        </div>

        <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600 text-sm">
          <li>• Resume keyword optimization</li>
          <li>• Follow-up message suggestions</li>
          <li>• Rejection pattern analysis</li>
          <li>• Role targeting recommendations</li>
        </ul>
      </div>

      {/* Applications */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Applications</h2>
          <div className="mt-4 md:mt-0">
            <StatusFilter
              value={statusFilter}
              onChange={setStatusFilter}
            />
          </div>
        </div>

        {/* Example application row */}
        <div className="mb-4 flex items-center justify-between border rounded-lg p-4">
          <div>
            <p className="font-medium">Frontend Developer</p>
            <p className="text-sm text-gray-500">Acme Corp</p>
          </div>
          <StatusBadge status="Interviewing" />
        </div>

        <EmptyState />
      </div>

      {/* AI Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-lg font-semibold mb-2">
          AI Insight Preview
        </h3>
        <p className="text-gray-600 mb-4">
          This is a preview of AI-generated recommendations. Once
          connected to OpenAI, this will analyze resumes, job
          descriptions, and application outcomes.
        </p>
        <button
          className="bg-black text-white px-4 py-2 rounded hover:opacity-80 transition"
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </button>
      </Modal>
    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-4 text-center">
      <p className="text-sm text-gray-500 uppercase">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
