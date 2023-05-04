import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';

import Login from "./auth/Login"
import Register from "./auth/Register"

const Home = () => {
    const navigate = useNavigate()
    const [loginShow, setLoginShow] = React.useState(false);
    const [registerShow, setRegisterShow] = React.useState(false);

    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}>
        

        <Stack direction="horizontal" gap={2}>
          <Button variant="primary" onClick={() => setRegisterShow(true)}>
            Register
          </Button>

          <Button variant="outline-primary" onClick={() => setLoginShow(true)}>
            Login
          </Button>

          <Login
            show={loginShow}
            onHide={() => setLoginShow(false)}
          />

          <Register
            show={registerShow}
            onHide={() => setRegisterShow(false)}
          />

        </Stack>
        

    </div>

    )
}

export default Home