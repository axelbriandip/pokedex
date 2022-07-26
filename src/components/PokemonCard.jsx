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
            <div className="text">
                <span className='name'>{pokemon.name}</span>
                <span>Types: {pokemon.types?.[0].type.name}</span>
                <span>HP: {pokemon.stats?.[0].base_stat}</span>
                <span>Attack: {pokemon.stats?.[1].base_stat}</span>
                <span>Defense: {pokemon.stats?.[2].base_stat}</span>
                <span>Speed: {pokemon.stats?.[5].base_stat}</span>
            </div>
            <div className="img">
                <img src={pokemon.sprites?.front_default} />
            </div>
        </div>
    );
};

export default PokemonCard;