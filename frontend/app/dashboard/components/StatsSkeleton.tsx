export default function StatsSkeleton() {

  return (

    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10 animate-pulse">

      {Array.from({ length: 5 }).map((_, index) => (

        <div

          key={index}

          className="bg-white rounded-xl shadow p-4 text-center"

        >

          <div className="h-3 bg-gray-200 rounded w-16 mx-auto mb-3" />

          <div className="h-6 bg-gray-200 rounded w-10 mx-auto" />

        </div>

      ))}

    </div>

  );

}



