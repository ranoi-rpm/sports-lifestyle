import clsx from 'clsx'
import type { VideoSource } from '@/types'

interface VideoEmbedProps {
  source:     VideoSource
  videoId:    string
  title?:     string
  className?: string
  autoplay?:  boolean
}

export function VideoEmbed({ source, videoId, title, className, autoplay }: VideoEmbedProps) {
  const src = source === 'youtube'
    ? `https://www.youtube.com/embed/${videoId}?rel=0${autoplay ? '&autoplay=1' : ''}`
    : `https://rutube.ru/play/embed/${videoId}`

  return (
    <div className={clsx('relative w-full overflow-hidden rounded-2xl bg-black', className)}
         style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={src}
        title={title ?? 'Video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0"
      />
    </div>
  )
}

// Thumbnail with play button (lazy load)
interface VideoThumbnailProps {
  source:    VideoSource
  videoId:   string
  title?:    string
  onClick?:  () => void
  className?: string
}

export function VideoThumbnail({ source, videoId, title, onClick, className }: VideoThumbnailProps) {
  const thumb = source === 'youtube'
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : `https://rutube.ru/api/video/${videoId}/thumbnail/?redirect=1`

  return (
    <div
      onClick={onClick}
      className={clsx(
        'relative cursor-pointer overflow-hidden rounded-2xl group bg-black',
        className,
      )}
      style={{ paddingBottom: '56.25%' }}
    >
      <img src={thumb} alt={title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 bg-primary/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      {title && (
        <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80">
          <p className="text-white text-sm font-semibold line-clamp-2">{title}</p>
        </div>
      )}
    </div>
  )
}
