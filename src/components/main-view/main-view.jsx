import React, { useState } from "react";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      director: "Christopher Nolan",
      description: " 'Inception' is a mind-bending science fiction film that explores the concept of entering people's dreams to steal their secrets. Directed by Christopher Nolan, this visually stunning and thought-provoking movie follows a group of thieves who use advanced technology to navigate the subconscious mind. As the lines between reality and dreams blur, the film takes the audience on an exhilarating and thrilling journey."
    },
    {
      id: 2,
      title: "Pulp Fiction",
      director: "Quentin Tarantino",
      description: "'Pulp Fiction,' directed by Quentin Tarantino, is a classic crime drama with a unique narrative structure. The film weaves together interconnected stories of hitmen, a boxer, a gangster's wife, and more, all set in a gritty underworld. Known for its sharp dialogue, memorable characters, and non-linear storytelling, 'Pulp Fiction' has become a cult favorite."
    },
    {
      id: 3,
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
      description: " 'The Shawshank Redemption' is a powerful and touching drama directed by Frank Darabont. The film tells the story of a banker, Andy Dufresne, who is wrongfully convicted of murder and serves a life sentence in Shawshank State Penitentiary. Through friendship and determination, Andy navigates the challenges of prison life while helping his fellow inmates. This tale of hope, resilience, and the enduring human spirit has earned its place as one of the greatest films of all time."
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  

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
      {movies.map((Movie) => (
        <MovieCard
          key={Movie.id}
          movieData={Movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
