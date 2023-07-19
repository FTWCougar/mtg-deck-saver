"use client";

import { useState } from "react";
import CardDisplay from "./cardDisplay.js";
import Search from "./seach.js";

export default function Home() {
    const [cards, setCards] = useState([]);
    return (
        <main>
            <Search cards={cards} setCards={setCards} />
            <CardDisplay cards={cards} setCards={setCards} />
        </main>
    );
}
