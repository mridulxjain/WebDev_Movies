// MovieCard: a single movie item with poster/title space and hover interaction.
// In placeholder mode, it renders a skeleton block; otherwise it acts as a clickable card.
// TODO: Accept explicit props like `title`, `posterUrl`, and `id` when API integration is added.
import { useState } from "react";
import { useRouter } from "next/router";

export default function MovieCard({movieID=12, placeholder=false}){
    const router = useRouter();

    const [mouseFocus,setMFocus] = useState(false);

    function mouseFocused(){
        setMFocus(true)
    }

    function mouseUnfocused(){
        setMFocus(false)
    }

    // TODO(api): When API is implemented, replace placeholder rendering with real poster and title.
    // Suggested providers: TMDB (rich data, images), OMDb (simple, key-based), Trakt (social/metadata), JustWatch (availability), or your own backend.

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
            background: 'linear-gradient(135deg, #2A2A2A 0%, #1C1C1C 100%)',
            display: 'block'
        },
        skeletonBar:{
            width: '70%',
            height: '16px',
            marginTop: '10px',
            borderRadius: '6px',
            background: 'linear-gradient(90deg, #2a2a2a 0%, #3a3a3a 50%, #2a2a2a 100%)',
            backgroundSize: '200% 100%',
            animation: 'placeholderShimmer 1.2s ease-in-out infinite'
        },
        title:{
            color: '#B0B0B0',
            fontSize: '1.2rem',
            justifySelf: 'center',
            fontFamily: 'Oswald, sans-serif',
        }
    }

    if (placeholder){
        return (
            <>
                <div style={styles.div}>
                    <div style={styles.image} onMouseEnter={mouseFocused} onMouseLeave={mouseUnfocused}></div>
                    <div style={styles.skeletonBar}></div>
                </div>
            </>
        );
    }

    // Fallback non-placeholder (if used elsewhere later)
    return (
        <>
            <div style={styles.div}>
                <div style={styles.image} onMouseEnter={mouseFocused} onMouseLeave={mouseUnfocused} onClick={() => router.push(`/movies/${movieID}`)}></div>
                <h2 style={styles.title}>Movie Title</h2>
            </div>
        </>
    );
}