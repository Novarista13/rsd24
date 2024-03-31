import Movies from "@/components/Movies";
import React from "react";

async function fetchTrending() {
  const token = process.env.TOKEN;
  const res = await fetch("https://api.themoviedb.org/3/trending/movie/day", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
}

export default async function Home() {
  const trendings = await fetchTrending();

  return (
    <>
      <h3 className="text-lg mb-3">Trendings</h3>

      <Movies movies={trendings.results} />
    </>
  );
}
