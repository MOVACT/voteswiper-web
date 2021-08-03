import Container from 'components/layout/container';
import Image from 'next/image';
import React from 'react';
import { render } from 'storyblok-rich-text-react-renderer';
import storyblokDimensions from 'util/storyblokDimensions';
import { Asset, Story } from '../../types';

export interface ImageGridItem extends Story {
  title: string;
  description: string;
  image: Asset;
}

export interface BlockImageGridFields extends Story {
  component: 'blockImageGrid';
  items: ImageGridItem[];
  title: string;
}

const blockImageGrid: React.FC<BlockImageGridFields> = ({ items, title }) => {
  return (
    <Container className="my-10">
      <div className="prose prose-white">{title && <h2>{title}</h2>}</div>

      <div className="grid grid-cols-2 gap-4 mt-6 text-white md:gap-6 lg:gap-10 lg:mt-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((item) => {
          return (
            <div key={item._uid}>
              <Image
                src={item.image.filename}
                alt={item.image.alt}
                layout="responsive"
                className="rounded-lg"
                sizes="(min-width: 1281px) 235px, (min-width: 1025px) 274px, (min-width: 768px) 310px, 50vw"
                {...storyblokDimensions(item.image.filename)}
              />
              <div className="mt-2 mb-1 text-sm font-semibold md:mb-2 md:mt-4 md:text-base lg:text-lg lg:mt-6">
                {item.title}
              </div>
              <div className="text-xs md:text-base">
                {render(item.description)}
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default blockImageGrid;
