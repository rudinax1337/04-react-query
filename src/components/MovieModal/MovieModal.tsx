import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Movie } from '../../types/movie';
import css from './MovieModal.module.css';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w780';

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button className={css.closeButton} onClick={onClose} type="button">
          ✕
        </button>
        {movie.backdrop_path && (
          <img
            className={css.poster}
            src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
            alt={movie.title}
          />
        )}
        <h2 className={css.title}>{movie.title}</h2>
        <p className={css.meta}>
          {movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'} ·{' '}
          {movie.vote_average.toFixed(1)}
        </p>
        <p className={css.overview}>{movie.overview}</p>
      </div>
    </div>,
    document.body,
  );
}