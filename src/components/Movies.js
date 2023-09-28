import React, { useState } from 'react';
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

  const handleSearch = () => {
    // Logic to search movies based on searchTerm
    // Replace with actual search logic
  };

  const handleRent = (movieId) => {
    // Logic to rent out a movie
    // Replace with actual rent logic
  };

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
              <CardActionArea /* component={Link} to={`/movies/${movie.id}`} Uncomment and import Link if you have movie detail page */>
                <CardContent>
                  <Typography variant="h6">{movie.title}</Typography>
                  <Typography variant="body2">{movie.genre}</Typography>
                  {/* Add more movie details as needed */}
                </CardContent>
              </CardActionArea>
              <Button variant="contained" color="primary" onClick={() => handleRent(movie.id)}>
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
