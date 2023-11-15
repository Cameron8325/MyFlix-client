import React, { useEffect, useState } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [ user, setUser ] = useState(null);
  const [token, setToken] = useState(null);
  
  useEffect(() => {
    fetch("https://camflixcf-73cf2f8e0ca3.herokuapp.com/movies")
    .then((response) => response.json())
    .then((data) => {
      setMovies(data);
    })
    .catch((error) => console.error("Error fetching movies", error));
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflixmoviedb.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, [token]);
  
  if (!user) {
    return (
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
    );
  }

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
        {movies.map((movie) => (
          <div key={movie._id} onClick={() => setSelectedMovie(movie)}>
            {movie.Title}
          </div>
        ))}
        <button onClick={() => { setUser(null); setToken(null); }}>Logout</button>
    </div>
  );
};
