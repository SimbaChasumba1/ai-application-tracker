export default function Home() {

  return (

    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">

      <section className="max-w-7xl mx-auto px-8 py-32">

        <div className="max-w-3xl">

          <h1 className="text-5xl font-bold leading-tight mb-6">

            AI Job Application Tracker

          </h1>

          <p className="text-xl text-slate-300 mb-10">

            Track your job applications, analyze outcomes, and receive

            AI-powered insights to improve your interview success rate.

          </p>



          <div className="flex gap-4">

            <a

              href="/dashboard"

              className="px-6 py-3 bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-500 transition"

            >

              Open Dashboard

            </a>

            <a

              href="https://github.com/yourusername/ai-application-tracker"

              className="px-6 py-3 border border-slate-600 rounded-lg hover:bg-slate-800 transition"

            >

              View Source

            </a>

          </div>

        </div>

      </section>



      <section className="bg-slate-900/50 py-20">

        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-10">

          <Feature title="Application Tracking" desc="Centralized management of all job applications with lifecycle status and history." />

          <Feature title="AI Insights" desc="LLM-powered analysis of job descriptions and application outcomes with actionable suggestions." />

          <Feature title="Analytics Dashboard" desc="Visual breakdown of progress, bottlenecks, and success patterns." />

        </div>

      </section>

    </main>

  );

}



function Feature({ title, desc }: { title: string; desc: string }) {

  return (

    <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">

      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      <p className="text-slate-400">{desc}</p>

    </div>

  );

}