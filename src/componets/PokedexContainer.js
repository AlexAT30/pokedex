import { Link } from 'react-router-dom'

const PokedexContainer = ({ pokemonsData, register, handleSubmit, setFilterData, failedSearch, setCurrentPokemon }) => {

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
      <Link to={`/pokemon-${element.name}`} key={element.id} onClick={() => setCurrentPokemon(element)} style={{width:'100%'}} >
        <div className={`pokedexContainer__pokemon col-11 color-${element.types[0].type.name}`} >
          <div className='ms-3' >
            <p className={`m-0 mt-1 specialColor-${element.types[0].type.name}`} > {`#${element.id}`} </p>
            <h2 className='color-white f-mayus m-0' > {element.name} </h2>
            <div className='mt-2 mb-3 d-flex' >{typesList}</div>
          </div>
          <img className='pokedexContainer__pokemon__image'  
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${element.id}.png`}
          alt={`pokemon_${element.id}`} />
        </div>
      </Link>
    )
  })

return (
    <section className='container' >
      <header></header>
      <div className='row mt-3' >
        <h1 className='col-sm-2 mb-1' >Pokédex</h1>
        <p className='col-sm-10 color-black-50 my-sm-auto' >Search for Pokémon by name or using the type selector.</p>
      </div>
      <div className='row' >
        <form className={`pokedexContainer__searchBox col-11 col-sm-12 mt-2 p-2 m-auto failedSearch-${failedSearch}`} 
        onSubmit={handleSubmit((data) => setFilterData(data) )} >
          <button type='submit' ><i className="bi bi-search"></i></button>
          <input placeholder='What Pokémon are you looking for?' {...register('name')} />
          <select {...register('type')} >
            <option value='' > All types </option>
            <option value='normal' > Normal </option>
            <option value='fire' > Fire </option>
            <option value='water' > Water </option>
            <option value='electric' > Electric </option>
            <option value='grass' > Grass </option>
            <option value='ice' > Ice </option>
            <option value='fighting' > Fighting </option>
            <option value='poison' > Poison </option>
            <option value='ground' > Ground </option>
            <option value='flying' > Flying </option>
            <option value='psychic' > Psychic </option>
            <option value='bug' > Bug </option>
            <option value='rock' > Rock </option>
            <option value='ghost' > Ghost </option>
            <option value='dragon' > Dragon </option>
            <option value='dark' > Dark </option>
            <option value='steel' > Steel </option>
            <option value='fairy' > Fairy </option>
          </select>
        </form>
        {failedSearch && <p className='text-center' style={{color:'red'}} >I can't find your pokemon :c</p>}
      </div>
      <div className='pokedexContainer__pokemonsList mt-4' >
        {pokemonsList}
      </div>
    </section>
  )
}
export default PokedexContainer;