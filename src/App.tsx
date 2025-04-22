import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setSearchQuery(query);

      const url = `https://api.themoviedb.org/3/search/movie?api_key=336ce50989c7da4ec846349adc27407a&query=${query}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();

      const movies = data.results.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        description: movie.overview || 'No description available',
      }));

      setMovies(movies);

    } catch (error) {
      setError('Failed to fetch movies. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Router>
      <div className="App">

        <div className="hero-section">
          <h1> The MovieHub</h1>
          <SearchBar onSearch={handleSearch} />
        </div>

        {error && <div className="error-message">{error}</div>}

        {isLoading && <LoadingSpinner />}


        <main className="main-content">
          <Routes>
            <Route path="/" element={<MovieList searchQuery={searchQuery} />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
