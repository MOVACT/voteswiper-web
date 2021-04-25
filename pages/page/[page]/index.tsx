import Storyblok from 'api/storyblok';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';

const Page: NextPage = () => {
  return <div>hello</div>;
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
  const props = {};

  const story = await Storyblok.get(
    `cdn/stories/${locale}/page/${params?.page}`,
    {
      language: locale,
    }
  );

  if (locale === 'de') {
    console.log(story);
  }

  return {
    props,
    revalidate: 500,
  };
};

export default Page;
