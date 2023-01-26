import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail, clearPage } from "../../Redux/Actions";
import Loading from "../Loading";
import style from './Game.module.css';
import Navbar from "./Navbar";

export default function Game () {
    const { id } = useParams();
    const dispatch = useDispatch();
    const game = useSelector(state => state.gameDetail);    
    useEffect(() => {
        dispatch(getDetail(id));        
        return () => {
            dispatch(clearPage());
        }
    }, [dispatch, id]);    
    return (
        <>
            {game && game.name ? 
            <>
                <Navbar title = {game.name}/>
                <div className = {style.game}>
                    <div className = {style.content}>
                        <div className = {style.card}>
                            <img src = {game.img} alt = {game.name} className = {style.img}></img>
                            <h3>Name: {game.name}</h3>
                            <div dangerouslySetInnerHTML={{ __html: game.description }}/>                            
                            <h3>Launch: {game.launch}</h3>
                            <h3>Rating: {game.rating}</h3>
                            <div>
                                <h5>Genres: </h5>
                                {game.genres?.map((genre, index) => (
                                        <p key = { index }>{genre}</p>
                                    ))}
                            </div>
                            <div className = {style.info}>
                                <h4>Platforms: </h4>
                                {game.platforms.map((platform, index) => (
                                        <p key = { index }>{platform}</p>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </> : <Loading />}
        </>
    )
}