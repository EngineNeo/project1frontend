import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Typography,
  Card,
  CardContent 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  hoverCursor: {
    cursor: 'pointer',
  },
});

const mockMoviesData = [
  { 
    film_id: 1, 
    title: 'Movie 1', 
    description: 'Description 1', 
    release_year: 2001, 
    // ... other movie properties ...
  },
  { 
    film_id: 2, 
    title: 'Movie 2', 
    description: 'Description 2', 
    release_year: 2002, 
    // ... other movie properties ...
  },
  // ... other movies ...
];

const mockActorsData = [
  { actor_id: 1, first_name: 'Actor', last_name: 'One', films_count: 10 },
  { actor_id: 2, first_name: 'Actor', last_name: 'Two', films_count: 12 },
  // ... other actors ...
];

function LandingPage() {
    const classes = useStyles();
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedActor, setSelectedActor] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleRowClick = (item) => {
    setSelectedItem(item);
    };

    return (
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="h5" gutterBottom>
                Top Movies
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Release Year</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockMoviesData.map(movie => (
                    <TableRow
                      key={movie.film_id}
                      onClick={() => handleRowClick(movie)}
                      className={classes.hoverCursor}
                    >
                      <TableCell>{movie.title}</TableCell>
                      <TableCell>{movie.release_year}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
    
              <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
                Top 5 Actors
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Films Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockActorsData.map(actor => (
                    <TableRow
                      key={actor.actor_id}
                      onClick={() => handleRowClick(actor)}
                      className={classes.hoverCursor}
                    >
                      <TableCell>{actor.first_name} {actor.last_name}</TableCell>
                      <TableCell>{actor.films_count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
    
            <Grid item xs={6}>
              {selectedItem && (
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      {selectedItem.title || `${selectedItem.first_name} ${selectedItem.last_name}`}
                    </Typography>
                    {/* Display more details based on whether a movie or actor is selected */}
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        </Container>
      );    
}

export default LandingPage;
