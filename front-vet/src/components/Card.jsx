function Card({ titulo, valor }) {
  return (
    <div className="card shadow">
      <div className="card-body text-center">
        <h5>{titulo}</h5>
        <h1>{valor}</h1>
      </div>
    </div>
  );
}

export default Card;