import React, { useState, useEffect } from 'react';
import { useAuthUser, useSignOut } from 'react-auth-kit'
import axios from "axios"

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'


export default function SettingsPreferences(props) {
    const [isDisabled, setIsDisabled] = useState(true)
    const [settings, setSettings] = useState(props.settings)

    async function updateSettingsPreferences(event, userid) {
        event.preventDefault();
        var settings = {
            "share_birthday" : event.target.switchShareAge.checked,
            "share_mail" : event.target.switchShareMail.checked,
            "share_phone" : event.target.switchSharePhone.checked,
            "share_address" : event.target.switchShareAddress.checked,
            "share_gift_preferences" : event.target.switchShareGiftPreferences.checked,

            "notify_if_list_shared" : event.target.notifyListShared.checked,
            "notify_if_list_deleted" : event.target.notifyListDeleted.checked,
            "notify_if_item_taken" : event.target.notifyItemTaken.checked,
            "notify_7days_remaining" : event.target.notify7Days.checked

        }
        const response = axios.put("http://localhost:8000/api/user/update/settings/preferences/?userid="+userid,
            settings)
        setSettings(settings);
    }

    return (

            <Form onSubmit={(e) => {
                updateSettingsPreferences(e, props.user.userid);
                setIsDisabled(true);
            }}>
                <h2>Settings
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

                <div style={{padding:20}}>
                    <h3>Share</h3>
                
                    <Form.Check 
                            type="switch"
                            defaultChecked={settings.share_birthday}
                            name="switchShareAge"
                            label="Share your age"
                            disabled={isDisabled}
                    />
                    
                    <Form.Check 
                            type="switch"
                            defaultChecked={settings.share_mail}
                            name="switchShareMail"
                            label="Share your mail"
                            disabled={isDisabled}
                    />
                    
                    <Form.Check 
                            type="switch"
                            defaultChecked={settings.share_address}
                            name="switchShareAddress"
                            label="Share your address"
                            disabled={isDisabled}
                    />

                    <Form.Check 
                            type="switch"
                            defaultChecked={settings.share_phone}
                            name="switchSharePhone"
                            label="Share your phone number"
                            disabled={isDisabled}
                    />

                    <Form.Check 
                            type="switch"
                            defaultChecked={settings.share_gift_preferences}
                            name="switchShareGiftPreferences"
                            label="Share your gift's preferences"
                            disabled={isDisabled}
                    />

                    <br/>

                    <h3>Notifications</h3>

                        <Form.Check 
                            type="switch"
                            defaultChecked={settings.notify_if_list_shared}
                            name="notifyListShared"
                            label="Notify me if a list is shared with me"
                            disabled={isDisabled}
                        />

                        <Form.Check 
                            type="switch"
                            defaultChecked={settings.notify_if_list_deleted}
                            name="notifyListDeleted"
                            label="Notify me if a shared list is deleted"
                            disabled={isDisabled}
                        />

                        <Form.Check 
                            type="switch"
                            defaultChecked={settings.notify_7days_remaining}
                            name="notify7Days"
                            label="Remind me 7days before the expiration of a list"
                            disabled={isDisabled}
                        />
                        <Form.Check 
                            type="switch"
                            name="notifyItemTaken"
                            defaultChecked={settings.notify_if_item_taken}
                            label="Notify me if an item is taken in a list shared with me"
                            disabled={isDisabled}
                        />
                    
                    <br/>
                </div>

            </Form>
    );
  }