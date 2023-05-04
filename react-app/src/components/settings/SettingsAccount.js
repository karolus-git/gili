import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function SettingsAccount(props) {

    async function deleteUserAccount(event, userid) {
        event.preventDefault();
        const response = await axios.delete("http://localhost:8000/api/user?userid="+userid);
    }

    return (
        <>
            <Form onSubmit={(e) => deleteUserAccount(e, props.user.userid)} style={{padding : 20}}>
                <h2>Account</h2>
                    <Button 
                        variant="danger"
                        size="sm" 
                        type="submit">
                        Delete account
                    </Button>
            </Form>
        </>
    );
  }
