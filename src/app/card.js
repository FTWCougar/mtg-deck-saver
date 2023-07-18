import React, { useEffect, useState } from "react";
import "./card.css";

export default function Card({ cards, setCards }) {
    const [cardCounts, setCardCounts] = useState({});

    useEffect(() => {
        const counts = cards.reduce((counts, card) => {
            const { id } = card;
            counts[id] = (counts[id] || 0) + 1;
            return counts;
        }, {});

        setCardCounts(counts);
    }, [cards]);

    const increaseCount = (card) => {
        fetch(`https://api.magicthegathering.io/v1/cards?name=${card.name}`)
            .then((res) => res.json())
            .then((card) => {
                const newCard = card.cards[0];
                setCards((prev) => [...prev, newCard]);
            });
    };
    const decreaseCount = (card) => {
        const index = cards.findIndex((c) => c.id === card.id);
        if (index > -1) {
            const array = cards;
            setCards(array.splice(index, 1));
            console.log(cards);
        }
    };

    return (
        <div className="grid-container">
            {cards &&
                cards.map((card, index) => {
                    const count = cardCounts[card.id] || 0;

                    if (index !== cards.findIndex((c) => c.id === card.id)) {
                        return null;
                    }

                    return (
                        <div className="grid-item" key={card.id}>
                            <img
                                className="card-img"
                                src={card.imageUrl}
                                alt={card.name}
                            />
                            <div className="count-overlay">
                                <p>{count}</p>
                                <button onClick={() => increaseCount(card)}>
                                    +
                                </button>
                                <button onClick={() => decreaseCount(card)}>
                                    -
                                </button>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
