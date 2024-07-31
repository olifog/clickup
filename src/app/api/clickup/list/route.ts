import { NextRequest } from "next/server";

export interface List {
  id: string;
  name: string;
}

export type ListResponse = {
  lists: List[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest, res: Response) {
  const spaceId = req.nextUrl.searchParams.get("spaceId");
  const url = `https://api.clickup.com/api/v2/space/${spaceId}/list`;
  const data = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `${req.headers.get("Authorization")}`,
    },
  });
  const jsonData = await data.json();
  return Response.json(jsonData);
}
