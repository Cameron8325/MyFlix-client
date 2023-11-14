import PropTypes from "prop-types";

export const MovieCard = ({ movieData, onMovieClick }) => {
  return (
    <div
    onClick={() => {
      onMovieClick(movieData);
    }}
    >
      {movieData.title}
    </div>
  );
};

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    // Add other properties as needed
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};