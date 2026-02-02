export default function EmptyState() {

  return (

    <div className="bg-white rounded-xl shadow p-12 text-center">

      <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">

        <span className="text-xl">📄</span>

      </div>



      <h3 className="text-xl font-semibold mb-2">

        No applications yet

      </h3>



      <p className="text-gray-500 mb-6 max-w-md mx-auto">

        Start tracking your job applications to see progress analytics,

        AI insights, and follow-up recommendations.

      </p>



      <button className="bg-black text-white px-6 py-2 rounded-lg hover:opacity-80 transition">

        Add your first application

      </button>

    </div>

  );

}