export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 space-y-6">
      <div className="h-64 rounded-2xl bg-slate-100 animate-pulse" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1,2,3,4,5,6].map(i=> <div key={i} className="h-80 rounded-2xl bg-slate-100 animate-pulse" />)}
      </div>
    </div>
  );
}
