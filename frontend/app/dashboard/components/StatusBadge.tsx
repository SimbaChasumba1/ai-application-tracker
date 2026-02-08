type Status =
  | "Applied"
  | "Interviewing"
  | "Offer"
  | "Rejected";

export default function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    Applied: "bg-blue-100 text-blue-700",
    Interviewing: "bg-yellow-100 text-yellow-700",
    Offer: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}