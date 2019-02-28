import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';

// Create `axios-cache-adapter` instance and sets an internal cache on it
const cache = setupCache({
  maxAge: 30 * 1000,
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
  const response = await api.get(`/api/search?keyword=${keyword}`);
  return response.data;
}
