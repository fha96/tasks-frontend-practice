import { Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import "./signup.css";
import base64 from 'base-64';
import cookies from 'react-cookies';
import {
  FormControl,
  FormHelperText,
  Input,
  VStack,
  Button
} from "@chakra-ui/react";
// import { useContext } from "react";
// import { LoginContext } from "../../context/LoginContext";
import { useSelector, useDispatch } from 'react-redux';
import {login} from '../../features/registration';
import axios from "axios";
import { actionType } from "../../reducers/actionType";

export const Signin = () => {
  // const { handleSignin, state } = useContext(LoginContext);
  const register = useSelector(state => state.LoginReducer.value);
  const dispatch = useDispatch();
  console.log(register.success);
  const handleSignin = (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_EXPRESS_URL}/signin`;
    let data = {
      userName: e.target.formBasicUserName.value,
      password: e.target.formBasicPassword.value,
    };
    console.log(data);

    let encoded = base64.encode(data.userName + ":" + data.password);
    axios
      .post(
        url,
        {},
        {
          headers: {
            Authorization: `Basic ${encoded}`,
          },
        }
      )
      .then((resolve) => {
        cookies.save("userName", resolve.data.userName);
        cookies.save("id", resolve.data.id);
        cookies.save("role", resolve.data.role);
        cookies.save("token", resolve.data.token);
        cookies.save("capabilities", JSON.stringify(resolve.data.capabilities));
        console.log(dispatch(login({type : actionType.LOGIN_SUCCESS})));
        console.log(register.success);
     
      })
      .catch((rejected) => {
        dispatch(
          login({
          type: actionType.LOGIN_FAIL,
          payload: {
            errMsg: rejected.response.data.message,
          },
        })
        );
        console.log(register.errMsg);
      });
  };
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
          bgGradient="linear(primary.100,primary.200,primary.300)"
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
          <FormControl >
            <Button mt={4}  colorScheme="teal" type="submit">
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

          {register.success && <Navigate to="/tasks" />}
          {/* {state.success && <Navigate to="/tasks" />} */}
          {/* {state.showError && (
            <FormControl>
              <FormHelperText color="red.500">{state.errMsg} !</FormHelperText>
            </FormControl>
          )} */}
          {register.showError && (
            <FormControl>
              <FormHelperText color="red.500">{register.errMsg} !</FormHelperText>
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
