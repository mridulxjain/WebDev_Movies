import { useEffect ,useState} from "react";
import { useRouter } from "next/router";

export default function MovieCard({movieID=12}){
    const token = process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN;
    const router = useRouter();

    const [movie,setMovie] = useState(null);
    const [posterPath,setPPath] = useState(null);
    const [mTitle,setTitle] = useState(null);

    const [mouseFocus,setMFocus] = useState(false);

    function mouseFocused(){
        setMFocus(true)
    }

    function mouseUnfocused(){
        setMFocus(false)
    }

    useEffect(() => {
        const fetchMovie = async() => {
            try{
                const res = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?language=en-US`,
                {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await res.json();
                setMovie(data);
            }catch(error){
                console.error('Failed to fetch movie',error)
            }
        }

        fetchMovie();
    },[])

    useEffect(()=>{
        if (movie){
            setPPath(movie.poster_path)
            setTitle(movie.title)
        };
    },[movie])

    const imgURL=`https://image.tmdb.org/t/p/w780${posterPath}`;
    
    const styles = {
        div:{
            maxWidth: '200px',
        },
        image:{
            width: '200px',
            height: '300px',
            borderRadius: '12px',
            transition: 'transform 0.3s ease',
            transform: mouseFocus ? 'scale(1.05)' : 'scale(1)',
        },
        title:{
            color: '#B0B0B0',
            fontSize: '1.2rem',
            justifySelf: 'center',
            fontFamily: 'Oswald, sans-serif',
        }
    }
    return(
    <>
        <div style={styles.div}>   
            <img src={imgURL} alt={mTitle} style={styles.image} onMouseEnter={mouseFocused} onMouseLeave={mouseUnfocused} onClick={() => router.push(`/movies/${movieID}`)}/>
            <h2 style={styles.title}>{mTitle}</h2>
        </div>
    </>);
}