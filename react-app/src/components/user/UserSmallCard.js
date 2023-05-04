import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'

export default function UserSmallCard(props) {
    const [user, setUser] = useState(props.user)

    return (

            <Container fluid style={{padding : 20}}>
                <Row className="justify-content-end">
                    <Col xs={12} sm={4} md={4}>
                        <Image 
                            roundedCircle
                            src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" 
                            class="rounded-circle mb-3"
                            alt="Avatar" 
                            style={{width: 40, marginBottom: 10}}
                        />
                    </Col>
                </Row>

                <p style={{"fontSize":12, textAlign:'right'}} class="mb-2"><strong>{user.login.name}</strong></p>
                <p style={{"fontSize":10, textAlign:'right'}} class="text-muted">{user.login.email}</p>                   

            </Container>                
        )

}
