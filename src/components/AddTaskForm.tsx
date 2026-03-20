import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AddTaskFormProps {
  onSubmit: (data: { title: string; description: string; status: string }) => void;
  isLoading: boolean;
}

export default function AddTaskForm({ onSubmit, isLoading }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError("Title is required");
      return;
    }
    setError("");
    onSubmit({ title: trimmed, description: description.trim(), status: "pending" });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-5">
      <h2 className="text-sm font-semibold text-card-foreground mb-4">New Task</h2>
      <div className="space-y-3">
        <div>
          <Input
            placeholder="Task title..."
            value={title}
            onChange={(e) => { setTitle(e.target.value); if (error) setError(""); }}
            className={`bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-primary ${error ? "ring-1 ring-destructive" : ""}`}
          />
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1.5 text-xs text-destructive font-medium"
            >
              {error}
            </motion.p>
          )}
        </div>
        <Textarea
          placeholder="Description (optional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-primary resize-none"
        />
        <Button type="submit" disabled={isLoading} className="w-full gap-2">
          <Plus className="h-4 w-4" />
          {isLoading ? "Adding..." : "Add Task"}
        </Button>
      </div>
    </form>
  );
}
