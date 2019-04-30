jest.useRealTimers();
import * as moviesService from 'services/moviesService';
import { ActionsObservable } from 'redux-observable';
import * as moviesActions from 'actions/moviesActions';
import actionTypes from 'actions/actionTypes';
import { loadMoviesEpic } from './rootEpic';
import {interval, Observable} from 'rxjs';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/timeInterval';


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

describe('checks the root epic actions', () => {
    jest.mock('services/moviesService');

    const spy = jest.spyOn(moviesService, 'searchMovies');

    beforeEach(() => {
        moviesService.searchMovies.mockImplementation(keyword => {
            return Promise.resolve(moviesResult);
        });
        spy.mockClear();
    });

    it('shall resolve the movies correctly', done => {
        const $action = ActionsObservable.of(moviesActions.loadMovies('rambo'));

        loadMoviesEpic($action)
            .filter(x => x.type === actionTypes.MOVIES.MOVIES_LOADED)
            .subscribe(actual => {
                expect(spy).toHaveBeenCalledTimes(1);
                expect(actual.payload).toEqual([...moviesResult]);

                done();
            });
    });

    it('shall not invoke the movies service neither dispatch stuff if the length is small', done => {
        const $action = ActionsObservable.of(moviesActions.loadMovies('ra'));


        loadMoviesEpic($action).subscribe(actual => {
            throw new Error('Should not have been invoked');
        });

        setTimeout(() => {
            expect(spy).toHaveBeenCalledTimes(0);
            done();
        }, 301);

    });

    it('shall not invoke the movies service neither dispatch stuff if the we invoke before 300ms', (done) => {

        var $action =Observable.create((observer) => {
            setTimeout(() => observer.next(moviesActions.loadMovies('ram')),50);
            setTimeout(() => {
                observer.next(moviesActions.loadMovies('ramb'));
                expect(spy).toHaveBeenCalledTimes(0);
            },100);
            setTimeout(() => observer.next(moviesActions.loadMovies('rambo')),150);
            setTimeout(() => {
                expect(spy).toHaveBeenCalledWith('rambo')
                expect(spy).toHaveBeenCalledTimes(1);
                observer.next(done())

            },460);
        });

        loadMoviesEpic($action).filter(x => x.type === actionTypes.MOVIES.MOVIES_LOADED).subscribe(actual => {
            //
        });



    });

    it('shall return an error action if something goes wrong', done => {
        const $action = ActionsObservable.of(moviesActions.loadMovies('rambo'));
        moviesService.searchMovies.mockImplementation(keyword => {
            return Promise.reject('error');
        });
        spy.mockClear();

        loadMoviesEpic($action)
            .filter(x => x.type == actionTypes.MOVIES.MOVIES_LOAD_FAILURE)
            .subscribe(actual => {
                done();
            });
    });
});
