import React, { useState, useEffect } from 'react'
import styledComponents from 'styled-components'
import RegisterImage from '../Images/Register.jpg';
import { newUserRegister } from '../Redux/apiCall';

const Container = styledComponents.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
      ),
        url("${RegisterImage}")
        center;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styledComponents.div`
    width: 40%;
    padding: 20px;
    background-color: #141414;
    border-radius: 12px;
`
const Title = styledComponents.h1`
    font-size: 24px;
    font-weight: 500;
    color: black;
`
const Form = styledComponents.form`

`
const Input = styledComponents.input`
    flex: 2;
    min-width: 40%;
    margin: 10px 10px 10px 0px;
    padding: 10px;
    border-radius: 11px;
`
const Agreement = styledComponents.span`
    font-size: 11px;
    display: block;
    margin: 10px 5px 10px 20px;
    color: #f9d3b4;
`
const Button = styledComponents.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: #f9d3b4;
    color: #141414;;
    cursor: pointer;
    margin: 15px 5px 0px 260px;
    border-radius: 11px;
`
const Label = styledComponents.label`
    color: #f9d3b4;
    margin: 0px 10px 0px 20px;
    padding: 20px;
    flex: 1;
`
const Error = styledComponents.span`
    margin: 0px 0px 0px 270px;
    color: #f9d3b4;
`

const SignInForm = () => {

    const initialValues = {firstName: "", lastName: "", email: "", password: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [user, setUser] = useState({});
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        if(Object.keys(formErrors).length === 0){
            setIsSubmit(true);
        }
    }

    useEffect(()=>{
        if(Object.keys(formErrors).length === 0 && isSubmit){
            const result = newUserRegister(formValues);
            setFormValues(initialValues);
            console.log(result);
        }else{
            setIsSubmit(false);
        }
        
    },[isSubmit])

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!values.firstName){
            errors.firstName = "FirstName is required!";
        }

        if(!values.lastName){
            errors.lastName = "LastName is required!";
        }

        if(!values.email){
            errors.email = "Email is required!";
        }else if(!regex.test(values.email)){
            errors.email = "This is not a valid email format!";
        }

        if(!values.password){
            errors.password = "Password is required!";
        }else if(values.password.length < 8){
            errors.password = "Password must be atleast 8 characters";
        } else if(values.password.length > 14) {
            errors.password = "Password cannot exceed more than 14 characters";
        }

        return errors;
    }

  return (
    <Container>
        <Wrapper>
            <Title>CREATE A NEW ACCOUNT</Title>
            <Form onSubmit={handleSubmit}>
                <div className='register'>
                    <Label>FirstName</Label>
                    <Input name='firstName' placeholder="First Name" value={formValues.firstName} onChange={handleChange} />
                </div>
                {formErrors && <Error>{formErrors.firstName}</Error>}
                <div className='register'>
                    <Label>LastName</Label>
                    <Input name='lastName' placeholder="Last Name" value={formValues.lastName} onChange={handleChange} />
                </div>
                {formErrors && <Error>{formErrors.lastName}</Error>}
                <div className='register'>
                    <Label>Email</Label> 
                    <Input name='email' placeholder="email" value={formValues.email} onChange={handleChange} />
                </div>
                {formErrors && <Error>{formErrors.email}</Error>}
                <div className='register'>
                    <Label>Password</Label>
                    <Input name='password' type='password' placeholder="password" value={formValues.password} onChange={handleChange} />
                </div>
                {formErrors && <Error>{formErrors.password}</Error>}
                <Agreement>
                    By creating an account, I consent to the processing of my personal
                    data in accordance with the <b>PRIVACY POLICY</b>
                </Agreement>
                <Button>CREATE</Button>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default SignInForm
