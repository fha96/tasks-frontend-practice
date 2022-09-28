import { Form, Button } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import './signup.css';
import base64 from 'base-64';
import axios from 'axios';
import cookies from 'react-cookies';
import { useState } from 'react';

export const Signin = () => {

    const [errMsg, setErrMsg] = useState('');
    const [showError, setShowError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSignin = (e) => {
    e.preventDefault();
    const url = `http://localhost:3001/signin`;
    let data = {
        userName:e.target.formBasicUserName.value,
        password:e.target.formBasicPassword.value
    }
    console.log(data);
    let encoded = base64.encode(data.userName+':'+data.password);
    axios.post(url, {}, {
        headers:{
            Authorization: `Basic ${encoded}`
        }
    }).then(resolve => {
        cookies.save('userName',resolve.data.userName);
        cookies.save('id',resolve.data.id);
        cookies.save('role',resolve.data.role);
        cookies.save('token',resolve.data.token);
        setShowError(false);
        setSuccess(true);
        
    })
    .catch(rejected => {
        setShowError(true);
        setErrMsg(rejected.response.data.message);
    });
    }

   return (
    <div>
                
      <Form className="form-signup" onSubmit={handleSignin}>
        <Form.Group className="mb-3" controlId="formBasicUserName">
          <Form.Label>User name</Form.Label>
          <Form.Control type="text" placeholder="User Name" />
          <Form.Text className="text-muted">
            We'll never share your username with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
  
        <Button variant="primary" type="submit">
          Submit
        </Button>
        
        <Form.Group className="mb-3" >
          <Form.Label>You don't have an Account ? <span><Link to='/signup'>Signup</Link></span></Form.Label>
        </Form.Group>
        
        {
            success &&
            <Navigate to='/tasks' />
        }
        
        {
            showError &&
            
        <Form.Group className="mb-3" >
          <Form.Label>{errMsg} !</Form.Label>
        </Form.Group>
        }
      </Form>
    </div>
  )
}
