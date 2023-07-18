import { useEffect, useState } from "react";
import Card from "./card";
import "./search.css";

export default function AddCard() {
    const [input, setInput] = useState("");
    const [results, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchCardData = async () => {
            try {
                const response = await fetch(
                    `https://api.magicthegathering.io/v1/cards?name=${input}`
                );
                const searchRes = await response.json();
                setResults(searchRes.cards);
            } catch (error) {
                console.error("Error fetching card data:", error);
            }
        };

        if (input.length >= 3) {
            fetchCardData();
        }
    }, [input]);

    useEffect(() => {
        const filteredOptions = results.filter((card, index) => {
            return index === 0 || card.name !== results[index - 1].name;
        });
        setFilteredResults(filteredOptions);
    }, [results]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://api.magicthegathering.io/v1/cards?name=${input}`)
            .then((res) => res.json())
            .then((card) => {
                const newCard = card.cards[0];
                setCards((prev) => [...prev, newCard]);
            });
    };

    return (
        <div>
            <form className="search-bar" onSubmit={(e) => handleSubmit(e)}>
                <input
                    className="search-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    list="cards"
                />
                <datalist id="cards">
                    {filteredResults.map((card) => {
                        return <option key={card.id}>{card.name}</option>;
                    })}
                </datalist>
                <button className="search-button">Add Card</button>
            </form>
            <Card cards={cards} setCards={setCards} />
        </div>
    );
}
