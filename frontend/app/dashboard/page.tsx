"use client";

import { useEffect, useState } from "react";
import StatusBadge from "./components/StatusBadge";
import EmptyState from "./components/EmptyState";
import Modal from "./components/Modal";
import StatusFilter from "./components/StatusFilter";
import StatusChart from "./components/StatusChart";
import StatsSkeleton from "./components/StatsSkeleton";
import axios from "axios";
import { supabase } from "../../lib/supabaseClient";

type Status = "Applied" | "Interviewing" | "Offer" | "Rejected";

type Stats = {
  total: number;
  applied: number;
  interviewing: number;
  offer: number;
  rejected: number;
};

type FilterStatus = Status | "All";

type Application = {
  id: string;
  role: string;
  company: string;
  status: Status;
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [session, setSession] = useState<any>(null);

  const [formData, setFormData] = useState({
    role: "",
    company: "",
    status: "Applied" as Status,
  });

  // AI State
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Check session
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

  // Load applications and stats with token if logged in
  const loadData = async () => {
    if (!session) {
      setApplications([]);
      setStats({ total: 0, applied: 0, interviewing: 0, offer: 0, rejected: 0 });
      return;
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${session.access_token}`,
    };

    try {
      const apps = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/applications`, { headers }).then(res => res.json());
      setApplications(apps);

      const statsData = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stats/summary`, { headers }).then(res => res.json());
      setStats(statsData);
    } catch (err) {
      console.error("Failed to load data", err);
      setApplications([]);
      setStats({ total: 0, applied: 0, interviewing: 0, offer: 0, rejected: 0 });
    }
  };

  // Reload data whenever session changes
  useEffect(() => {
    loadData();
  }, [session]);

  const handleAddApplication = async () => {
    if (!session) return alert("You must be logged in to save applications!");
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
      body: JSON.stringify(formData),
    });
    setIsAddModalOpen(false);
    setFormData({ role: "", company: "", status: "Applied" });
    await loadData();
  };

  const handleDelete = async (id: string) => {
    if (!session) return alert("You must be logged in to delete applications!");
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/applications/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    await loadData();
  };

  const handleGenerateAI = async () => {
    if (!session) return alert("You must be logged in to use AI assistant!");
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    setAiError(null);
    setAiResponse(null);

    try {
      const res = await axios.post("/api/generate-text", { prompt: aiPrompt });
      setAiResponse(res.data.response);
    } catch {
      setAiError("Failed to generate text. Try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const filteredApps = statusFilter === "All"
    ? applications
    : applications.filter(a => a.status === statusFilter);

  return (
    <div className="min-h-screen bg-gray-50 p-8 md:p-10 text-gray-900">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Dashboard</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          disabled={!session}
          className={`px-4 py-2 rounded transition ${
            session ? "bg-indigo-600 text-white hover:bg-indigo-500" : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          + Add Application
        </button>
      </div>

      {/* STATS */}
      {stats ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <StatCard title="Total" value={stats.total} />
            <StatCard title="Applied" value={stats.applied} />
            <StatCard title="Interviewing" value={stats.interviewing} />
            <StatCard title="Offers" value={stats.offer} />
            <StatCard title="Rejected" value={stats.rejected} />
          </div>

          <div className="flex justify-center mb-10">
            <div className="bg-white p-6 rounded shadow w-full max-w-lg">
              <h2 className="font-semibold text-lg mb-4 text-center">Application Status</h2>
              <StatusChart stats={stats} />
            </div>
          </div>
        </>
      ) : (
        <StatsSkeleton />
      )}

      {/* APPLICATIONS */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h2 className="font-semibold text-lg mb-2 md:mb-0">Applications</h2>
          <StatusFilter value={statusFilter} onChange={setStatusFilter} />
        </div>

        {filteredApps.length > 0 ? (
          filteredApps.map(app => (
            <div key={app.id} className="flex justify-between border p-4 mt-4 rounded items-center">
              <div>
                <p className="font-semibold">{app.role}</p>
                <p className="text-gray-500">{app.company}</p>
              </div>
              <div className="flex gap-4 items-center">
                <StatusBadge status={app.status} />
                <button
                  onClick={() => handleDelete(app.id)}
                  disabled={!session}
                  className={`hover:underline ${!session ? "text-gray-400 cursor-not-allowed" : "text-red-500"}`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <EmptyState onAddClick={() => session && setIsAddModalOpen(true)} />
        )}
      </div>

      {/* AI Assistant */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Ask Job Assistant</h2>
        <textarea
          placeholder="Type your question..."
          value={aiPrompt}
          onChange={e => setAiPrompt(e.target.value)}
          className="w-full p-3 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={4}
          disabled={!session}
        />
        <button
          onClick={handleGenerateAI}
          disabled={aiLoading || !session}
          className={`px-4 py-2 rounded transition ${
            session ? "bg-indigo-600 text-white hover:bg-indigo-500" : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          {aiLoading ? "Generating..." : "Ask Assistant"}
        </button>
        {aiError && <p className="text-red-500 mt-2">{aiError}</p>}
        {aiResponse && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="font-semibold mb-2">Assistant's Response:</h3>
            <p>{aiResponse}</p>
          </div>
        )}
      </div>

      {/* ADD MODAL */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <h3 className="text-lg font-semibold mb-4">Add Application</h3>
        <div className="space-y-3">
          <input
            placeholder="Role"
            value={formData.role}
            onChange={e => setFormData({ ...formData, role: e.target.value })}
            className="border p-2 w-full rounded"
            disabled={!session}
          />
          <input
            placeholder="Company"
            value={formData.company}
            onChange={e => setFormData({ ...formData, company: e.target.value })}
            className="border p-2 w-full rounded"
            disabled={!session}
          />
          <select
            value={formData.status}
            onChange={e => setFormData({ ...formData, status: e.target.value as Status })}
            className="border p-2 w-full rounded"
            disabled={!session}
          >
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button
            onClick={handleAddApplication}
            disabled={!session}
            className={`w-full p-2 rounded transition ${
              session ? "bg-indigo-600 text-white hover:bg-indigo-500" : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Save Application
          </button>
        </div>
      </Modal>
    </div>
  );
}

// STAT CARD
function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white p-4 text-center rounded shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}