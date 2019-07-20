import React from 'react';
import {Container, Row, Col, Button, Jumbotron} from 'react-bootstrap';
import {useState} from 'react';

const Allergen = () => {
    const [submitResp, setResp] = useState({"No results": "hllo"});
    // type jsonObjec = {

    // }

    const fetchTranslation = () => {
        fetch('/form-submit')
            .then(respone => respone.json()
                .then(json => {
                    setResp(json)
                    // setResp(JSON.stringify(json));
                }))
            .catch(error => console.log(error))
    }

    return(
        <Container>
            <Row>
                <Col>This is Column: 1</Col>
                <Button onClick={fetchTranslation}>check these allergies</Button>
            </Row>
            <Row>
                <Jumbotron>{JSON.stringify(submitResp.Content)}</Jumbotron>
            </Row>
        </Container>
    )
}



export default Allergen;