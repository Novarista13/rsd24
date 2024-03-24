import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function fetchGenres() {
  const token = process.env.TOKEN;
  const res = await fetch("", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
}

const Home = () => {
  const data = fetchGenres();
  return (
    <div className="flex">
      <div className="min-w-[250px] pr-4 border-r">
        <Button className="w-full justify-start">All Movies</Button>
        {data.genres.map((genre) => (
          <Button className="w-full justify-start">{genre}</Button>
        ))}
      </div>
    </div>
  );
};

export default Home;
{
  /* <h1>Next Movie</h1>
      <Link href="/genres">Genres</Link> */
}
