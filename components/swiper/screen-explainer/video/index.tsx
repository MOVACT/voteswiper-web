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
    if (Hls.isSupported()) {
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
          ? 'w-full h-auto'
          : 'w-full h-[80%] md:h-[70vh] lg:w-auto lg:h-[60vh] rounded-lg'
      )}
    />
  );
};

export default Video;
