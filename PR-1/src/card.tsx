import React, { useState } from 'react';

// Define Props Interface
interface CardProps {
  data: {
    type: 'gold' | 'monster';
    value: number;
    icon: string;
  };
  onFlip: (type: 'gold' | 'monster', value: number) => void;
}

const Card: React.FC<CardProps> = ({ data, onFlip }) => {
  const [flipped, setFlipped] = useState<boolean>(false);

  const handleClick = (): void => {
    if (!flipped) {
      setFlipped(true);
      onFlip(data.type, data.value);
    }
  };

  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={handleClick}>
      <div className="card-inner">
        {/* Front Side */}
        <div className="card-front">
          <span>?</span>
        </div>
        
        {/* Back Side */}
        <div className={`card-back ${data.type}`}>
          <div className="icon">{data.icon}</div>
          <div className="result-text">
            {data.type === 'monster' ? 'BOOM!' : `+₹${data.value}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;