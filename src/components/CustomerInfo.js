import React from 'react';
import {
  Modal,
  Container,
  Paper,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@material-ui/core';

function CustomerInfo({ isOpen, onClose, customer, rentedMovies, isLoading, onDelete }) {
  const handleDelete = () => {
    onDelete(customer.customer_id); 
    onClose(); 
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
                <List>
                  {rentedMovies.map((rental) => (
                    <ListItem key={rental.rental_id}>
                      <ListItemText primary={rental.film_title} />
                    </ListItem>
                  ))}
                </List>
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
