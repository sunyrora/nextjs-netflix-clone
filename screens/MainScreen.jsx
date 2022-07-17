import Banner from '../components/main/Banner';

const MainScreen = ({ movies, bgIndex }) => {
  console.log('movies.netflixOriginals: ', movies.netflixOriginals);
  console.log('bgIndex: ', bgIndex);
  return (
    <div className="flex flex-col items-center w-screen h-[500vh] px-0">
      <div className="w-full">
        <Banner video={movies.netflixOriginals[bgIndex]} />
      </div>
      <div className="h-fit md:py-[30px] overflow-hidden bg-bggray-100 w-full flex flex-col justify-center items-center">
        {movies.netflixOriginals.map((movie) => (
          <p key={movie.id}>{movie.original_title}</p>
        ))}
      </div>
    </div>
  );
};

export default MainScreen;
