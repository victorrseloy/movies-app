import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const notFoundImg = require('./img/no-poster.jpg');

const trimTitleSize = title => {
  if (title.length > 48) {
    return `${title.substr(0, 48)} ...`;
  }
  return title;
};

const getMoviePoster = poster => {
  if (poster === 'N/A') {
    return notFoundImg;
  }
  return poster;
};

const MovieBanner = ({ movie }) => {
  return (
    <div className="movie-banner">
      <img
        alt={`poster of the movie ${movie.Title}`}
        src={getMoviePoster(movie.Poster)}
      />
      <h3>{trimTitleSize(movie.Title)}</h3>
    </div>
  );
};

MovieBanner.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Poster: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieBanner;
