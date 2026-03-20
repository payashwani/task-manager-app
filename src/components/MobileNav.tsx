import { LayoutDashboard, CheckCircle2, Clock, Loader2 } from "lucide-react";

const filters = [
  { label: "All", value: "all", icon: LayoutDashboard },
  { label: "Pending", value: "pending", icon: Clock },
  { label: "In Progress", value: "in_progress", icon: Loader2 },
  { label: "Completed", value: "completed", icon: CheckCircle2 },
] as const;

interface MobileNavProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function MobileNav({ activeFilter, onFilterChange }: MobileNavProps) {
  return (
    <div className="flex md:hidden gap-2 overflow-x-auto pb-2 px-1 no-scrollbar">
      {filters.map((f) => {
        const active = activeFilter === f.value;
        return (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-150
              ${active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-secondary text-muted-foreground hover:bg-accent"
              }`}
          >
            <f.icon className="h-3.5 w-3.5" />
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
