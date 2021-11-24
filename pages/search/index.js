import { useRef, useState, useCallback } from "react";
import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import { SearchIcon } from "@heroicons/react/solid";
import MoviesCollection from "../../components/MoviesCollection";

function Search({ popularMovies }) {
  // const [session] = useSession();
  const router = useRouter();
  const searchInputRef = useRef(null);

  const search = (e) => {
    e.preventDefault();
    const term = searchInputRef.current.value;

    if (!term) return;
    router.push(`/search/${term}`);
  };

  return (
    <div>
      <Header />

      <div className="flex w-full mt-5 hover:shadow-lg focus-within:shadow-lg   items-center max-w-[1400px] mx-auto">
        <input
          placeholder="Search posts"
          type="text"
          className="flex-grow focus:outline-none h-20 text-black text-3xl pl-5"
          ref={searchInputRef}
        />
      </div>

      <section>
        <MoviesCollection
          results={popularMovies}
          title={"Explore"}
          _class={"gridding"}
        />
      </section>
    </div>
  );
}

export default Search;

export async function getServerSideProps(context) {
  const session = await getSession(context);
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
