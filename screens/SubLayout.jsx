import React from 'react';
import BackgroundImage from '../components/BackgroundImage';
import { useSession } from 'next-auth/react';
import Header from '../components/Header';
import HeaderLogined from '../components/HeaderLogined';

const SubLayout = ({ bgImg, children }) => {
  const { data: session, status: sessionStatus } = useSession();
  return (
    <div className="w-full">
      <BackgroundImage imgPath={bgImg} />
      {session ? <HeaderLogined /> : <Header />}
      <div className="pt-24 md:pt-32">{children}</div>
    </div>
  );
};

export default SubLayout;
