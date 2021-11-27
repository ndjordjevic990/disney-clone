import Head from "next/head";
import Header from "../components/Header";
import { getSession, useSession } from "next-auth/client";
import Slider from "../components/Slider";
import Brands from "../components/Brands";
import MoviesCollection from "../components/MoviesCollection";
import LogInPage from "../components/LogInPage";

export default function Home({
  popularMovies,
  popularShows,
  topRatedMovies,
  topRatedShows,
}) {
  const [session] = useSession();
  return (
    <div>
      <Head>
        <title>Disney+ Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      {!session ? (
        <LogInPage />
      ) : (
        <main className="relative min-h-screen after:bg-home after:bg-center after:bg-cover after:bg-no-repeat after:bg-fixed after:absolute after:inset-0 after:z-[-1] ">
          <Slider />
          <Brands />
          <MoviesCollection
            results={popularMovies}
            title={"Popular Movies"}
            _class={"flexing"}
            type={"movie"}
          />
          <MoviesCollection
            results={popularShows}
            title={"Popular Shows"}
            _class={"flexing"}
            type={"show"}
          />
          <MoviesCollection
            results={topRatedMovies}
            title={"Top Rated Movies"}
            _class={"flexing"}
            type={"movie"}
          />
          <MoviesCollection
            results={topRatedShows}
            title={"Top Rated Shows"}
            _class={"flexing"}
            type={"show"}
          />
        </main>
      )}
    </div>
  );
}

// remove the loading and fetch the user session on server side; to be used just inside of the main page (index.js)
export async function getServerSideProps(context) {
  const session = await getSession(context);
  const movieType = "movie";
  const showType = "tv";
  const [popularMovies, popularShows, topRatedMovies, topRatedShows] =
    await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
      ).then((res) => res.json()),
      fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
      ).then((res) => res.json()),
      fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
      ).then((res) => res.json()),
      fetch(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
      ).then((res) => res.json()),
    ]);
  return {
    props: {
      session,
      popularMovies: popularMovies.results,
      popularShows: popularShows.results,
      topRatedMovies: topRatedMovies.results,
      topRatedShows: topRatedShows.results,
    },
  };
}
