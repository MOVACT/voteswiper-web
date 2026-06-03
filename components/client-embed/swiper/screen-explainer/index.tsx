import ExplainerOverlay from 'components/explainer/explainer-overlay';
import React from 'react';

interface Props {
  inline?: boolean;
}

const ExplainerScreen: React.FC<Props> = ({ inline = false }) => (
  <ExplainerOverlay inline={inline} variant="client-embed" />
);

export default ExplainerScreen;
