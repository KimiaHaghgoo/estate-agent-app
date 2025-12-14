import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import PropertyPage from './components/PropertyPage';
import './App.css';

// Main App component - handles routing and global state
function App() {
  // Store favourites in state so it persists across pages
  const [favourites, setFavourites] = useState([]);

  // Add a property to favourites - prevent duplicates
  const addToFavourites = (property) => {
    // Check if already in favourites by id
    const exists = favourites.find(fav => fav.id === property.id);
    if (!exists) {
      setFavourites([...favourites, property]);
    }
  };

  // Remove property from favourites by id
  const removeFromFavourites = (propertyId) => {
    setFavourites(favourites.filter(fav => fav.id !== propertyId));
  };

  // Clear all favourites at once
  const clearFavourites = () => {
    setFavourites([]);
  };

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>Estate Agent Property Search</h1>
          <p className="tagline">Find your dream home</p>
        </header>

        <Routes>
          {/* Search page with favourites management */}
          <Route
            path="/"
            element={
              <SearchPage
                favourites={favourites}
                addToFavourites={addToFavourites}
                removeFromFavourites={removeFromFavourites}
                clearFavourites={clearFavourites}
              />
            }
          />

          {/* Individual property details page */}
          <Route
            path="/property/:id"
            element={
              <PropertyPage
                addToFavourites={addToFavourites}
                favourites={favourites}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
