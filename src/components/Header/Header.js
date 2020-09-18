import React from 'react';
import { Button, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import './Header.css';
import { useContext } from 'react';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand href="/home"><img src="https://i.ibb.co/VS16DdN/Logo.png" style={{ height: '56px', paddingRight: '20px' }} alt="" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    <Form inline className="mr-auto">
                        <FormControl type="text" style={{fontSize: '10px', fontWight: '500'}} value={loggedInUser.email} placeholder="Search your Destination.." className="mr-sm-2" />
                    </Form>
                    <Nav className="nav-style">
                        <Nav.Link href="/news">News</Nav.Link>
                        <Nav.Link href="/hotel">Destination</Nav.Link>
                        <Nav.Link href="/blog">Blog</Nav.Link>
                        <Nav.Link href="/contact">Contact</Nav.Link>
                        <Button href="/login" variant="warning">Login</Button>
                        <Button onClick={() => setLoggedInUser({})} variant="danger">Sign Out</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;