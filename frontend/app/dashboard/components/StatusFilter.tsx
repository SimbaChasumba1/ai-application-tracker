type Status = "All" | "Applied" | "Interviewing" | "Offer" | "Rejected";



export default function StatusFilter({

  value,

  onChange,

}: {

  value: Status;

  onChange: (value: Status) => void;

}) {

  return (

    <select

      value={value}

      onChange={(e) => onChange(e.target.value as Status)}

      className="border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"

    >

      <option value="All">All statuses</option>

      <option value="Applied">Applied</option>

      <option value="Interviewing">Interviewing</option>

      <option value="Offer">Offer</option>

      <option value="Rejected">Rejected</option>

    </select>

  );

}

