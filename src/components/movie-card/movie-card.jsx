import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import './movie-card.scss';

export const MovieCard = ({ movieData }) => {
  return (
    <Card className="h-100 movie-card">
      <Link to={`/movies/${encodeURIComponent(movieData._id)}`}>
        <Card.Img variant="top" src={movieData.ImageUrl} />
      </Link>
      <Card.Body>
        <Card.Title>{movieData.Title}</Card.Title>
        <Card.Text>{movieData.Description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    ImageUrl: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
};
