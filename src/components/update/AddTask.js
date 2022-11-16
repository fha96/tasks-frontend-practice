import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Form } from "react-bootstrap";
import cookies from "react-cookies";
import { Tasks } from "../main/Tasks";
import { TaskContext } from "../../context/TasksContext";
import { FormControl, Input, VStack, Button } from "@chakra-ui/react";

export const AddTask = () => {
  const { errMsg, getTasks, setErrMsg, setTasks, tasks } =
    useContext(TaskContext);
  const [token, setToken] = useState(cookies.load("token"));

  const handleLogout = () => {
    cookies.remove("token");
    cookies.remove("id");
    cookies.remove("userName");
    cookies.remove("role");
    cookies.remove("capabilities");
    setToken(cookies.load("token"));
  };

  const handleDelete = (id) => {
    const url = `${process.env.REACT_APP_EXPRESS_URL}/task/${id}`;
    const url2 = `${process.env.REACT_APP_EXPRESS_URL}/task`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${cookies.load("token")}`,
        },
      })
      .then((resolve) => {
        alert(resolve.data);
        axios
          .get(url2, {
            headers: {
              Authorization: `Bearer ${cookies.load("token")}`,
            },
          })
          .then((resolve) => setTasks(resolve.data))
          .catch((rejected) => setErrMsg("Error while fetching data"));
      })
      .catch((rejected) => alert(rejected.response.data));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_EXPRESS_URL}/task`;
    let data = {
      title: e.target.formBasicTitle.value,
      description: e.target.formBasicDescription.value,
    };
    axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${cookies.load("token")}`,
        },
      })
      .then((resolve) => {
        axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${cookies.load("token")}`,
            },
          })
          .then((resolve) => setTasks(resolve.data))
          .catch((rejected) => setErrMsg("Error while fetching data"));
      })
      .catch((rejected) => alert(rejected.response.data));
  };

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
  
      <div>
        {token && (
          <div>
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              float='right'
              onClick={handleLogout}
              textStyle = 'h1.letterSpacing'
            >
              Logout
            </Button>

            <Form onSubmit={handleAdd}>
              <VStack
                spacing="4"
                w="md"
                m="auto"
                border="solid"
                borderWidth="thin"
                p="3"
                borderRadius="lg"
                bgGradient="linear(secondery.100,secondery.300)"
              >
                <FormControl pt="25">
                  <Input
                    type="text"
                    placeholder="Title"
                    id="formBasicTitle"
                    border="solid"
                    borderColor="black"
                    borderWidth="thin"
                  />
                </FormControl>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Description"
                    id="formBasicDescription"
                    border="solid"
                    borderColor="black"
                    borderWidth="thin"
                    
                  />
                </FormControl>

                <FormControl>
                  <Button mt={4} colorScheme="teal" type="submit">
                    Add Task
                  </Button>
                </FormControl>
              </VStack>
            </Form>
            <Tasks tasks={tasks} handleDelete={handleDelete} />
            {errMsg && <h2>{errMsg}</h2>}
          </div>
        )}
        {!cookies.load("token") && (
          <h4 data-testid="task">
            Token Expired !!
            <br /> Signin again{" "}
          </h4>
        )}
      </div>
  );
};
