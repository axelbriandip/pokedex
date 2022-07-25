import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PokemonCard = ({ url }) => {
    const navigate = useNavigate();
    const [ pokemon, setPokemon ] = useState({});
    useEffect(() => {
        axios.get(url)
            .then(res => setPokemon(res.data))
    }, [])
    // console.log(pokemon);
    return (
        <div className='card' onClick={() => navigate(`/pokedex/pokemondetails/${pokemon.id}`)}>
            <h3>{pokemon.name} - {pokemon.id}</h3>
            <img src={pokemon.sprites?.front_default} />
        </div>
    );
};

export default PokemonCard;