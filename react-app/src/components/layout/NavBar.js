import React, { useState } from 'react';
import { useSignOut, useIsAuthenticated } from 'react-auth-kit'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Stack from 'react-bootstrap/Stack';

export default function App() {
    const signOut = useSignOut()
    const isAuthenticated = useIsAuthenticated()

    return (
        <Navbar fixed="top" bg="light" expand="lg">
        <Container fluid>
            <Navbar.Brand href="#">GiLi</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
                <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                    Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                    Something else here
                </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#" disabled>
                Link
                </Nav.Link>
            </Nav>

            <Stack direction="horizontal" gap={2}>
                <Form className="d-flex">
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>


                {isAuthenticated()?
                    <Button 
                        variant="outline-primary"
                        onClick={() => signOut()}>
                        Logout
                    </Button> : ""
                }
                
            </Stack>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}