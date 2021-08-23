import { useEffect, useState } from "react";

const PokedexPagination = ({ allPokemons, setPage, currentPage, setCurrentPage }) => {

  const [currentPageGroup, setCurrentPageGroup] = useState(null);
  const [currentPageGroupByTen, setCurrentPageGroupByTen] = useState(null);
  const [currentPageGroupByForty, setCurrentPageGroupByForty] = useState(null);
  const [returnToZero, setReturnToZero] = useState(false);
  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect (
    () => {
      if (allPokemons) {
        setNumberOfPages({group: Math.floor(allPokemons.length/40), pages: Math.ceil(allPokemons.length/4) });
        setPage(allPokemons.slice(currentPage, currentPage +4));
      }
    }, [allPokemons, currentPage, setPage]
  );
  useEffect(
    () => {
      if (currentPage === 0 && allPokemons) {
        setCurrentPageGroup(0);
        setCurrentPageGroupByTen(0);
        setCurrentPageGroupByForty(0);
        setPage(allPokemons.slice(0, 4));
        setReturnToZero(false);
      }
    }, [currentPage, allPokemons, setPage]
  )
  useEffect (
    () => {
      if (currentPageGroup === 0 && (returnToZero || currentPageGroup === 0)) {
        setCurrentPage(0);
        setCurrentPageGroupByTen(0);
        setCurrentPageGroupByForty(0);
        setReturnToZero(false);
      }
      if (currentPageGroup) {
        if (currentPageGroup < Math.ceil(allPokemons.length/40)) {
          setCurrentPageGroupByTen(currentPageGroup *10);
          setCurrentPageGroupByForty(currentPageGroup *40);
          setReturnToZero(false);
          setCurrentPage(currentPageGroup*40);
        }
      }
      if (currentPageGroup >= numberOfPages.group && currentPageGroup !== 0) {
        setReturnToZero(true);
      }
    }, [currentPageGroup, allPokemons, numberOfPages, setCurrentPage, returnToZero]
  );


  return (
    <div className='d-flex justify-content-center align-items-center mt-4 mb-5'>
      {/* Back Button */}
      {currentPageGroup > 0 && <button className={`pokedexPagination__button pokedexPagination__button- mx-1 p-2`} onClick={()=> setCurrentPageGroup(prev => prev -1)} >Back</button>}
      {/* Scroll Indicator */}
      <i className="bi bi-caret-left-fill pokedexPagination__scrollIndicators"></i>
      <div className='pokedexPagination__pages d-flex' >
        {/* Page 1 */}
        {currentPageGroupByTen +1 <= numberOfPages.pages && <button className={`pokedexPagination__button pokedexPagination__button- mx-1 p-2`} onClick={() => setCurrentPage(currentPageGroupByForty)} > {currentPageGroupByTen +1} </button>}
        {/* Page 2 */}
        {currentPageGroupByTen +2 <= numberOfPages.pages && <button className={`pokedexPagination__button pokedexPagination__button- mx-1 p-2`} onClick={() => setCurrentPage(currentPageGroupByForty + 4)} > {currentPageGroupByTen +2} </button>}
        {/* Page 3 */}
        {currentPageGroupByTen +3 <= numberOfPages.pages && <button className={`pokedexPagination__button pokedexPagination__button- mx-1 p-2`} onClick={() => setCurrentPage(currentPageGroupByForty + 8)} > {currentPageGroupByTen +3} </button>}
        {/* Page 4 */}
        {currentPageGroupByTen +4 <= numberOfPages.pages && <button className={`pokedexPagination__button pokedexPagination__button- mx-1 p-2`} onClick={() => setCurrentPage(currentPageGroupByForty + 12)} > {currentPageGroupByTen +4} </button>}
        {/* Page 5 */}
        {currentPageGroupByTen +5 <= numberOfPages.pages && <button className={`pokedexPagination__button pokedexPagination__button- mx-1 p-2`} onClick={() => setCurrentPage(currentPageGroupByForty + 16)} > {currentPageGroupByTen +5} </button>}
        {/* Page 6 */}
        {currentPageGroupByTen +6 <= numberOfPages.pages && <button className={`pokedexPagination__button pokedexPagination__button- mx-1 p-2`} onClick={() => setCurrentPage(currentPageGroupByForty + 20)} > {currentPageGroupByTen +6} </button>}
        {/* Page 7 */}
        {currentPageGroupByTen +7 <= numberOfPages.pages && <button className={`pokedexPagination__button pokedexPagination__button- mx-1 p-2`} onClick={() => setCurrentPage(currentPageGroupByForty + 24)} > {currentPageGroupByTen +7} </button>}
        {/* Page 8 */}
        {currentPageGroupByTen +8 <= numberOfPages.pages && <button className={`pokedexPagination__button pokedexPagination__button- mx-1 p-2`} onClick={() => setCurrentPage(currentPageGroupByForty + 28)} > {currentPageGroupByTen +8} </button>}
        {/* Page 9 */}
        {currentPageGroupByTen +9 <= numberOfPages.pages && <button className={`pokedexPagination__button pokedexPagination__button- mx-1 p-2`} onClick={() => setCurrentPage(currentPageGroupByForty + 32)} > {currentPageGroupByTen +9} </button>}
        {/* Page 10 */}
        {currentPageGroupByTen +10 <= numberOfPages.pages && <button className={`pokedexPagination__button pokedexPagination__button- mx-1 p-2`} onClick={() => setCurrentPage(currentPageGroupByForty + 36)} > {currentPageGroupByTen +10} </button>}
      </div>
      {/* Scroll Indicator */}
      <i className="bi bi-caret-right-fill pokedexPagination__scrollIndicators"></i>
      {/* Next Button */}
      {currentPageGroup < numberOfPages.group  && <button className={`pokedexPagination__button pokedexPagination__button- mx-1 p-2`} onClick={()=> setCurrentPageGroup(prev => prev +1)} >Next</button>}
      {/* Return to 0 */}
      {returnToZero && <button className={`pokedexPagination__button pokedexPagination__button- mx-1 p-2`} onClick={()=> setCurrentPageGroup(0)} >Return to 0</button>}
    </div>
  )
}
export default PokedexPagination;