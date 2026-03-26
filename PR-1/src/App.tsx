import { useState, useEffect } from 'react';
import Card from './card';
import './App.css';

const App = () => {
  const [balance, setBalance] = useState(0);
  const [msg, setMsg] = useState("Ek card chuno! Monster se bacho.");

  const initialCards = [
    { id: 1, type: 'gold', value: 500, icon: '💰', flipped: false },
    { id: 2, type: 'gold', value: 200, icon: '🪙', flipped: false },
    { id: 3, type: 'monster', value: 0, icon: '👹', flipped: false },
    { id: 4, type: 'gold', value: 1000, icon: '💎', flipped: false },
  ];

  // Shuffle logic
  const [cards, setCards] = useState(() => 
    [...initialCards].sort(() => Math.random() - 0.5)
  );

  const handleCardClick = (id: any) => {
    const cardIndex = cards.findIndex(c => c.id === id);
    if (cardIndex === -1 || cards[cardIndex].flipped) return;

    const clickedCard = cards[cardIndex];
    const newCards = [...cards];
    newCards[cardIndex] = { ...clickedCard, flipped: true };
    
    setCards(newCards);

    if (clickedCard.type === 'monster') {
      setBalance(0);
      setMsg("OH NO! Monster ne balance zero kar diya! 👹");
    } else {
      setBalance(prev => prev + clickedCard.value);
      setMsg(`Mubarak! Aapne ₹${clickedCard.value} jeete! 💸`);
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
            flipped={card.flipped}
            onFlip={() => handleCardClick(card.id)} 
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