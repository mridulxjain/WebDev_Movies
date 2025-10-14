// Home page: renders multiple `MovieGrid` sections.
// Each grid currently shows placeholder cards to keep the UI scaffolded for the sprint.
// TODO: Add server-side data fetching or client-side hooks to populate grids.
import styles from "@/styles/Home.module.css";
import MovieGrid from "@/components/MovieGrid";

export default function Home() {
  return(
    <>
        <MovieGrid title="Now Playing"/>
        <MovieGrid title="Top Rated"/>
        <MovieGrid title="Popular"/>
        <MovieGrid title="Upcoming"/>
    </>
  );
}
