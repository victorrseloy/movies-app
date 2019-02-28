import { Observable, interval } from 'rxjs';
import { combineEpics } from 'redux-observable';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/concat';

import actionTypes from 'actions/actionTypes';
import * as moviesService from 'services/moviesService';
import * as moviesActions from 'actions/moviesActions';

const DEBOUNCE_INTERVAL_IN_MS = 300;
const MIN_MOVIES_SEARCH_LENGTH = 3;

/**
 *
 * this observable epic handles the movie loading, rxjs offers a big advantage over thunk or sagas by allowing
 * us to easily debounce multiple requests or filter payloads that shouldn't really trigger an action.
 *
 */
function loadMoviesEpic($action) {
  return $action
    .ofType(actionTypes.MOVIES.LOAD_MOVIES)
    .debounce(() => interval(DEBOUNCE_INTERVAL_IN_MS))
    .filter(({ payload }) => payload.length >= MIN_MOVIES_SEARCH_LENGTH)
    .switchMap(({ payload }) => {
      const loadingAction = Observable.of(moviesActions.loadingMovies());

      const moviesResultAction = Observable.from(
        moviesService.searchMovies(payload)
      )
        .map(moviesResultList => moviesActions.moviesLoaded(moviesResultList))
        .catch(err => Observable.of(moviesActions.loadError(err)));

      return Observable.concat(loadingAction, moviesResultAction);
    });
}

// we could have multiple epics here
const rootEpic = combineEpics(loadMoviesEpic);

export default rootEpic;
