import PageContainer from 'components/page';
import PageHeader from 'components/page-header';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';
import url from 'util/url';
import pageBlocks from './blocks';
import { BlockTextFields } from './blocks/block-text';

export type BlockPageStory = {
  component: 'blockPage';
  title: string;
  blocks: Array<BlockTextFields>;
};

interface Props {
  story: StoryblokStory<BlockPageStory>;
}

const BlockPage: React.FC<Props> = ({ story }) => {
  const router = useRouter();

  const { title, blocks } = story.content;

  console.log(blocks);

  return (
    <>
      <NextSeo
        title={title}
        canonical={url(`/page/${router.query.page}`, router.locale !== 'en')}
      />
      <PageHeader
        breadcrumb={[
          {
            item: `/page/${router.query.page}`,
            name: title,
          },
        ]}
        title={title}
      />
      <PageContainer>
        {blocks.map((block) => {
          if (!pageBlocks[block.component])
            return <React.Fragment key={block._uid} />;

          const Component = pageBlocks[block.component];
          return (
            <React.Fragment key={block._uid}>
              <Component {...block} />
            </React.Fragment>
          );
        })}
      </PageContainer>
    </>
  );
};

export default BlockPage;
