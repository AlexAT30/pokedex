import { useEffect, useState } from "react";

const PokemonAbout = ({ pokemon, speciesData }) => {

  const [description, setDescription] = useState(null);

   // Description
   useEffect(
    () => {
      if (speciesData) {
        let enDescription = speciesData.flavor_text_entries.find(element => element.language.name === 'en');
        enDescription = enDescription.flavor_text.replace(/(\n|\r|\f)/gm, ' ');
        enDescription = enDescription.replace(/(.\n|.\r|.\f)/gm, '. ');
        setDescription(enDescription)
      }
    }, [speciesData]
  )

  const games = pokemon.game_indices.map((element, index) => {
    return (
      <div key={`GAM${index}`} >
        <p className='f-mayus'><span className='text-bold'> {`${element.version.name}`} </span> - regional pokedex #${element.game_index} </p>
      </div>
    )
  })

  return (
    <div className='pokemonContainer__info row ps-3'>
      <div className='row justify-content-around'>
        <div className='col-sm-5' >
          <h3 className={`specialColor-${pokemon.types[0].type.name}`} >Description</h3>
          <p> {description} </p>
        </div>
        <div className='col-sm-5' >
          <h3 className={`specialColor-${pokemon.types[0].type.name}`} >Pokédex Data</h3>
          <div className='pokemonContainer__pokedexData' >
            {/* Heigth */}
            <p className='text-bold' >Heigth</p>
            <p> {`${pokemon.height}0 cm`} </p>
            {/* Weigth */}
            <p className='text-bold' >Weigth</p>
            <p> {`${pokemon.weight} hg`} </p>
            {/* Experience */}
            <p className='text-bold' >Base experience</p>
            <p> {`${pokemon.base_experience} xp`} </p>
            {/* Habitat */}
            <p className='text-bold' >Habitat</p>
            <p className='f-mayus' > {speciesData.habitat.name} </p>
            {/* Habitat */}
            <p className='text-bold' >Gender differences</p>
            <p className='f-mayus' > {`${speciesData.has_gender_differences}`} </p>
          </div>
        </div>
      </div>
      <div className='row justify-content-around'>
        <div className='pokemonAbout__sprites col-sm-5'>
          <h3 className={`pokemon__sprites__title specialColor-${pokemon.types[0].type.name}`}  >Sprites</h3>
          <h3 className='pokemonAbout__sprites__title ms-1' >Default sprite</h3>
          <img src={pokemon.sprites.front_default} alt='sprite-fd' />
          <img src={pokemon.sprites.back_default} alt='sprite-bd' />
          {speciesData.has_gender_differences && <h3 className='pokemonAbout__sprites__title ms-1' >Female sprite</h3>}
          {speciesData.has_gender_differences && <img src={pokemon.sprites.front_female} alt='sprite-ff' />}
          {speciesData.has_gender_differences && <img src={pokemon.sprites.back_female} alt='sprite-bf' />}
          <h3 className='pokemonAbout__sprites__title ms-1' >Shiny sprite</h3>
          <img src={pokemon.sprites.front_shiny} alt='sprite-fs' />
          <img src={pokemon.sprites.back_shiny} alt='sprite-bs' />
        </div>
        <div className='col-sm-5' >
            <h3 className={`specialColor-${pokemon.types[0].type.name}`} >Games</h3>
            <div className='pokemonAbout__games' >
              {games}
            </div>
        </div>
      </div>
    </div>
  )
}
export default PokemonAbout;