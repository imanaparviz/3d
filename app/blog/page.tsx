"use client"
import React, { useState } from 'react';
import Navbar from '../../components/navbar'

function GamePage() {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
    // Hier kannst du den Code hinzufügen, um das Spiel zu starten, z. B. die Spline-URL aufrufen.
    // Beispiel: window.location.href = 'https://my.spline.design/your-game-url';
  };

  return (<>
 <Navbar />
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0', // Hintergrundfarbe der Seite
      }}
    >
      {!gameStarted ? (
        <button
          onClick={startGame}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Start Game
        </button>
      ) : (
        <div>
          {/* Hier fügst du den Code oder das Spline-Asset für das Spiel ein */}
          {/* Zum Beispiel: */}
          <iframe
            src='https://my.spline.design/townvespaminigamecopy-82f104566c8fa6557962f50307fc180d/'
            frameBorder='0'
            width='100%'
            height='100%'
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          ></iframe>
        </div>
      )}
    </div>
    </>
  );
}

export default GamePage;
