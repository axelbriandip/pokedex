import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import { useNavigate } from 'react-router-dom';

const Pokedex = () => {
    const userName_store = useSelector(state => state.userName);
    const [ pokemons, setPokemons ] = useState([]);
    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50')
            .then(res => setPokemons(res.data.results))
    }, [ ])

    const perPage = 4;
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
    return (
        <div>
            <h1>test pokedex</h1>
            <h2>¡Bienvenido {userName_store}!</h2>
            <form onSubmit={search}>
                <input
                type="text"
                value={pokemonSearch}
                onChange={e => setPokemonSearch(e.target.value)}
                />
                <button>Search</button>
            </form>
            <select onChange={e => filterType(e.target.value)}>
                {
                    types.map(type => (
                        <option key={type.url} value={type.url}>{type.name}</option>
                    ))
                }
            </select>
            <div>
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    Prev page
                </button>
                {
                    numbers.map(number => (
                        <button key={number} onClick={() => setPage(number)}>
                            {number}
                        </button>
                    ))
                }
                <button onClick={() => setPage(page + 1)} disabled={page === lastPage}>
                    Next page
                </button>
            </div>
            <hr />
            {
                pokemonsFiltered?.map(pokemon => (
                    <PokemonCard
                    key={pokemon.url ? pokemon.url : pokemon.pokemon.url}
                    url={pokemon.url ? pokemon.url : pokemon.pokemon.url}
                    />
                ))
            }
        </div>
    );
};

export default Pokedex;