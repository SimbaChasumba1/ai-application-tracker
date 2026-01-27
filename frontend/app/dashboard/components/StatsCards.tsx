"use client";

import { useEffect, useState } from "react";



type Stats = {

  total: number;

  applied: number;

  interviewing: number;

  offer: number;

  rejected: number;

};



export default function StatsCards() {

  const [stats, setStats] = useState<Stats | null>(null);



  useEffect(() => {

    fetch("http://localhost:5000/stats/summary")

      .then(res => res.json())

      .then(setStats);

  }, []);



  if (!stats) return null;



  return (

    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">

      {Object.entries(stats).map(([key, value]) => (

        <div key={key} className="bg-white rounded-xl shadow p-4 text-center">

          <p className="text-sm text-gray-500 uppercase">{key}</p>

          <p className="text-2xl font-bold">{value}</p>

        </div>

      ))}

    </div>

  );

}