"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type Stats = {
  applied: number;
  interviewing: number;
  offer: number;
  rejected: number;
};

export default function StatusChart({ stats }: { stats: Stats }) {
  const data = {
    labels: ["Applied", "Interviewing", "Offers", "Rejected"],
    datasets: [
      {
        data: [
          stats.applied,
          stats.interviewing,
          stats.offer,
          stats.rejected,
        ],
        backgroundColor: [
          "#6366F1",
          "#10B981",
          "#F59E0B",
          "#EF4444",
        ],
        borderWidth: 0,
      },
    ],
  };

  return <Pie data={data} />;
}