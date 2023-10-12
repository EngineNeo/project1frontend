import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button component={Link} to="/">Landing Page</Button>
        <Button component={Link} to="/films">Films</Button>
        <Button component={Link} to="/customers">Customers</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;