import React from 'react';
import { Button } from "@/components/ui/button";
import { Task } from '@/app/api/clickup/task/route';

interface TaskListProps {
  tasks: Task[];
  onTaskEdit: (task: Task) => void;
  onTaskClose: (taskId: string) => void;
}

export function TaskList({ tasks, onTaskEdit, onTaskClose }: TaskListProps) {
  return (
    <div className="flex flex-col w-128 font-semibold text-xs space-y-2">
      {tasks.map((task) => (
        <div key={task.id} className="p-2 border border-gray-300 flex justify-between items-center space-x-2">
          <h2>{task.name}</h2>
          <div className='w-30 flex-nowrap'>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onTaskEdit(task)}
              className="mr-2"
            >
              Edit
            </Button>
            {task.status !== 'closed' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onTaskClose(task.id)}
              >
                Close
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}