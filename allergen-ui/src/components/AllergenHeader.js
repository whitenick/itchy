import React from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Dropdown, DropdownButton} from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/DropdownToggle';


const AllergenHeader = () => {
    return (
        <Nav className="mr-auto nav-header">
            <Navbar.Brand className="nav-item" href="/">Allergen.io</Navbar.Brand>
        </Nav>
    );
}

export default AllergenHeader;