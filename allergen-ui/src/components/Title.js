import React from 'react';
import {Form, Button} from 'react-bootstrap';
import {InputGroup, InputGroupAddon, InputGroupText, Input} from 'reactstrap';
import {useState, useEffect} from 'react';

const Title = ({ text, allergens, setAllergens }) => {
    const [ohNo, selectedOhNo] = useState([{value: "None Selected"}])
    const [seleced, setSelected] = useState([]);
    const [inputGroups, setInputs] = useState([]);
    const [groupCount, setCount] = useState(1);

    const registerAllergies = (e) => {
        var valueArray = allergens.map(a => a.value);
        var jsonObject = {
            "allergens": valueArray
        }
    }

    useEffect(() => {
        setAllergens(seleced);
    }, [seleced]);

    const handleInput = (e) => {
        console.log(e.target.value);
        var newState = {
            key: e.target.key,
            value: e.target.value
        }
        setAllergens([...allergens, newState])
    }

    const inputItem = () => {
        var inputList = [];
        var inputFrame = () => {
            return (
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText onChange={(e) => handleInput(e)}>
                            <Input addon type="checkbox" aria-label="Checkbox for following text input" />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input key={Math.floor(Math.random() * 20)} type="text" onChange={(e) => handleInput(e)} placeholder="Add ingredient ..." />
                </InputGroup>
            );
        }
        for (var i = 0; i < groupCount; i++) {
            inputList.push(inputFrame());
        }

        setInputs([inputList]);
    }

    useEffect(() => {
        inputItem();
    }, [groupCount]);
    
    return (
        <div className='container'>
            <Form>
                {inputGroups}
                <div className='row'>
                    <Button onClick={() => setCount(groupCount + 1)}>
                        add ingeredient...
                    </Button>
                </div>
                <div className='row'>
                    <Button onClick={(e) => registerAllergies(e)} variant="primary" size="md" active>
                        Submit
                    </Button>
                </div>
            </Form>    
        </div>
    );
}

export default Title;

  