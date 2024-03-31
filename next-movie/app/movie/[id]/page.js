import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

async function fetchMovie(id) {
  const token = process.env.TOKEN;
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
}

async function fetchCasts(id) {
  const token = process.env.TOKEN;
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.cast;
}

const Movie = async ({ params }) => {
  const movie = await fetchMovie(params.id);
  const casts = await fetchCasts(params.id);
  const cover = "http://image.tmdb.org/t/p/w1280";
  const profile = "http://image.tmdb.org/t/p/w185";
  return (
    <div>
      <h2 className="mb-2">
        {movie.title}
        <span className="ml-1">({movie.release_date.split("-")[0]})</span>
      </h2>
      <div className="mb-4 mt-2 text-white">
        {movie.genres.map((genre) => (
          <Badge variant="outline" className="mr-2 text-white">
            {genre.name}
          </Badge>
        ))}
      </div>
      <img src={`${cover}/${movie.backdrop_path}`} className="h-full" />
      <p className="mt-4">{movie.overview}</p>
      <div className="my-4 border-t pt-3">
        <div className="flex gap-5 flex-row w-[1000px] overflow-x-auto">
          {casts.map((cast) => (
            <div className="max-w-[180px] min-w-[160px] bg-gray-600 text-center">
              <img
                src={`${profile}/${cast.profile_path}`}
                alt=""
                className="w-full"
              />
              <div className="text-sm">
                <Link href={`/person/${cast.id}`}>{cast.name} </Link>
              </div>
              <span className="text-sm text-gray-400">{cast.character}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movie;
