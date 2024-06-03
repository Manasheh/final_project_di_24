import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
 import { AuthContext } from '../App'
const Home = () => {

  // const [users, setUsers] = useState([])

  // const {token} = useContext(AuthContext)

  // useEffect(() => { 
  //   getUsers()
  // }, [])

  // const getUsers = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8080/all', 
  //     {
  //       headers: {
  //         'x-access-token': token?.token
  //       },
  //     withCredentials: true
  //   })
  //     setUsers(response.data)
  //     // console.log(users);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error.response.data.message);
  //   }
  // }
  return (
    <div>
      <h2>HOME</h2>
      {/* {console.log(users)}
      {
        users.map(user => {
          return <div key={user.id}>{user.id} {user.email}</div>
        })
      } */}
    </div>
  )
}

export default Home
