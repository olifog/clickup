
export const fetcher = async ({url, accessToken, params}: {
  url: string
  accessToken: string
  params?: Record<string, string>
}) => {
  const builtURL = params ? `${url}?${new URLSearchParams(params)}` : url

  const res = await fetch(builtURL, {
    method: 'GET',
    headers: {
      Authorization: accessToken,
    },
  })

  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.')
  }
  return res.json()
}
