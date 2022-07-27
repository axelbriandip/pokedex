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
                <span><strong>Types:</strong>
                    {
                        pokemon.types?.map(item => (
                            <span className='item-type' key={item.type.url}> {item.type.name} </span>
                        ))
                    }
                </span>
                {/* <span>Types: {pokemon.types?.[0].type.name}</span> */}
                <span><strong>HP:</strong> {pokemon.stats?.[0].base_stat}</span>
                <span><strong>Attack:</strong> {pokemon.stats?.[1].base_stat}</span>
                <span><strong>Defense:</strong> {pokemon.stats?.[2].base_stat}</span>
                <span><strong>Speed:</strong> {pokemon.stats?.[5].base_stat}</span>
            </div>
            <div className="img">
                <img src={pokemon.sprites?.other.dream_world.front_default} />
            </div>
        </div>
    );
};

export default PokemonCard;