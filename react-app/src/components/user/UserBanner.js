import React, { useState, useEffect } from 'react';
import { useAuthUser, useSignOut } from 'react-auth-kit'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';

import ListModalAdd from '../list/ListModalAdd';
import FriendModelAdd from '../friend/FriendModelAdd';

export default function UserBanner(props) {
    const signOut = useSignOut()
    const [listAddShow, setListAddShow] = useState(false);
    const [friendAddShow, setFriendAddShow] = useState(false);

    const handleCloseModalList = () => {
        setListAddShow(false)
        props.updateList()
      };

    return (
        <>
            <Navbar className="UserBanner">
                <Container fluid className="UserBanner">
                    <Navbar.Brand 
                        href="/user">
                        <Image 
                            roundedCircle
                            src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" 
                            class="rounded-circle mb-3" 
                            style={{
                                width: 70,
                                marginRight : 20
                            }}
                            alt="Avatar" 
                        />
                        <Row>
                        </Row>
                    </Navbar.Brand>
                    
                    <Navbar.Collapse id="navbarScroll">
                                    
                        <Navbar.Text >
                            <p style={{"fontSize":20, textAlign:'left'}} class="mb-2"><strong>{props.user.login.name}</strong></p>
                            <p style={{"fontSize":12, textAlign:'left'}} class="text-muted">{props.user.login.email}</p>
                        </Navbar.Text>
                        <Nav className="me-auto" style={{marginLeft : 100}}>
                            <Stack direction="horizontal" gap={2}>
                                <Button 
                                    variant="outline-primary"
                                    onClick={(e) => setListAddShow(e)}>
                                    Create a new list
                                </Button>
                                <Button 
                                    variant="outline-primary"
                                    onClick={(e) => setFriendAddShow(e)}>
                                    Add a new friend
                                </Button>

                                
                            </Stack>
                        </Nav>                   
                    
                        <Stack direction="horizontal" gap={2}>
                            <Button variant="outline-secondary" href="/user/settings">
                                        <i class="fa fa-sliders" style={{fontSize: 15}}></i>
                            </Button>
                            <Button
                                variant="outline-warning"
                                onClick={()=>signOut()}
                            >
                                Logout
                            </Button>
                        </Stack>
                    </Navbar.Collapse>

                </Container>  
            </Navbar> 
        
            <ListModalAdd 
                show={listAddShow}
                onHide={() => handleCloseModalList()}
                user={props.user}
            />

            <FriendModelAdd 
                show={friendAddShow}
                onHide={() => setFriendAddShow(false)}
                user={props.user}
            />

        </>

    )

}
