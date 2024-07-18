import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const PageContainer: React.FC<Props> = ({ children, className }) => {

  return (
    <div
      className={`p-4 md:p-6 bg-white rounded-lg shadow-md mb-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default PageContainer;
