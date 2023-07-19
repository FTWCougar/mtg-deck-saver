import React, {useCallback} from 'react';
import './card.css';

export default function Card({cards, setCards}) {
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
                }, 0);

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
