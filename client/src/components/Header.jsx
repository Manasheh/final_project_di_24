import React, { useContext } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import About from './About';

import { AuthContext } from '../App';

const Header = () => {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token
    setToken(null);

    // Perform any additional cleanup if necessary
    // e.g., localStorage.removeItem('token'); or removing cookies

    // Navigate to the login page
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" style={{marginBottom:'1.5rem'}}>
      <Container>
      {/* <Navbar.Brand as={Link} to="/">Fam.Nest</Navbar.Brand>
       */}
       <Nav.Link as={Link} to="/">
       <div className='logo-container'>
        <FontAwesomeIcon icon={faCamera} size="2x" />  
        </div>
       </Nav.Link>
       
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          
          <Nav.Link as={Link} className='nav-btn' to="/home">Home</Nav.Link>
          <Nav.Link as={Link} className='nav-btn' to="/">About</Nav.Link>
          {!token && <Nav.Link as={Link} className='nav-btn' to="/login">Login</Nav.Link>}
          {!token && <Nav.Link as={Link} className='nav-btn' to="/register">Register</Nav.Link>}
          {token && <Nav.Link as={Link} className='nav-btn' to="/dashboard">Dashboard</Nav.Link>}
        </Nav>
        {token && <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>}
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;





// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { Button, Stack, Box } from '@mui/material';
// import { AuthContext } from '../App';

// const Header = () => {
//   const { token } = useContext(AuthContext); // Assume 'token' represents the login state

//   return (
//     <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
//       <Stack spacing={2} direction="row">
//         <Button component={Link} to="/">Home</Button>
//         <Button component={Link} to="/login">Login</Button>
//         <Button component={Link} to="/register">Register</Button>
//         <Button component={Link} to="/dashboard">Dashboard</Button>
//         {token && <Button component={Link} to="/login">Logout</Button>}
//       </Stack>
//     </Box>
//   );
// };

// export default Header;





// import React from 'react'
// import { Link } from 'react-router-dom'
// import { Button, Stack } from '@mui/material'

// const Header = () => {
//   return (
//     <div>
//       <Stack spacing={2} direction={'row'}>
//         <Button LinkComponent={Link} to='/'>Home</Button>
//         <Button LinkComponent={Link} to='/login'>Login</Button>
//         <Button LinkComponent={Link} to='/register'>Register</Button>
//         <Button LinkComponent={Link} to='/dashboard'>DashBoard</Button>
//         <Button LinkComponent={Link} to='/logout'>Logout</Button>

//       </Stack>
//     </div>
//   )
// }

// export default Header
