import actionTypes from './actionTypes';

/**
 * action creator to be used once the movies are loaded
 * @param movies an array of movies
 * @returns the corresponding action
 */
export function moviesLoaded(movies = []) {
  return { type: actionTypes.MOVIES.MOVIES_LOADED, payload: movies };
}

/**
 * action creator to be used once the movies start to be loaded
 * @returns the corresponding action
 */
export function loadingMovies() {
  return { type: actionTypes.MOVIES.MOVIES_LOADING };
}

/**
 * action creator to be used once the movies are loading is about to be requested
 * @param keyword - name of the movie being searched
 * @returns the corresponding action
 */
export function loadMovies(keyword) {
  return { type: actionTypes.MOVIES.LOAD_MOVIES, payload: keyword.trim() };
}

/**
 * action creator to be used if something wrong happens during the movies load
 * @param err the original error
 * @returns the corresponding action
 */
export function loadError(err) {
  return { type: actionTypes.MOVIES.MOVIES_LOAD_FAILURE, payload: err };
}
