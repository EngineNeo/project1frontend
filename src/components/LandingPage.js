import React, { useState, useEffect } from 'react';
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

function LandingPage() {
    const classes = useStyles();
    const [selectedItem, setSelectedItem] = useState(null);
    const [moviesData, setMoviesData] = useState([]);
    const [actorsData, setActorsData] = useState([]);

    const handleRowClick = (item) => {
    setSelectedItem(item);
    };

    useEffect(() => {
      fetch('http://127.0.0.1:8000/top-movies/')
          .then(response => response.json())
          .then(data => setMoviesData(data));
  
      fetch('http://127.0.0.1:8000/top-actors/')
          .then(response => response.json())
          .then(data => {
            setActorsData(data);
          });
  }, []);
  

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
                  {moviesData.map(movie => (
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {actorsData.map(actor => (
                    <TableRow
                      key={actor.actor_id}
                      onClick={() => handleRowClick(actor)}
                      className={classes.hoverCursor}
                    >
                      <TableCell>{actor.first_name} {actor.last_name}</TableCell>
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

                    {selectedItem.title && ( // If it's a movie
                      <div>
                        <Typography variant="body1">
                          Description: {selectedItem.description}
                        </Typography>
                        <Typography variant="body1">
                          Release Year: {selectedItem.release_year}
                        </Typography>
                        <Typography variant="body1">
                          Length: {selectedItem.length} minutes
                        </Typography>
                        <Typography variant="body1">
                          Rating: {selectedItem.rating}
                        </Typography>
                      </div>
                    )}

                  {selectedItem.first_name && ( // If it's an actor
                    <div>
                      <Typography variant="h6" style={{ marginTop: '10px' }}>
                        Top 5 Rented Movies:
                      </Typography>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Release Year</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedItem.top_movies && selectedItem.top_movies.map(movie => (
                            <TableRow key={movie.film_id}>
                              <TableCell>{movie.title}</TableCell>
                              <TableCell>{movie.release_year}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        </Container>
      );    
}

export default LandingPage;
