import axios from 'axios';
import * as moviesService from './moviesService'
const sampleResponse = {"Search":[{"Title":"The Matrix","Year":"1999","imdbID":"tt0133093","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"},{"Title":"The Matrix Reloaded","Year":"2003","imdbID":"tt0234215","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BODE0MzZhZTgtYzkwYi00YmI5LThlZWYtOWRmNWE5ODk0NzMxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"},{"Title":"The Matrix Revolutions","Year":"2003","imdbID":"tt0242653","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNzNlZTZjMDctZjYwNi00NzljLWIwN2QtZWZmYmJiYzQ0MTk2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"},{"Title":"The Matrix Revisited","Year":"2001","imdbID":"tt0295432","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTIzMTA4NDI4NF5BMl5BanBnXkFtZTYwNjg5Nzg4._V1_SX300.jpg"},{"Title":"Enter the Matrix","Year":"2003","imdbID":"tt0277828","Type":"game","Poster":"http://ia.media-imdb.com/images/M/MV5BMjA4NTYwNjk0M15BMl5BanBnXkFtZTgwODk3MDMwMTE@._V1_SX300.jpg"},{"Title":"The Matrix: Path of Neo","Year":"2005","imdbID":"tt0451118","Type":"game","Poster":"https://m.media-amazon.com/images/M/MV5BYWM2ZWU5MDUtYTU2ZS00ZDFmLWIyNGEtNWZkMjRmZjI2YzMzXkEyXkFqcGdeQXVyMTA1OTEwNjE@._V1_SX300.jpg"},{"Title":"Armitage III: Dual Matrix","Year":"2002","imdbID":"tt0303678","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BOTUwOTY3Mjg1MF5BMl5BanBnXkFtZTcwODI2MTAyMQ@@._V1_SX300.jpg"},{"Title":"CR: Enter the Matrix","Year":"2009","imdbID":"tt1675286","Type":"game","Poster":"http://ia.media-imdb.com/images/M/MV5BMTExMzY3NTQ1NjleQTJeQWpwZ15BbWU3MDAyMjk2NzM@._V1_SX300.jpg"},{"Title":"Sex and the Matrix","Year":"2000","imdbID":"tt0274085","Type":"movie","Poster":"N/A"},{"Title":"Buhera mátrix","Year":"2007","imdbID":"tt0970173","Type":"movie","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMGZiNzdmYWUtZTY0ZS00ZGU4LWE1NDgtNTNkZWM3MzQ0NDY4L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMjIzMDAwOTc@._V1_SX300.jpg"}],"totalResults":"87","Response":"True"}
const TOTAL_MOVIES_PER_REQUEST = parseInt(process.env.TOTAL_MOVIES_PER_REQUEST) || 20;

describe('Simple test', () =>{
    jest.mock('axios');
    axios.get = jest.fn();
    axios.get.mockImplementation(() =>
        Promise.resolve({ data: sampleResponse })
    );
    it('test', (done)=> {
        moviesService.searchMovies('mat').then((resp) =>{
            expect(resp.length).toEqual(TOTAL_MOVIES_PER_REQUEST)
            done();
        })
    })
})
