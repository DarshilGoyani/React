import React, { useState } from 'react';
import Card from './card';
import './App.css';

// Interface for Card Object
interface CardData {
  id: number;
  type: 'gold' | 'monster';
  value: number;
  icon: string;
}

const App: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [msg, setMsg] = useState<string>("Ek card chuno! Monster se bacho.");

  const initialCards: CardData[] = [
    { id: 1, type: 'gold', value: 500, icon: '💰' },
    { id: 2, type: 'gold', value: 200, icon: '🪙' },
    { id: 3, type: 'monster', value: 0, icon: '👹' },
    { id: 4, type: 'gold', value: 1000, icon: '💎' },
  ];

  // Shuffle logic
  const [cards] = useState<CardData[]>([...initialCards].sort(() => Math.random() - 0.5));

  const handleCardClick = (type: 'gold' | 'monster', value: number): void => {
    if (type === 'monster') {
      setBalance(0);
      setMsg("OH NO! Monster ne balance zero kar diya! 👹");
    } else {
      setBalance(prev => prev + value);
      setMsg(`Mubarak! Aapne ₹${value} jeete! 💸`);
    }
  };

  return (
    <div className="app-container">
      <h1>👹 Monster vs Gold 💰</h1>
      <div className="status-bar">
        <h2>Balance: ₹{balance}</h2>
        <p>{msg}</p>
      </div>

      <div className="card-grid">
        {cards.map((card) => (
          <Card 
            key={card.id} 
            data={card} 
            onFlip={handleCardClick} 
          />
        ))}
      </div>

      <button className="reset-btn" onClick={() => window.location.reload()}>
        Restart Game
      </button>
    </div>
  );
};

export default App;