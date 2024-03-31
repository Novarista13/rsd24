import Movies from "@/components/Movies";
import React from "react";

async function fetchMovies(id) {
  const token = process.env.TOKEN;
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await res.json();
}

export default async function Home({ params }) {
  const byGeneres = await fetchMovies(params.id);

  return (
    <>
      <h3 className="text-lg font-medium mb-3">{params.name}</h3>
      <Movies movies={byGeneres.results} />
    </>
  );
}
