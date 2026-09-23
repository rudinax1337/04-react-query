import type { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w342';

export default function MovieGrid({ movies }: MovieGridProps) {
  if (movies.length === 0) {
    return null;
  }

  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.card}>
          {movie.poster_path ? (
            <img
              className={css.poster}
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              loading="lazy"
            />
          ) : (
            <div className={css.posterFallback}>No image</div>
          )}
          <h3 className={css.title}>{movie.title}</h3>
          <p className={css.meta}>
            {movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'} ·{' '}
            {movie.vote_average.toFixed(1)}
          </p>
        </li>
      ))}
    </ul>
  );
}