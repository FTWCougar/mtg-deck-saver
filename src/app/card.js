import React from "react";
import "./card.css";

export default function Card({ card, increaseCount, decreaseCount, count }) {
    return (
        <div className="grid-item" key={card.id}>
            <img className="card-img" src={card.imageUrl} alt={card.name} />
            <div className="count-overlay">
                <p>{count}</p>
                <button onClick={() => increaseCount(card)}>+</button>
                <button onClick={() => decreaseCount(card)}>-</button>
            </div>
        </div>
    );
}
