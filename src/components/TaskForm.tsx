import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Task } from '@/app/api/clickup/task/route';

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (taskData: any) => void;
  onCancel: () => void;
}

export function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
  const [name, setName] = useState(task?.name || '');
  const [description, setDescription] = useState(task?.description || '');
  const [startDate, setStartDate] = useState(task?.start_date || null);
  const [dueDate, setDueDate] = useState(task?.due_date || null);
  const [timeEstimate, setTimeEstimate] = useState(task?.time_estimate ? (parseInt(task.time_estimate)/1000/60).toString() : '');

  useEffect(() => {
    setName(task?.name || '');
    setDescription(task?.description || '');
    setStartDate(task?.start_date || null);
    setDueDate(task?.due_date || null);
    setTimeEstimate(task?.time_estimate ? (parseInt(task.time_estimate)/1000/60).toString() : '');

  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      start_date: startDate,
      due_date: dueDate,
      time_estimate: parseInt(timeEstimate) * 60 * 1000,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-1 w-full max-w-xl">
      <Input
        placeholder="Task name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {/* <DateTimePicker
        label="Start Date"
        value={startDate}
        onChange={setStartDate}
      />
      <DateTimePicker
        label="Due Date"
        value={dueDate}
        onChange={setDueDate}
      /> */}
      <Input
        type="number"
        placeholder="Time estimate (in minutes)"
        value={timeEstimate}
        onChange={(e) => setTimeEstimate(e.target.value)}
      />
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {task ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
}