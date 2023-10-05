import logo from './logo.svg';
import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div className="App">
            <MyNavbar />
        </div>
    );
}

function MyNavbar() {
    return <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
            <NavLink to="/" onlyActiveOnIndex exact activeClassName="active">
                <Navbar.Brand href="" >ejuet</Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link>
                        <NavLink to="/">Home</NavLink>
                    </Nav.Link>
                </Nav>
                <Nav>
                    <NavLink to="/datenschutzerklaerung">Datenschutzerklärung</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}

export default App;
