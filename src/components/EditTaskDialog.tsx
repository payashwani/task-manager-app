import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Task } from "@/lib/api";

interface EditTaskDialogProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string | number, data: { title: string; description: string; status: Task["status"] }) => void;
  isLoading: boolean;
}

export default function EditTaskDialog({ task, open, onOpenChange, onSave, isLoading }: EditTaskDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Task["status"]>("pending");
  const [error, setError] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setStatus(task.status);
      setError("");
    }
  }, [task]);

  const handleSave = () => {
    const trimmed = title.trim();
    if (!trimmed) { setError("Title is required"); return; }
    setError("");
    onSave(task!.id, { title: trimmed, description: description.trim(), status });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <Input
              placeholder="Task title..."
              value={title}
              onChange={(e) => { setTitle(e.target.value); if (error) setError(""); }}
              className={`bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-primary ${error ? "ring-1 ring-destructive" : ""}`}
            />
            {error && <p className="mt-1.5 text-xs text-destructive font-medium">{error}</p>}
          </div>
          <Textarea
            placeholder="Description (optional)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-primary resize-none"
          />
          <Select value={status} onValueChange={(v) => setStatus(v as Task["status"])}>
            <SelectTrigger className="bg-secondary/50 border-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
