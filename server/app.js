import express from 'express';
import * as moviesService from './services/moviesService'
import asyncHandler from 'express-async-handler'
import apicache from 'apicache'

const MOVIES_API = process.env.MOVIES_API || '/api/search';

let cache = apicache.middleware

// Set up the express app
const app = express();

//sets the cache for 20 days, this assumes that the server will need to be restarted often
//for new deployments, if this is not the case then it's just a matter of increasing the cache
app.use(cache('480 hours'))

app.get(MOVIES_API, asyncHandler(async (req, res) => {
    let movies = await moviesService.searchMovies(req.query.keyword);
    res.status(200).send(movies)
}));

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
