import Link from 'next/link'

export default function VideoCard({ item }) {
  const id = item.id.videoId || item.id
  const snippet = item.snippet || {}
  const thumb = (snippet.thumbnails && (snippet.thumbnails.medium || snippet.thumbnails.default)) || {}

  return (
    <article className="card">
      <Link href={`/video/${id}`}>
        <a style={{display:'block',color:'inherit',textDecoration:'none'}}>
          <div className="thumb">
            <img src={thumb.url} alt={snippet.title} loading="lazy" />
          </div>
          <div className="meta">
            <h3>{snippet.title}</h3>
            <p className="date">{new Date(snippet.publishedAt).toLocaleDateString()}</p>
          </div>
        </a>
      </Link>
    </article>
  )
}
