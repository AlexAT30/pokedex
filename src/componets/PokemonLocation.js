import { useEffect, useState } from "react";
import { serviceGet } from "../services/get";

const PokemonLocation = ({ pokemon, speciesData }) => {

  const [locations, setlocations] = useState([]);

  useEffect(
    () => {
      if (pokemon) {
        const getLocations = async () => {
          const url = pokemon.location_area_encounters;
          const data = await serviceGet(url);
          setlocations (data);
        }
        getLocations()
      }
    }, [pokemon]
  )

  const locationsList = locations.map((element, index) => {
    const details = element.version_details.map((element, index) => { // Details of locations
      return (
        <div className='ms-2 col-sm-5 justify-content-center' key={`DETLOC${index}`} >
          <h3 className='all-mayus' ><span className='text-bold' >Pokemon </span> {element.version.name.replace(/-/g, ' ')} </h3>
          <p><span className='text-bold' >Chance:</span> {`${element.encounter_details[0].chance}%`} </p>
          <p><span className='text-bold' >Min Level:</span> {element.encounter_details[0].min_level} </p>
          <p><span className='text-bold' >Max Level:</span> {element.encounter_details[0].max_level} </p>
          <p><span className='text-bold' >Method:</span> {element.encounter_details[0].method.name.replace(/-/g, ' ')} </p>
        </div>
      )
    })
    return (
      <div key={`LOC${index}`} className='col-12 row mb-4' >
        <h3 className='all-mayus m-0 ' style={{color: speciesData.color.name}} > {element.location_area.name.replace(/-/g, ' ')} </h3>
        {details}
      </div>
    )
  })

  return (
    <div className='pokemonContainer__info row ps-3'>
      {locationsList}
    </div>
  )
}
export default PokemonLocation;