import { motion } from "framer-motion";
import type { Task } from "@/lib/api";

const statusConfig = {
  pending: { label: "Pending", className: "bg-status-pending-bg text-status-pending-fg" },
  in_progress: { label: "In Progress", className: "bg-status-progress-bg text-status-progress-fg" },
  completed: { label: "Completed", className: "bg-status-completed-bg text-status-completed-fg" },
};

interface StatusBadgeProps {
  status: Task["status"];
  onClick?: () => void;
}

export default function StatusBadge({ status, onClick }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-shadow hover:shadow-sm cursor-pointer ${config.className}`}
      title="Click to cycle status"
    >
      {config.label}
    </motion.button>
  );
}
