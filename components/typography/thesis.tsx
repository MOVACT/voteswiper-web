import React from 'react';

const Thesis: React.FC = ({ children }) => {
  return (
    <div className="font-medium leading-5 lg:leading-6 text-brand-dark-blue lg:text-lg">
      {children}
    </div>
  );
};

export default Thesis;
