import { LayoutDashboard, CheckCircle2, Clock, Loader2, ListTodo } from "lucide-react";

const filters = [
  { label: "All Tasks", value: "all", icon: LayoutDashboard },
  { label: "Pending", value: "pending", icon: Clock },
  { label: "In Progress", value: "in_progress", icon: Loader2 },
  { label: "Completed", value: "completed", icon: CheckCircle2 },
] as const;

interface TaskSidebarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  counts: { all: number; pending: number; in_progress: number; completed: number };
}

export default function TaskSidebar({ activeFilter, onFilterChange, counts }: TaskSidebarProps) {
  return (
    <aside className="hidden md:flex w-64 flex-col sidebar-gradient border-r border-sidebar-border">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
          <ListTodo className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        <div>
          <h1 className="text-base font-bold text-sidebar-accent-foreground tracking-tight">Taskflow</h1>
          <p className="text-xs text-sidebar-muted">Manage your work</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {filters.map((f) => {
          const active = activeFilter === f.value;
          return (
            <button
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150
                ${active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                }`}
            >
              <f.icon className={`h-4 w-4 transition-colors ${active ? "text-sidebar-primary" : "text-sidebar-muted group-hover:text-sidebar-foreground"}`} />
              <span className="flex-1 text-left">{f.label}</span>
              <span className={`text-xs tabular-nums ${active ? "text-sidebar-primary" : "text-sidebar-muted"}`}>
                {counts[f.value as keyof typeof counts]}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="px-6 py-4 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-muted">© 2026 Taskflow</p>
      </div>
    </aside>
  );
}
