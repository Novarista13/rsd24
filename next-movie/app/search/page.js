import Movies from "@/components/Movies";
import React from "react";

async function fetchSearch(query) {
  const token = process.env.TOKEN;
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await res.json();
}

export default async function Home({ searchParams }) {
  const search = await fetchSearch(searchParams.q);

  return (
    <>
      <h3 className="text-lg mb-3">search - {searchParams.q}</h3>

      <Movies movies={search.results} />
    </>
  );
}
