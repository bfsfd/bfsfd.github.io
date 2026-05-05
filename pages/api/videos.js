// pages/api/videos.js
export default async function handler(req, res) {
  const API_KEY = process.env.YT_API_KEY
  const DEFAULT_CHANNEL = process.env.YT_CHANNEL_ID
  if (!API_KEY) {
    return res.status(500).json({ error: 'Missing YT_API_KEY in environment' })
  }

  const { pageToken, q, maxResults } = req.query
  const mr = maxResults || 12

  // Allow passing channelId as query param to switch channels dynamically
  const channelId = req.query.channelId || DEFAULT_CHANNEL
  if (!channelId) {
    return res.status(400).json({ error: 'Missing channelId (either via ?channelId= or env YT_CHANNEL_ID)' })
  }

  const params = new URLSearchParams({
    key: API_KEY,
    channelId,
    part: 'snippet,id',
    order: 'date',
    type: 'video',
    maxResults: String(mr)
  })
  if (pageToken) params.set('pageToken', pageToken)
  if (q) params.set('q', q)

  const url = `https://www.googleapis.com/youtube/v3/search?${params.toString()}`

  try {
    const ytRes = await fetch(url)
    const data = await ytRes.json()
    return res.status(200).json(data)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Failed to fetch from YouTube API' })
  }
}
