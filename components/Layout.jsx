// Layout: wraps all pages with a consistent header, main content area, and footer.
// Includes a focus-aware overlay tied to the `SearchBar` to create a spotlight effect.
// TODO: Improve accessibility (ARIA roles/labels for header/main/footer, skip links).
// TODO: Consider extracting inline styles to CSS for easier theming and maintenance.
// TODO: Make header responsive on small screens (collapse/stack elements, reduce blur overlays).
import Head from 'next/head';
import SearchBar from './SearchBar';
import {useState} from 'react';

export default function Layout({ children }) {

  const [focused, setFocused] = useState(false);

  function handleFocus(){
    setFocused(true);

  }
  function handleBlur(){
    setFocused(false);
  }

  return (
    <>
      <Head>
        <title>Movie Database</title>
        <meta name="description" content="Browse your favorite movies and anime!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header style={styles.header}>

        <h1 style={{marginLeft: "15px"}}>MovieDB</h1>
        
        {focused ? 
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backdropFilter: 'blur(7px)',
              zIndex: 1,
              transition: 'backdrop-filter 0.4s ease'
            }}
          ></div> : <div
            style={{
              position: 'absolute',
              inset: 0,
              backdropFilter: 'blur(0px)',
              zIndex: 1,
              transition: 'backdrop-filter 0.4s ease'
            }}
        ></div>}

        <SearchBar 
          isFocused={focused}
          onFocus={handleFocus}
          onBlur={handleBlur}/>

      </header>

      
      <main style={styles.main}>
        {children}
        {focused ? 
            <div
              style={{
                position: 'absolute',
                inset: 0,
                top:'14%',
                backdropFilter: 'blur(7px)',
                zIndex: 1,
                transition: 'backdrop-filter 0.4s ease'
              }}
            ></div> : <div
              style={{
                position: 'absolute',
                inset: 0,
                display:'none',
                backdropFilter: 'blur(0px)',
                zIndex: 1,
                transition: 'backdrop-filter 0.4s ease'
              }}
          ></div>}
      </main>

      <footer style={styles.footer}>
        <p>© 2025 Mystic</p>
      </footer>
    </>
  );
}

const styles = {
    header: {
      padding: '.8rem',
      color: '#E0E0E0',
      width: '99%',
      textAlign: 'left',
      justifySelf: 'center',
      borderRadius: '20px',
      alignItems: 'center',
      fontFamily: 'Oswald, sans-serif',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative ',
      zIndex: 1
    },
    main: {
      padding: '2rem',
      minHeight: '80vh',
      background: '#121212',
      zIndex: 1
    },
    footer: {
      padding: '1rem',
      background: '#1F1F1F',
      color: '#ccc',
      textAlign: 'center',
      zIndex: 1
    },
  };