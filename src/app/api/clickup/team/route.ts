
export interface Team {
  id: string;
  name: string;
  color: string;
  avatar: string | null;
}

export type TeamResponse = {
  teams: Team[];
}

export async function GET(req: Request, res: Response) {
  const url = "https://api.clickup.com/api/v2/team";
  const data = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `${req.headers.get("Authorization")}`,
    },
  });
  const jsonData = await data.json();
  return Response.json(jsonData);
}
