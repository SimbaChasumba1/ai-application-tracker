export default function Home() {

  return (

    <div className="min-h-screen bg-gray-950 text-white">

      {/* Header */}

      <header className="flex items-center justify-between px-10 py-6 border-b border-gray-800">

        <h1 className="text-xl font-bold tracking-wide">AI Job Application Tracker</h1>

        <div className="flex items-center gap-4">

          <div className="w-9 h-9 rounded-full bg-gray-700" />

        </div>

      </header>



      {/* Hero */}

      <section className="px-10 py-12">

        <h2 className="text-4xl font-bold leading-tight max-w-2xl">

          Track your job search like a high-performance system

        </h2>

        <p className="text-gray-400 mt-3 max-w-xl">

          Manage applications, analyze outcomes, and receive AI-powered insights to

          optimize your chances of landing interviews and offers.

        </p>

      </section>



      {/* Stats */}

      <section className="grid grid-cols-5 gap-4 px-10">

        {[

          ["Total Applications", "42"],

          ["Interviews", "9"],

          ["Offers", "2"],

          ["Rejections", "18"],

          ["Avg Response Time", "6.4 days"]

        ].map(([label, value]) => (

          <div key={label} className="bg-gray-900 p-4 rounded-xl border border-gray-800">

            <p className="text-sm text-gray-400">{label}</p>

            <p className="text-2xl font-semibold mt-1">{value}</p>

          </div>

        ))}

      </section>



      {/* Main Grid */}

      <section className="grid grid-cols-3 gap-6 px-10 py-10">

        {/* Applications Table */}

        <div className="col-span-2 bg-gray-900 rounded-xl border border-gray-800 p-5">

          <h3 className="font-semibold mb-4">Recent Applications</h3>

          <table className="w-full text-sm">

            <thead className="text-gray-400">

              <tr>

                <th className="text-left">Company</th>

                <th>Role</th>

                <th>Status</th>

                <th>AI Match</th>

              </tr>

            </thead>

            <tbody>

              {[

                ["Google", "Software Engineer", "Interviewing", "87%"],

                ["Amazon", "Backend Developer", "Applied", "81%"],

                ["Meta", "Full-Stack Engineer", "Rejected", "78%"],

                ["Stripe", "API Engineer", "Offer", "92%"]

              ].map(([c, r, s, a]) => (

                <tr key={c} className="border-t border-gray-800">

                  <td className="py-2">{c}</td>

                  <td className="text-center">{r}</td>

                  <td className="text-center">{s}</td>

                  <td className="text-center text-emerald-400">{a}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>



        {/* AI Insights */}

        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">

          <h3 className="font-semibold mb-3">AI Insights</h3>

          <ul className="text-sm text-gray-300 space-y-3">

            <li>• Your profile performs best for Backend & Full-Stack roles.</li>

            <li>• Node.js + SQL keywords increase callbacks by 32%.</li>

            <li>• Suggested follow-up available for 3 active applications.</li>

          </ul>

          <button className="mt-4 w-full py-2 bg-indigo-600 rounded-lg text-sm font-medium">

            Generate Follow-Up

          </button>

        </div>

      </section>

    </div>

  );

}



