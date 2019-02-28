import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import MovieBanner from 'components/Presentational/MovieBanner';

const MoviesBannerContainer = ({ movies }) => {
  return (
    <div className="movies-banner-container">
      {movies.map(movie => (
        <MovieBanner movie={movie} />
      ))}
    </div>
  );
};

MoviesBannerContainer.defaultProps = {
  movies: [],
};

MoviesBannerContainer.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Poster: PropTypes.string.isRequired,
    }).isRequired
  ),
};

export default MoviesBannerContainer;
