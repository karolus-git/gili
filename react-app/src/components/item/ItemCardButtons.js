import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { isTakenStatus, isTakable, isTakenTextButton } from './ItemUtils'

export function ItemCardButtons(props) {
    const [stackStyle, setStackStyle] = useState({"width" : "60px"})

    const selectStackStyle = (ismine) => {
        console.log("in style selection")
        if (ismine) {
            setStackStyle({
                "width": "60px"
            })
        } else {
            setStackStyle({
                "width": "120px"
            })
        }
    }

    async function takeItem(user, itemid) {

        var curTime = new Date().toISOString()

        const response = await axios.put("http://localhost:8000/api/item/update?itemid="+itemid,
            {
                "is_taken": true,
                "is_taken_by": {
                    "userid" : user.userid,
                    "name" : user.login.name,
                    "email" : user.login.email
                },
                "is_taken_at": curTime
            }
        )
    }

    async function releaseItem(user, itemid) {

        var curTime = new Date().toISOString()

        const response = await axios.put("http://localhost:8000/api/item/update?itemid="+itemid,
            {
                "is_taken": false,
                "is_taken_by": {
                },
                "is_taken_at": curTime
            }
        )
    }


    async function deleteItem(itemid) {

        const response = await axios.put("http://localhost:8000/api/item/update?itemid="+itemid,
            {
                "is_deleted" : true
            }
        )
    }

    async function updateItem(user, item) {
        if (isTakenStatus(user, item)) {
            releaseItem(user, item.itemid)
        } else {
            takeItem(user, item.itemid)

        }
    }

    useEffect(() => {
        selectStackStyle(props.mine)
    }, []);

    if (!props.visible) {
        return ""
    }

    return (
        <div onLoad={() => alert("loading")}>
        <Row className="justify-content-end">

            <Stack 
                direction="horizontal" 
                gap={2}
                style={stackStyle}
            >
                {props.mine? "":
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => updateItem(props.user, props.item)}
                        disabled={!isTakable(props.user, props.item)}
                        style={{
                            "width" : "60px", 
                            "padding" : 3, 
                            "borderRadius" : 20
                        }}
                    >
                        {isTakenTextButton(props.user, props.item)}
                    </Button>
                    
                }

                <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => deleteItem(props.item.itemid)}
                    disabled={!props.mine}
                    style={{                        
                        "width" : "28px", 
                        "padding" : 3, 
                        "borderRadius" : 40
                    }}
                >
                    <i class="fa fa-trash" style={{fontSize: 15}}></i>
                </Button>
            </Stack>
        </Row>
        </div>
    )
}