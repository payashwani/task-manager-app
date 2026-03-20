import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import TaskSidebar from "@/components/TaskSidebar";
import MobileNav from "@/components/MobileNav";
import SummaryCards from "@/components/SummaryCards";
import AddTaskForm from "@/components/AddTaskForm";
import TaskCard from "@/components/TaskCard";
import TaskSkeleton from "@/components/TaskSkeleton";
import EmptyState from "@/components/EmptyState";
import { Toaster } from "@/components/ui/toaster";
import { useTasks, cycleStatus } from "@/hooks/useTasks";
import type { Task } from "@/lib/api";

export default function Index() {
  const [filter, setFilter] = useState("all");
  const { query, createMutation, deleteMutation, updateMutation } = useTasks();

  const tasks: Task[] = query.data ?? [];

  const counts = useMemo(() => ({
    all: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    in_progress: tasks.filter((t) => t.status === "in_progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  }), [tasks]);

  const filtered = filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  const handleCycle = (id: string | number, current: Task["status"]) => {
    updateMutation.mutate({ id, status: cycleStatus(current) });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <TaskSidebar activeFilter={filter} onFilterChange={setFilter} counts={counts} />

      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm px-6 py-4 md:px-8">
          <h1 className="text-xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Track and manage your tasks</p>
        </header>

        <div className="flex-1 p-6 md:p-8 space-y-6 max-w-5xl w-full mx-auto">
          {/* Mobile filters */}
          <MobileNav activeFilter={filter} onFilterChange={setFilter} />

          {/* Summary */}
          <SummaryCards counts={counts} />

          {/* Add task form */}
          <AddTaskForm
            onSubmit={(data) => createMutation.mutate(data)}
            isLoading={createMutation.isPending}
          />

          {/* Task list */}
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-3">
              {filter === "all" ? "All Tasks" : filter === "pending" ? "Pending" : filter === "in_progress" ? "In Progress" : "Completed"}
              <span className="ml-2 text-muted-foreground font-normal">({filtered.length})</span>
            </h2>

            {query.isLoading ? (
              <TaskSkeleton />
            ) : filtered.length === 0 ? (
              <EmptyState filter={filter} />
            ) : (
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {filtered.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onDelete={(id) => deleteMutation.mutate(id)}
                      onCycleStatus={handleCycle}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
