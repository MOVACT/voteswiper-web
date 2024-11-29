import { IconDownload } from '@tabler/icons';
import Container from 'components/layout/container';
import Page from 'components/page';
import PageHeader from 'components/page-header';
import { fetchTranslatedStory } from 'connectors/storyblok';
import PressContact from 'content-components/press-contact';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import { Richtext } from 'storyblok-js-client';
import { render } from 'storyblok-rich-text-react-renderer';
import formatLocal from 'util/formatLocal';
import url from 'util/url';
import { PressPage } from '../';

interface PressReleaseStory {
  component: 'pressRelease';
  pdf: {
    alt: string;
    filename: string;
    id: number;
  };
  body: Richtext;
}

interface Props {
  story: StoryblokStory<PressReleaseStory>;
}

const Press: NextPage<Props> = ({ story }) => {
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <>
      <NextSeo
        title={story.name}
        canonical={url(`/page/press/releases/${story.slug}`, true)}
      />
      <PageHeader
        title={story.name}
        breadcrumb={[
          {
            item: `/page/press`,
            name: t('press:title'),
          },
          {
            item: '/page/press/releases',
            name: t('press:releases'),
          },
          {
            item: `/page/press/releases/${story.slug}`,
            name: formatLocal(
              new Date(story.first_published_at),
              'PPPP',
              locale
            ),
          },
        ]}
      />
      <Page>
        <Container>
          <PressPage>
            <div className="prose prose-white">
              {render(story.content.body)}
            </div>

            {story.content.pdf.filename !== '' && (
              <a
                href={story.content.pdf.filename}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-3 font-semibold text-white mt-8 flex focus-default hover:text-brand-highlight items-center justify-between border-b border-white max-w-[65ch]"
              >
                Download als PDF
                <IconDownload className="h-8" />
              </a>
            )}

            <div className="mt-8 prose prose-white lg:mt-10 xl:mt-14">
              <PressContact />
            </div>
          </PressPage>
        </Container>
      </Page>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  try {
    const story = await fetchTranslatedStory({
      locale,
      paths: ['press', 'releases', params?.slug],
    });

    return {
      props: { story: story },
      revalidate: 86400,
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default Press;
