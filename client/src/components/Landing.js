import React from 'react';
import Navbar from './NavBar';

function TopOfPage() {
    return (
        <div style={{ 
            backgroundColor: 'black', 
            height: 500, 
            backgroundImage: "url('/top.png')", 
            backgroundSize: 'cover', 
            backgroundPosition: 'top', 
            width: '100vw', 
            overflow: 'hidden',
            position: 'relative' 
        }}>
            <h1 style={{
                color:'white', 
                left: '10%', 
                fontSize:42, 
                fontFamily:"fantasy", 
                fontWeight:"bolder",
                position: 'relative', 
                bottom: '10px' 
            }}>
                CocktailCartel
            </h1>
            <Navbar></Navbar>

            <p style={{ 
                color: 'white', 
                textAlign: 'center', 
                marginTop: "120px", 
                fontSize: 24,
                fontWeight:"bold" 
            }}>
                Whether you are looking for the occasional nightcap, a self-care day drink, 
                your favourite hotel cocktail or hosting guests, browse through our collection 
                to find the best fitting drink to match your vibe!
            </p>
        </div>
    );
}

export default TopOfPage;