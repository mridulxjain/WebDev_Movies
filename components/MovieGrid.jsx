import {useEffect, useState} from 'react';
import MovieCard from './MovieCard';

export default function MovieGrid({title="Now Playing"}){
    
    const token = process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN;

    const [cardIDs,setIDs] = useState([]);

    let category = '';
    switch(title){
        case 'Now Playing':
            category='now_playing';
            break;
        case 'Popular':
            category='popular';
            break;
        case 'Top Rated':
            category='top_rated';
            break;
        case 'Upcoming':
            category='upcoming';
            break;
        default:
            break;
    }

    useEffect(()=>{
        const fetchMovies = async() => {
            try{
                const res = await fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
                    {
                        method:'GET',
                        headers:{
                            accept: 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                const data = await res.json();

                console.log(data.results[0].id);

                for(let i = 0 ; i < 14 ; i++){
                    setIDs(prev => [...prev,data.results[i].id]);
                }
            }
            catch(err){
                console.error(err);
            }

        }

        fetchMovies();
    },[])


    const gridComponent = cardIDs.map(id => (
        <MovieCard key={id} movieID={id} />
      ))
    return(
        <>
            <h1 style={{fontFamily: 'Oswald, sans-serif' , color:'#F1F1F1'}}>{title}</h1>
            <div className="scroll-container" style={{zIndex:1,display:'flex',gap: '25px',overflowX:'auto',maxWidth:'100vw',padding:'15px'}}>
                {gridComponent}
            </div>
        </>
    );
}