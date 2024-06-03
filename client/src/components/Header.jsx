import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Stack, Box } from '@mui/material';
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
    <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
      <Stack spacing={2} direction="row">
        <Button component={Link} to="/">Home</Button>
        {!token && <Button component={Link} to="/login">Login</Button>}
        {!token && <Button component={Link} to="/register">Register</Button>}
        {token && <Button component={Link} to="/dashboard">Dashboard</Button>}
        {token && <Button onClick={handleLogout}>Logout</Button>}
      </Stack>
    </Box>
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
