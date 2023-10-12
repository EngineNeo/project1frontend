import React, { useState, useEffect, useCallback } from 'react';
import {
  Container, Typography, TextField, Button, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  Modal, Select, MenuItem, InputLabel
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

function Customers() {
  const [customerId, setCustomerId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [setIsModalOpen] = useState(false);
  const [newCustomerModalOpen, setNewCustomerModalOpen] = useState(false);
  const [setSelectedCustomer] = useState(null);
  const [setRentedMovies] = useState([]);

  const [newCustomerFirstName, setNewCustomerFirstName] = useState('');
  const [newCustomerLastName, setNewCustomerLastName] = useState('');
  const [newCustomerEmail, setNewCustomerEmail] = useState('');
  const [newCustomerStore, setNewCustomerStore] = useState('');

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

  const fetchHighestAddressId = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/customers/');
      const data = await response.json();
      const highestAddress = data.results.reduce((max, customer) => customer.address > max ? customer.address : max, data.results[0].address);
      return highestAddress;
    } catch (error) {
      console.error('Error fetching customers:', error);
      return null;
    }
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

  const openNewCustomerModal = () => {
    setNewCustomerModalOpen(true);
  };


const handleCreateCustomer = async () => {
  const highestAddressId = await fetchHighestAddressId();

    const newCustomer = {
        first_name: newCustomerFirstName,
        last_name: newCustomerLastName,
        email: newCustomerEmail,
        active: 0,
        create_date: new Date().toISOString(),
        last_update: new Date().toISOString(),
        address: highestAddressId+1,
        store: newCustomerStore, 
    };

    console.log("Creating customer", newCustomer);

    fetch('http://127.0.0.1:8000/customers/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCustomer),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        setNewCustomerModalOpen(false);
        fetchCustomers(1); // refresh the list of customers
    })
    .catch((error) => {
        console.error('Error:', error);
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
      <Button variant="contained" color="secondary" onClick={openNewCustomerModal} style={{ marginLeft: '20px' }}>
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

      {/* Customer Details Modal */}
      <Modal open={newCustomerModalOpen} onClose={() => setNewCustomerModalOpen(false)}>
        <div style={{ backgroundColor: '#fff', padding: '1rem', margin: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2>Create New Customer</h2>
          <TextField
            label="First Name"
            variant="outlined"
            value={newCustomerFirstName}
            onChange={(e) => setNewCustomerFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            value={newCustomerLastName}
            onChange={(e) => setNewCustomerLastName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            value={newCustomerEmail}
            onChange={(e) => setNewCustomerEmail(e.target.value)}
          />
          <div>
            <InputLabel id="store-select-label">Store</InputLabel>
            <Select
              labelId="store-select-label"
              value={newCustomerStore}
              onChange={(e) => setNewCustomerStore(e.target.value)}
            >
              <MenuItem value={1}>Store 1</MenuItem>
              <MenuItem value={2}>Store 2</MenuItem>
            </Select>
          </div>
          <Button variant="contained" color="primary" onClick={handleCreateCustomer}>
            Create Customer
          </Button>
        </div>
      </Modal>
</Container>
);
}

export default Customers;