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
            <Navbar.Brand className="nav-item" href="/">Allergen Reader</Navbar.Brand>
            <Dropdown>
                {/* <DropdownToggle variant="clear" className="btn">
                </DropdownToggle> */}
                <Dropdown.Menu>
                    <Dropdown.Item href="#">Allergies</Dropdown.Item>
                    <Dropdown.Item href="/info">Info</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Nav>
    );
}

export default AllergenNav;