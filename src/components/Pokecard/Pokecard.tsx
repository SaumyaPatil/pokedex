import './Pokecard.css';

interface PokecardProps{
    spriteUrl?: string;
    name: string;
    onPokemonClick: (pokemonName: string) => void;
}

const Pokecard = ({spriteUrl, name, onPokemonClick}: PokecardProps) =>{
    return(
        <div 
        onClick={() => onPokemonClick(name)}
        className="pokecard">
            <img src={spriteUrl} alt="pokemon" className='pokemon-sprite'/>
            <p>{name}</p>
        </div>
    )
}

export default Pokecard;
