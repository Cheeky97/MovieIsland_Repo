import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import '../App.css';
import { logoutUser } from '../Redux/userRedux';

const Logout = () => {
    const user = useSelector(state=> state.currentUser);
    const dispatch = useDispatch();

    const SignOutUser = () => {
        dispatch(logoutUser(user));
    }

  return (
    <div>
      <Link to={'/'}  className='SignIn' onClick={SignOutUser}>Logout</Link>
    </div>
  )
}

export default Logout
