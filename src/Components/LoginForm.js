import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styledComponents from 'styled-components'
import LoginImage from '../Images/Login.jpg'
import { login } from '../Redux/apiCall'

const Container = styledComponents.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
      ),
        url(${LoginImage})
        center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styledComponents.div`
    width: 25%;
    padding: 20px;
    background-color: #141414;
`
const Title = styledComponents.h1`
    font-size: 24px;
    font-weight: 300;
    color: black;
`
const Form = styledComponents.form`
    display: flex;
    flex-direction: column;
`
const Input = styledComponents.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0px;
    padding: 10px;
`
const Button = styledComponents.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;

    &:disabled{
        color: teal;
        cursor: wait;
    }
`
const Error = styledComponents.span`
    color: red;
`
const Link = styledComponents.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`

const LoginForm = () => {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const error = useSelector(state => state.error);
     const isFetching = useSelector(state => state.isFetching);
     const dispatch = useDispatch();

     const handleClick = (e) =>{
         e.preventDefault();
         login(dispatch, {email, password});
     }

  return (
    <Container>
        <Wrapper>
            <Title>SIGN IN</Title>
            <Form>
                <Input placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                <Input placeholder="password" type="password" onChange={e => setPassword(e.target.value)}/>
                <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button> {/* onClick={handleClick} disabled={isFetching} */}
                {error && <Error>Wrong Credentials..!</Error>}
                <Link>Forgot Password?</Link>
                <Link>CREATE A NEW ACCOUNT</Link>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default LoginForm
