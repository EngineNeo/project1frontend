import React, { useState, useEffect, useCallback } from 'react';
import {
  Container, Typography, TextField, Button, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  Modal, Paper, CircularProgress,
  List, ListItem, ListItemText
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import CustomerModal from './CustomerModal';
import CustomerInfo from './CustomerInfo';

function Customers() {
  const [customerId, setCustomerId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [rentedMovies, setRentedMovies] = useState([]);

  const fetchCustomers = useCallback(async (page) => {
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
  }, [customerId, firstName, lastName]);

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

  const openCustomerModal = () => {
    setCustomerModalOpen(true);
  };


  const handleCreateCustomer = (newCustomerData) => {
    console.log("Creating customer", newCustomerData);

    // The URL will depend on your API, here's a placeholder
    const url = 'http://127.0.0.1:8000/customers/';

    // Options and data for the request
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...newCustomerData,
        active: 1, // or true, depending on the data type on your server
        create_date: new Date().toISOString(),
        last_update: new Date().toISOString(),
      }),
    };

    // Make the request
    fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        setCustomerModalOpen(false); // Close the modal
        fetchCustomers(1); // Refresh the list of customers
      })
      .catch(error => {
        console.error('Error:', error);
        // Here you would typically set some state to indicate the error to the user
      });
  };

  const deleteCustomer = (customerId) => {
    // The URL will depend on your API. Here's a placeholder.
    const url = `http://127.0.0.1:8000/customers/${customerId}/`;

    // Options for the DELETE request
    const requestOptions = {
      method: 'DELETE',
    };

    // Make the request
    fetch(url, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Maybe update state or refetch customers to reflect the deletion
        fetchCustomers(1);
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error
      });
  };

  const fetchRentedMovies = (customerId) => {

    fetch(`http://127.0.0.1:8000/rentals/?customer_id=${customerId}`)
      .then((response) => response.json())
      .then((data) => {
        setRentedMovies(data.results);
      });
  };

  useEffect(() => {
    fetchCustomers(1);
  }, [fetchCustomers]);

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
      <Button variant="contained" color="secondary" onClick={openCustomerModal} style={{ marginLeft: '20px' }}>
        Add Customer
      </Button>

      {/* Customer List Table */}
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

      {/* Pagination */}
      <Pagination 
        count={totalPages} 
        page={page} 
        onChange={handlePageChange}
      />

      {/* Customer Info Modal */}
      <CustomerInfo
        isOpen={isModalOpen}
        onClose={closeModal}
        customer={selectedCustomer}
        rentedMovies={rentedMovies}
        isLoading={isLoading}
        onDelete={deleteCustomer} // pass the delete function here
      />

      {/* Customer Create Modal */}
      <CustomerModal
        isOpen={customerModalOpen}
        onClose={() => setCustomerModalOpen(false)}
        onCreate={handleCreateCustomer} // Here we're passing the handleCreateCustomer function as the onCreate prop
      />
</Container>
);
}

export default Customers;