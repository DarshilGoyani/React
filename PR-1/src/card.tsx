import React from 'react';

// Define Props Interface
interface CardProps {
  data: {
    type: 'gold' | 'monster';
    value: number;
    icon: string;
  };
  flipped: boolean;
  onFlip: () => void;
}

const Card: React.FC<CardProps> = ({ data, flipped, onFlip }) => {
  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={onFlip}>
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