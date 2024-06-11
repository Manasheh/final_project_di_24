import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginRegister from '../components/LoginRegister';

const Auth = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);
  const [userId, setUserId] = useState(null);  //latest change
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {

        // was localhost://5173/verify before
        const response = await axios.get('https://final-project-di-24.onrender.com/verify', {
          headers: {
            'x-access-token': token
          },
          withCredentials: true
        });
        if (response.status === 200) {
          const { userId } = response.data;  //latest change 
          setUserId(userId);  //latest change
          setRedirect(true);
        }
      } catch (error) {
        console.log({message: 'Error from client auth'});
        setRedirect(false);
        navigate('/login');
      }
    };

    if (token) {
      verify();
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  return redirect ? children : <LoginRegister page="Login" />;
};

export default Auth;











