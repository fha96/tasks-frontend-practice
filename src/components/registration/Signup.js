import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './signup.css';

export const Signup = () => {
    const [response, setResponse] = useState('');
    const [show, setShow] = useState(false);
const handleSignUp = (e) => {
    e.preventDefault();
    const url = `https://white-board-v2.herokuapp.com/signup`;
    console.log('process',process.env.REACT_APP_EXPRESS_URL);

    let data = {
        email:e.target.formBasicEmail.value,
        userName:e.target.formBasicUserName.value,
        password:e.target.formBasicPassword.value,
        role:e.target.fromBasicSelect.value
    }
    console.log(data);

    axios.post(url,data)
    .then(resolve =>{
        setResponse(prevData => prevData=resolve.data);
        setShow(true);
       
    })
    .catch(rejected =>{
        
        setResponse(prevData => prevData=rejected.response.data);
        setShow(true);
    } );

}


  return (
    <div>
        
      <Form className="form-signup" onSubmit={handleSignUp}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUserName">
          <Form.Label>User name</Form.Label>
          <Form.Control type="text" placeholder="User Name" />
          <Form.Text className="text-muted">
            We'll never share your username with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="text" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="fromBasicSelect">
          <Form.Label>Select your role : </Form.Label>
          <Form.Select>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        
        <Form.Group className="mb-3" >
          <Form.Label>Already have an account ? <span><Link to='/signin'>Signin</Link></span></Form.Label>
        </Form.Group>
        {
            show &&

        <Form.Group className="mb-3" >
          <Form.Label  >{response} !</Form.Label>
        </Form.Group>

        }
        
      </Form>
    </div>
  );
};
