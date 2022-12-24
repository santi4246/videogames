import React from "react";
import { useDispatch } from "react-redux";
import { SortByName } from "../../../Redux/Actions";
import style from './Sort.module.css';

export default function Sort () {
    const dispatch = useDispatch();
    function onSelectChange (event) {
        dispatch(SortByName(event.target.value));
    }
    return (
        <div className = {style.content}>
            <label>Name: </label>
            <select name = 'select' onChange = {onSelectChange} className = {style.select}>
                <option value = 'ASC'>Ascending</option>
                <option value = 'DESC'>Descending</option>
            </select>
        </div>
    )
}