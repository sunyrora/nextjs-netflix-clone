import React from 'react';
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';

const SubLayout = ({ bgImg, children }) => {
  return (
    <div className="w-full">
      <BackgroundImage imgPath={bgImg} />
      <Header />
      {children}
    </div>
  );
};

export default SubLayout;
