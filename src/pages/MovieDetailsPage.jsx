import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tmdbAPI from '../utils/tmdb-api';
import Navigation from '../components/Navigation/Navigation';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    if (!movieId) return;

    async function fetchTrendingMovie() {
      try {
        setIsLoading(true);
        const data = await tmdbAPI.getMovieDetais(movieId);
        setMovie(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTrendingMovie();
  }, [movieId]);
  return (
    <div>
      <Navigation />
      {isLoading && <p>Loading...</p>}
      {movie.id && (
        <h2>
          {movie.title} ({movie.release_date.slice(0, 4)})
        </h2>
      )}
    </div>
  );
}

export default MovieDetailsPage;
