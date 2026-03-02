export default function DashboardLayout({
  children: _children,
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
    <main className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-2 gap-6">
        <aside>{list}</aside>
        <div className="min-h-[200px] grid grid-rows-2 gap-6">
          <main>{details}</main>
          <section>{transactions}</section>
        </div>
      </div>
    </main>
  );
}
