import { motion } from "framer-motion";
import { Trash2, Calendar, Pencil } from "lucide-react";
import StatusBadge from "./StatusBadge";
import type { Task } from "@/lib/api";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string | number) => void;
  onCycleStatus: (id: string | number, currentStatus: Task["status"]) => void;
  onEdit: (task: Task) => void;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return null;
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    });
  } catch { return null; }
}

export default function TaskCard({ task, onDelete, onCycleStatus, onEdit }: TaskCardProps) {
  const date = formatDate(task.createdAt || (task as any).created_at);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className="group relative rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:shadow-md hover:border-primary/20"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className={`text-sm font-semibold text-card-foreground leading-snug ${task.status === "completed" ? "line-through opacity-60" : ""}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2 leading-relaxed">{task.description}</p>
          )}
          <div className="mt-3 flex items-center gap-3">
            <StatusBadge status={task.status} onClick={() => onCycleStatus(task.id, task.status)} />
            {date && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {date}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(task)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all duration-150 hover:bg-accent hover:text-accent-foreground"
            title="Edit task"
          >
            <Pencil className="h-4 w-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(task.id)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-destructive transition-all duration-150 hover:bg-destructive/10"
            title="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
