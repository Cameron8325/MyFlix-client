import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={movie.ImageUrl} alt={movie.Title} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>
          <span>{movie.ReleaseYear}</span>
        </Card.Text>
        <Card.Text>
          <span>Directed by </span>
          <span>{movie.Director.Name}</span>
        </Card.Text>
        <Card.Text>
          <span>Starring: </span>
          <span>{movie.Starring.join(', ')}</span>
        </Card.Text>
        <Card.Text>
          <span>{movie.Description}</span>
        </Card.Text>
        <Card.Text>
          <span>Rated </span>
          <span>{movie.Rating}</span>
        </Card.Text>
        <Card.Text>
          <span>Genre: </span>
          <span>{movie.Genre.Name}</span>
        </Card.Text>
        <Card.Text>
          <span>{movie.TotalTime}</span>
        </Card.Text>
        <Button variant="primary" onClick={onBackClick}>
          Back
        </Button>
      </Card.Body>
    </Card>
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
