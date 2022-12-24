import React from "react";
import { NavLink } from "react-router-dom";
import style from './Card.module.css';

export default function Card ({ game }) {
    return (
        <div className = {style.card}>
            <img src = {game.img} alt = {game.name} className = {style.img}></img>
            <NavLink to = {`home/game/${game.id}`} className={style.title}>{game.name}</NavLink>
            <div className = {style.content}>
            {game.genres ? 
                    <>
                        {game.genres.map((genre, index) => (
                            <p key = { index }>{genre}</p>
                        ))}
                    </>
                : <p>No genre</p>}
            <p>{game.rating} ⭐</p>
            </div>
        </div>
    )
}