import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import cookies from 'react-cookies';
import { Tasks } from "../main/Tasks";

export const AddTask = () => {
  const [tasks, setTasks] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [token, setToken] = useState(cookies.load('token'));
  const [role, setRole] = useState('');

  const handleLogout = () => {
    cookies.remove('token');
    cookies.remove('id');
    cookies.remove('userName');
    cookies.remove('role');
    setToken(cookies.load('token'));
  }
  
  const handleDelete = (id) => {
    const url = `${process.env.REACT_APP_API}/task/${id}`;
    const url2 = `${process.env.REACT_APP_API}/task`;
    axios.delete(url,{
        headers: {
            Authorization: `Bearer ${cookies.load('token')}`
        }
    })
    .then(resolve =>{
        alert(resolve.data);
        axios.get(url2,{
          headers:{
              Authorization: `Bearer ${cookies.load('token')}`
          }
      }).then(resolve => setTasks(resolve.data))
      .catch(rejected => setErrMsg("Error while fetching data"));
    })
    .catch(rejected => alert(rejected.response.data));

  };


  const handleAdd = (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API}/task`;
    let data = {
        title:e.target.formBasicTitle.value,
        description: e.target.formBasicDescription.value
    }
    axios.post(url,data,{
        headers: {
            Authorization: `Bearer ${cookies.load('token')}`
        }
    })
    .then(resolve =>{
        axios.get(url,{
            headers:{
                Authorization: `Bearer ${cookies.load('token')}`
            }
        }).then(resolve => setTasks(resolve.data))
        .catch(rejected => setErrMsg("Error while fetching data"));
    })
    .catch(rejected => alert(rejected.response.data));
  };

  useEffect(() => {
    const url = `${process.env.REACT_APP_API}/task`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${cookies.load("token")}`,
        },
      })
      .then((resolve) => {
        console.log(resolve.data);
        setTasks((prevValue) => (prevValue = resolve.data));
        setRole(prevValue=> prevValue = cookies.load('role'));
      })
      .catch((rejected) => setErrMsg("Error while fetching data"));
  }, []);
  return (
    <div >
        {
            token&&
            <div >
                <button style={{float:'left', margin: '-25px 0px 0px 25px'}} onClick={handleLogout}>Logout</button>
      <Form className="form-signup" onSubmit={handleAdd}>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Tilte" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Description" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Task
        </Button>
      </Form>
      <Tasks tasks={tasks} role={role} handleDelete={handleDelete}/>
      {
        errMsg && 
        <h2>{errMsg}</h2>
      }
      </div>
        }
        {
            !cookies.load('token') &&
            <h4 data-testid='task'>Token Expired !!<br/> Signin again </h4>
        }
    </div>
  );
};
