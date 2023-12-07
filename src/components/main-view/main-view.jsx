import React, { useEffect, useState } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ProfileView } from "../profile-view/profile-view.jsx";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import '../../index.scss';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser); // Set initial state with stored user
  const [token, setToken] = useState(storedToken);

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
    fetch(`https://camflixcf-73cf2f8e0ca3.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        setUser(updatedUser);
      })
      .catch((error) => console.error('Error adding movie to favorites', error));
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Container>
                <Row>
                  {movies.map((movie) => (
                    <Col key={movie._id} xs={6} md={4} lg={3} xl={2} className="mb-5">
                      <MovieCard movieData={movie} onFavoriteClick={onFavoriteClick} />
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
        <Route path="/movies/:movieId" element={<MovieView movies={movies} onFavoriteClick={onFavoriteClick} />} />
        <Route path="/users/:username" element={<ProfileView user={user} movies={movies} onLogout={() => onLoggedOut()} />} />
      </Routes>
    </BrowserRouter>
  );
};
