import AIInsights from "../dashboard/components/AIInsights";



export default function Dashboard() {

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-3xl font-bold mb-8">Job Application Dashboard</h1>



      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">

          <h2 className="font-semibold mb-2">Applications</h2>

          <p className="text-slate-400">24 Total</p>

        </div>



        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">

          <h2 className="font-semibold mb-2">Interviews</h2>

          <p className="text-slate-400">5 Active</p>

        </div>



        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">

          <h2 className="font-semibold mb-2">Offers</h2>

          <p className="text-slate-400">1 Received</p>

        </div>

      </div>



      <div className="mt-10">

        <AIInsights />

      </div>

    </div>

  );

}