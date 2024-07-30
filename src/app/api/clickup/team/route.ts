

export async function GET(req: Request, res: Response) {
  const url = "https://api.clickup.com/api/v2/team";
  const data = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `${req.headers.get("Authorization")}`,
    },
  });
  console.log("ACTUAL FETCH")
  const jsonData = await data.json();
  return Response.json(jsonData);
}
