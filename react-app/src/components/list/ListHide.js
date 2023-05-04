import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';

const isHidden = (list, user) => {
    return user.hidden_list_ids.includes(list.listid)
}

export default function ListHide(props) {
    const [statusHide, setStatusHide] = useState(props.status)

    const changeHideStatus = (event) => {
        event.preventDefault();
        var cleaned_statusHide = statusHide == true

        try {
            const response = axios.put("http://localhost:8000/api/user/update/list/hide?userid="+props.user.userid, 
                {
                    "userid": props.list.userid,
                    "hidden": !cleaned_statusHide
                })
            setStatusHide(!cleaned_statusHide)
        } catch (err) {
            console.error(err);
        }
      };


    return (
        <Button variant="link" class="btn btn-link" onClick={(e) => changeHideStatus(e)}>
            {statusHide ? <i class="fa fa-eye-slash" style={{fontSize: 15}}></i>:
            <i class="fa fa-eye" style={{fontSize: 15}}></i>
            }
        </Button>
    )

}