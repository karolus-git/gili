import React from 'react'
import axios from "axios"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';

export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lock_register_btn_email: true,
            email_text : "",
        }
    }

    checkExistingEmail = (event) => {
        event.preventDefault()
        console.log("searching "+ event.target.value)
        axios.get("http://localhost:8000/api/user/email",
                {
                    params : {email : event.target.value}
                }
            ).then((response) => {
                this.setState({
                    ...this.state, 
                    "lock_register_btn_email": true, 
                    "email_text" : "Email already exists"
                })
            }).catch((error) => {
                this.setState({
                    ...this.state, 
                    "lock_register_btn_email": false, 
                    "email_text" : ""
                })
            })
    }

    registerUser = (event) => {
        event.preventDefault()

        axios.post("http://localhost:8000/api/user",
            {"login" : {
                "name" : event.target.formName.value,
                "email" : event.target.formMail.value,
                "password" : event.target.formPassword.value,
            }
            }
        )
        this.props.onHide()
    }

    render (){
        return (
            <Modal
            {...this.props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Form onSubmit={(e) => this.registerUser(e)}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Register form
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formMail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                onChange={(e) => this.checkExistingEmail(e)}/>
                            <Form.Text className="text-muted">
                            {this.state.email_text}
                            </Form.Text>
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter password" />
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Stack direction="horizontal" gap={2}>
                            <Button 
                                variant="outline-primary" 
                                onClick={this.props.onHide}>Close</Button>
                            <Button 
                                variant="primary" 
                                disabled={this.state.lock_register_btn_email}
                                type="sumbit">Register</Button>
                        </Stack>
                    </Modal.Footer>
            </Form>
            </Modal>
        );
    }
}
