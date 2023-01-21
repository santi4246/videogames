import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, Post } from "../../Redux/Actions";
import { Link } from "react-router-dom";
import style from './Create.module.css';

export default function Create () {
    /* Input States and variables */
    const [input, setInput] = useState({
        name: '', description: '', launch: '', rating: '', genres: [], platforms: [], img: ''
    });
    const [error, setError] = useState({});
    const [submit, setSubmit] = useState(false);
    const [check, setCheck] = useState(false);
    const stateGenres = useSelector(state => state.genres);
    const platforms = ['PC', 'Playstation 3', 'Playstation 4', 'Playstation 5', 'Nintendo Wii', 'Nintendo Wii U', 'Xbox One', 'Xbox X/S']
    const [datosGenres, setDatosGenres] = useState([]);    
    const [datosPlatforms, setDatosPlatforms] = useState([]);
    const { message } = useSelector(state => state.successfull);
    const dispatch = useDispatch();
    // Hooks
    useEffect(() => {
        dispatch(getGenres());        
        validateCheckbox(input.genres, input.platforms);        
    }, [dispatch, input.genres, input.platforms]);
    // Validate function
    function validateInput (value, name) {
        const exp = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/
        switch (name) {
            case 'name': return (!value || !exp.test(value) || value.length > 20) ? setError({...error, name: 'Set a valid name'}) : setError({...error, name: ''})
            case 'description': return (!value || value.length > 25) ? setError({...error, description: 'The description cannot exceed 25 characters or be empty'}) : setError({...error, description: ''})
            case 'rating': return (!value || Number(value) <= 0 || Number(value) > 5) ? setError({...error, rating: 'Set a value between 1 and 5'}) : setError({...error, rating: ''})
            case 'launch': return (!value) ? setError({...error, launch: 'Cannot be null'}) : setError({...error, launch: ''})
            case 'img': return (!value) ? setError({...error, img: 'Cannot be null'}) : setError({...error, img: ''})
            default: break;
        }
    }
    
    function validateCheckbox (array1, array2) {
        if (array1.length <= 1) {
            return setError({ genres: 'It must at least 2 values' });
        }
        if (array2.length <= 1) {
            return setError({ platforms: 'It must at least 2 values' });
        }
        else {
            return setError({ ...error, genres: '', platforms: '' });
        }
    }
    // Function Handle Change
    function handleChange (event) {
        if (event.target.name === 'genres') {
            if (event.target.checked) {
                setCheck(!check)            
                const result = stateGenres.filter(item => item === event.target.value);
                setDatosGenres([...datosGenres, ...result]);
                setInput({...input, [event.target.name]: [...datosGenres, ...result]});                
            }
            else {            
                const result = datosGenres.filter(item => item !== event.target.value);
                setDatosGenres([...result]);                
                setInput({...input, [event.target.name]: [...result]});                
            }            
        }
        else if (event.target.name === 'platforms') {
            if (event.target.checked) {
                setCheck(!check);
                const result = platforms.filter(item => item === event.target.value);
                setDatosPlatforms([...datosPlatforms, ...result]);                
                setInput({...input, [event.target.name]: [...datosPlatforms, ...result]});
            }
            else {
                const result = datosPlatforms.filter(item => item !== event.target.value);
                setDatosPlatforms([...result]);
                setInput({...input, [event.target.name]: [...result]});
            }
        }
        else {
            setInput({ ...input, [event.target.name]: event.target.value });
            validateInput(event.target.value, event.target.name);
        }
    }
    // Function Handle Submit
    function handleSubmit (event) {
        event.preventDefault();
        setSubmit(true);
        dispatch(Post(input));
        setInput({ name: '', description: '', launch: '', rating: '', genres: [], platforms: [], img: '' })
        setDatosGenres([]);
        setDatosPlatforms([]);
        for (let i = 0; i < document.f1.elements.length; i++) {
            if(document.f1.elements[i].type === "checkbox") {
                document.f1.elements[i].checked = false;
            }
        }
    }
    // Render
    return (
        <div className = "creation">
            <div>
                <form className = {style.form} name = 'f1'>
                    <h3 className = {style.title}>Create Game</h3>                    
                    <div className = {style.content}>
                        <div className = {style.group}>
                            {/* - Name - */}
                            <label htmlFor='name'>Name: </label>
                            <input id='name' type={'text'} name={'name'} value={input.name} className={error.name && style.danger} onChange={(event) => handleChange(event)}/>
                            {!error.name ? null : <p className={style.danger}>{error.name}</p>}
                            {/* - Rating - */}
                            <label htmlFor='rating'>Rating: </label>
                            <input id='rating' type={'text'} name={'rating'} value={input.rating} className={error.rating && style.danger} onChange={(event) => handleChange(event)}/>
                            {!error.rating ? null : <p className={style.danger}>{error.rating}</p>}
                            {/* - Launch - */}
                            <label htmlFor='launch'>Date Launch: </label>
                            <input id='launch' type='date' name='launch' value={input.launch} min="1975-01-01" max="2022-12-31" onChange={(event) => handleChange(event)}/>
                            {!error.launch ? null : <p className={style.danger}>{error.launch}</p>}
                            {/* - Description - */}
                            <div>
                                <label htmlFor='description'>Description: </label>
                                <textarea placeholder='max 125 carac...' id='description' type={'text'} name={'description'} value={input.description} className={error.description && style.danger} onChange={(event) =>handleChange(event)}/>
                                {!error.description ? null : <p className={style.danger}>{error.description}</p>}
                            </div>
                            {/* - Description - */}
                            <div>
                                <label htmlFor='img'>Imagen: </label>
                                <input id='img' type='text' name='img' value={input.img} onChange={(event) => handleChange(event)}/>
                            {!error.img ? null : <p className={style.danger}>{error.img}</p>}
                            </div>
                            {/* - Genres - */}
                            <p className={style.title}>Genres: </p>
                            <div className={style.container}>
                                {stateGenres.map((genre, index) => {
                                    return (
                                        <li key={index}>
                                            <label htmlFor={genre}>{genre}</label>
                                            <input 
                                            type='checkbox' 
                                            id = {index}
                                            name = {'genres'}
                                            value = {genre}
                                            onChange={handleChange}
                                            />                                        
                                        </li>
                                    )
                                })}
                                {!error.genres ? null : <p className={style.danger}>{error.genres}</p>}
                            </div>
                            {/* - Platforms - */}                            
                            <p className={style.title}>Platforms: </p>
                            <div className={style.container}>
                                {platforms.map((platform, index) => {
                                    return (
                                        <li key={index}>
                                            <label htmlFor={platform}>{platform}</label>
                                            <input 
                                            type='checkbox' 
                                            id = {index}
                                            name = {'platforms'}
                                            value = {platform}
                                            onChange={handleChange}
                                            />
                                        </li>
                                    )
                                })}
                                {!error.platforms ? null : <p className={style.danger}>{error.platforms}</p>}
                            </div>
                            {/* Button Submit */}
                            <div className={style.submit}>
                                <button type='submit' value={'Create'} disabled={error.name || !input.name || error.description || !input.description || error.rating || !input.rating || error.launch || !input.launch || error.genres || !input.genres || error.platforms || !input.platforms} onClick={(event) => handleSubmit(event)} className={style.button}>Create Game</button>                                
                                <li className={style.item}><Link to = '/home' className={style.links}>Return Home</Link></li>
                            </div>
                        </div>
                    </div>
                </form>
                {submit && message ? <h3 className={style.confirmation}>{message}</h3> :
                submit && <h3 className={style.confirmation}>Game successfully created!</h3>}
            </div>
        </div>
    )
}