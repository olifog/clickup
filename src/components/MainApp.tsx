"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useSWR from "swr";
import { User } from "@/components/User";
import { Breadcrumb } from "@/components/BreadCrumb";
import { SpaceList } from "@/components/SpaceList";
import { TaskList } from "@/components/TaskList";
import { ListList } from "@/components/ListList";
import { TaskForm } from "@/components/TaskForm";
import { Task, TaskResponse } from "@/app/api/clickup/task/route";
import { TeamResponse } from "@/app/api/clickup/team/route";
import { SpaceResponse } from "@/app/api/clickup/space/route";
import { ListResponse } from "@/app/api/clickup/list/route";

export default function TaskManagement() {
  const { data: session } = useSession();
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const { data: teams } = useSWR<TeamResponse>(
    session
      ? { url: "/api/clickup/team", accessToken: session.user.accessToken }
      : null
  );

  const team = teams?.teams[0];

  const { data: spaces } = useSWR<SpaceResponse>(
    team
      ? {
          url: `/api/clickup/space`,
          accessToken: session.user.accessToken,
          params: { teamId: team.id },
        }
      : null
  );

  const { data: lists } = useSWR<ListResponse>(
    selectedSpaceId
      ? {
          url: `/api/clickup/list`,
          accessToken: session.user.accessToken,
          params: { spaceId: selectedSpaceId },
        }
      : null
  );

  const {
    data: tasks,
    mutate: mutateTasks,
    isLoading: tasksLoading,
  } = useSWR<TaskResponse>(
    selectedListId
      ? {
          url: `/api/clickup/task`,
          accessToken: session.user.accessToken,
          params: { listId: selectedListId },
        }
      : null
  );

  const handleCreateTask = async (taskData: any) => {
    if (!selectedListId) return;

    try {
      const builtURL = `/api/clickup/task?listId=${selectedListId}`;
      const response = await fetch(builtURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session.user.accessToken}`,
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        mutateTasks();
      } else {
        console.error("Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleUpdateTask = async (taskData: any) => {
    if (!editingTask) return;
    try {
      const response = await fetch(`/api/clickup/task?taskId=${editingTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session.user.accessToken}`,
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        mutateTasks();
        setEditingTask(null);
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleCloseTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/clickup/task?taskId=${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        body: JSON.stringify({ status: "closed" }),
      });

      if (response.ok) {
        mutateTasks();
      } else {
        console.error("Failed to close task");
      }
    } catch (error) {
      console.error("Error closing task:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center pt-2">
      <header className="w-full">
        <User team={team} />
      </header>
      <div className="w-full p-2 flex flex-col items-center space-y-4">
        <div className="w-full">
          <Breadcrumb
            space={spaces?.spaces.find((space) => space.id === selectedSpaceId)}
            list={lists?.lists.find((list) => list.id === selectedListId)}
            onSpaceClick={() => {
              setSelectedSpaceId(null);
              setSelectedListId(null);
              setEditingTask(null);
            }}
            onListClick={() => {
              setSelectedListId(null);
              setEditingTask(null);
            }}
          />
        </div>
        {!selectedSpaceId ? (
          <SpaceList
            spaces={spaces?.spaces || []}
            onSpaceSelect={setSelectedSpaceId}
          />
        ) : !selectedListId ? (
          <ListList
            lists={lists?.lists || []}
            onListSelect={setSelectedListId}
          />
        ) : tasksLoading ? (
          <p>Loading tasks...</p>
        ) : (
          <>
            <TaskList
              tasks={tasks?.tasks || []}
              onTaskEdit={setEditingTask}
              onTaskClose={handleCloseTask}
            />
            <TaskForm
              task={editingTask}
              onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
              onCancel={() => setEditingTask(null)}
            />
          </>
        )}
      </div>
    </div>
  );
}
