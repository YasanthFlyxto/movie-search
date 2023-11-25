import { useEffect, useState } from 'react';
import './App.css';
import searchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'http://omdbapi.com?apikey=aa842ed3';

const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm ] = useState('');
  
  const handleSearch = () => {
    searchMovies(searchTerm);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }}
    const handleInputChange = (e) => {
      // Update the search term as the user types
      setSearchTerm(e.target.value);
      // Trigger the search in real-time (you can debounce this if needed)
      searchMovies(e.target.value);
    };
    
    const searchMovies = async (title) => {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      setMovies(data.Search);
    };
    
    useEffect(() => {
    searchMovies('Batman');
  }, []); 

  return (
    <div className='app'>
      <h1>Movie Reel</h1>
      <h3>by Yasanth</h3>
      <div className='search'>
        <input
          placeholder='Search for Movies ( ex: "Batman" )'
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          
        />
        <img src={searchIcon}
        alt='search'
        onClick={() => searchMovies(searchTerm)}
        />
        
      </div>
      

      {
        movies?.length > 0
          ?(
          <div className='container'>
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))

          }
        </div>
          ) : (
            <div className='empty'>
              <h2>No movies found</h2>
            </div>
          )
      }
    </div>
  );
};

export default App;