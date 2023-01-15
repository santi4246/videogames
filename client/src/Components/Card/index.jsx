import React from "react";
import { NavLink } from "react-router-dom";
import style from './Card.module.css';

export default function Card ({ game }) {
    return (
        <div className = {style.card}>
            <NavLink to = {`home/game/${game.id}`} className={style.title}>
            <img src = {game.img} alt = {game.name} className = {style.img}></img>
            <h4>{game.name}</h4>
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
            </NavLink>
        </div>
    )
}