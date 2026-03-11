export default function DashboardLayout({
  list,
  details,
  transactions,
}: {
  children: React.ReactNode;
  list: React.ReactNode;
  details: React.ReactNode;
  transactions: React.ReactNode;
}) {
  return (
    <main className="container mx-auto h-[var(--dashboard-h)] px-4 py-4 grid min-h-0 overflow-hidden grid-cols-2 gap-6">
      <aside className="min-h-0 flex flex-col gap-2">{list}</aside>
      <div className="min-h-0 grid grid-rows-2 gap-2">
        <section className="min-h-0 flex-1 w-full">{details}</section>
        <section className="min-h-0 flex-1 w-full">{transactions}</section>
      </div>
    </main>
  );
}
