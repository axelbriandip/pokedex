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

    const perPage = 12;
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
        <div className='container-pokedex'>
                {/* HEADER */}
            <div className="header-pokedex">
                <h1>Pokedex</h1>
                <p>Welcome {userName_store}, here you can find your favorite pokemon</p>
            </div>
            {/* SEARCH */}
            <div className="container-search">
                {/* SEARCH NAME */}
                <form onSubmit={search} className="search-name">
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
                <select onChange={e => filterType(e.target.value)} className="search-type toggle">
                    {
                        types.map(type => (
                            <option key={type.url} value={type.url}>{type.name}</option>
                        ))
                    }
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
                            <button key={number} onClick={() => setPage(number)}>
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