import { useElection } from 'contexts/election';
import React from 'react';

const DEFAULT_EMBED_HEIGHT = 670;

const measureEmbedHeight = (): number => {
  const html = document.documentElement;
  const body = document.body;

  // html/body use height: 100%, which grows with the parent iframe and keeps
  // reporting the expanded height after overlay content is removed.
  const previousHtmlHeight = html.style.height;
  const previousBodyHeight = body.style.height;
  html.style.height = 'auto';
  body.style.height = 'auto';
  void html.offsetHeight;

  const height = Math.max(body.offsetHeight, html.offsetHeight);

  html.style.height = previousHtmlHeight;
  body.style.height = previousBodyHeight;

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
    let cancelled = false;

    const start = (): void => {
      if (!cancelled) {
        requestRef.current = requestAnimationFrame(resizeFrame);
      }
    };

    // Wait for navigation + DOM updates after closing overlays.
    requestAnimationFrame(() => {
      requestAnimationFrame(start);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(requestRef.current);
    };
  }, [explainer, screen, resizeFrame]);

  return null;
};

export default EmbedFrameResizer;
