import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const MovieCard = ({ movieData, onMovieClick }) => {
  return (
 <Card className="h-100" style={{ cursor: 'pointer' }} onClick={() => onMovieClick(movieData)}>
      <Card.Img variant="top" src="https://placehold.co/150" />
      <Card.Body>
        <Card.Title>{movieData.Title}</Card.Title>
        <Card.Text>{movieData.Description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};