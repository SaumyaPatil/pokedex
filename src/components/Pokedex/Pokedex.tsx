import React from "react";
import './Pokedex.css';
import PokeSearchResult from "../PokeSearchResult/PokeSearchResult";
import SearchBox from "../SearchBox/SearchBox";
import Pokelist from "../Pokelist/Pokelist";
import { PokemonSchema } from "../../types/PokemonSchema";

interface PokedexProps{
    searchedPokemons: PokemonSchema[];
    onInputChange: (inputValue: string) => void;
    selectedPokemon: PokemonSchema | undefined;
    onPokemonClick: (pokemonName: string) => void;
}

const Pokedex = ({searchedPokemons, selectedPokemon, onInputChange, onPokemonClick}: PokedexProps) =>{
    return(
        <div className="pokedex-container">
            <div className="pokelist-container">
                <SearchBox onInputChange={onInputChange}/>
                <Pokelist 
                onPokemonClick={onPokemonClick}
                searchedPokemons={searchedPokemons}/>
            </div>
            <div className="pokesearchresult-container">
                <PokeSearchResult selectedPokemon={selectedPokemon}/>
            </div>
        </div>
    )
}

export default Pokedex;