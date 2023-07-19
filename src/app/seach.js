import { useEffect, useState } from "react";

const filterDuplicates = (card, index, array) => {
    const cardNames = array.map((c) => c.name);

    return cardNames.indexOf(card.name) === index;
};

const fetchCardData = async (input) => {
    try {
        const response = await fetch(
            `https://api.magicthegathering.io/v1/cards?name=${input}`
        );

        const searchRes = await response.json();

        const filteredCards = searchRes.cards.filter(filterDuplicates);

        return [filteredCards, searchRes.cards];
    } catch (error) {
        console.error("Error fetching card data:", error);
    }
};

export default function AddCard({ cards, setCards }) {
    const [input, setInput] = useState("");
    const [results, setResults] = useState([]);
    const [searchResultsLength, setSearchResultsLength] = useState(-1);

    useEffect(() => {
        if (input.length < 3) {
            setSearchResultsLength(-1);
            setResults([]);
        }

        if (
            input.length >= 3 &&
            (searchResultsLength === -1 || searchResultsLength === 100)
        ) {
            fetchCardData(input).then((res) => {
                const [filteredResults, rawResults] = res;
                setResults(filteredResults);
                setSearchResultsLength(rawResults.length);
            });
        }
    }, [input, setResults, searchResultsLength]);

    const handleSubmit = (e) => {
        e.preventDefault();

        setCards([
            ...cards,
            results.find(
                (card) => card.name.toLowerCase() === input.toLowerCase()
            ),
        ]);
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
                    {results.map((card) => {
                        return <option key={card.id}>{card.name}</option>;
                    })}
                </datalist>
                <button className="search-button">Add Card</button>
            </form>
        </div>
    );
}
