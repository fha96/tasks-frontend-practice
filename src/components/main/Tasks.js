import { useContext, useState } from "react";

import { AddStatus } from "../update/AddStatus";
import { UpdateModal } from "../update/UpdateModal";
import { TaskContext } from "../../context/TasksContext";
import {
  Table,
  Thead,
  Tbody,
  Button,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
export const Tasks = (props) => {
  const { getTasks, canDo } = useContext(TaskContext);
  const [show, setShow] = useState(false);

  const handleShowModal = () => {
    setShow(true);
  };

  return (
  
      <TableContainer
         m="auto"
         border="solid"
         borderWidth="thin"
         p="3"
         borderRadius="lg"
         bgGradient="linear(#EDF2F7,#E2E8F0, #CBD5E0)"
         striped="columns"
        cellSpacing='5'
        w='-webkit-max-content'
        borderColor='secondery.200'
      >
      <Table
        
      >
        <Thead>
          <Tr  borderBottom='solid black'>
   
            <Th>#</Th>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Status</Th>
            {props.role === "admin" && <Th>Admin</Th>}

          </Tr >

        </Thead>
        <Tbody>
          {props.tasks.map((item, idx) => {
            return (
              <Tr key={idx}  borderBottom='solid black'>
    

                <Td w='esm'>{item.id}</Td>
     
                <Td w='esm'>{item.title}</Td>
  
                <Td w='esm'>{item.description}</Td>
                <Td w='esm'>
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>
                          {" "}
                          <Td>
                            <AddStatus id={item.id} tasks={props.tasks} />
                          </Td>{" "}
                        </Th>
                      </Tr>
                      <Tr>
                        <Th>name</Th>
                        <Th>Descrip.</Th>
                      </Tr>
             
                    </Thead>
                    <Tbody>
                      {item.statuses &&
                        item.statuses.map((item, idx) => {
                          return (
                            <Tr key={idx}>
                              <Td>{item.name}</Td>
                              <Td>{item.description}</Td>
                            </Tr>
                          );
                        })}
                    </Tbody>
                  </Table>
                </Td>
     
                {canDo() && (
                  <Td>
                    <Button colorScheme="red" onClick={() => props.handleDelete(item.id)}>
                      Delete
                    </Button>
                    <br />
                    <br />
                    <br />
                    <Button colorScheme="blue" onClick={handleShowModal}>Edit</Button>
                    {show && (
                      <UpdateModal
                        show={show}
                        handleClose={() => {
                          setShow(false);
                          getTasks();
                        }}
                        id={item.id}
                      />
                    )}
                  </Td>
                )}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      </TableContainer>
   
  );
};
