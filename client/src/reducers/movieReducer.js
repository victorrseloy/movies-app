import actionTypes from 'actions/actionTypes';

const defaultState = {
  movies: [],
  loading: false,
  error: false,
  errorMessage: '',
  results: true,
};

export default function movieReducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.MOVIES.MOVIES_LOADED:
      return {
        ...state,
        loading: false,
        movies: action.payload,
        results: !!action.payload.length,
      };
    case actionTypes.MOVIES.MOVIES_LOADING:
      return { ...state, loading: true, error: false, errorMessage: '' };
    case actionTypes.MOVIES.MOVIES_LOAD_FAILURE:
      return {
        ...state,
        movies: [],
        loading: false,
        error: true,
        results: true,
        errorMessage: 'There was an error while loading the movies',
      };
    default:
      return state;
  }
}
