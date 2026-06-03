import cn from 'classnames';
import Hls from 'hls.js';
import React from 'react';

interface Props {
  src: string;
  compact?: boolean;
}

const isHlsSource = (src: string): boolean =>
  src.includes('.m3u8') || (!src.includes('.mp4') && !src.endsWith('.mp4'));

const ExplainerVideo: React.FC<Props> = ({ src, compact = false }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHlsSource(src) && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    }

    video.src = src;

    return () => {
      video.removeAttribute('src');
      video.load();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      playsInline
      controls
      preload="metadata"
      className={cn(
        compact
          ? 'h-auto w-full'
          : 'h-auto w-full rounded-lg lg:w-auto lg:max-h-[60vh] lg:max-w-none'
      )}
    />
  );
};

export default ExplainerVideo;
