import axios from "axios";
import React, { useState } from "react";
import {  Form, Button } from "react-bootstrap";
import cookies from 'react-cookies';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
export const UpdateModal = (props) => {
    const [msg, setMsg] = useState('');

    const handleEdit = (e) => {
        e.preventDefault();
        console.log(props.id);
        const url =`${process.env.REACT_APP_EXPRESS_URL}/task/${props.id}`;
        const newData = {
            title:e.target.formBasicTitle.value,
            description:e.target.formBasicDescription.value
        }
        console.log(newData);
        axios.put(url, newData, {
            headers:{
                Authorization: `Bearer ${cookies.load('token')}`
            }
        }).then(resolve => setMsg(resolve.data))
        .catch(rejected => setMsg(rejected.data.response.message));
    }
  return (
    <div>
      <Modal
        // initialFocusRef={props.show}
        // finalFocusRef={finalRef}
        isOpen={props.show}
        onClose={props.handleClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <Form onSubmit={handleEdit}>
            <Form.Group className="mb-4" controlId="formBasicTitle">
              <Form.Label>Title of the task</Form.Label>
              <Form.Control type="text" placeholder="Enter the title" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter the description" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          </ModalBody>

          <ModalFooter>
          { msg &&
            <p>{msg}</p>
            }
            
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* ////////////////////////////////////////// */}
      {/* <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEdit}>
            <Form.Group className="mb-4" controlId="formBasicTitle">
              <Form.Label>Title of the task</Form.Label>
              <Form.Control type="text" placeholder="Enter the title" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter the description" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
            { msg &&
            <p>{msg}</p>
            }
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};
