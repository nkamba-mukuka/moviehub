import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Movie {
    id: number;
    title: string;
    poster: string;
}

interface MovieListProps {
    searchQuery?: string;
}

const MovieList: React.FC<MovieListProps> = ({ searchQuery }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    useEffect(() => {
        const fetchMovies = async () => {

            const url = searchQuery
                ? `https://api.themoviedb.org/3/search/movie?api_key=336ce50989c7da4ec846349adc27407a&query=${searchQuery}`
                : `https://api.themoviedb.org/3/movie/popular?api_key=336ce50989c7da4ec846349adc27407a`;

            try {
                const response = await fetch(
                    url
                );
                const data = await response.json();

                const formattedMovies = data.results.map((movie: any) => ({
                    id: movie.id,
                    title: movie.title,
                    poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }));

                setMovies(formattedMovies);
            } catch (err) {
                console.error('Failed to fetch movies:', err);
            }
        };

        fetchMovies();
    }, [searchQuery]);


    return (
        <div className="movie-grid">
            {movies.map(movie => (
                <Link
                    to={`/movie/${movie.id}`}
                    key={movie.id}
                    className="movie-card"
                >
                    <img src={movie.poster} alt={movie.title} />
                    <h3>{movie.title}</h3>
                </Link>
            ))}
        </div>
    );
};



export default MovieList;