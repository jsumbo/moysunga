type VideoEmbedProps = {
  youtubeId: string;
  title: string;
  className?: string;
};

export function VideoEmbed({ youtubeId, title, className = "" }: VideoEmbedProps) {
  return (
    <div className={`relative aspect-video w-full overflow-hidden bg-black ${className}`}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
        title={title}
        className="absolute inset-0 size-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
