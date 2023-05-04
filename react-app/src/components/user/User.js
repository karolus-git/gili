import React, { useState, useEffect } from 'react';
import { useAuthUser, useSignOut } from 'react-auth-kit'
import axios from 'axios'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'

import UserBanner from './UserBanner';
import ListCard from '../list/ListCard';


export default function User() {
    const authUser = useAuthUser()
    const [wishLists, setWishLists] = useState([]);
    const [user, setUser] = useState(null);

    async function getWishLists(userid) {
        const response = await axios.get("http://localhost:8000/api/user/lists/all?userid="+userid);
        setWishLists(response.data);
    }

    useEffect(() => {
        if (!user){
            var user = authUser().user 
            setUser(user)
            getWishLists(user.userid);
        }
    }, []);


    if (!user) {
        return <>
            <Spinner animation="border" variant="secondary" />
            <h5>Loading, please wait ...</h5>
        </>
    }

    return (
        <>
            <UserBanner 
                user={user}
                updateList={(e) => getWishLists(user.userid)}
            />

            <div className="Container"> 
            
                <h4 class="mb-2"><strong>Lists ({wishLists.length})</strong></h4>

                 <Row>
                    {wishLists.map((wishList) => 
                    <Col xs={3} key={"colCard"+wishList.listid}>
                        <ListCard 
                            user={user}
                            list={wishList}/>
                    </Col>
                    )}
                </Row>
            </div>
        </>
    );
}