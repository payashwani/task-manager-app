import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import TaskSidebar from "@/components/TaskSidebar";
import MobileNav from "@/components/MobileNav";
import SummaryCards from "@/components/SummaryCards";
import AddTaskForm from "@/components/AddTaskForm";
import TaskCard from "@/components/TaskCard";
import TaskSkeleton from "@/components/TaskSkeleton";
import EmptyState from "@/components/EmptyState";
import EditTaskDialog from "@/components/EditTaskDialog";
import { Toaster } from "@/components/ui/toaster";
import { useTasks, cycleStatus } from "@/hooks/useTasks";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Task } from "@/lib/api";

export default function Index() {
  const [filter, setFilter] = useState("all");
  const { query, createMutation, deleteMutation, updateMutation } = useTasks();

  const [editTask, setEditTask] = useState<Task | null>(null);
  const [deleteId, setDeleteId] = useState<string | number | null>(null);

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

  const confirmDelete = () => {
    if (deleteId !== null) {
      deleteMutation.mutate(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <TaskSidebar activeFilter={filter} onFilterChange={setFilter} counts={counts} />

      <main className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm px-6 py-4 md:px-8">
          <h1 className="text-xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Track and manage your tasks</p>
        </header>

        <div className="flex-1 p-6 md:p-8 space-y-6 max-w-5xl w-full mx-auto">
          <MobileNav activeFilter={filter} onFilterChange={setFilter} />
          <SummaryCards counts={counts} />
          <AddTaskForm onSubmit={(data) => createMutation.mutate(data)} isLoading={createMutation.isPending} />

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
                      onDelete={(id) => setDeleteId(id)}
                      onCycleStatus={handleCycle}
                      onEdit={(t) => setEditTask(t)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Edit dialog */}
      <EditTaskDialog
        task={editTask}
        open={!!editTask}
        onOpenChange={(open) => { if (!open) setEditTask(null); }}
        onSave={(id, data) => updateMutation.mutate({ id, ...data })}
        isLoading={updateMutation.isPending}
      />

      {/* Delete confirmation */}
      <AlertDialog open={deleteId !== null} onOpenChange={(open) => { if (!open) setDeleteId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
            <AlertDialogDescription>Are you sure you want to delete this task? This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
