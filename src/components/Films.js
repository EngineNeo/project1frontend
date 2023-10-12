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
  makeStyles,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles({
  title: {
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
});

function Films() {
  const classes = useStyles();

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

      <div>
        <List>
          {films.map((film) => (
            <ListItem
              key={film.film_id}
            >
              <Card>
                <CardContent>
                <Typography
                  variant="h6"
                  className={classes.title}
                  onClick={() => handleFilmClick(film)}
                >
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

      {selectedFilm && (
        <div>
          <Card>
            <CardContent>
              <Typography variant="h6">{selectedFilm.title}</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Description</TableCell>
                      <TableCell>Release Year</TableCell>
                      <TableCell>Length</TableCell>
                      <TableCell>Rating</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{selectedFilm.description}</TableCell>
                      <TableCell>{selectedFilm.release_year}</TableCell>
                      <TableCell>{selectedFilm.length} minutes</TableCell>
                      <TableCell>{selectedFilm.rating}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </div>
      )}

      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
      />
    </Container>
  );
}

export default Films;
