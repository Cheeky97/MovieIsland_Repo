import React from 'react'
import App from '../App'
import LoginForm from './LoginForm'
import SignInForm from './SignInForm'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";
import { useSelector } from "react-redux";

const RouterComponent = () => {

  const user = useSelector(state=> state.currentUser);

  return (
    <Router>
        <Routes>
          <Route path="/" element={<App/>}/>
          <Route path="/login" element={user ? <Navigate to="/"/> : <LoginForm/>}/> {/*user ? <Navigate to="/"/> : <Login/>*/}
          <Route path="/register" element={<SignInForm/>}/>
        </Routes>
      </Router>
  )
}

export default RouterComponent;
