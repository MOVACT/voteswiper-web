import React from 'react';
import { CLIENT_EMBED_BACKGROUND } from './theme';

const useClientEmbedBackground = (): void => {
  React.useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const previous = {
      htmlBackground: html.style.background,
      htmlBackgroundImage: html.style.backgroundImage,
      bodyBackground: body.style.background,
      bodyBackgroundImage: body.style.backgroundImage,
    };

    html.style.background = CLIENT_EMBED_BACKGROUND;
    html.style.backgroundImage = 'none';
    body.style.background = CLIENT_EMBED_BACKGROUND;
    body.style.backgroundImage = 'none';
    return () => {
      html.style.background = previous.htmlBackground;
      html.style.backgroundImage = previous.htmlBackgroundImage;
      body.style.background = previous.bodyBackground;
      body.style.backgroundImage = previous.bodyBackgroundImage;
    };
  }, []);
};

export default useClientEmbedBackground;
