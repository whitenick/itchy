import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Home from './components/Home';
import Crypto from './components/Crypto';
import {Navbar, Jumbotron, Container, Col} from 'react-bootstrap';
import AllergenHeader from './components/AllergenHeader';
import Allergen from './components/Allergen';
import Title from './components/Title';
import {Copy} from './components/Title';
import './genX.scss';


function App() {
  
  return (
    <>
    <Container>
      <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
      />
      <div className="header-nav">
        <AllergenHeader/>
      </div>
      <Container>
          {/* <div className="box">
            <Title text="Allergies" />
          </div> */}
          <Router> 
          <div className="App">
            <Container>
              <Route path="/" exact component={Home}/>
              <Route path="/crypto" component={Crypto} />
              <Route path='/allergen' component={Allergen} />
            </Container>
          </div>
        </Router>
      </Container>
    </Container>
    <div className='background'>
      <img src='home-background.jpg'/>
    </div>
    </>
  );
}

export default App;
