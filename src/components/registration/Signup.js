import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./signup.css";
import {
  FormControl,
  FormHelperText,
  Input,
  VStack,
  Select,
  Alert,
  AlertIcon,
  Button
} from "@chakra-ui/react";
export const Signup = () => {
  const [response, setResponse] = useState("");
  const [show, setShow] = useState(false);
  const [showE, setShowE] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    setShowE(false);
    setShow(false);
    const url = `${process.env.REACT_APP_EXPRESS_URL}/signup`;
    console.log("process", process.env.REACT_APP_EXPRESS_URL);

    let data = {
      email: e.target.formBasicEmail.value,
      userName: e.target.formBasicUserName.value,
      password: e.target.formBasicPassword.value,
      role: e.target.fromBasicSelect.value,
    };
    console.log(data);

    axios
      .post(url, data)
      .then((resolve) => {
        setResponse((prevData) => (prevData = resolve.data));
        setShow(true);
      })
      .catch((rejected) => {
        setResponse((prevData) => (prevData = rejected.response.data));
        setShowE(true);
      });
  };

  return (
    <div>
      <Form onSubmit={handleSignUp}>
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
          <FormControl>
            <Input type="email" placeholder="Email" id="formBasicEmail" border="solid"
              borderColor="black"
              borderWidth="thin"/>
          </FormControl>
          <FormControl>
            <FormHelperText>We'll never share your email.</FormHelperText>
            <Input type="text" placeholder="User name" id="formBasicUserName" border="solid"
              borderColor="black"
              borderWidth="thin"/>
          </FormControl>
          <FormControl>
            <Input type="text" placeholder="Password" id="formBasicPassword" border="solid"
              borderColor="black"
              borderWidth="thin"/>
          </FormControl>
          <FormControl>
            <FormHelperText>Please Select your role.</FormHelperText>
            <Select
              border="solid"
              borderColor="black"
              borderWidth="thin"
              id="fromBasicSelect"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Select>
          </FormControl>
          <FormControl>
            <Button mt={4} colorScheme="teal" type="submit">
              Sign up
            </Button>
          </FormControl>
          <FormControl className="mb-3">
            <FormHelperText>
              Already have an account ?{" "}
              <span>
                <Link to="/signin" style={{ textDecoration: "underline" }}>
                  Signin
                </Link>
              </span>
            </FormHelperText>
          </FormControl>
          {showE && (
            <Alert status="error">
              <AlertIcon />
              {response} !
            </Alert>
          )}
          {show && (
            <Alert status="success">
              <AlertIcon />
              {response} !
            </Alert>
          )}
        </VStack>
      </Form>
    </div>
  );
};
