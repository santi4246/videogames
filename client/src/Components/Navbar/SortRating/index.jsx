import React from "react";
import { useDispatch } from "react-redux";
import { SortByRating } from "../../../Redux/Actions";
import style from './Sort.module.css'

export default function SortRating () {
    const dispatch = useDispatch();
    function onSelectChange (event) {
        dispatch(SortByRating(event.target.value));
    }
    return (
        <div className = {style.content}>
            <label>Rating: </label>
            <select name = 'select' onChange = {onSelectChange} className = {style.select}>
                <option value = 'MIN'>Min rating</option>
                <option value = 'MAX'>Max rating</option>
            </select>
        </div>
    )
}