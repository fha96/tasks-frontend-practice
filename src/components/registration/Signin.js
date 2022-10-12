import { Form, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import "./signup.css";

import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";

export const Signin = () => {
  const { handleSignin, state } = useContext(LoginContext);

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

        <Button data-testid='test' id='signin' variant="primary" type="submit">
          Submit
        </Button>

        <Form.Group className="mb-3">
          <Form.Label>
            You don't have an Account ?{" "}
            <span>
              <Link to="/signup">Signup</Link>
            </span>
          </Form.Label>
        </Form.Group>

        {state.success && <Navigate to="/tasks" />}

        {state.showError && (
          <Form.Group className="mb-3">
            <Form.Label>{state.errMsg} !</Form.Label>
          </Form.Group>
        )}
      </Form>
    </div>
  );
};
