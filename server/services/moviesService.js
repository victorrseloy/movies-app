import axios from 'axios';
import "core-js/fn/array/flat-map";

const OMBD_KEY = process.env.OMBD_KEY;
const OMBD_API_ENDPOINT = process.env.OMBD_API_ENDPOINT;
const TOTAL_MOVIES_PER_REQUEST = parseInt(process.env.TOTAL_MOVIES_PER_REQUEST);


/**
 * this function resolves the movies form OMDB by doing  paralel requests,
 *
 *
 * @param keyword - movie being searched
 * @returns  a list with movies
 */
export async function searchMovies(keyword) {
    let movieRequests = []
    //starts the promise requests in paralell
    for(let i = 0;i<Math.floor(TOTAL_MOVIES_PER_REQUEST/10);i++){
        movieRequests.push(searchMoviesPage(keyword,i+1))
    }
    //wait all the promisses to resolve before moving ahead
    //an important thing is that we are doing them in paralel and then waiting them to resolve
    let movies = await Promise.all(movieRequests)
    //basically joins and flats the movies list
    return movies.map(moviesResult => moviesResult.data.Search).filter( arr => arr)
        .flatMap(movie => movie).filter(movie => movie!=null && !!movie);
}

/**
 * sends the request to omdb API
 * @param keyword - movie being searched
 * @param page - omdb movies page that you want
 * @returns a promise that resolve to an OMDB response
 */
function searchMoviesPage(keyword,page){
    return axios.get(
        `${OMBD_API_ENDPOINT}?apikey=${OMBD_KEY}&s=${keyword}&page=${page}`
    );
}
