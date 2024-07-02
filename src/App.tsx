import React, { useState } from 'react';
import { useEffect } from 'react';
import MovieCard from './MovieCard';
import './App.css';
import SeachIcon from './seach.svg';

const apiKey:string = `${import.meta.env.VITE_APP_API_KEY}`;
const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}`;

const App = () =>{
  const [movies, setMovies] = useState([]);
  const [searchTerm,setSearchTerm] = useState('')

  const searchMovies = async (title:string) =>{
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search)
  }
  
  useEffect(()=>{
    searchMovies('Batman')
  },[])
  
  return(
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input 
         type="text" 
         placeholder="Search for movies"
         value = {searchTerm}
         onChange={(e)=>setSearchTerm(e.target.value)}
        />
        <img 
         src={SeachIcon}
         alt='Search'
         onClick={()=> searchMovies(searchTerm)}
        />
      </div>
      {
        movies?.length > 0 
          ? (
            <div className="container">
              {movies.map((movie)=> (
                <MovieCard movie={movie} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )
      }
    </div>
  )
}

export default App;