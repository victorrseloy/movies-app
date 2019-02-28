/**
 * contain all possoble action types of the application,
 * they are contained in one file to avoid typos, the pattern they follow is {action_name}@{action_domain}
 * by adding the @ and an action domain after it we keep meaningful names and avoid action type clashes
 */

const MOVIES = {
  MOVIES_LOADED: 'MOVIES_LOADED@MOVIES',
  MOVIES_LOADING: 'MOVIES_LOADING@MOVIES',
  MOVIES_LOAD_FAILURE: 'MOVIES_LOAD_FAILURE@MOVIES',
  LOAD_MOVIES: 'LOAD_MOVIES@MOVIES',
};

export default { MOVIES };
