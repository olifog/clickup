
export const fetcher = async ({url, accessToken}: {
  url: string
  accessToken: string
}) => {
  const res = await fetch(url, {
    headers: {
      Authorization: accessToken,
    },
  })

  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.')
  }
  return res.json()
}
