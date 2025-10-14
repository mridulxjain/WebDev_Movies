// Movie detail page: shows a single movie with backdrop, poster, and metadata.
// Currently relies on TMDB endpoints. For the sprint, you can replace with your chosen provider.
// TODO: Replace TMDB fetches with your data layer or adapter (TMDB/OMDb/Trakt/JustWatch/backend).
// TODO: Add loading and error states; handle missing images and provider logos gracefully.
import { useRouter } from "next/router";
import { useEffect , useState} from "react";

export default function Page(){
    const router = useRouter();
    const {id} = router.query;

    // TODO(security): Do not expose secrets in the client. Use a server route/proxy for API tokens.
    const token = process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN;

    const [movie,setMovie] = useState(null);
    const [provider,setProvider] = useState(null);

    useEffect(()=>{
        const fetchMovieData = async() => {
            try{
                if (!id) return;
                const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`,{
                    method:'GET',
                    headers:{
                        accept: 'application/json',    
                        Authorization: `Bearer ${token}` 
                    }
                })

                const data = await res.json();
                setMovie(data);
            }
            catch(err){
                console.error(err);
            }

        }

        fetchMovieData();
    },[id])

    useEffect(()=>{
        const fetchMovieStreaming = async() => {
            try{
                if (!id) return;
                const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers`,{
                    method:'GET',
                    headers:{
                        accept: 'application/json',    
                        Authorization: `Bearer ${token}` 
                    }
                })

                const data = await res.json();
                setProvider(data);
            }
            catch(err){
                console.error(err);
            }

        }

        fetchMovieStreaming();
    },[id])

    console.log(provider);

    const posterURL=`https://image.tmdb.org/t/p/w780${movie?.poster_path}`;
    const backdropURL = `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`;

    //Provider data obtained from JustWatch
    const providerURL=`https://image.tmdb.org/t/p/w780${provider?.results?.IN?.flatrate?.[0]?.logo_path}`;

    const styles = {
        backdrop:{
            backgroundImage: `url(${backdropURL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh', 
            padding: '2rem',
            color: 'white',
            position: 'relative',
        },
        overlay:{
            display:'flex',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: '2rem',
            borderRadius: '12px',
            maxWidth: '100vw',
            margin: '0 auto',
        },
        poster:{
            width: '300px',
            height: '450px',
        },
        rating:{
            color: '#E0E0E0',
            fontSize: '1.45rem',
            fontFamily: `'Lora',sans-serif`,
            marginTop: '20px',
            marginBottom: '25px',
            fontWeight: 600
        },
        infoDiv:{
            marginLeft: '50px',
            color: '#F1F1F1',
            fontFamily: `'Poppins',sans-serif`,
        },
        title:{
            fontSize:'4rem',
            marginTop: '0px',
            marginBottom: '10px'
        },
        text:{
            marginTop:'25px',
            fontWeight:'500',
        },
        text2:{
            fontWeight:'500',
        }
    }

    return(
    <> 
        <div style={styles.backdrop}>
            <div style={styles.overlay}>
                <div style={{width:'300px'}}>
                    <img src={posterURL} style={styles.poster}></img>
                </div>
                <div style={styles.infoDiv}>
                    <h1 style={styles.title}>{movie?.title}</h1>
                    <h2 style={styles.rating}>Rating : {movie?.vote_average}</h2>
                    <h3 style={{fontWeight:500}}>{movie?.overview}</h3>
                    <h2 style={styles.text}>Release Date : {movie?.release_date}</h2>
                    <h2 style={styles.text2}>Genre : {movie?.genres[0]?.name}, {movie?.genres[1]?.name}</h2>
                    <h2 style={styles.text2}>Status : {movie?.status}</h2>
                    <h2 style={styles.text2}>Runtime : {movie?.runtime} min</h2>
                    <h2 style={styles.text2}>Production Studio: {movie?.production_companies[0]?.name}</h2>
                    <div style={{display:"flex"}}>
                        <h2 style={styles.text2}>Stream On : </h2>
                        <img src={providerURL} style={{width:'50px',height:'50px',alignSelf:'center',marginLeft:'7px'}} alt='Not Available'></img>
                    </div>
                </div>
            </div>
        </div>
    </>);
}