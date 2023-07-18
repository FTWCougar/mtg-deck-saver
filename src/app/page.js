"use client";

import Search from "./seach.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
    return (
        <main>
            <ToastContainer />
            <Search />
        </main>
    );
}
