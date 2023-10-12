import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Modal } from '@material-ui/core';

function CustomerModal({ isOpen, onClose, onCreate, customerId, onDelete }) {
    const [customerFirstName, setCustomerFirstName] = useState('');
    const [customerLastName, setCustomerLastName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerAddress, setCustomerAddress] = useState(() => Math.floor(Math.random() * (606 - 5) + 5)); // random number between 5 and 605
    const [customerStore, setCustomerStore] = useState('');

    const handleCreate = () => {
        onCreate({
            first_name: customerFirstName,
            last_name: customerLastName,
            email: customerEmail,
            address: customerAddress,
            store: customerStore,
        });
    };

    const handleDelete = () => {
        if (customerId) {
            onDelete(customerId);
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div style={{ backgroundColor: '#fff', padding: '1rem', margin: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                
                <h2>Create Customer</h2>
                <TextField
                    label="First Name"
                    variant="outlined"
                    value={customerFirstName}
                    onChange={(e) => setCustomerFirstName(e.target.value)}
                />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    value={customerLastName}
                    onChange={(e) => setCustomerLastName(e.target.value)}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                />
                <FormControl variant="outlined" style={{ marginTop: '1rem' }}>
                    <InputLabel id="store-select-label">Store</InputLabel>
                    <Select
                        labelId="store-select-label"
                        value={customerStore}
                        onChange={(e) => setCustomerStore(e.target.value)}
                        label="Store"
                    >
                        <MenuItem value={1}>Store 1</MenuItem>
                        <MenuItem value={2}>Store 2</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={handleCreate} style={{ marginTop: '1rem' }}>
                    Create Customer
                </Button>
            </div>
        </Modal>
    );
}

export default CustomerModal;
