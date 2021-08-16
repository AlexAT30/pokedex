const PokemonStats = ({ pokemon, speciesData }) => {
  // Stats
  const stats = pokemon.stats.map((element, index) => {
    return (
      <div className='row align-items-center mb-3' key={`STAT${index}`} >
        <p className='col-5 m-0' > {`${element.stat.name}:`} </p>
        <div className='col-5 '>
          <div className='text-center text-bold color-white' style={{
            height:'fit-content',
            width: `${element.base_stat}%`,
            backgroundColor: speciesData.color.name
          }}> {element.base_stat} </div>
        </div>
      </div>
    )
  })
  // Abilities
  const abilities = pokemon.abilities.map((element, index) => {
    return (
      <div key={`ABI${index}`} >
        <p className='f-mayus'>
          <a style={{textDecoration:'underline'}} href={`https://pokemondb.net/ability/${element.ability.name}`}> {element.ability.name.replace('-', ' ')} </a>
           - {`(${element.is_hidden? 'Hidden ability': 'Not hidden ability'})`}
        </p>
      </div>
    )
  })
  // Moves
  const moves = pokemon.moves.map((element, index) => {
    return (
      <div className='f-mayus p-2' style={{textDecoration:'underline'}} >
        <a href={`https://pokemondb.net/move/${element.move.name}`} > {element.move.name.replace('-', ' ')} </a>
      </div>
    )
  })



  return (
    <div className='pokemonContainer__info row ps-3'>
      <div className='row mb-sm-3'>
        <div className='col-sm-6'>
          <h3 style={{color: speciesData.color.name}} >Stats</h3>
          {stats}
        </div>
        <div className='col-sm-6' >
          <h3 style={{color: speciesData.color.name}} >Abilities</h3>
          {abilities}
        </div>
      </div>
      <div className='row col-12 mt-3'>
        <h3 style={{color: speciesData.color.name}} >Moves</h3>
        <div className='pokemonStats__moves' >
          {moves}
        </div>
      </div>
    </div>
  )
}
export default PokemonStats;