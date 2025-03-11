'use client';

import { useState, useRef } from 'react';
import '../styles/global.css';

export default function App() {
  // Tura ve yazı sayıları için state'ler
  const [tura, setTura] = useState(0);
  const [yazi, setYazi] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false); // Animasyon durumu
  const [result, setResult] = useState(null); // Sonucu saklamak için yeni state
  const coinRef = useRef(null);

  // Coin animasyonu ve sonucu belirleyen fonksiyon
  const handleFlip = () => {
    if (isFlipping) return; // Eğer animasyon devam ediyorsa başka işlem yapma
    setIsFlipping(true);

    // Rastgele tura ya da yazı seçme
    const flipResult = Math.floor(Math.random() * 2);
    setResult(flipResult); // Sonucu sakla

    coinRef.current.style.animation = 'none'; // Animasyonu sıfırla
    setTimeout(() => {
      if (flipResult === 1) {
        coinRef.current.style.animation = 'spin-tura 3s forwards'; // Tura animasyonu
      } else {
        coinRef.current.style.animation = 'spin-yazi 3s forwards'; // Yazı animasyonu
      }
    }, 100);
  };

  // Animasyon bitince sayıların arttırılması
  const handleAnimationEnd = () => {
    if (result === 1) {
      setTura((prevTura) => prevTura + 1); // Tura geldiğinde sayıyı arttır
    } else {
      setYazi((prevYazi) => prevYazi + 1); // Yazı geldiğinde sayıyı arttır
    }
    setIsFlipping(false); // Animasyon bitince isFlipping durumunu sıfırla
  };

  // Butonu geçici olarak devre dışı bırakma fonksiyonu
  const disableButton = () => {
    document.querySelector('.flip-button').disabled = true;
    setTimeout(() => {
      document.querySelector('.flip-button').disabled = false;
    }, 3000);
  };

  // Reset butonunu tıklama olayı
  const handleReset = () => {
    setIsFlipping(false); // Animasyon durumu sıfırla
    setResult(null); // Sonucu sıfırla
    setTura(0); // Tura sayısını sıfırla
    setYazi(0); // Yazı sayısını sıfırla
    coinRef.current.style.animation = 'none'; // Coin animasyonunu sıfırla
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