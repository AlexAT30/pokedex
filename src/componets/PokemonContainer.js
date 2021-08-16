import { useEffect, useState } from "react";
import { serviceGet } from "../services/get";
import PokemonNav from "./PokemonNav";
import PokemonAbout from "./PokemonAbout";
import PokemonLocation from "./PokemonLocation";
import PokemonStats from "./PokemonStats";

const PokemonContainer = ({ pokemon }) => {

  const [speciesData, setSpeciesData] = useState(null);
  const [isSpecial, setIsSpecial] = useState('');

  // Types
  let typesList = '';
  if (pokemon) {
    typesList = pokemon.types.map((element, index) => {
      return (
        <p key={`TYP${index}`} className='pokeType me-3' >
          {element.type.name}
        </p>
      )
    })
  }
    
  //More details
  useEffect(
    ()=> {
      if (pokemon) {
        const speciesData = async () => {
          const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`;
          const response = await serviceGet(url);
          setSpeciesData(response);
        }
        speciesData();
      }
    },[pokemon]
  )
  //is Special?
  useEffect(
    () => {
      if (speciesData) {
        if (speciesData.is_baby === true){setIsSpecial('Baby')};
        if (speciesData.is_legendary === true){setIsSpecial('(Legendary)')};
        if (speciesData.is_mythical === true){setIsSpecial('(Mythical)')};
      }
    }, [speciesData]
  )

  if (pokemon && speciesData) {
    return (
      <div className='container-fluid' >
        <div className='pokemonContainer__header row pb-5 align-items-center d-flex justify-content-center' style={{backgroundColor: speciesData.color.name}} >
          <p className='pokemonContainer__header__nameBG' > {pokemon.name} </p>
          <div className='col-6 col-md-3' >
            <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            alt={`pokemon_${pokemon.id}`}
            />

          </div>
          <div className='col-6' >
            <p className='m-0' > {`#${pokemon.id}`} </p>
            <p className='m-0 mb-1 f-mayus' > {`${speciesData.generation.name.replace('-', ' ')}`} </p>
            <h2 className='m-0 mb-2 color-white' > {`${pokemon.name} ${isSpecial}`} </h2>
            <div className='d-flex' >
              {typesList}
            </div>
          </div>
        <PokemonNav />
        </div>

        {/* <PokemonAbout pokemon={pokemon} speciesData={speciesData} /> */}
        {/* <PokemonStats pokemon={pokemon} speciesData={speciesData} /> */}
        {/* <PokemonLocation pokemon={pokemon} speciesData={speciesData} /> */}

      </div>
    )
  }
  return (<div></div>)
}
export default PokemonContainer;