import StoryblokClient, { StoryblokCache } from 'storyblok-js-client';

const Storyblok = new StoryblokClient({
  accessToken: 'b7BTTUOEkSa786viucYnjwtt',
  cache: ({
    type: 'none',
  } as unknown) as StoryblokCache,
});

export default Storyblok;

export const fetchTranslatedStory = async <T>({
  locale,
  paths,
}: {
  locale: string | undefined;
  paths: Array<string | string[] | undefined>;
}): Promise<null | StoryblokStory<T>> => {
  return new Promise<StoryblokStory<T> | null>((resolve, reject) => {
    Storyblok.get(`cdn/stories`, {
      starts_with: `${locale === 'en' ? '' : locale}${
        locale === 'en' ? '' : '/'
      }${paths.join('/')}`,
    })
      .then((response) => {
        if (response.data.stories.length > 0) {
          resolve((response.data.stories[0] as unknown) as StoryblokStory<T>);
        } else {
          resolve(null);
        }
      })
      .catch(() => reject(null));
  });
};
