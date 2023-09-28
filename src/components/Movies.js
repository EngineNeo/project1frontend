import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActionArea,
  List,
  ListItem,
} from '@material-ui/core';

function Movies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  // Function to fetch movies based on the search term
  const fetchMovies = (searchTerm) => {
    // Replace with the actual API endpoint for fetching movies
    fetch(`http://127.0.0.1:8000/film/?search=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setMovies(data));
  };

  const handleSearch = () => {
    // Call the fetchMovies function when the Search button is clicked
    fetchMovies(searchTerm);
  };

  const handleRent = (movieId) => {
    // Logic to rent out a movie to a customer
    // Replace with actual rent logic
  };

  useEffect(() => {
    // Fetch all movies when the component mounts
    fetchMovies('');
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Search Movies
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>

      <List>
        {movies.map((movie, index) => (
          <ListItem key={index}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h6">{movie.title}</Typography>
                  <Typography variant="body2">{movie.genre}</Typography>
                  {/* Add more movie details as needed */}
                </CardContent>
              </CardActionArea>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleRent(movie.id)}
              >
                Rent
              </Button>
            </Card>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Movies;