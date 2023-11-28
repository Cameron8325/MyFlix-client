import React, { useEffect, useState } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Container, Row, Col, Button } from "react-bootstrap";
import '../../index.scss';



export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);


  useEffect(() => {
    if (token) {
      fetch("https://camflixcf-73cf2f8e0ca3.herokuapp.com/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          console.error("Error fetching user data", error);
        });
    }
  }, [token]);

  useEffect(() => {
    fetch("https://camflixcf-73cf2f8e0ca3.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => console.error("Error fetching movies", error));
  }, [token]);

  if (!user) {
    return (
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <Container>
              <LoginView
                onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                }}
              />
            </Container>
          </Col>
          <Col md={6}>
            <Container>
              <SignupView />
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <Container>
      <Row>
        {movies.map((movie) => (
          <Col key={movie._id} xs={6} md={4} lg={3} xl={2} className="mb-5">
            <MovieCard movieData={movie} onMovieClick={() => setSelectedMovie(movie)} />
          </Col>
        ))}
      </Row>
      <Button className="logout-button" onClick={() => {
        setUser(null);
        setToken(null);
        localStorage.clear();
      }}>
        Logout
      </Button>
    </Container>
  );
};