import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ReactPaginateModule from 'react-paginate';
import type { ReactPaginateProps } from 'react-paginate';
import type { ComponentType } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import { fetchMovies } from '../../services/api';
import css from './App.module.css';

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>).default;

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim().length > 0,
    placeholderData: keepPreviousData,
  });

  const handleSearchSubmit = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const totalPages = data?.total_pages ?? 0;

  return (
    <div className={css.container}>
      <h1 className={css.heading}>Movie Search</h1>
      <SearchBar onSubmit={handleSearchSubmit} />

      {isLoading && <p className={css.status}>Loading...</p>}
      {isError && (
        <p className={css.status}>
          Something went wrong while fetching movies.
        </p>
      )}
      {!isLoading && !isError && data?.results.length === 0 && (
        <p className={css.status}>No movies found for your request.</p>
      )}

      {data && <MovieGrid movies={data.results} />}

      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {isFetching && !isLoading && (
        <p className={css.status}>Updating results...</p>
      )}
    </div>
  );
}