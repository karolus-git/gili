import React, { useState, useEffect } from 'react';
import axios from "axios";
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

export function ListButtons(props) {

    async function deleteList(listid) {
        const response = await axios.delete("http://localhost:8000/api/list?listid="+listid);
        return response.data
    }

    return (
        <Row className="justify-content-end">

            <Stack 
                direction="horizontal" 
                gap={2}
                // style={{"width" : "90px"}}
            >
                <Button
                    variant="primary"
                    disabled={!props.mine}
                    onClick={(e) => props.clickAdd(true)}
                    size="sm"
                    style={{                        
                        "width" : "100px", 
                        "padding" : 3, 
                        "borderRadius" : 20
                    }}
                >
                    Add item
                </Button>

                <Button
                    variant="outline-primary"
                    disabled={!props.mine}
                    onClick={() => props.clickShare(true)}
                    size="sm"
                    style={{                        
                        "width" : "120px", 
                        "padding" : 3, 
                        "borderRadius" : 20
                    }}
                >
                    Share list
                </Button>

                <Button
                    variant="outline-danger"
                    disabled={!props.mine || props.shared}
                    size="sm"
                    onClick={() => deleteList(props.listid)}
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
    )
}