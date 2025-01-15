import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Movie from "./Components/Movie";
import Watchlist from './Components/Watchlist';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./Components/Banner";

function App() {
  // Load initial watchlist from localStorage if available
  const loadWatchlist = () => {
    const storedWatchlist = localStorage.getItem('moviesApp');
    return storedWatchlist ? JSON.parse(storedWatchlist) : [];
  };

  const [watchlist, setWatchlist] = useState(loadWatchlist());

  // Update localStorage whenever watchlist changes
  useEffect(() => {
    if (watchlist.length > 0) {
      localStorage.setItem('moviesApp', JSON.stringify(watchlist));
    } else {
      localStorage.removeItem('moviesApp');  // Clear localStorage if the watchlist is empty
    }
  }, [watchlist]);

  const handleAddToWatchlist = (movieObj) => {
    if (!watchlist.some((movie) => movie.id === movieObj.id)) {
      setWatchlist([...watchlist, movieObj]);
    }
  };

  const handleRemoveFromWatchlist = (movieObj) => {
    // Remove the movie from the watchlist state
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== movieObj.id);
    setWatchlist(updatedWatchlist);

    // Update localStorage immediately after removing from watchlist
    localStorage.setItem('moviesApp', JSON.stringify(updatedWatchlist));
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Banner />
                <Movie
                  handleAddToWatchlist={handleAddToWatchlist}
                  handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                  watchlist={watchlist}  // Pass watchlist here
                />
              </>
            } 
          />
          <Route 
            path="/watchlist" 
            element={<Watchlist watchlist={watchlist} setWatchlist={setWatchlist}/>}  // Pass watchlist here too
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
