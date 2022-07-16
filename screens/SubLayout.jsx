import React from 'react';
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';

const SubLayout = ({ children }) => {
  return (
    <div className="w-full">
      <BackgroundImage />
      <Header />
      {children}
    </div>
  );
};

export default SubLayout;
