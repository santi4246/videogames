import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, SortByGenres } from "../../../Redux/Actions";
import style from './Sort.module.css';

export default function SortGenres () {
    const dispatch = useDispatch();
    const genres = useSelector(state => state.genres);
    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);
    function onSelectChange (event) {
        dispatch(SortByGenres(event.target.value));
    }
    return (
        <div className = {style.content}>
            <label>Genres: </label>
            <select name = 'select' onChange = {onSelectChange} className = {style.select}>
                {genres?.map((genre, index) => (
                    <option key = {index} value = {genre}>{genre}</option>
                ))}
            </select>
        </div>
    )
}