import { useEffect } from "react";

const PokedexPagination = ({ allPokemons, setPage, currentPage, setCurrentPage }) => {
  // useEffect(
  //   () => {
  //     if (allPokemons) {
  //       console.log(allPokemons);
  //       setPage(allPokemons.slice(0, 4))
  //     }
  //   }, [setPage, allPokemons]
  // )
  useEffect(
    () => {
      if (allPokemons) {
        setPage(allPokemons.slice(currentPage, currentPage+4))
      }
    }, [currentPage, setPage, allPokemons]
  )

  return (
    <div>
      <button onClick={() => setCurrentPage(prev => prev+40)}> Next </button>
    </div>
  )
}
export default PokedexPagination;