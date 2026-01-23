"use client";



import { useState } from "react";



export default function AIInsights() {

  const [loading, setLoading] = useState(false);

  const [insight, setInsight] = useState<string | null>(null);



  const generateInsights = async () => {

    setLoading(true);

    setTimeout(() => {

      setInsight(

        "Based on your recent rejections, your resume may be missing keywords related to system design and API scalability. Consider emphasizing REST architecture, caching strategies, and production monitoring."

      );

      setLoading(false);

    }, 1200);

  };



  return (

    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">

      <h2 className="text-xl font-semibold mb-4">AI Job Search Insights</h2>



      <button

        onClick={generateInsights}

        className="px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500 transition"

      >

        Generate Insights

      </button>



      {loading && <p className="mt-4 text-slate-400">Analyzing applications...</p>}

      {insight && <p className="mt-4 text-slate-300">{insight}</p>}

    </div>

  );

}







