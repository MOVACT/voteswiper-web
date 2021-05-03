import Storyblok, { fetchTranslatedStory } from 'api/storyblok';
import ContentPage, {
  ContentPageStory,
} from 'components/layout/page-types/content-page';
import FaqPage, { FaqPageStory } from 'components/layout/page-types/faq-page';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';

interface Props {
  story: StoryblokStory<ContentPageStory | FaqPageStory>;
}

const Page: NextPage<Props> = ({ story }) => {
  switch (story.content.component) {
    case 'contentPage':
      return <ContentPage story={story as StoryblokStory<ContentPageStory>} />;
    case 'faqPage':
      return <FaqPage story={story as StoryblokStory<FaqPageStory>} />;
  }
};

export const getStaticPaths: GetStaticPaths<{ page: string }> = async ({
  locales,
}) => {
  const paths: Array<
    string | { params: { page: string }; locale?: string }
  > = [];
  if (locales) {
    for (const locale of locales) {
      const stories = await Storyblok.getAll('cdn/stories', {
        starts_with: 'page/',
        language: locale,
      });

      stories.map((story) => {
        const slug = story.full_slug.split('/').pop();

        paths.push({
          params: {
            page: slug,
          },
          locale,
        });
      });
    }
  }

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  try {
    const story = await fetchTranslatedStory({
      locale,
      paths: ['page', params?.page],
    });

    return {
      props: { story: story },
      revalidate: 500,
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default Page;
