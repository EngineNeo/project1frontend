import React, { useState, useEffect } from 'react';
import { Modal, TextField, Button, Typography, Container, Paper } from '@material-ui/core';

function RentFilm({ isOpen, onClose, film }) {
    const [email, setEmail] = useState('');
    const [availableFilmCount, setAvailableFilmCount] = useState(0);  // state to hold the count of available films
    
    useEffect(() => {
        if (isOpen && film) {
            fetch(`http://127.0.0.1:8000/available-films/${film.film_id}/`)
                .then(response => response.json())
                .then(data => {
                    // Now data contains only the occurrences of the specified film
                    setAvailableFilmCount(data.length);
                });
        }
    }, [isOpen, film]);


    const handleRent = () => {
        const rentalData = {
            rental_date: new Date().toISOString(),
            film_id: film.film_id,
            email: email,
        };

        console.log('Posting data:', rentalData);

        fetch('http://127.0.0.1:8000/api/rent-film/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rentalData),
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        console.error('Error:', errorData);
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                onClose();
            })
            .catch(error => {
                console.error('Error:', error);
            });
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
                    <Typography variant="h6">Available Films: {availableFilmCount}</Typography>
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
