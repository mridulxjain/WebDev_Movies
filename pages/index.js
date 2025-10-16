import MovieGrid from "@/components/MovieGrid";

export default function Home() {
  return (
    <>
      <MovieGrid title="Now Playing" category="now_playing" scrollDirection="right" />
      <MovieGrid title="Top Rated" category="top_rated" scrollDirection="left" />
      <MovieGrid title="Popular" category="popular" scrollDirection="right" />
      <MovieGrid title="Upcoming" category="upcoming" scrollDirection="left" />

    </>
  );
}
