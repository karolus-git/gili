import React from 'react'
import axios from "axios"
import {useIsAuthenticated, useSignIn} from 'react-auth-kit'
import {useNavigate, Navigate} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button'

const Login = (props) => {
  const isAuthenticated = useIsAuthenticated()
  const signIn = useSignIn()
  const navigate = useNavigate()

  const loginHandler = async (event) => {
    event.preventDefault()

    let email = event.target.formEmail.value
    let password = event.target.formPassword.value

    // Assuming that, all network Request is successfull, and the user is authenticated
    let response = await axios.get("http://localhost:8000/api/user/login?email="+email+"&password="+password)
    
    if (response.data) {
      if (signIn({
        token: '35v3443bn368367n306306wbn407qn420b436b4', //Just a random token
        tokenType: 'Bearer',    // Token type set as Bearer
        authState: {user : response.data},   // Dummy auth user state
        expiresIn: 60  // Token Expriration time, in minutes
      })) {
        // If Login Successfull, then Redirect the user to secure route
        navigate('/user')
      } else {
        // Else, there must be some error. So, throw an error
        alert("Error Occured. Try Again")
      }
    } else {
      // bas response
      alert("Bad loggin. Try Again")
    }
  }

  if (isAuthenticated()) {
    return (
      <Navigate to={'/secure'} replace/>
    )
  } else {
    return (
      
      <Modal
        {...props}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
      >
        <Form onSubmit={(e) => loginHandler(e)}>

          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Login
            </Modal.Title>
          </Modal.Header>
          
          <Modal.Body>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter password" />
                        </Form.Group>

          </Modal.Body>             
          <Modal.Footer>
                        <Stack direction="horizontal" gap={2}>
                            <Button 
                                variant="outline-primary" 
                                onClick={props.onHide}>Close</Button>
                            <Button 
                                variant="primary" 
                                type="sumbit">Log in</Button>
                        </Stack>
            </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}

export default Login