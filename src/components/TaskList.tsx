import { Task } from '@/lib/types';

interface Props {
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
}

export default function TaskList({ tasks, onUpdateTask }: Props) {
  return (
    <ul className="space-y-4 mb-4">
      {tasks.map(task => (
        <li key={task.id} className="border p-4 rounded">
          <h3 className="font-bold">{task.name}</h3>
          <p>Estimated duration: {task.estimatedDuration} hours</p>
          <p>Due date: {task.dueDate.toLocaleDateString()}</p>
          {task.startDate && <p>Start date: {task.startDate.toLocaleDateString()}</p>}
          <button
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {/* Open edit form */}}
          >
            Edit
          </button>
        </li>
      ))}
    </ul>
  );
}