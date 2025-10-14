// MovieGrid: displays a horizontally scrollable row of movie cards for a given section title.
// Currently renders placeholder cards; no external API calls are made.
// TODO: Wire this grid to a data source and pass real movie data to `MovieCard`.
// TODO: Add keyboard scroll support and accessible controls for non-pointer users.
import {useMemo} from 'react';
import MovieCard from './MovieCard';

export default function MovieGrid({title="Now Playing"}){
    // TODO(api): Implement data fetching for movies.
    // Consider using TMDB (The Movie Database) API or alternatives like OMDb, Trakt, JustWatch, or a self-hosted backend proxy.
    // Until an API is wired up, we render placeholder cards.

    const placeholderIds = useMemo(() => Array.from({length: 14}, (_, i) => `placeholder-${title}-${i}`), [title]);

    const gridComponent = placeholderIds.map(id => (
        <MovieCard key={id} placeholder={true} />
    ));

    return(
        <>
            <h1 style={{fontFamily: 'Oswald, sans-serif' , color:'#F1F1F1'}}>{title}</h1>
            <div className="scroll-container" style={{zIndex:1,display:'flex',gap: '25px',overflowX:'auto',maxWidth:'100vw',padding:'15px'}}>
                {gridComponent}
            </div>
        </>
    );
}