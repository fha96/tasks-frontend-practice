import { createContext, useState } from "react";
import cookies from "react-cookies";
import axios from "axios";
import base64 from "base-64";

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
  const [errMsg, setErrMsg] = useState("");
  const [showError, setShowError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignin = (e) => {
    e.preventDefault();
    const url = `https://white-board-v2.herokuapp.com/signin`;
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
        setShowError(false);
        setSuccess(true);
      })
      .catch((rejected) => {
        setShowError(true);
        setErrMsg(rejected.response.data.message);
      });
  };

  const value = {
    errMsg,
    setErrMsg,
    showError,
    setShowError,
    success,
    setSuccess,
    handleSignin
  };
  return <LoginContext.Provider value={value}>
    {props.children}
  </LoginContext.Provider>;
};

export default LoginContextProvider;