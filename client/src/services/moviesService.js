import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

const API_CACHE = parseInt(process.env.REACT_APP_FRONTEND_CACHE_IN_SECONDS);
const MOVIES_API = process.env.REACT_APP_MOVIES_API;

// Create `axios-cache-adapter` instance and sets an internal cache on it
const cache = setupCache({
  maxAge: API_CACHE * 1000,
});

// creates an instance with our cache adapter
const api = axios.create({
  adapter: cache.adapter,
});

/**
 *
 * service that connects with the backend and requests the movies
 *
 * @param keyword
 * @returns {Promise<*>}
 */
// eslint-disable-next-line import/prefer-default-export
export async function searchMovies(keyword) {
  const response = await api.get(`${MOVIES_API}?keyword=${keyword}`);
  return response.data;
}
