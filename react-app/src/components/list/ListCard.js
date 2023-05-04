import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useAuthUser, useSignOut } from 'react-auth-kit'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'
import Badge from 'react-bootstrap/Badge'

import UserSmallCard from '../user/UserSmallCard';
import ListHide from './ListHide';
import {badgeListTime, badgeListShared} from './ListUtils';
import { ListCardButtons } from './ListCardButtons';

export default function ListCard(props) {
    const [user, setUser] = useState(props.user)
    const [listuser, setListUser] = useState(null)
    const [list, setList] = useState(props.list)
    const [hide, setHide] = useState(false)

    async function getListUser(listuserid) {
        const response = await axios.get("http://localhost:8000/api/user?userid="+listuserid);
        setListUser(response.data);
    }

    useEffect(() => {
        getListUser(props.list.userid)
    }, [])

    if (!listuser) {
        return <>
            <Spinner animation="border" variant="secondary" />
            <h5>Loading, please wait ...</h5>
        </>
    }

    return (        

            <Card style={{"borderRadius" : 20, "padding": 5, "marginTop": 20, "height":"207px"}}>
                <Card.Body>
                    <Card.Title>
                        <Row style={{"height" : "110px"}}>
                            <Col xs={7}>

                                <h4 >{list.designation} 
                                    <ListHide 
                                        status={hide} 
                                        user={user} 
                                        list={list}
                                    /> 
                                </h4>                                

                                <h6>
                                    {badgeListTime(list)}
                                    {badgeListShared(list)}
                                    
                                </h6>
                                
                            </Col>
                            <Col xs={5}>
                                <UserSmallCard 
                                    user={listuser}
                                />
                            </Col>
                        </Row>
                        
                    </Card.Title>
                </Card.Body>
                <ListCardButtons list={list}/>
            </Card>

    )
}