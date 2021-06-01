import React from 'react';

const Topic: React.FC = ({ children }) => {
  return (
    <div className="pb-2 text-xs font-medium tracking-widest uppercase text-brand-primary">
      {children}
    </div>
  );
};

export default Topic;
