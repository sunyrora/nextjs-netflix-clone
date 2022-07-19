const ContentIndexPage = () => {
  return <div>ContentIndexPage</div>;
};

export default ContentIndexPage;

export const getStaticProps = async () => {
  return {
    props: {
      redirect: {
        destination: `${process.env.contentsBasePath}/home`,
        permanent: false,
      },
    },
  };
};
