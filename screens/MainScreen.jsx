import Banner from '../components/main/Banner';

const MainScreen = () => {
  return (
    <div className="flex flex-col items-center w-screen h-[200vh] x-[20]">
      <div className="h-[50vh]">MainScreen</div>
      <Banner />
      <div className="bg-bggray-100 h-[1000px]"></div>
    </div>
  );
};

export default MainScreen;
