import React from 'react'
import axios from "axios"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';


export default function ItemModalAdd(props) {

    const addItem = (event) => {
        event.preventDefault();

        axios.post("http://localhost:8000/api/item",
                {
                        "listid" : props.list.listid,
                        "designation" : event.target.formName.value
                }
            )
        props.onHide()
    }

    return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                    <Form onSubmit={(e) => addItem(e)}>

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add an item
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter name" />
                        </Form.Group>
                            
                    </Modal.Body>
                    <Modal.Footer>
                        <Stack direction="horizontal" gap={2}>
                            <Button 
                                variant="outline-primary" 
                                onClick={props.onHide}>Close</Button>
                            <Button 
                                variant="primary" 
                                type="sumbit">Add item</Button>
                        </Stack>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
}