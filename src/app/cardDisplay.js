import React, { useCallback } from "react";
import Card from "./card";

export default function CardDisplay({ cards, setCards }) {
    const increaseCount = useCallback(
        (card) => {
            setCards([...cards, card]);
        },
        [cards, setCards]
    );

    const decreaseCount = useCallback(
        (card) => {
            const localCards = [...cards];

            localCards.splice(localCards.lastIndexOf(card), 1);

            setCards(localCards);
        },
        [cards, setCards]
    );

    return (
        <div className="grid-container">
            {cards.map((card, index) => {
                let count = cards.reduce((acc, item) => {
                    if (item.id === card.id) {
                        return acc + 1;
                    }
                    return acc;
                }, 0);

                if (index !== cards.findIndex((c) => c.id === card.id)) {
                    return null;
                }

                return (
                    <Card
                        key={card.id}
                        card={card}
                        increaseCount={increaseCount}
                        decreaseCount={decreaseCount}
                        count={count}
                    />
                );
            })}
        </div>
    );
}
