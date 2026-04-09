"use client";

import { useEffect, useState } from "react";
import StatusBadge from "./components/StatusBadge";
import EmptyState from "./components/EmptyState";
import Modal from "./components/Modal";
import StatusFilter from "./components/StatusFilter";
import StatusChart from "./components/StatusChart";
import StatsSkeleton from "./components/StatsSkeleton";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

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

  const [formData, setFormData] = useState({
    role: "",
    company: "",
    status: "Applied" as Status,
  });

  const loadData = async () => {
    try {
      const apps = await fetch(`${API_URL}/applications`).then(res => res.json());
      setApplications(apps);

      const statsData = await fetch(`${API_URL}/stats/summary`).then(res => res.json());
      setStats(statsData);
    } catch (err) {
      console.error(err);
      setStats({ total: 0, applied: 0, interviewing: 0, offer: 0, rejected: 0 });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddApplication = async () => {
    await fetch(`${API_URL}/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setIsAddModalOpen(false);
    setFormData({ role: "", company: "", status: "Applied" });
    await loadData();
  };

  const handleDelete = async (id: string) => {
    await fetch(`${API_URL}/applications/${id}`, { method: "DELETE" });
    await loadData();
  };

  const filteredApps =
    statusFilter === "All"
      ? applications
      : applications.filter(a => a.status === statusFilter);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 text-gray-900">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 transition"
        >
          + Add Application
        </button>
      </div>

      {/* STATS */}
      {stats ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
            <StatCard title="Total" value={stats.total} />
            <StatCard title="Applied" value={stats.applied} />
            <StatCard title="Interviewing" value={stats.interviewing} />
            <StatCard title="Offers" value={stats.offer} />
            <StatCard title="Rejected" value={stats.rejected} />
          </div>

          <div className="flex justify-center mb-10">
            <div className="bg-white p-4 md:p-6 rounded shadow w-full max-w-lg">
              <h2 className="font-semibold text-lg mb-4 text-center">Application Status</h2>
              <StatusChart stats={stats} />
            </div>
          </div>
        </>
      ) : (
        <StatsSkeleton />
      )}

      {/* APPLICATIONS */}
      <div className="bg-white p-4 md:p-6 rounded shadow mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <h2 className="font-semibold text-lg">Applications</h2>
          <StatusFilter value={statusFilter} onChange={setStatusFilter} />
        </div>

        {filteredApps.length > 0 ? (
          filteredApps.map(app => (
            <div key={app.id} className="flex flex-col sm:flex-row justify-between border p-4 mt-4 rounded gap-3">
              <div>
                <p className="font-semibold">{app.role}</p>
                <p className="text-gray-500">{app.company}</p>
              </div>

              <div className="flex gap-4 items-center">
                <StatusBadge status={app.status} />
                <button
                  onClick={() => handleDelete(app.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <EmptyState onAddClick={() => setIsAddModalOpen(true)} />
        )}
      </div>

      {/* MODAL */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <h3 className="text-lg font-semibold mb-4">Add Application</h3>
        <div className="space-y-3">
          <input
            placeholder="Role"
            value={formData.role}
            onChange={e => setFormData({ ...formData, role: e.target.value })}
            className="border p-2 w-full rounded"
          />
          <input
            placeholder="Company"
            value={formData.company}
            onChange={e => setFormData({ ...formData, company: e.target.value })}
            className="border p-2 w-full rounded"
          />
          <select
            value={formData.status}
            onChange={e => setFormData({ ...formData, status: e.target.value as Status })}
            className="border p-2 w-full rounded"
          >
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button
            onClick={handleAddApplication}
            className="bg-indigo-600 text-white p-2 w-full rounded hover:bg-indigo-500 transition"
          >
            Save Application
          </button>
        </div>
      </Modal>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white p-4 text-center rounded shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}