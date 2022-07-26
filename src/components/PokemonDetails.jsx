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
                <div className="movements">mov</div>
                <div className="type">type</div>
                <div className="habilities">habilities</div>
                <div className="stats">stats</div>
            </div>
        </div>
    );
};

export default PokemonDetails;