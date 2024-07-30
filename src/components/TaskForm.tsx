import { useState } from 'react';
import { Task } from '@/lib/types';

interface Props {
  onSubmit: (task: Task) => void;
  initialTask?: Task;
}

export default function TaskForm({ onSubmit, initialTask }: Props) {
  const [task, setTask] = useState<Partial<Task>>(initialTask || {});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(task as Task);
    setTask({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Task name"
        value={task.name || ''}
        onChange={(e) => setTask({ ...task, name: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Estimated duration (hours)"
        value={task.estimatedDuration || ''}
        onChange={(e) => setTask({ ...task, estimatedDuration: parseFloat(e.target.value) })}
        className="w-full p-2 border rounded"
      />
      <input
        type="date"
        placeholder="Due date"
        value={task.dueDate?.toISOString().split('T')[0] || ''}
        onChange={(e) => setTask({ ...task, dueDate: new Date(e.target.value) })}
        className="w-full p-2 border rounded"
      />
      <input
        type="date"
        placeholder="Start date (optional)"
        value={task.startDate?.toISOString().split('T')[0] || ''}
        onChange={(e) => setTask({ ...task, startDate: new Date(e.target.value) })}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded">
        {initialTask ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
}