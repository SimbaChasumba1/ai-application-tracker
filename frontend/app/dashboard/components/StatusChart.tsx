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

        label: "Applications",

        data: [

          stats.applied,

          stats.interviewing,

          stats.offer,

          stats.rejected,

        ],

        backgroundColor: [

          "rgba(99, 102, 241, 0.7)", // Indigo

          "rgba(16, 185, 129, 0.7)", // Green

          "rgba(234, 179, 8, 0.7)", // Yellow

          "rgba(239, 68, 68, 0.7)", // Red

        ],

        borderColor: [

          "rgba(99, 102, 241, 1)",

          "rgba(16, 185, 129, 1)",

          "rgba(234, 179, 8, 1)",

          "rgba(239, 68, 68, 1)",

        ],

        borderWidth: 1,

      },

    ],

  };



  return <Pie data={data} />;

}