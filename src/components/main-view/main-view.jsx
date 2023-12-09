import React, { useEffect, useState } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { ProfileView } from "../profile-view/profile-view.jsx";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import "../../index.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser); // Set initial state with stored user
  const [token, setToken] = useState(storedToken);
  const [selectedGenre, setSelectedGenre] = useState("");

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

  const onFavoriteClick = (movieId) => {
    const movie = movies.find((m) => m._id === movieId);

      // Check if the movie is already in the user's favorites
  if (user.FavoriteMovies.includes(movieId)) {
    window.alert(`${movie.Title} is already in your favorites!`);
    return;
  }
    fetch(
      `https://camflixcf-73cf2f8e0ca3.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((updatedUser) => {
        setUser(updatedUser);
        window.alert(`${movie.Title} added to favorites!`);
      })
      .catch((error) =>
        console.error("Error adding movie to favorites", error)
      );
  };

  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    window.location.replace('/');
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const filteredMovies = selectedGenre
  ? movies.filter((movie) => movie.Genre && movie.Genre.Name === selectedGenre)
  : movies;

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={onLoggedOut} />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Container>
                <Row>
                  <Col>
                    <Form.Select onChange={handleGenreChange} className="mb-3" style={{ width: '200px', marginLeft: 'auto' }}>
                      <option value="">All Genres</option>
                      {[
                        'Action', 'Adventure', 'Biography', 'Comedy', 'Crime',
                        'Drama', 'Fantasy', 'Horror', 'Musical', 'Romance',
                        'Sci-Fi', 'Thriller', 'War'
                      ].map((genre) => (
                        <option key={genre} value={genre}>{genre}</option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>
                <Row>
                  {filteredMovies.map((movie) => (
                    <Col
                      key={movie._id}
                      xs={6}
                      md={4}
                      lg={3}
                      xl={2}
                      className="mb-5"
                    >
                      <MovieCard
                        movieData={movie}
                        onFavoriteClick={onFavoriteClick}
                      />
                    </Col>
                  ))}
                </Row>
                <Link to={`/users/${user.Username}`}>
                  <Button className="logout-button">Logout</Button>
                </Link>
              </Container>
            ) : (
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
            )
          }
        />
        <Route
          path="/movies/:movieId"
          element={
            <MovieView movies={movies} onFavoriteClick={onFavoriteClick} />
          }
        />
        <Route
          path="/users/:username"
          element={
            <ProfileView
              user={user}
              onLoggedOut={() => onLoggedOut()}
              movies={movies}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
