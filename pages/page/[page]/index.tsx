import Storyblok, { fetchTranslatedStory } from 'api/storyblok';
import Container from 'components/layout/container';
import PageContainer from 'components/page';
import PageHeader from 'components/page-header';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';
import { Richtext } from 'storyblok-js-client';
import { render } from 'storyblok-rich-text-react-renderer';
import url from 'util/url';

interface Props {
  story: StoryblokStory<{
    component: 'contentPage';
    title: string;
    body: Richtext;
  }>;
}

const Page: NextPage<Props> = ({ story }) => {
  const router = useRouter();

  const { title, body } = story.content;

  return (
    <>
      <NextSeo
        title={title}
        canonical={url(`/${router.query.page}`, router.locale !== 'de')}
      />
      <PageHeader
        breadcrumb={[
          {
            item: `/${router.query.page}`,
            name: title,
          },
        ]}
        title={title}
      />
      <PageContainer>
        <Container>
          <div className="prose prose-white lg:prose-lg">{render(body)}</div>
        </Container>
      </PageContainer>
    </>
  );
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
