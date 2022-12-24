import React from "react";
import { Link } from "react-router-dom";
import style from './Game.module.css';

export default function Navbar ({ title }) {
    return (
        <nav className = {style.navbar}>            
                <li className="nav-item"><Link to = '/home' className="nav-links">Return Home</Link></li>
                <h4 className = {style.title}>Game: {title}</h4>
        </nav>
    )
}