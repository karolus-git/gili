import React, { useState, useEffect } from 'react';
import { useAuthUser, useSignOut } from 'react-auth-kit'
import axios from "axios"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';

let textSearchResult = ""

export default function FriendModalAdd(props) {
    const [ friend, setFriend] = useState(null)
    const [ lock_add_btn, setLockAddBtn] = useState(true)

    const searchFriend = async (e, email) => {
        e.preventDefault()
        try {
            const response = await axios.get("http://localhost:8000/api/user/email", 
                {params: {"email" : email}})

            if (response.data) {
                setFriend(response.data)
                setLockAddBtn(false)
            } else {
                setFriend(null)
                setLockAddBtn(true)   
            }
        } catch (err) {
            console.error(err);
        }
      };

    async function addFriend(e, user, addfriend) {
        e.preventDefault()

        var friend_conf = {
            userid : addfriend.userid,
            name : addfriend.login.name,
            email : addfriend.login.email,
        }

        const response = await axios.put("http://localhost:8000/api/user/update/friend?userid="+user.userid, 
            friend_conf
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
                    <Form onSubmit={(e) => addFriend(e, props.user, friend)}>

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add a friend
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            
                            <Col xs={2}>
                                <Form.Label>Friend's email</Form.Label>
                            </Col>
                            <Col>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Enter email"
                                    name="formEMail"
                                    onChange={(e) => searchFriend(e, e.target.value)}
                                />
                                <Form.Text className="text-muted">
                                    {textSearchResult}
                                </Form.Text>
                            </Col>
                            
                        </Form.Group>
                        </Modal.Body>
                    <Modal.Footer>
                        
                        <Stack direction="horizontal" gap={2}>
                            <Button 
                                variant="outline-primary" 
                                onClick={props.onHide}>Close</Button>
                            <Button 
                                variant="primary" 
                                disabled={lock_add_btn}
                                type="submit">Add friend</Button>
                        </Stack>
                    </Modal.Footer>    
                                                
                    </Form>
            </Modal>
        )
}