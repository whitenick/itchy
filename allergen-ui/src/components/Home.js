import React from 'react';
import {Jumbotron, Container} from 'react-bootstrap';
import Title from './Title';
import { useState, useEffect } from 'react';

const Home = () => {
  const [allergens, setAllergens] = useState([]);

  useEffect(() => {
    console.log(allergens);
  }, [allergens]);

  return (
    <div>
      <Container>
      <div className="box">
        <Title text="Allergies" allergens={allergens} setAllergens={setAllergens}/>
      </div>
      </Container>
    <div>
        <h1>Hello, world</h1>
    </div>
    </div>
  )
}

export default Home; 