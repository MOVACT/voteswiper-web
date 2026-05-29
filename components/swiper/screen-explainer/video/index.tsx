import cn from 'classnames';
import Hls from 'hls.js';
import React from 'react';

interface Props {
  src: string;
  inline?: boolean;
}

const Video: React.FC<Props> = ({ src, inline = false }) => {
  const $video = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (Hls.isSupported() && src.indexOf('.mp4') === -1) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia($video.current as HTMLMediaElement);
    } else {
      if ($video.current) $video.current.src = src;
    }
  }, [src]);

  return (
    <video
      ref={$video}
      playsInline
      controls
      autoPlay
      className={cn(
        inline
          ? 'h-auto w-full'
          : 'h-auto max-h-[50vh] w-full rounded-lg md:max-h-[70vh] lg:h-[60vh] lg:max-h-none lg:w-auto'
      )}
    />
  );
};

export default Video;
