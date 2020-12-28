import React from 'react';

const ElectionGrid: React.FC = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-auto">
      {children}
    </div>
  );
};

export default ElectionGrid;
