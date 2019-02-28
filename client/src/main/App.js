import React from 'react';
import { Provider } from 'react-redux';
import MovieSearchView from 'components/Views/MovieSearchView';
import store from 'store';

/**
 * App root component, this is the component that will be called form our index
 */
export default function App() {
  return (
    <Provider store={store}>
      <MovieSearchView />
    </Provider>
  );
}
