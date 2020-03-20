import React from 'react';
import {Container, Row, Col, Button, Jumbotron} from 'react-bootstrap';
import {useState} from 'react';
import AddButton from './AddButton';
import CameraFeed from './CameraFeed';

const Allergen = () => {
    const [submitResp, setResp] = useState({"No results": "hllo"});
    

    const fetchTranslation = () => {
        fetch('/form-submit')
            .then(respone => respone.json()
                .then(json => {
                    setResp(json)
                }))
            .catch(error => console.log(error))
    }

    return(
        <Container>
            <Row>
                <Button onClick={fetchTranslation}>check these allergies</Button>
            </Row>
            <Row>
                <Jumbotron>{JSON.stringify(submitResp.Content)}</Jumbotron>
            </Row>
            <Row>
                <Col>
                    <CameraFeed />
                </Col>
            </Row>
        </Container>
    )
}



export default Allergen;