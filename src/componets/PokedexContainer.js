import { useState } from "react"
import { serviceGet } from "../services/get"

import { useForm } from 'react-hook-form';

const PokedexContainer = ({ pokemonsData, register, handleSubmit, setFilterData }) => {

  const pokemonsList = pokemonsData.map(element => {
    // Types
     const typesList = element.types.map((secondElement) => {
      return (
        <p key={`TYP${element.id}${secondElement.type.name}`} className={`pokeType me-3 type-${secondElement.type.name}`} >
          {secondElement.type.name}
        </p>
      )
    })
    return (
      <div className={`pokedexContainer__pokemon col-11 color-${element.types[0].type.name}`} key={element.id} >
        <div className='ms-3' >
          <p className='m-0 mt-1' > {`#${element.id}`} </p>
          <h2 className='color-white m-0' > {element.name} </h2>
          <div className='mt-2 mb-3 d-flex' >{typesList}</div>
        </div>
        <img className='pokedexContainer__pokemon__image'  
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${element.id}.png`}
        alt={`pokemon_${element.id}`} />
      </div>
    )
  })

return (
    <section className='container' >
      <header></header>
      <div className='row mt-3' >
        <h1 className='col-sm-2 mb-1' >Pokédex</h1>
        <p className='col-sm-10 color-black-50 my-sm-auto' >Search for Pokémon by name or using the National Pokédex number.</p>
      </div>
      <div className='row' >
        <form className='pokedexContainer__searchBox col-11 col-sm-12 mt-2 p-1 m-auto' 
        onSubmit={handleSubmit((data) => setFilterData(data) )} >
          <button type='submit' ><i className="bi bi-search"></i></button>
          <input placeholder='What Pokémon are you looking for?' {...register('pokemon')} />
          <select {...register('type')}>
            <option value='fire' > fire </option>
            <option value='grass' > grass </option>
          </select>
        </form>
      </div>
      <div className='pokedexContainer__pokemonsList mt-4' >
        {pokemonsList}
      </div>
    </section>
  )
}
export default PokedexContainer;