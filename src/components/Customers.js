import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    // Fetch the list of customers when the component mounts
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    // Fetch the list of customers from your backend API
    // Replace with actual API endpoint and fetch logic
    fetch('http://127.0.0.1:8000/customers/')
      .then((response) => response.json())
      .then((data) => setCustomers(data));
  };

  const handleSearch = () => {
    // Fetch filtered customers based on searchTerm when the Search button is clicked
    // Replace with actual search logic
    searchCustomers(searchTerm);
  };

  const searchCustomers = (searchTerm) => {
    // Fetch filtered customers based on searchTerm from your backend API
    // Replace with actual API endpoint and fetch logic
    fetch(`/api/customers/?search=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setCustomers(data));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Customers
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

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address ID</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Create Date</TableCell>
              <TableCell>Last Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.customer_id}</TableCell>
                <TableCell>{customer.first_name}</TableCell>
                <TableCell>{customer.last_name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.address_id}</TableCell>
                <TableCell>{customer.active}</TableCell>
                <TableCell>{customer.create_date}</TableCell>
                <TableCell>{customer.last_update}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Customers;
