import React from 'react';
import {
  Modal,
  Container,
  Paper,
  Typography,
  CircularProgress,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

function CustomerInfo({ isOpen, onClose, customer, rentedMovies, isLoading, onDelete }) {
  const handleDelete = () => {
    onDelete(customer.customer_id);
    onClose();
  };

  const isReturned = (returnDate) => {
    const currentDate = new Date();
    const rentalReturnDate = new Date(returnDate);
    return rentalReturnDate < currentDate;
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Container style={{ marginTop: '10vh', textAlign: 'center' }}>
        <Paper elevation={3} style={{ padding: '2rem' }}>
          <Typography variant="h6" gutterBottom>
            Customer Details
          </Typography>
          {customer && (
            <div>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDelete}
              >
                Delete Customer
              </Button>
              <Typography variant="subtitle1">
                Name: {customer.first_name} {customer.last_name}
              </Typography>
              <Typography variant="subtitle1">
                Customer ID: {customer.customer_id}
              </Typography>
              <Typography variant="subtitle1">
                Email: {customer.email}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Rented Movies
              </Typography>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Movie Title</TableCell>
                        <TableCell align="right">Rental Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rentedMovies.map((rental) => (
                        <TableRow key={rental.rental_id}>
                          <TableCell component="th" scope="row">
                            {rental.film_title}
                          </TableCell>
                          <TableCell align="right">
                            {isReturned(rental.return_date) ? 'Returned' : 'Rented'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          )}
          <Button variant="contained" color="primary" onClick={onClose}>
            Close
          </Button>
        </Paper>
      </Container>
    </Modal>
  );
}

export default CustomerInfo;
