import PropTypes from 'prop-types';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>{movie.ImageUrl}</div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Starring: </span>
        <span>{movie.Starring.join(', ')}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Rated: </span>
        <span>{movie.Rating}</span>
      </div>
      <div>
        <span>Released: </span>
        <span>{movie.ReleaseYear}</span>
      </div>
      <div>
        <span>Total Time: </span>
        <span>{movie.TotalTime}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    ImageUrl: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Description: PropTypes.string.isRequired,
    Starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    Rating: PropTypes.string.isRequired,
    ReleaseYear: PropTypes.number.isRequired,
    TotalTime: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
