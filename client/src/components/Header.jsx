import React, { useContext } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../App';

const Header = () => {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token
    setToken(null);
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" style={{ marginBottom: '1.5rem' }}>
      <Container>
        <Nav.Link as={Link} to="/">
          <div className='logo-container'>
            <FontAwesomeIcon icon={faCamera} size="2x" />
          </div>
        </Nav.Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} className='nav-btn' to="/home" activeClassName="active">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} className='nav-btn' to="/" exact activeClassName="active">
              About
            </Nav.Link>
            {!token && (
              <Nav.Link as={NavLink} className='nav-btn' to="/login" activeClassName="active">
                Login
              </Nav.Link>
            )}
            {!token && (
              <Nav.Link as={NavLink} className='nav-btn' to="/register" activeClassName="active">
                Register
              </Nav.Link>
            )}
            {token && (
              <Nav.Link as={NavLink} className='nav-btn' to="/dashboard" activeClassName="active">
                Dashboard
              </Nav.Link>
            )}
          </Nav>
          {token && (
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;





