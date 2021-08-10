import Container from 'components/layout/container';
import Page from 'components/page';
import PageHeader from 'components/page-header';
import Storyblok from 'connectors/storyblok';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Richtext } from 'storyblok-js-client';
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
  releases: StoryblokStory<PressReleaseStory>[];
}

const Press: NextPage<Props> = ({ releases }) => {
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <>
      <NextSeo
        title={t('press:releases')}
        canonical={url(`/page/press/releases`, true)}
      />
      <PageHeader
        title={t('press:releases')}
        breadcrumb={[
          {
            item: `/page/press`,
            name: t('press:title'),
          },
          {
            item: '/page/presse/releases',
            name: t('press:releases'),
          },
        ]}
      />
      <Page>
        <Container>
          <PressPage>
            <div className="flex flex-col max-w-[65ch] space-y-10">
              {releases.map((release) => {
                return (
                  <article key={release.id}>
                    <aside className="mb-2 text-sm text-white lg:text-base xl:text-lg">
                      {formatLocal(
                        new Date(release.first_published_at),
                        'PPP',
                        locale
                      )}
                    </aside>
                    <h1 className="text-xl font-medium leading-tight text-white underline md:text-2xl">
                      <Link
                        href={`/page/press/releases/${release.slug}`}
                        passHref
                      >
                        <a>{release.name}</a>
                      </Link>
                    </h1>
                  </article>
                );
              })}
            </div>
          </PressPage>
        </Container>
      </Page>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  Storyblok.flushCache();
  const stories = await Storyblok.getAll('cdn/stories', {
    starts_with: 'press/releases/',
    language: locale,
  });

  return {
    props: {
      releases: stories,
    },
    revalidate: 300,
  };
};

export default Press;
