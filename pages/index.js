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
