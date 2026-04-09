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
  href="https://github.com/SimbaChasumba1/ai-application-tracker"
  target="_blank"
  rel="noopener noreferrer"
  className="px-6 py-3 border border-slate-600 rounded-lg hover:bg-slate-800 transition"
           >
              View Source
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}