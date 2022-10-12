import { createContext, useReducer } from "react";
import cookies from "react-cookies";
import axios from "axios";
import base64 from "base-64";
import { loginReducer } from "../reducers/LoginReducers";
import { initialState } from "../config/initials";
import { actionType } from "../reducers/actionType";

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
  
  const [state, dispatch] = useReducer(loginReducer, initialState);

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
        console.log(
          ">>>>>>>>>>>>>>>>>",
          JSON.stringify(resolve.data.capabilities)
        );
        cookies.save("userName", resolve.data.userName);
        cookies.save("id", resolve.data.id);
        cookies.save("role", resolve.data.role);
        cookies.save("token", resolve.data.token);
        cookies.save("capabilities", JSON.stringify(resolve.data.capabilities));
    
        dispatch({ type: actionType.LOGIN_SUCCESS });
      })
      .catch((rejected) => {

        dispatch({
          type: actionType.LOGIN_FAIL,
          payload: {
            errMsg: rejected.response.data.message,
          },
        });
      });
  };

  const value = {
    state,
    handleSignin,
  };
  return (
    <LoginContext.Provider value={value}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
