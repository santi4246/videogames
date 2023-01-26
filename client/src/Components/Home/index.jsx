import React, { useEffect, useState } from "react";
import { fetchServer } from "../../Redux/Actions";
import style from './Home.module.css';
import Card from '../Card';
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";

export default function Home () {
    const dispatch = useDispatch();
    const { gamesFiltered } = useSelector(state => state);
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const nextPage = () => {
        const total = gamesFiltered.length;
        const index = currentPage + 15;
        if (index >= total) {
            return;
        }
        setCurrentPage(currentPage+15);
        setPage(page+1);        
    }
    const previousPage = () => {
        const prev = currentPage - 15;
        if (prev < 0) {
            return;
        }
        setCurrentPage(currentPage-15);
        setPage(page-1);        
    }
    useEffect(() => {
        dispatch(fetchServer());
    }, [dispatch]);
    return (
        gamesFiltered.length ? 
        <div className="main">
                        <h3>Games Room</h3>
                        <div className = {style.container}>
                            <button onClick={previousPage}>previous</button>
                            <label>{page}</label>
                            <button onClick={nextPage}>next</button>
                        </div>
                        <div className="container">
                            {
                                [...gamesFiltered].slice(currentPage, currentPage + 15).map((game, i) => (
                                    <Card key = {i} game = {game}/>
                                ))
                            }
                        </div>
                    </div>
        : <Loading />
    )
}