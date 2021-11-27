import { useRef, useState, useCallback } from "react";
import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import { SearchIcon } from "@heroicons/react/solid";
import MoviesCollection from "../../components/MoviesCollection";
import LogInPage from "../../components/LogInPage";

function Search({ searchedData, type }) {
  const [session] = useSession();
  const router = useRouter();
  const searchInputRef = useRef(null);

  const search = (e) => {
    e.preventDefault();
    const term = searchInputRef.current.value.trim().toLowerCase();
    if (!term) return;
    router.push(`/search/${term}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const term = searchInputRef.current.value.trim().toLowerCase();
      if (!term) return;
      router.push(`/search/${term}`);
    }
  };

  return (
    <div>
      <Header />
      {!session ? (
        <LogInPage />
      ) : (
        <div>
          <div className="flex w-full mt-5 hover:shadow-lg focus-within:shadow-lg items-center max-w-[1400px] mx-auto bg-white">
            <input
              placeholder="Search movies and shows"
              type="text"
              className="flex-grow focus:outline-none h-20 text-black text-3xl pl-5"
              ref={searchInputRef}
              onKeyDown={handleKeyDown}
            />
            <SearchIcon
              onClick={search}
              className="h-20 p-4 bg-white text-black cursor-pointer hover:bg-gray-200 hover:scale-150 hover:rounded-full transition transform duration-200  ease-in-out"
            />
          </div>

          <section>
            <MoviesCollection
              results={searchedData}
              title={"Explore"}
              _class={"gridding"}
            />
          </section>
        </div>
      )}
    </div>
  );
}

export default Search;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const [searchedData] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&language=en-US&query=${context.query.term}&page=1&include_adult=false`
    ).then((res) => res.json()),
  ]);
  return {
    props: {
      session,
      searchedData: searchedData.results,
    },
  };
}
