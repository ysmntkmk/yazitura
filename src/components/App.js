'use client';

import { useState, useRef } from 'react';
import '../styles/global.css';

export default function App() {
  const [tura, setTura] = useState(0);
  const [yazi, setYazi] = useState(0);
  const coinRef = useRef(null);
  const [isFlipping, setIsFlipping] = useState(false); // animasyon durumunu kontrol eden state

  const handleFlip = () => {
    if (isFlipping) return; // Eğer animasyon halindeyse, başka bir işlem yapma
    setIsFlipping(true);

    const result = Math.floor(Math.random() * 2);
    coinRef.current.style.animation = 'none'; // Animasyonu sıfırla
    setTimeout(() => {
      if (result === 1) {
        coinRef.current.style.animation = 'spin-tura 3s forwards';
        setTura(tura + 1);
      } else {
        coinRef.current.style.animation = 'spin-yazi 3s forwards';
        setYazi(yazi + 1);
      }
    }, 100);

    disableButton();
  };

  const disableButton = () => {
    document.querySelector('.flip-button').disabled = true;
    setTimeout(() => {
      document.querySelector('.flip-button').disabled = false;
    }, 3000);
  };

  const handleReset = () => {
    setTura(0);
    setYazi(0);
    coinRef.current.style.animation = 'none';
  };

 
  const handleAnimationEnd = () => {
    setIsFlipping(false); 
  };

  return (
    <div className="container">
      <div className="stats">
        <p id="tura-count">Tura: {tura}</p>
        <p id="yazi-count">Yazı: {yazi}</p>
      </div>
      <div className="coin" ref={coinRef} onAnimationEnd={handleAnimationEnd}>
        <div className="tura">
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/1TL_reverse.png" alt="Tura" />
        </div>
        <div className="yazi">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/1TL_obverse.png" alt="Yazi" />
        </div>
      </div>
      <div className="buttons">
        <button className="flip-button button" onClick={handleFlip} disabled={isFlipping}>
          {isFlipping ? 'Dönüyor...' : 'Döndür'}
        </button>
        <button className="reset-button button" onClick={handleReset}>Sıfırla</button>
      </div>
    </div>
  );
}