import Container from 'components/layout/container';
import React from 'react';
import { Richtext } from 'storyblok-js-client';
import { render } from 'storyblok-rich-text-react-renderer';
import { Story } from '../../types';

export interface BlockTextFields extends Story {
  component: 'blockText';
  text: Richtext;
}

const BlockText: React.FC<BlockTextFields> = ({ text }) => {
  return (
    <Container>
      <div className="prose prose-white lg:prose-lg">{render(text)}</div>
    </Container>
  );
};

export default BlockText;
