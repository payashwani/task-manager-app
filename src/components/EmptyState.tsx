import { ClipboardList } from "lucide-react";

export default function EmptyState({ filter }: { filter: string }) {
  const messages: Record<string, string> = {
    all: "No tasks yet. Create your first task to get started!",
    pending: "No pending tasks. You're all caught up!",
    in_progress: "Nothing in progress right now.",
    completed: "No completed tasks yet. Keep going!",
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-muted mb-6">
        <ClipboardList className="h-10 w-10 text-muted-foreground/50" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">No tasks found</h3>
      <p className="text-sm text-muted-foreground max-w-sm">{messages[filter] || messages.all}</p>
    </div>
  );
}
