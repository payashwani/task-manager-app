export default function TaskSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-border bg-card p-5 animate-pulse">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div className="h-4 w-3/5 rounded-md bg-muted" />
              <div className="h-3 w-4/5 rounded-md bg-muted" />
              <div className="h-6 w-20 rounded-full bg-muted" />
            </div>
            <div className="h-8 w-8 rounded-lg bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
