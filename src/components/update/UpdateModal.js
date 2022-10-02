import axios from "axios";
import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import cookies from 'react-cookies';
export const UpdateModal = (props) => {
    const [msg, setMsg] = useState('');

    const handleEdit = (e) => {
        e.preventDefault();
        const url =`http://localhost:3001/task/${props.id}`;
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
      </Modal>
    </div>
  );
};
