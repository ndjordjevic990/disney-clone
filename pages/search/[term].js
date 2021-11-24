import { useRef, useState, useCallback } from "react";
import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import { SearchIcon } from "@heroicons/react/solid";
import MoviesCollection from "../../components/MoviesCollection";

function Search({ searchedData }) {
  const [session] = useSession();
  const router = useRouter();
  const searchInputRef = useRef(null);

  const search = (e) => {
    e.preventDefault();
    const term = searchInputRef.current.value;

    if (!term) return;
    router.push(`/search/${term}`);
    // router.push(`/search?term=${term}`);
  };

  return (
    <div>
      <Header />
      <div className="flex w-full mt-5 hover:shadow-lg focus-within:shadow-lg items-center ">
        <input
          placeholder="Search posts"
          type="text"
          className="flex-grow focus:outline-none h-20 text-black text-3xl pl-5"
          ref={searchInputRef}
        />
        <SearchIcon onClick={search} className="h-20 p-4 bg-white text-black" />
      </div>

      <section>
        <MoviesCollection
          results={searchedData}
          title={"Popular Movies"}
          _class={"gridding"}
        />
      </section>
    </div>
  );
}

export default Search;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const [searchedData, popularShows, topRatedMovies, topRatedShows] =
    await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&language=en-US&query=${context.query.term}&page=1&include_adult=false`
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
      searchedData: searchedData.results,
      popularShows: popularShows.results,
      topRatedMovies: topRatedMovies.results,
      topRatedShows: topRatedShows.results,
    },
  };
}
