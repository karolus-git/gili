import React, { useState, useEffect } from 'react';
import { useAuthUser, useSignOut } from 'react-auth-kit'
import axios from "axios"

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'


export default function SettingsPublic(props) {
    const authUser = useAuthUser()
    const [isDisabled, setIsDisabled] = useState(true)
    const [settings, setSettings] = useState({})

    useEffect(() => {
        // setSettings(authUser().user.preferences)
    }, [])

    return (

            <Form onSubmit={(e) => {
                // updateSettings(e, props.user.userid);
                setIsDisabled(true);
            }}>
                <h2>Public
                    <Stack direction="horizontal" gap={2}>
                        <Button 
                            variant="outline-secondary" 
                            size="sm" 
                            style={{margin:5}}
                            onClick={() => setIsDisabled(!isDisabled)}
                        >
                            Edit
                        </Button>
                        {isDisabled? "":<Button 
                            variant="success" 
                            size="sm" 
                            type="submit"
                            style={{margin:5}}
                            show={!isDisabled}
                        >
                            Save
                        </Button> 
                    }
                    </Stack>
                </h2>

                

            </Form>
    );
  }