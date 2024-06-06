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












// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Box, TextField, Button } from '@mui/material';
// import { AuthContext } from '../App';

// const LoginRegister = ({ page }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [username, setUsername] = useState('');

//   const { setToken } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const loginRegister = async () => {
//     if (page === 'Login') {
//       try {
//         const response = await axios.post(
//           'http://localhost:8080/login',
//           { email, password },
//           { withCredentials: true }
//         );
//         if (response.status === 200) {
//           setMessage('Login successful');
//           setToken(response.data.token);  // Ensure this matches the token's key in the response
//           navigate('/dashboard');
//         }
//       } catch (error) {
//         // console.log(error);
//         setToken(null);
//         setMessage(error.response?.data?.message || 'Login failed');
//       }
//     } else {
//       try {
//         const response = await axios.post(
//           'http://localhost:8080/register',
//           { username, email, password },
//           { withCredentials: true }
//         );
//         if (response.status === 200) {
//           setMessage('Register successful');
//           navigate('/login');
//         }
//       } catch (error) {
//         console.log(error);
//         setMessage(error.response?.data?.message || 'Register failed');
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>{page}</h2>
//       <Box component="form" sx={{ m: 1 }} noValidate autoComplete="off">
//         {page === 'Register' && (
//           <TextField
//             sx={{ m: 1 }}
//             id="username"
//             type="text"
//             label="Username"
//             variant="outlined"
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         )}
//         <TextField
//           sx={{ m: 1 }}
//           id="email"
//           type="email"
//           label="Enter Email"
//           variant="outlined"
//           onChange={(e) => setEmail(e.target.value.toLowerCase())}
//         />
//         <TextField
//           sx={{ m: 1 }}
//           id="password"
//           type="password"
//           label="Enter Password"
//           variant="outlined"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </Box>
//       <Button variant="contained" onClick={loginRegister}>
//         {page}
//       </Button>
//       <div>{message}</div>
//     </div>
//   );
// };

// export default LoginRegister;













// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Box, TextField, Button } from '@mui/material';
// import { AuthContext } from '../App';

// const LoginRegister = ({ page }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [username, setUsername] = useState('');

//   const { setToken } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const loginRegister = async () => {
//     if (page === 'Login') {
//       try {
//         const response = await axios.post(
//           'http://localhost:8080/login',
//           { email, password },
//           { withCredentials: true }
//         );
//         console.log(response);

//         if (response.status === 200) {
//           setMessage('Login successful');
//           console.log(response.data);
//           setToken(response.data);
//           navigate('/dashboard');
//         }
//       } catch (error) {
//         console.log(error);
//         setToken(null);
//         setMessage(error.response.data.message);
//       }
//     } else {
//       try {
//         const response = await axios.post(
//           'http://localhost:8080/register',
//           { username, email, password },
//           { withCredentials: true }
//         );
//         if (response.status === 200) {
//           setMessage('Register successful');
//           console.log(response.data);
//           navigate('/login');
//         }
//       } catch (error) {
//         console.log(error);
//         setMessage(error.response.data.message);
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>{page}</h2>
//       <Box component={'form'} sx={{ m: 1 }} noValidate autoComplete="off">
//         {page === 'Register' && (
//           <TextField
//             sx={{ m: 1 }}
//             id="username"
//             type="text"
//             label="Username"
//             variant="outlined"
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         )}
//         <TextField
//           sx={{ m: 1 }}
//           id="email"
//           type="email"
//           label="Enter Email"
//           variant="outlined"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <TextField
//           sx={{ m: 1 }}
//           id="password"
//           type="password"
//           label="Enter Password"
//           variant="outlined"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </Box>
//       <Button variant="contained" onClick={loginRegister}>
//         {page}
//       </Button>
//       <div>{message}</div>
//     </div>
//   );
// };

// export default LoginRegister;
