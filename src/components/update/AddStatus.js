import axios from 'axios';
import React, { useContext, useState } from 'react'
import cookies from 'react-cookies';
import { TaskContext } from "../../context/TasksContext";
import { Button, FormControl, HStack, Input, VStack } from "@chakra-ui/react";
import { Form } from 'react-bootstrap';


export const AddStatus = (props) => {
    const {getTasks} = useContext(TaskContext);

    const [msg, setMsg] = useState('');
    

    const handleAddStatus = (e) => {

        e.preventDefault();
        const url = `${process.env.REACT_APP_EXPRESS_URL}/status/${props.id}/${cookies.load('id')}`;
       let data = {
            description:e.target.status.value,
            name: cookies.load('userName')
        }
        axios.post(url,data,{
            headers:{
                Authorization: `Bearer ${cookies.load('token')}`
            }
        }).then(resolve => {
          setMsg('added');
            getTasks();
        } ).catch(rejected => alert(rejected.response.data));
    }


  return (
    <div>
        <Form onSubmit={handleAddStatus} w='sm'>
              <HStack
                spacing="0"
                w="esm"
                m="auto"
                border="solid"
                borderWidth="thin"
                p="1"
                borderRadius="lg"
                bgGradient="linear(#EDF2F7,#E2E8F0, #CBD5E0)"
                borderBottom='solid black'
              >
                <FormControl >
                  <Input
                    type="text"
                    p='1'
                    placeholder="Status"
                    id="status"
                    border="solid"
                    borderColor="black"
                    borderWidth="thin"
                  />
                </FormControl>

                <FormControl>
                  <Button colorScheme="teal" type="submit">
                    Add
                  </Button>
                </FormControl>
              </HStack>
            </Form>
        {
            msg&&
            <span>{msg}</span>
        }
      
    </div>
  )
}
