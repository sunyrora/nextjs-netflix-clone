import MainScreen from '../screens/MainScreen';

const MainPage = () => {
  return <MainScreen />;
};

if (process.env.NODE_ENV !== 'development') MainPage.auth = true;

export default MainPage;
