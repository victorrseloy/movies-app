import mockAxios from 'axios';
import * as moviesService from './moviesService';

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
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: moviesResult })
    );
    mockAxios.create.mockImplementation(() => axios);
    const result = moviesService.searchMovies('matrix');
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(result.then(resp => resp.toEqual(moviesResult)));
  });
});
