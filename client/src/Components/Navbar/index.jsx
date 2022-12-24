import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import Button from './Button';
import SearchBar from "./SearchBar";
import Sort from "./Sort";
import SortRating from "./SortRating";
import SortGenres from "./SortGenres";

export default function Navbar () {
    function onClick () {
        window.location = '/home';
    }
    return (
        <nav className = "navbar">
            <ul>
                <li className="nav-item"><Link to = '/home' className="nav-links" onClick={onClick}>Home</Link></li>
            </ul>
            <Button />
            <SearchBar />
            <Sort />
            <SortRating />
            <SortGenres />
        </nav>
    )
}