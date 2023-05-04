import React, { useState, useEffect } from 'react';
import { useAuthUser, useSignOut } from 'react-auth-kit'
import axios from "axios"

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Spinner from 'react-bootstrap/Spinner'

import { ItemCardButtons, } from './ItemCardButtons';
import { isTakenByMe, } from './ItemUtils'

export default function ItemCard(props) {
    const [item, setItem] = useState(props.item)
    
    if (!item) {
        return <>
            <Spinner animation="border" variant="secondary" />
            <h5>Loading, please wait ...</h5>
        </>
    }

    return (
            <>
                <Col  xs={4}>
                    <Card style={{"borderRadius" : 20, "padding": 5, "marginTop": 20, "height":"157px"}}>
                        <Card.Body>
                        <Card.Title>
                        {props.item.designation}

                        </Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of the
                            card's content.
                        </Card.Text>
                        

                        <ItemCardButtons 
                            user={props.user}
                            item={props.item}
                            mine={props.mine}
                            visible={props.visible}
                        />

                        </Card.Body>
                    </Card>
                </Col>
            </>
        )
    }

