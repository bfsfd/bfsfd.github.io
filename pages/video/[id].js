import React from 'react'

export default function VideoPage({ video }) {
  if (!video) return <div style={{padding:20}}>لم يتم العثور على الفيديو</div>

  const { snippet } = video
  return (
    <div className="container">
      <header className="header">
        <h1>{snippet.title}</h1>
        <p className="sub">{snippet.channelTitle} • {new Date(snippet.publishedAt).toLocaleDateString()}</p>
      </header>

      <main>
        <div className="video-wrapper">
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${video.id}`}
            title={snippet.title}
            frameBorder="0"
            allowFullScreen
          />
        </div>

        <section className="video-desc">
          <h3>الوصف</h3>
          <p style={{whiteSpace:'pre-wrap'}}>{snippet.description}</p>
        </section>
      </main>

    </div>
  )
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const id = params.id
  const apiKey = process.env.YT_API_KEY
  if (!apiKey) {
    return { props: { video: null }, revalidate: 600 }
  }

  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&key=${apiKey}`
  const res = await fetch(url)
  const data = await res.json()
  const video = data.items && data.items[0] ? { ...data.items[0], id } : null

  return {
    props: { video },
    revalidate: 600
  }
}
