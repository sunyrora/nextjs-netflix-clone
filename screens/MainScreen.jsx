import Banner from '../components/main/Banner';

const MainScreen = ({ movies, bgIndex }) => {
  // console.log('movies.netflixOriginals: ', movies.netflixOriginals);
  console.log('bgIndex: ', bgIndex);
  return (
    <div className=" w-screen flex flex-col justify-center ">
      <Banner video={movies.netflixOriginals[bgIndex]} />

      <div className="relative !w-full h-fit md:py-[30px] bg-bggray-100 flex flex-col justify-center items-center">
        {movies.netflixOriginals.map((movie) => (
          <p key={movie.id}>{movie.original_title}</p>
        ))}
      </div>
    </div>
  );
};

export default MainScreen;
