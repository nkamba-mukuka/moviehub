import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Movie {
    id: number;
    title: string;
    poster: string;
    description: string;
}

const MovieDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setIsLoading(true);

                const url = `https://api.themoviedb.org/3/movie/${id}?api_key=336ce50989c7da4ec846349adc27407a`;
                const response = await fetch(url);

                if (!id) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();


                const movieDetails: Movie = {
                    id: data.id,
                    title: data.title,
                    poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
                    description: data.overview || 'No description available',
                };


                setMovie(movieDetails);

            } catch (err) {
                setError('Failed to fetch movie details');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!movie) return <div>Movie not found</div>;

    return (
        <div className="movie-details">
            <button onClick={() => navigate(-1)} className="back-button">
                ← Back
            </button>
            <div className="movie-info">
                <img src={movie.poster} alt={movie.title} />
                <div className="details">
                    <h2>{movie.title}</h2>
                    <p>{movie.description}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;