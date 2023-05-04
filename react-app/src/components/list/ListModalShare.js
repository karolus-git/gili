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
import Badge from 'react-bootstrap/Badge';
import Select from 'react-select'

import List from './List';


export default function ListModalShare(props) {
	const authUser = useAuthUser()
    const [user, setUser] = useState(props.user)
    const [list, setList] = useState(props.list)
    const [share_friends, setShareFriends] = useState([]);


    const friendsToLabels = () => {
        var friends = authUser().user.friends
        return friends.map((friend) => (
            {
                "value" : friend,
                "label" : friend.name
            }
        ))
    }

    const addToSelectedFriends = (event) => {
        setShareFriends(event)
    }
    const shareWithFriend = async (friend, list) => {

        try {
            const response = await axios.put("http://localhost:8000/api/list/update/share?listid="+list.listid, 
            {
                userid : friend.userid,
                name : friend.name,
                email : friend.email,
            })

            if (response.data) {
                const addlistresponse = await axios.put("http://localhost:8000/api/user/update/list?userid="+friend.userid, 
                {
                    userid : list.userid,
                    hidden: false,
                })

            } else {
 
            }
        } catch (err) {
            console.error(err);
        }
      };

    const shareWithFriends = (event) => {
        event.preventDefault();
        try {
            share_friends.map((friend) => shareWithFriend(friend.value, list))
        } catch (err) {
            console.error(err);
        }
        props.onHide()
      };

    return (
            <Modal
                show={props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                    <Form
                        onSubmit={(e) => shareWithFriends(e)}>

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">

                            <p>Shared with :</p>
                            <ul>
                                {
                                    props.list.is_shared_with.map((friend) => {
                                        return <li key={"friendKey"+friend.userid}>{friend.name} | {friend.userid}</li>
                                    })
                                }
                            </ul>
                            <p>Share with a new friend</p>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                    <Select 
                        isMulti
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(e) => addToSelectedFriends(e)}
                        options={friendsToLabels(user.friends)}
                    />
                                            
                    </Modal.Body>
                    <Modal.Footer>
                        <Stack direction="horizontal" gap={2}>
                            <Button 
                                variant="outline-primary" 
                                onClick={props.onHide}>Close</Button>
                            <Button 
                                variant="primary" 
                                type="sumbit">Finish</Button>
                        </Stack>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
}