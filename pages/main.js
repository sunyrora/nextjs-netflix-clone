import MainScreen from '../screens/MainScreen';

const MainPage = () => {
  return <MainScreen />;
};

if (process.env.NODE_ENV !== 'development') MainPage.auth = true;

// MainPage.auth = true;
export default MainPage;

export const getServerSideProps = async () => {
  // your fetch function here

  return {
    props: {
      title: 'Home',
      bgImg: '/images/bg-home.webp',
    },
  };
};
