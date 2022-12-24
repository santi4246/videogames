import React from "react";
import style from './Button.module.css';

export default function Button ({ children }) {
    function onClick () {
        window.location = '/home';
    }
    return (
        <button className = {style.button} onClick = {onClick}><span>{children}</span><i></i></button>
    )
}