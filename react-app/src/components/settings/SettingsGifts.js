import React, { useState, useEffect } from 'react';
import axios from "axios"

import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'

export default function SettingsGifts(props) {
    const [isDisabled, setIsDisabled] = useState(true)
    const [settings, setSettings] = useState(props.settings)

    async function updateSettingsGifts(event, userid) {
        event.preventDefault();
        var settings = {
            "tech" : event.target.rangeTech.value / 100 * 5.0,
            "music" : event.target.rangeMusic.value / 100 * 5.0,
            "books" : event.target.rangeBooks.value / 100 * 5.0,
            "outdoor" : event.target.rangeOutdoor.value / 100 * 5.0

        }
        const response = axios.put("http://localhost:8000/api/user/update/settings/gifts?userid="+userid,
            settings)
        setSettings(settings);
    }

    return (


            <Form 
                name="formGifts"
                onSubmit={(e) => {
                    updateSettingsGifts(e, props.user.userid);
                // setIsDisabled(true);
            }}>

                <h2>Likes
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
                            name="submitGifts"
                            style={{margin:5}}
                            show={!isDisabled}
                        >
                            Save
                        </Button> 
                    }
                    </Stack>
                </h2>
                
                <Form.Label>Tech</Form.Label>
                <Form.Range 
                    name="rangeTech"
                    defaultValue={settings.tech * 20}
                    disabled={isDisabled}/>

                <Form.Label>Books</Form.Label>
                <Form.Range 
                    name="rangeBooks"
                    defaultValue={settings.books * 20}
                    disabled={isDisabled}/>

                <Form.Label>Music</Form.Label>
                <Form.Range 
                    name="rangeMusic"
                    defaultValue={settings.music * 20}
                    disabled={isDisabled}/>

                <Form.Label>Outdoor</Form.Label>
                <Form.Range 
                    name="rangeOutdoor"
                    defaultValue={settings.outdoor * 20}
                    disabled={isDisabled}/>


            </Form>
    );
  }