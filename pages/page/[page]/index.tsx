import BlockPage, {
  BlockPageStory,
} from 'components/layout/page-types/block-page';
import ContentPage, {
  ContentPageStory,
} from 'components/layout/page-types/content-page';
import FaqPage, { FaqPageStory } from 'components/layout/page-types/faq-page';
import { fetchTranslatedStory } from 'connectors/storyblok';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';

interface Props {
  story: StoryblokStory<ContentPageStory | FaqPageStory | BlockPageStory>;
}

const Page: NextPage<Props> = ({ story }) => {
  switch (story.content.component) {
    case 'blockPage':
      return <BlockPage story={story as StoryblokStory<BlockPageStory>} />;
    case 'contentPage':
      return <ContentPage story={story as StoryblokStory<ContentPageStory>} />;
    case 'faqPage':
      return <FaqPage story={story as StoryblokStory<FaqPageStory>} />;
  }
};

export const getStaticPaths: GetStaticPaths<{ page: string }> = async () => {
  return {
    paths: [],
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
