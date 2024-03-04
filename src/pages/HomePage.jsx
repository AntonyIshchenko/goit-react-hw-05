import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import tmdbAPI from '../utils/tmdb-api';
import Navigation from '../components/Navigation/Navigation';

function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    async function fetchTrendingMovie() {
      try {
        setIsLoading(true);
        const data = await tmdbAPI.getTrendingMovies();
        setMovieList(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTrendingMovie();
  }, []);

  return (
    <div>
      <Navigation />
      <h2>Trending today</h2>
      {isLoading && <p>Loading...</p>}
      {movieList.length > 0 && (
        <ul>
          {movieList.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePage;
