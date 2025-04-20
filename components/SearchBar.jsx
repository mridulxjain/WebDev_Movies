import {useState} from 'react';

export default function SearchBar({ isFocused, onFocus, onBlur }){

    const [isHovered,setHover] = useState(false);

    function onMouseEnter(){setHover(s => true)}
    function onMouseLeave(){setHover(s => false)}
    const styles = {
        width: isFocused ? '600px':'clamp(150px, 40vw, 500px)',
        position: 'absolute',
        height: isFocused? '50px':'40px',
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: isHovered ? '#242424' : '#1F1F1F',
        color: '#FFFFFF',
        left: '50%',
        top: isFocused ? "67%":'50%',
        transform: 'translateX(-50%) translateY(-50%)',
        backdropFilter: 'blur(8px)',
        outline: 'none',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        zIndex: 3,
        transition: 'width 0.4s ease, height 0.4s ease, top 0.3s ease'
    }

    return(
    <>
        <input
            style={styles}
            placeholder="Search"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onFocus={onFocus}
            onBlur={onBlur}
        ></input>
    </>);
}
    

    