import { useEffect, useState } from 'react';
import './App.css';
import PokedexContainer from './componets/PokedexContainer';
import PokemonContainer from './componets/PokemonContainer';
import { serviceGet } from './services/get';
import { useForm } from 'react-hook-form';


function App() {
  const [apiResponse, setApiResponse] = useState([]);
  const [filter, setFilter] = useState([]);
  const [pokemonsData, setPokemonsData] = useState([]);

  // Form
  const {register, handleSubmit} = useForm();
  const [filterData, setFilterData] = useState({});

  console.log(filterData)

  // Get all pokemons
  useEffect(
    () => {
      const getPokemonsData = async () => {
        const url = 'https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0';
        const data = await serviceGet(url);
        setApiResponse(data);
      }
      getPokemonsData()
    }, []
  );

  // // Really filter
  // useEffect(
  //   () => {


  //   }, [apiResponse]
  // )

  // Filter
  useEffect(
    () => {
      if (apiResponse.results) {
        for (let i = 0; i < 4; i++) {
          setFilter(preview => [...preview, apiResponse.results[i]])
        }
      }
      console.log(apiResponse);
    }, [apiResponse]
  )
  useEffect(
    () => {
      if (filter) {
        filter.forEach(element => {
          const getPokemonData = async (element) => {
            element = await serviceGet(element.url);
            setPokemonsData(data => [...data, element])
          };
          getPokemonData(element)
        });
      }
    }, [filter]
  )
  useEffect(
    () => {
      if (pokemonsData) {
        setPokemonsData(data => data = data.sort((a, b) => a.order - b.order))
      }
    }, [pokemonsData]
  )
  return (
    <div>
      <PokedexContainer pokemonsData={pokemonsData} register={register} handleSubmit={handleSubmit} setFilterData={setFilterData} />
      {/* <PokemonContainer pokemon={pokemonsData[0]}/> */}

    </div>
  );
}

export default App;
