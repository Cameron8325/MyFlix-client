import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useParams } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies, onFavoriteClick }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId);

  return (
    <Card className="mx-auto movie-view" style={{ width: "18rem" }}>
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
          <span>{movie.Starring.join(", ")}</span>
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
        <Link to="/">
          <Button className="back-button" variant="primary">
            Back
          </Button>
        </Link>
        <Button variant="danger" onClick={() => onFavoriteClick(movie._id)}>
          &#x2665; Favorite
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  onFavoriteClick: PropTypes.func.isRequired,
};
