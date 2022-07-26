import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PokemonDetails = () => {
    const { id } = useParams()
    const [ pokemon, setPokemon ] = useState({});
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(res => setPokemon(res.data))
            .catch(err => console.log(err))
    }, [ id ])
    return (
        <div className='container-pokemon-details'>
            <div className="header">
                <img src="../img/logo-pokemon.png"/>
            </div>
            <div className="grid-container">
                <div className="hero-detail">
                    <div className='hero-first'>
                        <div>
                            <span>{pokemon.weight}</span>
                            <span>Weight</span>
                        </div>
                        <div>
                            <img src={pokemon.sprites?.front_default}/>
                        </div>
                        <div>
                            <span>{pokemon.height}</span>
                            <span>Height</span>
                        </div>
                    </div>
                    <div className='hero-second'>
                        <h1>{pokemon.name}</h1>
                        <span># {pokemon.id}</span>
                    </div>
                </div>
                <div className="movements">
                    <div>
                        <i className="fa-solid fa-location-dot"></i> Encounters
                    </div>
                    <div>
                        <h2>Movements</h2>
                        {
                            pokemon.moves?.map(item => (
                                <span>{item.move.name}</span>
                            ))
                        }
                    </div>
                </div>
                <div className="type">
                    <h2>Type</h2>
                    {
                        pokemon.types?.map(item => (
                            <span className='type-items'>{item.type.name}</span>
                        ))
                    }
                </div>
                <div className="habilities">
                    <h2>Abilities</h2>
                    {
                        pokemon.abilities?.map(item => (
                            <span className='type-items'>{item.ability.name}</span>
                        ))
                    }
                </div>
                <div className="stats">stats</div>
            </div>
        </div>
    );
};

export default PokemonDetails;