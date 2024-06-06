import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Home from './components/Home';
import ViewImage from './components/ViewImage'; 
import LoginRegister from './components/LoginRegister';
import { useState, createContext } from 'react';
import Auth from './auth/Auth';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';
import About from './components/About';

export const AuthContext = createContext();

function App() {
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginRegister page="Login" />} />
          <Route path="/register" element={<LoginRegister page="Register" />} />
          <Route path="/dashboard" element={<Auth><Dashboard /></Auth>} />
          <Route path="/image/:imageId" element={<ViewImage />} /> 
        </Routes>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;




// import { Routes, Route } from 'react-router-dom'
// import Dashboard from './components/Dashboard'
// import Header from './components/Header'
// import Home from './components/Home'
// import LoginRegister from './components/LoginRegister'
// import { useState, createContext } from 'react'
// import Auth from './auth/Auth'
// import './App.css'

// export const AuthContext = createContext()

// function App() {

//   const [token, setToken] = useState()

//   return (
//     <AuthContext.Provider value={{token, setToken}}>
//       <div>
//         <Header />
//         <Routes>
//           <Route path='/' element={<Home />}></Route>
//           <Route path='/login' element={<LoginRegister page = {'Login'} />}></Route>
//           <Route path='/register' element={<LoginRegister page = {'Register'} />}></Route>
//           <Route path='/dashboard' element={<Auth><Dashboard /></Auth>}></Route>
//         </Routes>
//       </div>
//     </AuthContext.Provider>
//   )
// }

// export default App
