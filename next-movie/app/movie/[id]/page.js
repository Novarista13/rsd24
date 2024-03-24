import React from "react";
import Link from "next/link";

const Movie = ({ params }) => {
  return (
    <div>
      <h1>
        Movie Page: <b className="text-green-500">{params.id}</b>
      </h1>
      <Link href="/">Home</Link>
    </div>
  );
};

export default Movie;
