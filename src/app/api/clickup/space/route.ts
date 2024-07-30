import { NextRequest } from "next/server"

export async function GET(req: NextRequest, res: Response) {
  const teamId = req.nextUrl.searchParams.get('teamId')
  const url = `https://api.clickup.com/api/v2/team/${teamId}/space`
  const data = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `${req.headers.get("Authorization")}`,
    },
  });
  const jsonData = await data.json();
  return Response.json(jsonData);
}
