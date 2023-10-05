import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createHashRouter } from 'react-router-dom';

import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import LocalizedStrings from 'react-localization';

const strings = new LocalizedStrings({
    en:{
        privacyPolicy:"Privacy Policy"
    },
    de:{
        privacyPolicy:"Datenschutzerklärung"
    }
})

const router = createHashRouter([
    {
        path: "/",
        element: <WithNavbar>
            <App />
        </WithNavbar>,
    },
    {
        path: "/privacy",
        element: <p>Aaa</p>,
    },
]);

function WithNavbar({ children }) {
    return <>
        <MyNavbar />
        {children}
    </>
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
                    <NavLink to="/privacy">{strings.privacyPolicy}</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
