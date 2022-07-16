import Banner from '../components/main/Banner';

const MainScreen = ({ movies }) => {
  console.log('movies.netflixOriginals: ', movies.netflixOriginals);
  return (
    <div className="flex flex-col items-center w-screen h-[200vh] x-[20]">
      <div className="h-[30vh]">MainScreen</div>
      <Banner />
      <div className="bg-bggray-100 w-full flex flex-col justify-center items-center">
        {movies.netflixOriginals.map((movie) => (
          <p key={movie.id}>{movie.original_title}</p>
        ))}
      </div>
    </div>
  );
};

export default MainScreen;
