import React from "react";
import Link from "next/link";

const Movies = ({ movies }) => {
  const poster = "http://image.tmdb.org/t/p/w342";
  return (
    // w-[1000px] overflow-x-auto
    <div className="flex flex-row gap-2 flex-wrap">
      {movies.map((movie) => (
        <div className="w-[195px] text-center">
          <Link href={`/movie/${movie.id}`}>
            <img
              src={`${poster}/${movie.poster_path}`}
              alt=""
              className="w-full hover:scale-110 transition-all"
              // className="min-h-[300px] min-w-[200px]"
            />
            <h4 className="pt-3 pb-1">{movie.title}</h4>
            <span className="text-sm text-gray-500">
              {movie.release_date.split("-")[0]}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Movies;
