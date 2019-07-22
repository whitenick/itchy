import React from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Dropdown, DropdownButton} from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/DropdownToggle';


const AllergenNav = () => {
    return (
        // <Navbar bg="light" expand="lg">
        //     <Navbar.Brand href="#home">Nick White</Navbar.Brand>
        //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //     <Navbar.Collapse id="basic-navbar-nav">
        //         <Nav className="mr-auto nav">
        //             <Nav.Link className="nav-item" href="crypto">Crypto</Nav.Link>
        //             <Nav.Link href="allergen" >Allergen Reader</Nav.Link>
        //         </Nav>
        //         <Dropdown>
        //             <DropdownToggle variant="light" className="btn">
        //                 Me
        //             </DropdownToggle>
        //             <Dropdown.Menu>
        //             <Dropdown.Item href="#">Allergies</Dropdown.Item>
        //             </Dropdown.Menu>
        //         </Dropdown>
        //     </Navbar.Collapse>
        //     <Nav className="mr-auto nav">
        //         <Nav.Link className="nav-item" href="crypto">Crypto</Nav.Link>
        //         <Nav.Link href="allergen" >Allergen Reader</Nav.Link>
        //     </Nav>
        // </Navbar>
        <Nav className="mr-auto nav-header">
            <Navbar.Brand className="nav-item" href="/">Nick White</Navbar.Brand>
            <Nav.Link className="nav-item" href="crypto">Crypto</Nav.Link>
            <Nav.Link className="nav-item" href="allergen" >Allergen Reader</Nav.Link>
            <Dropdown>
                <DropdownToggle variant="light" className="btn">
                    Me
                </DropdownToggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#">Allergies</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Nav>
    );
}

export default AllergenNav;