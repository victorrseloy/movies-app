import axios from 'axios';

const OMBD_KEY = '5321b27a';

/**
 * this function resolves the movies form OMDB by doing 2 paralel requests,
 *
 *
 * @param keyword - movie being searched
 * @returns  a list with movies
 */
export async function searchMovies(keyword) {

    //we start the 2 requests in parallel and await them all to resolve
    let movies = await Promise.all([searchMoviesPage(keyword,1),searchMoviesPage(keyword,2)])

    //basically joins and flats the movies list
    return movies.map(moviesResult => moviesResult.data.Search)
        .flatMap(movie => movie).filter(movie => movie!=null);
}

/**
 * sends the request to omdb API
 * @param keyword - movie being searched
 * @param page - omdb movies page that you want
 * @returns a promise that resolve to an OMDB response
 */
function searchMoviesPage(keyword,page){
    return axios.get(
        `http://www.omdbapi.com/?apikey=${OMBD_KEY}&s=${keyword}&page=${page}`
    );
}
