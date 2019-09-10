import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withHandlers, compose } from 'recompose';
import MoviesBannerContainer from 'components/Presentational/MoviesBannerContainer';
import ErrorDisplay from 'components/Presentational/ErrorDisplay';
import { loadMovies } from 'actions/moviesActions';
import './style.scss';

const noResultsImage = require('./img/no-results.png');
const gearImage = require('./img/Gear-1s-200px.gif');

// eslint-disable-next-line react/prop-types
export const MovieSearchView = ({
  onChange,
  movies,
  results,
  loading,
  error,
}) => {
  return (
    <div className="container movies-search-view">
      <div className="nav">
        <h1> Movies search </h1>
      </div>
      <div className="search-bar-container">
        <input
          className="search-bar"
          onChange={onChange}
          type="text"
          placeholder="Search your movie..."
        />
        {loading && <img alt="" className="loader-spinner" src={gearImage} />}
      </div>
      {error && <ErrorDisplay />}
      {results && <MoviesBannerContainer movies={movies} />}
      {!results && (
        <img
          alt="no results found from your search"
          className="not-found"
          src={noResultsImage}
        />
      )}
    </div>
  );
};

/** * from this line bellow we set the enhancer to create our HOC ** */

const mapStateToProps = state => ({
  movies: state.movies.movies,
  results: state.movies.results,
  loading: state.movies.loading,
  error: state.movies.error,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadMoviesActionCreator: loadMovies }, dispatch);

const EnhancedMovieSearchView = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    onChange: ({ loadMoviesActionCreator }) => e =>
      loadMoviesActionCreator(e.target.value),
  })
)(MovieSearchView);

export default EnhancedMovieSearchView;
