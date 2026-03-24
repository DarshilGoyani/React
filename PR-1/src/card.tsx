const Card = ({ data, flipped, onFlip }: any) => {
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