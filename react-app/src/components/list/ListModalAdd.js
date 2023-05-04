import React, { useState, useEffect } from 'react';
import { useAuthUser, useSignOut } from 'react-auth-kit'
import axios from "axios"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

const createDate = (days_shift) => {
    var result = new Date();
    result.setDate(result.getDate() + days_shift);
    return result;
}

export default function ListModalAdd(props) {
    const [startDate, setStartDate] = useState(createDate(60))

    const addList = async (event) => {
        event.preventDefault();

        var date = new Date(event.target.formDate.value)
        date.setHours(12)
        date.setSeconds(12)
        date.setMinutes(12)

        await axios.post("http://localhost:8000/api/list",
            {
                "userid" : props.user.userid,
                "designation" : event.target.formName.value,
                "expiration_date" : date
            }
        )
        props.onHide()
    }

    return (
        <Modal
            show={props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Form onSubmit={(e) => addList(e)}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add a new wish list
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="text"
                            defaultValue="New list"
                            placeholder="Enter name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control 
                            type="date" 
                            defaultValue= {startDate.toISOString().substring(0,10)}
                            placeholder="Enter a date" />
                    </Form.Group>
                    
                        
                </Modal.Body>
                <Modal.Footer>
                    <Stack direction="horizontal" gap={2}>
                        <Button 
                            variant="outline-primary" 
                            onClick={props.onHide}>Close</Button>
                        <Button 
                            variant="primary" 
                            type="submit">Add list</Button>
                    </Stack>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
