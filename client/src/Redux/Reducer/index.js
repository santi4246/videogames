import { CLEAR_PAGE, CLEAR_STATE, ERROR, FETCH_SERVER, GET_DETAIL, GET_GENRES,SEARCH, SORT_BY_GENRE, SORT_BY_NAME, SORT_BY_RATING, POST_GAME } from "../Actions/actionTypes";
const initialState = {
    games: [],
    gamesFiltered: [],
    genres: [],
    gameDetail: {},
    error: {},
    successfull: {}
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_PAGE: return { ...state, gameDetail: {} }
        case CLEAR_STATE: return { ...state, gamesFiltered: [] }
        case ERROR: return { ...state, error: action.payload }
        case FETCH_SERVER: return { ...state, games: action.payload, gamesFiltered: action.payload }
        case GET_DETAIL: return { ...state, gameDetail: action.payload }
        case GET_GENRES: return { ...state, genres: action.payload }
        case SEARCH: return { gamesFiltered: action.payload }
        case SORT_BY_GENRE: let ord = [...state.games].filter((game) => game.genres.includes(action.payload));
        return { ...state, gamesFiltered: [...ord] }
        case SORT_BY_NAME: let order = [...state.gamesFiltered]
                            order = order.sort((a, b) => {
                                if (a.name > b.name) {
                                    return action.payload === 'ASC' ? 1 : -1;
                                }
                                if (a.name < b.name) {
                                    return action.payload === 'ASC' ? -1 : 1;
                                }
                                return 0;
                            });
                            return {...state, gamesFiltered: [...order]}
        case SORT_BY_RATING: let ordered = [...state.gamesFiltered]
                            ordered = ordered.sort((a, b) => {
                                if (a.rating > b.rating) {
                                    return action.payload === 'MIN' ? 1 : -1;
                                }
                                if (a.rating < b.rating) {
                                    return action.payload === 'MIN' ? -1 : 1;
                                }
                                return 0;
                            });
                            return { ...state, gamesFiltered: [...ordered] }
        case POST_GAME: return { ...state, successfull: action.payload }
        default: return state;
    }
}

export default rootReducer;