import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import pokeball from '../../img/pokeball2.png';
import logo_pokemon from '../../img/logo-pokemon.png';

const PokemonDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    const [ pokemon, setPokemon ] = useState({});
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(res => setPokemon(res.data))
            .catch(err => console.log(err))
    }, [ id ])
    const porcHP = (pokemon.stats?.[0].base_stat / 150) * 100;
    const porcSpeed = (pokemon.stats?.[5].base_stat / 150) * 100;
    const porcAttack = (pokemon.stats?.[1].base_stat / 150) * 100;
    const porcDefense = (pokemon.stats?.[2].base_stat / 150) * 100;
    console.log(`Porcentaje HP: ${porcHP}`)
    return (
        <div className='container-pokemon-details'>
            <div className="pokeball">
                <img src={pokeball}/>
            </div>
            <i onClick={() => navigate('/pokedex')} className="fa-solid fa-arrow-left-long arrow"></i>
            <div className="header">
                <img src={logo_pokemon}/>
            </div>
            <div className="grid-container">
                <div className="hero-detail">
                    <div className='hero-first'>
                        <div>
                            <span>{pokemon.weight}</span>
                            <span>Weight</span>
                        </div>
                        <div>
                            <img src={pokemon.sprites?.other.dream_world.front_default}/>
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
                        <h2>Movements</h2>
                        {
                            pokemon.moves?.map(item => (
                                <span key={item.move.url}>{item.move.name}</span>
                            ))
                        }
                    </div>
                </div>
                <div className="type">
                    <h2>Type</h2>
                    {
                        pokemon.types?.map(item => (
                            <span key={item.type.url} className='type-items'>{item.type.name}</span>
                        ))
                    }
                </div>
                <div className="habilities">
                    <h2>Abilities</h2>
                    {
                        pokemon.abilities?.map(item => (
                            <span key={item.ability.url} className='type-items'>{item.ability.name}</span>
                        ))
                    }
                </div>
                <div className="stats">
                    <h2>Stats base</h2>
                    <div className="item">
                        <div className='title'><span>HP:</span></div>
                        <div className='bar'>
                            <div className='progress' style={{ width: `${porcHP}%` }}>
                                {pokemon.stats?.[0].base_stat}/150
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className='title'><span>Speed:</span></div>
                        <div className='bar'>
                            <div className='progress' style={{ width: `${porcSpeed}%` }}>
                                {pokemon.stats?.[5].base_stat}/150
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className='title'><span>Attack:</span></div>
                        <div className='bar'>
                            <div className='progress' style={{ width: `${porcAttack}%` }}>
                                {pokemon.stats?.[1].base_stat}/150
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className='title'><span>Defense:</span></div>
                        <div className='bar'>
                            <div className='progress' style={{ width: `${porcDefense}%` }}>
                                {pokemon.stats?.[2].base_stat}/150
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetails;