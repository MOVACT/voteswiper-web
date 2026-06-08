import { useElection } from 'contexts/election';
import React from 'react';

const DEFAULT_EMBED_HEIGHT = 670;

const measureEmbedHeight = (): number => {
  const html = document.documentElement;
  const body = document.body;

  const height = Math.max(
    body?.offsetHeight ?? 0,
    html.offsetHeight,
    body?.scrollHeight ?? 0,
    html.scrollHeight
  );

  return height === 0 ? DEFAULT_EMBED_HEIGHT : height;
};

const EmbedFrameResizer: React.FC = () => {
  const { explainer, screen } = useElection();
  const $windowHeight = React.useRef<number>(0);
  const requestRef = React.useRef<number>(0);

  const resizeFrame = React.useCallback(() => {
    const windowHeight = measureEmbedHeight();

    if ($windowHeight.current === windowHeight) {
      requestRef.current = requestAnimationFrame(resizeFrame);
      return;
    }

    $windowHeight.current = windowHeight;

    window.parent.postMessage(
      {
        sentinel: 'amp',
        type: 'embed-size',
        height: windowHeight,
      },
      '*'
    );

    requestRef.current = requestAnimationFrame(resizeFrame);
  }, []);

  React.useEffect(() => {
    $windowHeight.current = 0;
    requestRef.current = requestAnimationFrame(resizeFrame);

    return () => cancelAnimationFrame(requestRef.current);
  }, [explainer, screen, resizeFrame]);

  return null;
};

export default EmbedFrameResizer;
