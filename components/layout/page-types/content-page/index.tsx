import Container from 'components/layout/container';
import PageContainer from 'components/page';
import PageHeader from 'components/page-header';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';
import { Richtext } from 'storyblok-js-client';
import { render } from 'storyblok-rich-text-react-renderer';
import url from 'util/url';

export type ContentPageStory = {
  component: 'contentPage';
  title: string;
  body: Richtext;
};

interface Props {
  story: StoryblokStory<ContentPageStory>;
}

const ContentPage: React.FC<Props> = ({ story }) => {
  const router = useRouter();

  const { title, body } = story.content;

  return (
    <>
      <NextSeo
        title={title}
        canonical={url(`/page/${router.query.page}`, router.locale !== 'de')}
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

export default ContentPage;
