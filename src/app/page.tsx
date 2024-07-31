"use client"

import { User } from "@/components/User";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { TeamResponse } from "./api/clickup/team/route";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SpaceResponse } from "./api/clickup/space/route";
import { ListResponse } from "./api/clickup/list/route";
import { TaskResponse } from "./api/clickup/task/route";


export default function Home() {
  const {data: session} = useSession()

  const { data: teams } = useSWR<TeamResponse>(session ? {url: '/api/clickup/team', accessToken: session.user.accessToken} : null)
  if (!session) {
    redirect("/api/auth/signin")
  }

  const team = useMemo(() => {
    if (teams) {
      return teams.teams[0]
    }
  }, [teams])

  const {data: spaces, isLoading: spacesLoading} = useSWR<SpaceResponse>(team ? {url: `/api/clickup/space`, accessToken: session.user.accessToken, params: {
    teamId: team.id
  }} : null)
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null)
  const selectedSpace = useMemo(() => {
    if (spaces) {
      return spaces.spaces.find(space => space.id === selectedSpaceId)
    }
  }, [spaces, selectedSpaceId])

  const {data: lists, isLoading: listsLoading} = useSWR<ListResponse>(selectedSpace ? {url: `/api/clickup/list`, accessToken: session.user.accessToken, params: {
    spaceId: selectedSpace.id
  }} : null)
  const [selectedListId, setSelectedListId] = useState<string | null>(null)
  const selectedList = useMemo(() => {
    if (lists) {
      return lists.lists.find(list => list.id === selectedListId)
    }
  }, [lists, selectedListId])

  const {data: tasks, isLoading: tasksLoading} = useSWR<TaskResponse>(selectedList ? {url: `/api/clickup/task`, accessToken: session.user.accessToken, params: {
    listId: selectedList.id
  }} : null)
  
  return (
    <div className="w-screen h-screen flex flex-col items-center pt-2">
      <header className="w-full">
        <User team={team} />
      </header>
      <div className="w-full p-2 flex flex-col items-center">

        <div className="w-full">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <button onClick={() => {
                    setSelectedSpaceId(null);
                    setSelectedListId(null);
                  }}>Spaces</button>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {
                selectedSpace && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <button onClick={() => setSelectedListId(null)}>{selectedSpace.name}</button>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {
                      selectedList && (
                        <>
                          <BreadcrumbSeparator />
                          <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                              <button onClick={() => {/**/}}>{selectedList.name}</button>
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                        </>
                      )
                    }
                  </>
                )
              }
              
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div>
          {
            !selectedSpaceId ? (spacesLoading ? (
              <div>Loading...</div>
            ) : (
              <div className="flex flex-col w-32 font-semibold">
                {
                  spaces && spaces.spaces.map(space => {
                    return (
                      <button onClick={() => setSelectedSpaceId(space.id)} key={space.id} className="p-2 m-2 shadow-2xl rounded-lg" style={{backgroundColor: space.color}}>
                        <h2>{space.name}</h2>
                      </button>
                    )
                  })
                }
              </div>
            )) : (
              !selectedListId ? (listsLoading ? (
                <div>Loading...</div>
              ) : (
                <div className="flex flex-col w-128 font-semibold text-xs space-y-2">
                  {
                    lists && lists.lists.map(list => {
                      return (
                        <button onClick={() => setSelectedListId(list.id)} key={list.id} className="p-2 shadow-2xl rounded-lg bg-gray-200">
                          <h2>{list.name}</h2>
                        </button>
                      )
                    })
                  }
                </div>
              )) : (
                tasksLoading ? (
                  <div>Loading...</div>
                ) : (
                  <div className="flex flex-col w-128 font-semibold text-xs space-y-2">
                    {
                      tasks && tasks.tasks.map(task => {
                        return (
                          <div key={task.id} className="p-2 shadow-2xl rounded-lg bg-gray-200">
                            <h2>{task.name}</h2>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              )
            )
          }
        </div>
      </div>
    </div>
  )
}