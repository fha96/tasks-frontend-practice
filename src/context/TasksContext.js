import { createContext, useState } from "react";
import cookies from "react-cookies";
import axios from "axios";

export const TaskContext = createContext();

export const TaskContextProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  const [role, setRole] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [capabilities, setCapabilities] = useState();

  const getTasks = () => {
    const url = `https://white-board-v2.herokuapp.com/task`;
    
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${cookies.load("token")}`,
        },
      })
      .then((resolve) => {
        setTasks((prevValue) => (prevValue = resolve.data));
        setRole((prevValue) => (prevValue = cookies.load("role")));
        setCapabilities(prevValue => prevValue = cookies.load('capabilities'));
      })
      .catch((rejected) => setErrMsg("Error while fetching data"));
  };

  const canDo = () => {
    if(capabilities.includes('delete' || 'update')) {
      return true;
    } else {
      return false;
    }
  }
  const value = {
    getTasks,
    tasks,
    setTasks,
    role,
    errMsg,
    setErrMsg,
    setRole,
    canDo
  };
  return (
    <TaskContext.Provider value={value}>{props.children}</TaskContext.Provider>
  );
};
