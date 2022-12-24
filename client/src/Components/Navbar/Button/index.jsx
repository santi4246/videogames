import React from "react";
import { Link } from "react-router-dom";
import './Button.css';

export default function Button () {
    return (
        <Link to = '/home/create'><button className = 'btn'>Create Game</button></Link>
    )
}