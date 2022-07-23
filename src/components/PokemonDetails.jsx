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
    console.log(`${pokemon.name} - ${pokemon.id}`);
    return (
        <div>
            <h1>test pokemon details: {id}</h1>
        </div>
    );
};

export default PokemonDetails;