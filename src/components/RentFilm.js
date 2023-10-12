// RentFilm.js
import React, { useState } from 'react';
import { Modal, TextField, Button, Typography, Container, Paper } from '@material-ui/core';

function RentFilm({ isOpen, onClose, film, onRent }) {
    const [email, setEmail] = useState('');

    const handleRent = () => {
        onRent(film.film_id, email);
        onClose();
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Container style={{ marginTop: '10vh', width: '50%' }}>
                <Paper style={{ padding: '2rem', textAlign: 'center' }}>
                    <Typography variant="h6">{film?.title || ''}</Typography>
                    <TextField
                        label="Your Email Address"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ marginTop: '20px' }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleRent}
                        style={{ marginTop: '20px' }}
                    >
                        Rent
                    </Button>
                </Paper>
            </Container>
        </Modal>
    );
}

export default RentFilm;
