import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Task } from "@/app/api/clickup/task/route";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (taskData: TaskData) => void;
  onCancel: () => void;
}

export interface TaskData {
  name: string;
  description: string;
  start_date?: number;
  due_date?: number;
  time_estimate: number;
  start_date_time: boolean;
  due_date_time: boolean;
}

export function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
  const [name, setName] = useState(task?.name || "");
  const [description, setDescription] = useState(task?.description || "");
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(
    task?.start_date ? dayjs(parseInt(task.start_date)) : null
  );
  const [dueDate, setDueDate] = useState<dayjs.Dayjs | null>(
    task?.due_date ? dayjs(parseInt(task.due_date)) : null
  );
  const [timeEstimate, setTimeEstimate] = useState(
    task?.time_estimate
      ? (parseInt(task.time_estimate) / 1000 / 60).toString()
      : ""
  );

  useEffect(() => {
    setName(task?.name || "");
    setDescription(task?.description || "");
    setStartDate(task?.start_date ? dayjs(parseInt(task.start_date)) : null);
    setDueDate(task?.due_date ? dayjs(parseInt(task.due_date)) : null);
    setTimeEstimate(
      task?.time_estimate
        ? (parseInt(task.time_estimate) / 1000 / 60).toString()
        : ""
    );
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      start_date: startDate?.valueOf(),
      due_date: dueDate?.valueOf(),
      time_estimate: parseInt(timeEstimate) * 60 * 1000,
      start_date_time: true,
      due_date_time: true,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-1 w-full max-w-xl flex flex-col"
    >
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
      <div className="flex items-center">
        <DateTimePicker
          label="Start Date"
          value={startDate}
          onChange={setStartDate}
          views={["month", "day", "hours", "minutes"]}
        />
        <button onClick={() => setStartDate(null)} className="ml-2">
          Clear
        </button>
      </div>
      <div className="flex items-center">
        <DateTimePicker
          label="Due Date"
          value={dueDate}
          onChange={setDueDate}
          views={["month", "day", "hours", "minutes"]}
        />
        <button onClick={() => setDueDate(null)} className="ml-2">
          Clear
        </button>
      </div>
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
        <Button type="submit">{task ? "Update Task" : "Create Task"}</Button>
      </div>
    </form>
  );
}
