import { useEffect, useState } from 'react';
import './App.css';
import { HashRouter as Router, Switch, Route, Redirect  } from 'react-router-dom';
import PokedexContainer from './componets/PokedexContainer';
import PokemonContainer from './componets/PokemonContainer';
import { serviceGet } from './services/get';
import { useForm } from 'react-hook-form';
import PokedexPagination from './componets/PokedexPagination';


function App() {
  const [apiResponse, setApiResponse] = useState(null); 
  const [allPokemons, setAllPokemons] = useState(null);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [page, setPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [failedSearch, setFailedSearch] = useState(false);
  const [pokemonsData, setPokemonsData] = useState([]);
  
  // Form
  const {register, handleSubmit} = useForm();
  const [filterData, setFilterData] = useState(null);

  // Get all pokemons
  useEffect(
    () => {
      const getPokemonsData = async () => {
        const url = 'https://pokeapi.co/api/v2/pokemon?limit=898&offset=0';
        const data = await serviceGet(url);
        setApiResponse(data);
      }
      getPokemonsData()
    }, []
  );

  // All pokemons in a array
  useEffect (
    () => {
      if (apiResponse) {
        setAllPokemons (apiResponse.results)
      }
    }, [apiResponse]
  );

  // Filter
  useEffect(
    () => {
      if (filterData) {
        if (filterData.type !== '' && filterData.name !== '') {
          const filteredPokemonsNameType = async () => {
            // Type filter
            const url = `https://pokeapi.co/api/v2/type/${filterData.type}`;
            const data = await serviceGet(url);
            const pokemonsByType = data.pokemon.map(element => element.pokemon);
            // Name filter
            const filterName = pokemonsByType.filter(element => element.name.indexOf(filterData.name.toLowerCase()) !== -1);
            setAllPokemons(filterName);
            // setCurrentPage(0);
          }
          filteredPokemonsNameType();
        }
        else {
          // Type filter
          if (filterData.type !== '') {
            const filteredPokemonType = async () => {
              const url = `https://pokeapi.co/api/v2/type/${filterData.type}`;
              const data = await serviceGet(url);
              const pokemonsByType = data.pokemon.map(element => element.pokemon);
              setAllPokemons(pokemonsByType);
            }
            filteredPokemonType();
            // setCurrentPage(0);
          }
          // Name Filter
          if (filterData.name !== '') {
            const filteredPokemonName = async () => {
              const filterName = apiResponse.results.filter(element => element.name.indexOf(filterData.name.toLowerCase()) !== -1);
              setAllPokemons(filterName)
            }
            filteredPokemonName();
            // setCurrentPage(0);
          }
          // Not filtered
          if ( filterData.name === '' && filterData.type === '' ) {
            setAllPokemons(apiResponse.results);
            setCurrentPage(0);
          }
        }
      }
    }, [filterData, apiResponse]
  )

  // Failed Search
  useEffect(
    () => {
      if (allPokemons) {
        if (allPokemons.length < 0) {
          setFailedSearch(true)
        }
        else {
          setFailedSearch(false);
        }
      }

    }, [allPokemons]
  )

  // Fetch details
  useEffect(
    () => {
      if (page) {
        page.forEach(element => {
          const getPokemonData = async (element) => {
            setPokemonsData([])
            element = await serviceGet(element.url);
            setPokemonsData(data => [...data, element])
            setPokemonsData(data => data = data.sort((a, b) => a.id - b.id))
          };
          getPokemonData(element)
        });
      }
    }, [page]
  )

  return (
    <Router>
      <Switch>
        <Route path='/pokedex'>
          <PokedexContainer
            pokemonsData={pokemonsData}
            register={register}
            handleSubmit={handleSubmit}
            setFilterData={setFilterData}
            failedSearch={failedSearch}
            setCurrentPokemon={setCurrentPokemon} />
          <PokedexPagination
            allPokemons={allPokemons}
            setPage={setPage} currentPage={currentPage}
            setCurrentPage={setCurrentPage} />
        </Route>
        <Route path='/pokemon-:pokemonName' >
          <PokemonContainer pokemon={currentPokemon}/>
        </Route>
        <Route path='/' >
          <Redirect to='/pokedex' />
        </Route> 
      </Switch>
    </Router>
  );
}

export default App;
