import React from 'react';
import {Form, Button} from 'react-bootstrap';
import {useState} from 'react';

const Title = props => (
    <h1 className="title">{props.text}</h1>
  );

export function Copy() {
    const [objects, setActiveObjects] = useState([{value: "No results"}])
    const [seleced, setSelected] = useState(["No Results"]);
    const registerAllergies = (e) => {
        console.log(e);
        console.log(seleced);
    }

    return (
        <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select your allergies</Form.Label>
                <Form.Control onChange={(e) => {
                    console.log(e.target.value);
                    setSelected([...seleced, e.target.value])} } as="select" multiple>
                    <option >Peanuts</option>
                    <option>Eggs</option>
                    <option>Tree Nuts</option>
                    <option>Dairy</option>
                    <option>Gluten</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" rows="3" />
            </Form.Group>
            <Button onClick={registerAllergies} variant="primary" size="md" active>
                Submit
            </Button>
            <div>
                <ul>{seleced}</ul>
            </div>
        </Form>
    )
}

export default Title;

  