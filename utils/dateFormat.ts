export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;

  const day = d?.getDate();
  const month = d?.toLocaleString("id-ID", { month: "short" }); // Jan, Feb, Mar...
  const year = d?.getFullYear();

  const hours = d?.getHours().toString().padStart(2, "0");
  const minutes = d?.getMinutes().toString().padStart(2, "0");

  return `${day} ${month} ${year}, ${hours}.${minutes}`;
}
