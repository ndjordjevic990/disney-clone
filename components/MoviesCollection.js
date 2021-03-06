import MovieThumbnail from "./MovieThumbnail";

function MoviesCollection({ results, title, _class, type }) {
  return (
    <div className="relative flex flex-col space-y-2 my-10 px-8 max-w-[1400px] mx-auto">
      <h2 className="font-semibold">{title}</h2>
      <div className={_class}>
        {results.map((result) => (
          <MovieThumbnail
            key={result.id}
            result={result}
            type={type || result.media_type}
          />
        ))}
      </div>
    </div>
  );
}

export default MoviesCollection;
