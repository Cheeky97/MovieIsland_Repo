import React from 'react'
import {Link} from 'react-router-dom'
import '../App.css';

const SignIn = () => {
  return (
    <div>
      <Link to={'/register'}  className='SignIn'>SignIn</Link>
    </div>
  )
}

export default SignIn
