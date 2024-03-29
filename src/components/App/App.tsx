import React from "react";
import './App.css';
import Pokedex from "../Pokedex/Pokedex";
import { pokemonData } from "../../data/pokemonData";
import { UnpatchedPokemonSchema, PokemonSpritesSchema, PokemonSchema } from "../../types/PokemonSchema";

interface AppState{
    searchField: string;
    allPokemons: PokemonSchema[];
    searchedPokemons: PokemonSchema[];
    selectedPokemon: PokemonSchema | undefined;
}

class App extends React.Component<any, AppState> {
    state = {
        searchField: "",
        allPokemons: [],
        searchedPokemons: [],
        selectedPokemon: undefined,
    };

    patchPokemonData = (pokemons: UnpatchedPokemonSchema[])=>{
        const patchedPokemons = pokemons.map((pokemon)=>{
            let parsedSprites: PokemonSpritesSchema = {
                normal: undefined,
                animated: undefined
            };
            try{
                parsedSprites = pokemon.sprites && JSON.parse(pokemon.sprites);
            } catch(e){
                console.log("Exception while parsing the sprites: ", e);
            }
            const patchedPokemon: PokemonSchema = {
                ...pokemon,
                sprites: parsedSprites
            };
            return patchedPokemon;
        });
        return patchedPokemons;
    }

    componentDidMount(){
        //Patch the stringified pokemon sprites
        const patchedPokemons:PokemonSchema[] = this.patchPokemonData(
            pokemonData
        );

        //Update the state with the patched pokemons
        this.setState({
            allPokemons: patchedPokemons,
            searchedPokemons: patchedPokemons,
        })
    }

    handleInputChange = (inputValue: string) =>{
        //filter the searched pokemons
        const {allPokemons} = this.state;

        const searchedPokemons = allPokemons.filter(
            (pokemon: PokemonSchema) =>{
                return(
                    pokemon.name &&
                    pokemon.name
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                )
            }
        )

        this.setState({
            searchField: inputValue,
            searchedPokemons,
        })
    };

    handleClick = (pokemonName: string) =>{
        const {allPokemons} = this.state;

        //Find the selected pokemons from allPokemons
        const selectedPokemon = allPokemons.find((pokemon: PokemonSchema) => 
            pokemon.name === pokemonName
        )

        //Update the state
        this.setState({selectedPokemon});
    }

    render() {
        return <div className="App">
            <h1>Pokedex</h1>
            <Pokedex 
                selectedPokemon = {this.state.selectedPokemon}
                searchedPokemons = {this.state.searchedPokemons}
                onInputChange = {this.handleInputChange}
                onPokemonClick = {this.handleClick}
            />
        </div>;
    }
}

export default App;
