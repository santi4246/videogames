import axios from 'axios';
import { CLEAR_PAGE, CLEAR_STATE, ERROR, FETCH_SERVER, GET_DETAIL, GET_GENRES, SEARCH, SORT_BY_GENRE, SORT_BY_NAME, SORT_BY_RATING, POST_GAME } from "./actionTypes";

export const clearPage = () => {
    return { type: CLEAR_PAGE }
}

export const fetchServer = () => {
    return async function (dispatch) {
        return axios(`/videogames`).then(response => dispatch({ type: FETCH_SERVER, payload: response.data.videogames })).catch(error => dispatch({ type: ERROR, payload: error }))
    }
}

export const getDetail = (id) => {
    return async function (dispatch) {
        return axios(`/videogames/${id}`).then(response => dispatch({ type: GET_DETAIL, payload: response.data.game })).catch(error => dispatch({ type: ERROR, payload: error }));
    }
}

export const getGenres = () => {
    return async function (dispatch) {
        return axios(`/genres`).then(response => dispatch({ type: GET_GENRES, payload: response.data.genres })).catch(error => dispatch({ type: ERROR, payload: error }))
    }
}

export const SortByGenres = (genre) => {
    return { type: SORT_BY_GENRE, payload: genre }
}

export const SortByName = (order) => {
    return { type: SORT_BY_NAME, payload: order }
}

export const SortByRating = (order) => {
    return { type: SORT_BY_RATING, payload: order }
}

export const Search = (search) => {
    return async function (dispatch) {
        return axios(`/videogames?name=${search}`).then(response => dispatch({ type: SEARCH, payload: response.data.videogames })).catch(error => dispatch({ type: ERROR, payload: error }))
    }
}

export const Post = (input) => {
    return async function (dispatch) {
        return axios.post(`/videogames`, input).then(response => dispatch({ type: POST_GAME, payload: response.data.message })).catch(error => dispatch({ type: ERROR, payload: error }));
    }
}

export function clearState(){
    return {
        type: CLEAR_STATE
    }
}