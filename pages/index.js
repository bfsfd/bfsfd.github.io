import { useState, useEffect } from 'react'
import VideoCard from '../components/VideoCard'
import ChannelSelector from '../components/ChannelSelector'

export default function Home({ initialData, defaultChannelTitle }) {
  const [videos, setVideos] = useState(initialData.items || [])
  const [nextPageToken, setNextPageToken] = useState(initialData.nextPageToken || null)
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [channelId, setChannelId] = useState('') // empty = use env default

  useEffect(() => {
    // when channelId changes, fetch fresh
    const fetchForChannel = async () => {
      setLoading(true)
      const url = channelId ? `/api/videos?channelId=${channelId}` : `/api/videos`
      const res = await fetch(url)
      const data = await res.json()
      setVideos(data.items || [])
      setNextPageToken(data.nextPageToken || null)
      setLoading(false)
    }
    // skip initial client-side fetch if initialData already loaded and channelId empty
    if (channelId) fetchForChannel()
  }, [channelId])

  const loadMore = async () => {
    if (!nextPageToken) return
    setLoading(true)
    const url = channelId ? `/api/videos?channelId=${channelId}&pageToken=${nextPageToken}` : `/api/videos?pageToken=${nextPageToken}`
    const res = await fetch(url)
    const data = await res.json()
    setVideos(prev => [...prev, ...(data.items || [])])
    setNextPageToken(data.nextPageToken || null)
    setLoading(false)
  }

  const onSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    const url = channelId ? `/api/videos?channelId=${channelId}&q=${encodeURIComponent(query)}` : `/api/videos?q=${encodeURIComponent(query)}`
    const res = await fetch(url)
    const data = await res.json()
    setVideos(data.items || [])
    setNextPageToken(data.nextPageToken || null)
    setLoading(false)
  }

  return (
    <div className="container">
      <header className="header">
        <h1>{defaultChannelTitle || 'قناتي على يوتيوب'}</h1>
        <p className="sub">عرض الفيديوهات بشكل احترافي — اختر قناة من القائمة أدناه</p>

        <ChannelSelector value={channelId} onChange={setChannelId} />

        <form onSubmit={onSearch} className="search">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="ابحث داخل القناة..." />
          <button type="submit">بحث</button>
        </form>
      </header>

      <main>
        <div className="grid">
          {videos.map(item => (
            <VideoCard key={item.id.videoId || item.id} item={item} />
          ))}
        </div>

        <div className="actions">
          {nextPageToken ? (
            <button onClick={loadMore} disabled={loading}>
              {loading ? 'جاري التحميل...' : 'تحميل المزيد'}
            </button>
          ) : (
            <p>لا مزيد من الفيديوهات</p>
          )}
        </div>
      </main>

      <footer className="footer">
        مبني بواسطة مشروع Next.js · انشر على Vercel بسهولة
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
  // fetch using server-side default channel (env) if موجود
  const res = await fetch(`${baseUrl}/api/videos`).catch(() => null)
  const initialData = res ? await res.json().catch(() => ({ items: [] })) : { items: [] }

  return {
    props: {
      initialData,
      defaultChannelTitle: process.env.YT_CHANNEL_TITLE || null
    },
    revalidate: 600
  }
}
