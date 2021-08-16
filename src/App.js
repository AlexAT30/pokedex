import { useEffect, useState } from 'react';
import './App.css';
import PokedexContainer from './componets/PokedexContainer';
import PokemonContainer from './componets/PokemonContainer';
import { serviceGet } from './services/get';
import { useForm } from 'react-hook-form';


function App() {
  const [apiResponse, setApiResponse] = useState(null); 
  const [allPokemons, setAllPokemons] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [page, setPage] = useState(null);
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
            setAllPokemons(filterName)
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
          }
          // Name Filter
          if (filterData.name !== '') {
            const filteredPokemonName = async () => {
              const filterName = apiResponse.results.filter(element => element.name.indexOf(filterData.name.toLowerCase()) !== -1);
              setAllPokemons(filterName)
            }
            filteredPokemonName();
          }
          // Not filtered
          if ( filterData.name === '' && filterData.type === '' ) {
            setAllPokemons(apiResponse.results);
          }
        }
      }
    }, [filterData]
  )

  // Failed Search
  useEffect(
    () => {
      if (allPokemons) {
        if (allPokemons.length === 0) {
          setFailedSearch(true)
        }
        else {
          setFailedSearch(false);
        }
      }

    }, [allPokemons]
  )
  // Pagination
  useEffect (
    () => {
      if (allPokemons) {
        const numberOfPages =  Math.ceil(allPokemons.length / 4);
        setPage(allPokemons.slice(currentPage, currentPage +4));
      }
    }, [allPokemons, currentPage]
  )
  const onChangePage = (num) => {
    setCurrentPage(prev => prev +num*4);
  }
  const onChangePageGroup = (action) => {
    if (action === 'next') {
      setCurrentPage(prev => prev +40)
    }
    if (action === 'back') {
      setCurrentPage(prev => prev -40)
    }
  }

  // Fetch details
  useEffect(
    () => {
      if (page) {
        page.forEach(element => {
          const getPokemonData = async (element) => {
            setPokemonsData([])
            element = await serviceGet(element.url);
            setPokemonsData(data => [...data, element])
          };
          getPokemonData(element)
        });
      }
    }, [page]
  )

  // Order
  useEffect(
    () => {
      if (pokemonsData) {
        setPokemonsData(data => data = data.sort((a, b) => a.order - b.order))
      }
    }, [pokemonsData]
  )

  return (
    <div>
      <PokedexContainer
      pokemonsData={pokemonsData}
      register={register}
      handleSubmit={handleSubmit}
      setFilterData={setFilterData}
      failedSearch={failedSearch} />
      <div>
        <button onClick={()=> onChangePageGroup('back')} >back</button>
        <button onClick={()=> onChangePageGroup('next')} >next</button>
        <button onClick={() => onChangePage(0)} >1</button>
        <button onClick={() => onChangePage(1)} >2</button>
        <button onClick={() => onChangePage(2)} >3</button>
        <button onClick={() => onChangePage(3)} >4</button>
        <button onClick={() => onChangePage(4)} >5</button>
        <button onClick={() => onChangePage(5)} >6</button>
        <button onClick={() => onChangePage(6)} >7</button>
        <button onClick={() => onChangePage(7)} >8</button>
        <button onClick={() => onChangePage(8)} >9</button>
        <button onClick={() => onChangePage(9)} >10</button>
      </div>



      {/* <PokemonContainer pokemon={pokemonsData[0]}/> */}

    </div>
  );
}

export default App;
