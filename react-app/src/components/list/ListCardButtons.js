import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

export function ListCardButtons(props) {
    return (
        <Row className="justify-content-end">
            <Stack 
                direction="horizontal" 
                gap={2}
                style={{"width" : "90px"}}
            >
                <Button
                    href={"/list/" + props.list.listid}
                    variant="secondary"
                    size="sm"
                    style={{                        
                        "width" : "60px", 
                        "padding" : 3, 
                        "borderRadius" : 20
                    }}
                >
                    Details
                </Button>
            </Stack>
        </Row>
    )
}