import React, { useState } from 'react';
import {
    Modal, TextField, Button, Container, Paper, Typography,
    Select, MenuItem, InputLabel, FormControl,
} from '@material-ui/core';

function EditCustomer({ isOpen, onClose, customer }) {

    const [formData, setFormData] = useState({
        first_name: customer ? customer.first_name : '',
        last_name: customer ? customer.last_name : '',
        email: customer ? customer.email : '',
        store_id: customer ? customer.store : '',
    });

    console.log(formData)

    if (!customer) {
        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        fetch(`http://127.0.0.1:8000/update-customer/${customer.customer_id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                onClose();
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Container style={{ marginTop: '10vh', width: '50%' }}>
                <Paper style={{ padding: '2rem', textAlign: 'center' }}>
                    <Typography variant="h6">Edit Customer</Typography>
                    <TextField
                        label="First Name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        fullWidth
                        style={{ marginTop: '20px' }}
                    />
                    <TextField
                        label="Last Name"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        fullWidth
                        style={{ marginTop: '20px' }}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        style={{ marginTop: '20px' }}
                    />
                    <FormControl fullWidth style={{ marginTop: '20px' }}>
                        <InputLabel id="store-label">Store ID</InputLabel>
                        <Select
                            labelId="store-label"
                            name="store_id"
                            value={formData.store_id}
                            onChange={handleChange}
                        >
                            <MenuItem value={1}>Store 1</MenuItem>
                            <MenuItem value={2}>Store 2</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        style={{ marginTop: '20px' }}
                    >
                        Save
                    </Button>
                </Paper>
            </Container>
        </Modal>
    );
}

export default EditCustomer;
