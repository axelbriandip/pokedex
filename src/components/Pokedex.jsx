import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserName } from '../store/slices/userName.slice';
import pokeball from '../../img/pokeball2.png';

const Pokedex = () => {
    const dispatch = useDispatch();
    const userName_store = useSelector(state => state.userName);
    const [ pokemons, setPokemons ] = useState([]);
    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154')
            .then(res => setPokemons(res.data.results))
    }, [ ])

    const [ perPage, setPerPage ] = useState(12);
    const [ page, setPage ] = useState(1);
    const lastIndex = page * perPage;
    const firstIndex = lastIndex - perPage;
    const lastPage = Math.ceil(pokemons.length / perPage);
    const numbers = [];
    for(let i = 1; i <= lastPage; i++) {
        numbers.push(i);
    }
    const pokemonsFiltered = pokemons.slice(firstIndex, lastIndex);

    const navigate = useNavigate();
    const [ pokemonSearch, setPokemonSearch ] = useState('');
    const search = e => {
        e.preventDefault();
        navigate(`/pokedex/pokemondetails/${pokemonSearch}`)
    }
    // TYPES
    const [ types, setTypes ] = useState([]);
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/type/`)
            .then(res => setTypes(res.data.results))
    }, [])
    // console.log(types);
    const filterType = e => {
        // alert(`URL: ${e}`);
        axios.get(e)
        .then(res => setPokemons(res.data.pokemon))
    }
    // console.log(pokemons);
    const leave = () => {
        navigate('/');
        dispatch(setUserName(''));
    }
    const [ isSearchForType, setIsSearchForType ] = useState(false);
    const toggleSearch = () => {
        if(isSearchForType) {
            setIsSearchForType(false)
        } else {
            setIsSearchForType(true)
        }
    }
    return (
        <div className='container-pokedex'>
            <div className="pokeball">
                <img src={pokeball}/>
            </div>
            <i onClick={leave} className="arrow fa-solid fa-arrow-right-from-bracket"></i>
            {/* HEADER */}
            <div className="header-pokedex">
                <h1>Pokedex</h1>
                <p>Welcome {userName_store}, here you can find your favorite pokemon</p>
            </div>
            {/* SEARCH */}
            <div className="container-search">
                {/* SEARCH NAME */}
                <form onSubmit={search} className={isSearchForType ? "search-nam toggle" : "search-name"}>
                    <input
                    type="text"
                    value={pokemonSearch}
                    onChange={e => setPokemonSearch(e.target.value)}
                    placeholder="Insert name pokemon"
                    />
                    <button>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>
                {/* SEARCH TYPE */}
                <select onChange={e => filterType(e.target.value)} className={isSearchForType ? "search-type" : "search-type toggle"}>
                    {
                        types.map(type => (
                            <option key={type.url} value={type.url}>{type.name}</option>
                        ))
                    }
                </select>
                <div onClick={toggleSearch} className='searchFor'>
                    {
                        isSearchForType ? "Search for name" : "Search for type"
                    }
                </div>
            </div>
            {/* ITEMS PER PAGE */}
            <div className="itemPerPage">
                <span>Items per page: </span>
                <select defaultValue={12} onChange={e => setPerPage(e.target.value)}>
                    <option value={4}>4</option>
                    <option value={8}>8</option>
                    <option value={12}>12</option>
                    <option value={16}>16</option>
                    <option value={20}>20</option>
                </select>
            </div>
            {/* CARDS */}
            <div className="container-cards">
                {
                    pokemonsFiltered?.map(pokemon => (
                        <PokemonCard
                        key={pokemon.url ? pokemon.url : pokemon.pokemon.url}
                        url={pokemon.url ? pokemon.url : pokemon.pokemon.url}
                        />
                    ))
                }
            </div>
            {/* PAGINATION */}
            <div className='pagination'>
                <div className="content-pagination">
                    <button onClick={() => setPage(page - 1)} disabled={page === 1} className="prev">
                        Prev page
                    </button>
                    {
                        numbers.map(number => (
                            <button key={number} onClick={() => setPage(number)} className={page === number ? "selected" : ""}>
                                {number}
                            </button>
                        ))
                    }
                    <button onClick={() => setPage(page + 1)} disabled={page === lastPage} className="next">
                        Next page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pokedex;