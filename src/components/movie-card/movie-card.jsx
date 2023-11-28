import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

export const MovieCard = ({ movieData, onMovieClick }) => {
  return (
 <Card className="h-100 movie-card" style={{ cursor: 'pointer' }} onClick={() => onMovieClick(movieData)}>
      <Card.Img variant="top" src={movieData.ImageUrl} />
      <Card.Body>
        <Card.Title>{movieData.Title}</Card.Title>
        <Card.Text>{movieData.Description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    ImageUrl: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};