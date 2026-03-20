import { LayoutDashboard, CheckCircle2, Clock, Loader2 } from "lucide-react";

interface SummaryCardsProps {
  counts: { all: number; pending: number; in_progress: number; completed: number };
}

const cards = [
  { label: "Total Tasks", key: "all" as const, icon: LayoutDashboard, color: "text-primary", bg: "bg-primary/10" },
  { label: "Pending", key: "pending" as const, icon: Clock, color: "text-status-pending", bg: "bg-status-pending-bg" },
  { label: "In Progress", key: "in_progress" as const, icon: Loader2, color: "text-status-progress", bg: "bg-status-progress-bg" },
  { label: "Completed", key: "completed" as const, icon: CheckCircle2, color: "text-status-completed", bg: "bg-status-completed-bg" },
];

export default function SummaryCards({ counts }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <div
          key={c.key}
          className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{c.label}</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-card-foreground">{counts[c.key]}</p>
            </div>
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.bg} transition-transform duration-200 group-hover:scale-110`}>
              <c.icon className={`h-5 w-5 ${c.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
