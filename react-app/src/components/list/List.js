import React, { useState, useEffect } from 'react';
import { useAuthUser, useSignOut } from 'react-auth-kit'
import { useParams } from 'react-router-dom'
import axios from "axios";

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'
import Stack from 'react-bootstrap/Stack'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'

import ListModalShare from './ListModalShare'
import UserBanner from '../user/UserBanner';
import ItemModalAdd from '../item/ItemModelAdd';
import ItemCard from '../item/ItemCard';
import UserSmallCard from '../user/UserSmallCard';
import {isMyList, isShared, badgeListTime, badgeListShared} from './ListUtils'
import {ListButtons} from './ListButtons'

export default function List(props) {
    const authUser = useAuthUser()
    const params = useParams()
    const [list, setList] = useState(null)
    const [items, setItems] = useState([])
    const [user, setUser] = useState(null)
    const [listuser, setListUser] = useState(null)
    const [show_modal_item_add, setShowModalItemAdd] = useState(false)
    const [show_modal_list_share, setShowModalListShare] = useState(false)


    async function getList(listid) {
        const response = await axios.get("http://localhost:8000/api/list?listid="+listid);
        setList(response.data);
        return response.data
    }

    async function getItems(listid) {
        const response = await axios.get("http://localhost:8000/api/items?listid="+listid);
        setItems(response.data);
        return response.data
    }

    async function getListUser(listuserid) {
        const response = await axios.get("http://localhost:8000/api/user?userid="+listuserid);
        setListUser(response.data);
        return response.data
    }

    useEffect(() => {
        if (!user || !listuser) {
            let {listid} = params

            getList(listid)
            .then((list) => {
                getListUser(list.userid)})
            .then(() => {setUser(authUser().user)})
            .then(() => {getItems(listid)})
        }

    }, [user, listuser])

    if (!user || !listuser) {
        return  <>
                    <Spinner animation="border" variant="secondary" />
                    <h5>Loading, please wait ...</h5>
                </>
    }

    return (
        <>
            <UserBanner user={user}/>
        
            <div className="Container">          

                <Row>
                    <Col xs={9}>

                        <h2 class="mb-2">
                            <strong>{list.designation}</strong>
                            {badgeListTime(list)}
                            {badgeListShared(list)}
                        </h2>

                        <ListButtons 
                            mine={isMyList(user, listuser)} 
                            shared={isShared(list)}
                            listid={list.listid}
                            clickAdd={setShowModalItemAdd}
                            clickShare={setShowModalListShare}
                        />

                    </Col>
                    <Col xs={3}>

                        <UserSmallCard 
                            user={listuser}
                        />

                    </Col>
                </Row>

                <div style={{margin:25}}></div>
                
                <ItemModalAdd 
                    show={show_modal_item_add}
                    onHide={() => {getItems(list.listid);setShowModalItemAdd(false)}}
                    list={list}
                />

                <ListModalShare 
                    show={show_modal_list_share}
                    onHide={() => {getList(list.listid);setShowModalListShare(false)}}
                    user={user}
                    list={list}
                />
                
                <div class="row">
                    {items.map(item => <ItemCard 
                        key={"itemKey"+item.itemid}
                        mine={isMyList(user, listuser)}
                        visible={!isMyList(user, listuser) || (isMyList(user, listuser) && !isShared(list))}
                        item={item}
                        onAction={alert} 
                        user={user} 
                        listuser={listuser} 
                        list={list} 
                        
                        /> )}
                </div>

            </div>
        </>
      );
}