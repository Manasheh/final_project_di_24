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
        const response = await axios.get('http://localhost:8080/verify', {
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











// //it will be used to handle the authentication of the user
// import {useContext, useEffect, useState} from 'react'
// import { AuthContext } from '../App'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import LoginRegister from '../components/LoginRegister'

// const Auth = ({children}) => {
//     // get token from AuthContext
//     const {token} = useContext(AuthContext)
//     //set the redirect to false by default
//     const [redirect, setRedirect] = useState(false)

//     useEffect(() => {
//         verify()
//     }, [])

//     //verify first to access the dashboard
//     //function to verify token
//     const verify = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/verify', 
//             {
//                 headers: {
//                     'x-access-token': token?.token
//                 },
//                 withCredentials: true
//             })
//             if(response.status === 200){
//                 setRedirect(true)
//             }
//         } catch (error) {
//             setRedirect(false)
//         }
//     }
//   return redirect ? children : <LoginRegister page={'Login'}/>
// }

// export default Auth
