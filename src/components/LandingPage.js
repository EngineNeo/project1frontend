import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  List,
  ListItem
} from '@material-ui/core';

const mockTopMoviesData = [
    { id: 1, title: 'Movie 1' },
    { id: 2, title: 'Movie 2' },
    // ... other movies ...
  ];
  
  const mockTopActorsData = [
    { id: 1, name: 'Actor 1' },
    { id: 2, name: 'Actor 2' },
    // ... other actors ...
  ];

function LandingPage() {
  const [topMovies, setTopMovies] = useState([]);
  const [topActors, setTopActors] = useState([]);

  useEffect(() => {
    // Fetch data for top movies and actors
    // For demonstration purposes, replace with actual data fetching logic
    setTopMovies(mockTopMoviesData);
    setTopActors(mockTopActorsData);
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Top 5 Rented Movies
      </Typography>
      <List>
        {topMovies.map((movie, index) => (
          <ListItem key={index}>
            <Card>
              <CardActionArea component={Link} to={`/movies/${movie.id}`}>
                <CardContent>
                  <Typography variant="h6">{movie.title}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </ListItem>
        ))}
      </List>

      <Typography variant="h4" gutterBottom>
        Top 5 Actors
      </Typography>
      <List>
        {topActors.map((actor, index) => (
          <ListItem key={index}>
            <Card>
              <CardActionArea component={Link} to={`/actors/${actor.id}`}>
                <CardContent>
                  <Typography variant="h6">{actor.name}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default LandingPage;