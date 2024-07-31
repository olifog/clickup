
import { NextRequest } from "next/server"

export interface Task {
  id: string;
  name: string;
  due_date: string;
  start_date: string;
  time_estimate: string;
  description: string;
  url: string;
  status: {

  }
}

export type TaskResponse = {
  tasks: Task[];
}

export async function GET(req: NextRequest, res: Response) {
  const listId = req.nextUrl.searchParams.get('listId')
  const url = `https://api.clickup.com/api/v2/list/${listId}/task`
  const data = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `${req.headers.get("Authorization")}`,
    },
  });
  const jsonData = await data.json();
  return Response.json(jsonData);
}

export async function PUT(req: NextRequest, res: Response) {
  const taskId = req.nextUrl.searchParams.get('taskId')
  const url = `https://api.clickup.com/api/v2/task/${taskId}`
  const reqData = await req.json()
  const data = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `${req.headers.get("Authorization")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqData),
  });
  const jsonData = await data.json();
  return Response.json(jsonData);
}

export async function POST(req: NextRequest, res: Response) {
  const listId = req.nextUrl.searchParams.get('listId')
  const url = `https://api.clickup.com/api/v2/list/${listId}/task`
  const reqData = await req.json()
  const data = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `${req.headers.get("Authorization")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqData),
  });
  const jsonData = await data.json();
  return Response.json(jsonData);
}
