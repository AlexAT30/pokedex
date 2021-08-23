import { Link } from "react-router-dom";

const PokemonNav = ({ url }) => {
  return (
    <nav className='pokemonNav row text-bold'>
      <Link to={`${url}/about`} className='col-4 color-white text-center' >
        About
      </Link>
      <Link to={`${url}/stats`} className='col-4 color-white text-center' >
        Stats
      </Link>
      <Link to={`${url}/locations`} className='col-4 color-white text-center' >
        Locations
      </Link>
    </nav>
  )
}
export default PokemonNav;