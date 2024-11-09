import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from '../images/book-icon.png';
import heart from '../images/heart.png';
import diamond from '../images/diamond.png'

import "./navbar.css"

function NavBar()
{
    return(
        <Navbar fixed="top" bg="dark" data-bs-theme="dark" expand="lg" className='navbar'>
            <Nav className="items">
                <Navbar.Brand className='brand'><img src={logo} className='navbar-logo'/>LingoLoop</Navbar.Brand>
                <Nav.Link eventKey="disabled"><img src={heart} className='game-item'/>Hearts</Nav.Link>
                <Nav.Link eventKey="disabled"><img src={diamond} className='game-item'/>Diamonds</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default NavBar;