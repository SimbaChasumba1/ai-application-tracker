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



  const [isInsightModalOpen, setIsInsightModalOpen] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);



  const [formData, setFormData] = useState({

    role: "",

    company: "",

    status: "Applied",

  });



  useEffect(() => {

    fetch("http://localhost:5000/health")

      .then(() => setApiStatus("online"))

      .catch(() => setApiStatus("offline"));



    fetch("http://localhost:5000/stats/summary")

      .then((res) => res.json())

      .then(setStats)

      .catch(() => setStats(null));

  }, []);



  const handleInputChange = (

    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>

  ) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });

  };



  const handleAddApplication = () => {

    console.log("New Application:", formData);

    setIsAddModalOpen(false);

  };



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



        <div className="flex items-center gap-4 mt-4 md:mt-0">

          <button

            className="bg-black text-white px-4 py-2 rounded hover:opacity-80 transition"

            onClick={() => setIsAddModalOpen(true)}

          >

            + Add Application

          </button>



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

        <div className="flex justify-between items-center">

          <div>

            <h2 className="text-xl font-semibold mb-2">

              AI Insights

            </h2>

            <p className="text-gray-600">

              Intelligent recommendations to improve response rates.

            </p>

          </div>



          <button

            className="bg-black text-white px-4 py-2 rounded hover:opacity-80 transition"

            onClick={() => setIsInsightModalOpen(true)}

          >

            Generate Insights

          </button>

        </div>

      </div>



      {/* Applications */}

      <div className="bg-white rounded-xl shadow p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-xl font-semibold">

            Recent Applications

          </h2>

          <StatusFilter

            value={statusFilter}

            onChange={setStatusFilter}

          />

        </div>



        <div className="mb-4 flex items-center justify-between border rounded-lg p-4">

          <div>

            <p className="font-medium">Frontend Developer</p>

            <p className="text-sm text-gray-500">Acme Corp</p>

          </div>

          <StatusBadge status="Interviewing" />

        </div>



        <EmptyState />

      </div>



      {/* AI Insight Modal */}

      <Modal

        isOpen={isInsightModalOpen}

        onClose={() => setIsInsightModalOpen(false)}

      >

        <h3 className="text-lg font-semibold mb-2">

          AI Insight Preview

        </h3>

        <p className="text-gray-600 mb-4">

          AI-generated recommendations will appear here.

        </p>

      </Modal>



      {/* Add Application Modal */}

      <Modal

        isOpen={isAddModalOpen}

        onClose={() => setIsAddModalOpen(false)}

      >

        <h3 className="text-lg font-semibold mb-4">

          Add New Application

        </h3>



        <div className="space-y-4">

          <input

            name="role"

            placeholder="Role"

            value={formData.role}

            onChange={handleInputChange}

            className="w-full border rounded px-3 py-2"

          />



          <input

            name="company"

            placeholder="Company"

            value={formData.company}

            onChange={handleInputChange}

            className="w-full border rounded px-3 py-2"

          />



          <select

            name="status"

            value={formData.status}

            onChange={handleInputChange}

            className="w-full border rounded px-3 py-2"

          >

            <option>Applied</option>

            <option>Interviewing</option>

            <option>Offer</option>

            <option>Rejected</option>

          </select>



          <button

            onClick={handleAddApplication}

            className="w-full bg-black text-white py-2 rounded hover:opacity-80 transition"

          >

            Save Application

          </button>

        </div>

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



