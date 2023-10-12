import React, { useState, useEffect } from 'react';
import {
  Container, Typography, TextField, Button, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  Modal, Paper, List, ListItem, ListItemText, CircularProgress
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

function Customers() {
  const [customerId, setCustomerId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [rentedMovies, setRentedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCustomers = (page) => {
    let query = `http://127.0.0.1:8000/customers/?page=${page}`;
    if (customerId) query += `&customer_id=${customerId}`;
    if (firstName) query += `&first_name=${firstName}`;
    if (lastName) query += `&last_name=${lastName}`;

    fetch(query)
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data.results);
        const pages = Math.ceil(data.count / 10);
        setTotalPages(pages);
      });
  };

  const handleSearch = () => {
    fetchCustomers(1);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchCustomers(value);
  };

  const openModal = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
    fetchRentedMovies(customer.customer_id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchRentedMovies = (customerId) => {
    setIsLoading(true);

    fetch(`http://127.0.0.1:8000/rentals/?customer_id=${customerId}`)
      .then((response) => response.json())
      .then((data) => {
        setRentedMovies(data.results);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchCustomers(1);
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Customers
      </Typography>
      <TextField
        label="Customer ID"
        variant="outlined"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
      />
      <TextField
        label="First Name"
        variant="outlined"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        label="Last Name"
        variant="outlined"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Create Date</TableCell>
              <TableCell>Last Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id} onClick={() => openModal(customer)}>
                <TableCell>{customer.customer_id}</TableCell>
                <TableCell>{customer.first_name}</TableCell>
                <TableCell>{customer.last_name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.active}</TableCell>
                <TableCell>{customer.create_date}</TableCell>
                <TableCell>{customer.last_update}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination 
        count={totalPages} 
        page={page} 
        onChange={handlePageChange}
      />

      <Modal open={isModalOpen} onClose={closeModal}>
        <Container style={{ marginTop: '10vh', textAlign: 'center' }}>
          <Paper elevation={3} style={{ padding: '2rem' }}>
            <Typography variant="h6" gutterBottom>
              Customer Details
            </Typography>
            {selectedCustomer && (
              <div>
                <Typography variant="subtitle1">
                  Name: {selectedCustomer.first_name} {selectedCustomer.last_name}
                </Typography>
                <Typography variant="subtitle1">
                  Customer ID: {selectedCustomer.customer_id}
                </Typography>
                <Typography variant="subtitle1">
                  Email: {selectedCustomer.email}
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
            <Button variant="contained" color="primary" onClick={closeModal}>
              Close
            </Button>
          </Paper>
        </Container>
      </Modal>
    </Container>
  );
}

export default Customers;
