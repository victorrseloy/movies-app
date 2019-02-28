import * as moviesActions from 'actions/moviesActions';
import moviesReducer from './movieReducer';

const moviesResult = [
  {
    Title: 'The Matrix',
    Year: '1999',
    imdbID: 'tt0133093',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    Title: 'The Matrix Reloaded',
    Year: '2003',
    imdbID: 'tt0234215',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BODE0MzZhZTgtYzkwYi00YmI5LThlZWYtOWRmNWE5ODk0NzMxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    Title: 'The Matrix Revolutions',
    Year: '2003',
    imdbID: 'tt0242653',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzNlZTZjMDctZjYwNi00NzljLWIwN2QtZWZmYmJiYzQ0MTk2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
  },
];

describe('tests the movie reducer', () => {
  test('returns the correct default state', () => {
    const action = { type: 'dummy_action' };

    const initialState = {
      movies: [],
      loading: false,
      error: false,
      errorMessage: '',
      results: true,
    };

    expect(moviesReducer(undefined, action)).toEqual(initialState);
  });

  test('checks if correctly loads movies', () => {
    const expctedState = {
      movies: [...moviesResult],
      loading: false,
      error: false,
      errorMessage: '',
      results: true,
    };

    expect(
      moviesReducer(undefined, moviesActions.moviesLoaded(moviesResult))
    ).toEqual(expctedState);
  });

  test('empty results to have results equals false', () => {
    const moviesResult = [];

    const expctedState = {
      movies: [],
      loading: false,
      error: false,
      errorMessage: '',
      results: false,
    };

    expect(
      moviesReducer(undefined, moviesActions.moviesLoaded(moviesResult))
    ).toEqual(expctedState);
  });

  test('empty results to be properly replaced', () => {
    const expctedState = {
      movies: [...moviesResult],
      loading: false,
      error: false,
      errorMessage: '',
      results: true,
    };

    const state = moviesReducer(undefined, moviesActions.moviesLoaded([]));

    expect(
      moviesReducer(state, moviesActions.moviesLoaded(moviesResult))
    ).toEqual(expctedState);
  });

  test('loading state shall not change current movies', () => {
    let state = moviesReducer(
      undefined,
      moviesActions.moviesLoaded(moviesResult)
    );
    state = moviesReducer(state, moviesActions.loadingMovies());

    expect(state.movies).toEqual(moviesResult);
  });

  test('loading state shall clear errors and set loading to true', () => {
    const initialState = {
      movies: [],
      loading: false,
      error: true,
      errorMessage: '',
      results: true,
    };

    let state = moviesReducer(
      initialState,
      moviesActions.moviesLoaded(moviesResult)
    );
    state = moviesReducer(state, moviesActions.loadingMovies());

    expect(state.error).toEqual(false);
    expect(state.loading).toEqual(true);
  });

  test('error shall clear movies and the error to true', () => {
    const initialState = {
      movies: [...moviesResult],
      loading: false,
      error: false,
      errorMessage: '',
      results: true,
    };

    const state = moviesReducer(initialState, moviesActions.loadError('err'));

    expect(state.error).toEqual(true);
    expect(state.movies).toEqual([]);
  });
});
