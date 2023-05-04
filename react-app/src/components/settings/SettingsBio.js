import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'

export default function  SettingsBio() {
    const [isDisabled, setIsDisabled] = useState(true)

    return (
        <Form onSubmit={(e) => {
                // updateSettings(e, props.user.userid);
                setIsDisabled(true);
            }}>
                <h2>Bio
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
