import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { AuthContext } from '../App';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import './Login.css';

const LoginRegister = ({ page }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const loginRegister = async () => {
    if (page === 'Login') {
      try {
        const response = await axios.post(
          'https://final-project-di-24.onrender.com/login',
          { email, password },
          { withCredentials: true }
        );
        if (response.status === 200) {
          setMessage('Login successful');
          setToken(response.data.token);
          navigate('/dashboard');
        }
      } catch (error) {
        setToken(null);
        setMessage(error.response?.data?.message || 'Login failed');
      }
    } else {
      try {
        const response = await axios.post(
          'https://final-project-di-24.onrender.com/register',
          { username, email, password },
          { withCredentials: true }
        );
        if (response.status === 200) {
          setMessage('Register successful');
          navigate('/login');
        }
      } catch (error) {
        setMessage(error.response?.data?.message || 'Register failed');
      }
    }
  };

  return (
    <div className='loginRegister'>
      <h2 className='heading'>{page}</h2>
      <Container>
        <Form>
          {page === 'Register' && (
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
          )}
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <div className="password-input-container">
              <Form.Control 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              {/* Toggle password visibility */}
              <div className="password-toggle-icon-container">
                {showPassword ? 
                  <FaEyeSlash onClick={togglePasswordVisibility} className="password-toggle-icon" /> :
                  <FaEye onClick={togglePasswordVisibility} className="password-toggle-icon" />
                }
              </div>
            </div>
          </Form.Group>
          {/* Login/Register button */}
          <Button variant="primary" onClick={loginRegister} className="login-button">
            {page}
          </Button>
          <div>{message}</div>
        </Form>
      </Container>
    </div>
  );
};

export default LoginRegister;












