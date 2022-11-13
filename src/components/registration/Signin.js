import { Form, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import "./signup.css";
import {
  FormControl,
  FormHelperText,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";

export const Signin = () => {
  const { handleSignin, state } = useContext(LoginContext);

  return (
    <div>
      <Form onSubmit={handleSignin}>
        <VStack
          spacing="4"
          w="md"
          m="auto"
          border="solid"
          borderWidth="thin"
          p="3"
          borderRadius="lg"
          bgGradient="linear(#CBD5E0,#EDF2F7,  #E2E8F0)"
        >
          <FormControl pt="25">
            <Input
              type="text"
              placeholder="User name"
              id="formBasicUserName"
              border="solid"
              borderColor="black"
              borderWidth="thin"
            />
          </FormControl>
          <FormControl>
            <Input
              type="password"
              placeholder="Password"
              id="formBasicPassword"
              border="solid"
              borderColor="black"
              borderWidth="thin"
            />
          </FormControl>

          <FormControl>
            <Button mt={4} colorScheme="teal" type="submit">
              Sign in
            </Button>
          </FormControl>
          <FormControl className="mb-3">
            <FormHelperText>
              You don't have an Account ?{" "}
              <span>
                <Link to="/signup" style={{ textDecoration: "underline" }}>
                  Signup
                </Link>
              </span>
            </FormHelperText>
          </FormControl>

          {state.success && <Navigate to="/tasks" />}
          {state.showError && (
            <FormControl>
              <FormHelperText color="red.500">{state.errMsg} !</FormHelperText>
            </FormControl>
          )}
        </VStack>
      </Form>
      {/* <Form className="form-signup" onSubmit={handleSignin}>
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
      </Form> */}
    </div>
  );
};
