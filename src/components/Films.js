import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

function Films() {

  const [filmName, setFilmName] = useState('');
  const [actorName, setActorName] = useState('');
  const [genre, setGenre] = useState('');
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFilm, setSelectedFilm] = useState(null);

  const fetchFilms = (filmName, actorName, genre, page) => {
    let query = `http://127.0.0.1:8000/films/?page=${page}`;
    if (filmName) query += `&film_name=${filmName}`;
    if (actorName) query += `&actor_name=${actorName}`;
    if (genre) query += `&genre=${genre}`;

    fetch(query)
      .then((response) => response.json())
      .then((data) => {
        setFilms(data.results);
        const totalPages = Math.ceil(data.count / 10);
        setTotalPages(totalPages);
      });
  };

  const handleSearch = () => {
    fetchFilms(filmName, actorName, genre, 1);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchFilms(filmName, actorName, genre, value);
  };

  const handleFilmClick = (film) => {
    setSelectedFilm(film);
  };  

  useEffect(() => {
    fetchFilms('', '', '', 1);
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Search Films
      </Typography>
      <TextField
        label="Film Name"
        variant="outlined"
        value={filmName}
        onChange={(e) => setFilmName(e.target.value)}
      />
      <TextField
        label="Actor Name"
        variant="outlined"
        value={actorName}
        onChange={(e) => setActorName(e.target.value)}
      />
      <TextField
        label="Genre"
        variant="outlined"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
  
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <div style={{ flex: 3, marginRight: '20px' }}>
          <List>
            {films.map((film) => (
              <ListItem
                key={film.film_id}
                button
                onClick={() => handleFilmClick(film)}
              >
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      {film.title}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" color="primary">
                      Rent
                    </Button>
                  </CardActions>
                </Card>
              </ListItem>
            ))}
          </List>
        </div>
  
        <div style={{ flex: 2 }}>
          {selectedFilm && (
            <Card>
              <CardContent>
                <Typography variant="h6">{selectedFilm.title}</Typography>
                <Typography variant="body1" style={{ marginTop: '10px' }}>
                Description: {selectedFilm.description}
              </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Release Year</TableCell>
                        <TableCell>Length</TableCell>
                        <TableCell>Rating</TableCell>
                        <TableCell>Rental Duration</TableCell>
                        <TableCell>Rental Rate</TableCell>
                        <TableCell>Replacement Cost</TableCell>
                        <TableCell>Special Features</TableCell>
                        <TableCell>Last Update</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>{selectedFilm.release_year}</TableCell>
                        <TableCell>{selectedFilm.length} minutes</TableCell>
                        <TableCell>{selectedFilm.rating}</TableCell>
                        <TableCell>{selectedFilm.rental_duration} days</TableCell>
                        <TableCell>${selectedFilm.rental_rate}</TableCell>
                        <TableCell>${selectedFilm.replacement_cost}</TableCell>
                        <TableCell>{selectedFilm.special_features}</TableCell>
                        <TableCell>{new Date(selectedFilm.last_update).toLocaleString()}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
  
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        style={{ marginTop: '20px', justifyContent: 'center' }}
      />
    </Container>
  );  
}

export default Films;
